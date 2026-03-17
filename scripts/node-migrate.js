const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const username = 'shamithkulal'; // Assuming this based on path Shamith.Kulal
const repo = 'plp-images';
const jsdelivrBase = `https://cdn.jsdelivr.net/gh/${username}/${repo}@main/portfolio`;

console.log('🔄 Starting Node.js native Cloudinary -> GitHub Migration');
console.log('Target Base:', jsdelivrBase);

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (stat.isFile() && /\.(tsx|ts|jsx|js)$/.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Replace standard Cloudinary res paths with jsDelivr
            content = content.replace(/https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(v\d+\/)?portfolio\//g, `${jsdelivrBase}/`);
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`✅ Updated URLs in: ${fullPath}`);
            }
        }
    }
}

try {
    processDirectory(srcDir);
    console.log('🎉 Migration completely finished natively!');
} catch (e) {
    console.error('Migration failed:', e);
}
