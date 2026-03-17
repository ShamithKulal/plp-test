"use server";

import { revalidatePath } from "next/cache";

const GITHUB_REPO = "shamithkulal/plp-images";
const GITHUB_BRANCH = "main";
const JSDELIVR_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_REPO}@${GITHUB_BRANCH}`;

// Use the GitHub REST API (Tokens optional but highly recommended to raise the 60req/hr unauthenticated limit)
const fetchGitHubAPI = async (endpoint: string) => {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${endpoint}`;
    
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Paperlight-NextJS-App'
    };
    
    // Allow using a personal access token for higher rate limits if provided in .env
    if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(url, {
        headers,
        next: { revalidate: 0 } // Disable cache to prevent stale empty folders, rely on Next.js page caching if needed
    });

    if (!res.ok) {
        if (res.status === 404) return []; // Directory doesn't exist yet
        console.error(`GitHub API Error (${res.status}): ${res.statusText}`);
        throw new Error(`GitHub API Error: ${res.status}`);
    }

    return res.json();
};

// ─── Folders (Categories / Clients) ──────────────────────────────────────────

export async function getFolders(path: string = "portfolio") {
    try {
        const data = await fetchGitHubAPI(path);
        
        if (!Array.isArray(data)) return { success: true, folders: [] };

        const folders = data
            .filter((item: any) => item.type === "dir")
            .map((item: any) => ({
                name: item.name,
                path: item.path
            }));

        return { success: true, folders };
    } catch (error) {
        console.error("Error fetching folders from GitHub:", error);
        return { success: false, folders: [] };
    }
}

// ─── Images ──────────────────────────────────────────────────────────────────

export async function getImagesInFolder(folderPath: string) {
    try {
        const data = await fetchGitHubAPI(folderPath);

        if (!Array.isArray(data)) return { success: true, images: [] };

        const images = data
            .filter((item: any) => {
                if (item.type !== "file") return false;
                // Only include standard image formats
                const ext = item.name.split('.').pop()?.toLowerCase();
                return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '');
            })
            .map((item: any) => ({
                // Map the raw public_id perfectly to exactly what Next.js components expect
                public_id: `${JSDELIVR_BASE}/${item.path}`,
                format: item.name.split('.').pop()?.toLowerCase()
            }));

        return { success: true, images };
    } catch (error) {
        console.error("Error fetching images from GitHub:", error);
        return { success: false, images: [] };
    }
}

// ─── Git Database API Helpers ────────────────────────────────────────────────

async function getBranchSha() {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/${GITHUB_BRANCH}`, {
        headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'Paperlight-NextJS-App' },
        next: { revalidate: 0 }
    });
    if (!res.ok) throw new Error("Failed to get branch SHA");
    return (await res.json()).object.sha;
}

async function getCommitTree(commitSha: string) {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees/${commitSha}?recursive=1`, {
        headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'Paperlight-NextJS-App' },
        next: { revalidate: 0 }
    });
    if (!res.ok) throw new Error("Failed to get commit tree");
    return (await res.json()).tree;
}

async function createTree(baseTreeSha: string, treeItems: any[]) {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/trees`, {
        method: "POST",
        headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'Paperlight-NextJS-App' },
        body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems })
    });
    if (!res.ok) throw new Error(`Failed to create tree: ${await res.text()}`);
    return (await res.json()).sha;
}

async function createCommit(message: string, treeSha: string, parentSha: string) {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/commits`, {
        method: "POST",
        headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'Paperlight-NextJS-App' },
        body: JSON.stringify({ message, tree: treeSha, parents: [parentSha] })
    });
    if (!res.ok) throw new Error("Failed to create commit");
    return (await res.json()).sha;
}

async function updateBranchRef(commitSha: string) {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/refs/heads/${GITHUB_BRANCH}`, {
        method: "PATCH",
        headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'Paperlight-NextJS-App' },
        body: JSON.stringify({ sha: commitSha })
    });
    if (!res.ok) throw new Error("Failed to update ref");
}

// ─── Destructive Actions ─────────────────────────────────────────────────────

export async function createFolder(path: string) {
    if (!process.env.GITHUB_TOKEN) return { success: false, error: "GitHub Token required for this action." };
    try {
        const newTreeUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}/.keep`;
        const res = await fetch(newTreeUrl, {
            method: "PUT",
            headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'Paperlight-NextJS-App' },
            body: JSON.stringify({ message: `Create folder ${path}`, content: Buffer.from('keep').toString('base64'), branch: GITHUB_BRANCH })
        });
        if (!res.ok) throw new Error("Failed to create folder");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function renameFolder(oldPath: string, newPath: string) {
    if (!process.env.GITHUB_TOKEN) return { success: false, error: "GitHub Token required for this action." };
    try {
        const commitSha = await getBranchSha();
        
        const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/commits/${commitSha}`, {
            headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'User-Agent': 'Paperlight' }, next: { revalidate: 0 }
        });
        if (!commitRes.ok) throw new Error(`Failed to fetch commit: ${await commitRes.text()}`);
        
        const commitData = await commitRes.json();
        const baseTreeSha = commitData.tree.sha;

        const treeData = await getCommitTree(commitSha);
        const prefix = oldPath + "/";
        const filesToMove = treeData.filter((item: any) => item.type === "blob" && item.path.startsWith(prefix));
        
        if (filesToMove.length === 0) return { success: false, error: "Folder is empty or not found." };

        const combinedTreeItems = filesToMove.flatMap((item: any) => [
            { path: item.path.replace(oldPath, newPath), mode: item.mode, type: item.type, sha: item.sha },
            { path: item.path, mode: item.mode, type: item.type, sha: null } // Delete old path
        ]);

        const newTreeSha = await createTree(baseTreeSha, combinedTreeItems);
        const newCommitSha = await createCommit(`Rename folder ${oldPath} to ${newPath}`, newTreeSha, commitSha);
        await updateBranchRef(newCommitSha);

        revalidatePath('/', 'layout');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteFolder(path: string) {
    if (!process.env.GITHUB_TOKEN) return { success: false, error: "GitHub Token required for this action." };
    try {
        const commitSha = await getBranchSha();
        
        const commitRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/commits/${commitSha}`, {
            headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'User-Agent': 'Paperlight' }, next: { revalidate: 0 }
        });
        if (!commitRes.ok) throw new Error(`Failed to fetch commit: ${await commitRes.text()}`);
        
        const commitData = await commitRes.json();
        const baseTreeSha = commitData.tree.sha;

        const treeData = await getCommitTree(commitSha);
        const prefix = path + "/";
        
        const deleteTreeItems = treeData
            .filter((item: any) => item.type === "blob" && item.path.startsWith(prefix))
            .map((item: any) => ({ path: item.path, mode: item.mode, type: item.type, sha: null }));

        if (deleteTreeItems.length === 0) return { success: false, error: "Folder is empty or not found." };
        
        const newTreeSha = await createTree(baseTreeSha, deleteTreeItems);
        const newCommitSha = await createCommit(`Delete folder ${path}`, newTreeSha, commitSha);
        await updateBranchRef(newCommitSha);

        revalidatePath('/', 'layout');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteImage(publicId: string) {
    if (!process.env.GITHUB_TOKEN) return { success: false, error: "GitHub Token required for this action." };
    try {
        const prefix = `${JSDELIVR_BASE}/`;
        if (!publicId.startsWith(prefix)) throw new Error("Invalid public ID format");
        const filePath = publicId.substring(prefix.length);

        const getRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
            headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'Paperlight-NextJS-App' },
            next: { revalidate: 0 }
        });
        if (!getRes.ok) throw new Error("File not found to delete");
        const fileData = await getRes.json();
        
        const delRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
            method: "DELETE",
            headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'Paperlight-NextJS-App' },
            body: JSON.stringify({ message: `Delete ${filePath}`, sha: fileData.sha, branch: GITHUB_BRANCH })
        });
        if (!delRes.ok) throw new Error("Failed to delete file");
        
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function uploadImage(folderPath: string, fileBase64: string, filename: string) {
    if (!process.env.GITHUB_TOKEN) return { success: false, error: "GitHub Token required for this action." };
    try {
        const cleanBase64 = fileBase64.replace(/^data:image\/\w+;base64,/, '');
        const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${folderPath}/${filename}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'Paperlight-NextJS-App' },
            body: JSON.stringify({ message: `Upload ${filename} to ${folderPath}`, content: cleanBase64, branch: GITHUB_BRANCH })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to upload");
        }
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
