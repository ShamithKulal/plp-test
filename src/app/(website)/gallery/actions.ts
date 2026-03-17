"use server";

const GITHUB_REPO = "shamithkulal/plp-images";
const GITHUB_BRANCH = "main";
const JSDELIVR_BASE = `https://cdn.jsdelivr.net/gh/${GITHUB_REPO}@${GITHUB_BRANCH}`;

export async function getGitHubImages() {
    try {
        // Use the Git Trees API to get all files recursively
        const url = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/${GITHUB_BRANCH}?recursive=1`;
        
        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Paperlight-NextJS-App'
        };
        
        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
        }

        const res = await fetch(url, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);
        
        const data = await res.json();
        
        // Filter out directories and non-images
        const images = data.tree
            .filter((item: any) => {
                if (item.type !== "blob") return false;
                const ext = item.path.split('.').pop()?.toLowerCase();
                return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '');
            })
            // Limit to first 100 for the gallery
            .slice(0, 100)
            .map((item: any) => ({
                public_id: `${JSDELIVR_BASE}/${item.path}`,
                format: item.path.split('.').pop()?.toLowerCase(),
                bytes: item.size || 0
            }));

        return { success: true, images };
    } catch (error) {
        console.error("Error fetching from GitHub Trees API:", error);
        return { success: false, images: [] };
    }
}
