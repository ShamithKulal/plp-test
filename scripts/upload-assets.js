const fs = require('fs');
const path = require('path');

const GITHUB_REPO = 'shamithkulal/plp-images';
const BRANCH = 'main';
// Set your GitHub Personal Access Token here before running
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''; 

if (!GITHUB_TOKEN) {
    console.error("❌ ERROR: GITHUB_TOKEN environment variable is missing.");
    console.error("Please run: $env:GITHUB_TOKEN='your_token_here' ; node upload-assets.js");
    process.exit(1);
}

const sourceDirs = [
    { localPath: path.join(__dirname, '../public/haldi-mehandi'), remotePrefix: 'portfolio/haldi-mehandi' },
    { localPath: path.join(__dirname, '../public/house-warming'), remotePrefix: 'portfolio/house-warming' },
    { localPath: path.join(__dirname, '../public/prewedding'), remotePrefix: 'portfolio/prewedding' }
];

async function uploadFileToGitHub(localFilePath, remoteFilePath) {
    try {
        const fileContent = fs.readFileSync(localFilePath);
        const base64Content = fileContent.toString('base64');

        const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${remoteFilePath}`;
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': 'Paperlight-Automated-Upload'
            },
            body: JSON.stringify({
                message: `Auto-upload: ${remoteFilePath}`,
                content: base64Content,
                branch: BRANCH
            })
        });

        if (response.ok) {
            console.log(`✅ Uploaded: ${remoteFilePath}`);
        } else if (response.status === 422) { // Invalid request, often means file already exists in Git
            console.log(`⏭️ Skipped (already exists): ${remoteFilePath}`);
        } else {
            console.error(`❌ Failed to upload ${remoteFilePath}: ${response.status} ${response.statusText}`);
            const errorData = await response.json();
            console.error(errorData);
        }
    } catch (error) {
        console.error(`❌ Error uploading ${remoteFilePath}:`, error);
    }
}

async function processDirectory(dirConfig) {
    let files;
    try {
        files = fs.readdirSync(dirConfig.localPath);
    } catch (e) {
        console.warn(`⚠️ Directory not found: ${dirConfig.localPath}`);
        return;
    }

    console.log(`\n📂 Processing: ${dirConfig.localPath} -> ${dirConfig.remotePrefix}`);
    
    // We upload files sequentially to avoid hitting GitHub API abuse limits
    for (const file of files) {
        const fullPath = path.join(dirConfig.localPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile()) {
            // Put all files directly into the root category folder for now based on the requested structure
            const remotePath = `${dirConfig.remotePrefix}/${file}`;
            await uploadFileToGitHub(fullPath, remotePath);
            // Delay 500ms between uploads to respect rate limits
            await new Promise(resolve => setTimeout(resolve, 500));
        } else if (stat.isDirectory()) {
            // Support 1 level of client sub-folders
            const subFiles = fs.readdirSync(fullPath);
            for (const subFile of subFiles) {
                const subFullPath = path.join(fullPath, subFile);
                if (fs.statSync(subFullPath).isFile()) {
                    const remotePath = `${dirConfig.remotePrefix}/${file}/${subFile}`;
                    await uploadFileToGitHub(subFullPath, remotePath);
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }
    }
}

async function main() {
    console.log(`🚀 Starting upload to ${GITHUB_REPO}...`);
    for (const dirConfig of sourceDirs) {
        await processDirectory(dirConfig);
    }
    console.log(`\n🎉 Upload process complete!`);
}

main();
