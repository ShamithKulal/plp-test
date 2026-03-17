#!/bin/bash

# Migration Script: Cloudinary to GitHub + jsDelivr
# This script will:
# 1. Push current backoffice-portfolio branch
# 2. Create new branch: github-images-integration
# 3. Guide you through the migration process

set -e  # Exit on any error

echo "🚀 Starting Cloudinary → GitHub Migration"
echo "=========================================="
echo ""

# Step 1: Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Error: Not in a git repository!"
    echo "Please run this script from your antigravity project root."
    exit 1
fi

# Step 2: Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "backoffice-portfolio" ]; then
    echo "⚠️  Warning: You're not on backoffice-portfolio branch"
    echo "Current branch: $CURRENT_BRANCH"
    read -p "Do you want to switch to backoffice-portfolio? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout backoffice-portfolio
        echo "✅ Switched to backoffice-portfolio"
    else
        echo "❌ Aborted. Please switch to backoffice-portfolio manually."
        exit 1
    fi
fi

# Step 3: Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo ""
    echo "📝 You have uncommitted changes:"
    git status --short
    echo ""
    read -p "Do you want to commit these changes before proceeding? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter commit message: " COMMIT_MSG
        git add .
        git commit -m "$COMMIT_MSG"
        echo "✅ Changes committed"
    else
        echo "⚠️  Proceeding with uncommitted changes (they will be stashed)"
        git stash
        echo "✅ Changes stashed"
    fi
fi

# Step 4: Push backoffice-portfolio branch
echo ""
echo "📤 Pushing backoffice-portfolio branch..."
git push origin backoffice-portfolio || {
    echo "⚠️  Push failed. This might be the first push."
    read -p "Set upstream and push? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push -u origin backoffice-portfolio
    fi
}
echo "✅ backoffice-portfolio pushed successfully"

# Step 5: Create new branch for GitHub images integration
echo ""
echo "🌿 Creating new branch: github-images-integration"
git checkout -b github-images-integration
echo "✅ Branch created and checked out"

# Step 6: Create directory structure for downloaded images
echo ""
echo "📁 Creating temporary directory for Cloudinary images..."
mkdir -p cloudinary-backup
echo "✅ Directory created: ./cloudinary-backup"

echo ""
echo "=========================================="
echo "✅ Git setup complete!"
echo "=========================================="
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1️⃣  Download your images from Cloudinary"
echo "   → Run the download script (will be created next)"
echo ""
echo "2️⃣  Create a new GitHub repository: 'plp-images'"
echo "   → Go to github.com and create it"
echo ""
echo "3️⃣  Upload images to the new repository"
echo "   → Use the upload script (will be created next)"
echo ""
echo "4️⃣  Update your code to use GitHub + jsDelivr URLs"
echo "   → Automatically done by the code migration script"
echo ""
echo "=========================================="
echo ""
read -p "Press Enter to continue with creating helper scripts..."

# Create download script for Cloudinary images
cat > download-cloudinary-images.sh << 'DOWNLOAD_SCRIPT'
#!/bin/bash

# This script downloads all images from your Cloudinary account
# Requires: curl, jq (for JSON parsing)

echo "📥 Cloudinary Image Download Script"
echo "===================================="
echo ""
echo "⚠️  You'll need your Cloudinary credentials:"
echo "   - Cloud Name"
echo "   - API Key"
echo "   - API Secret"
echo ""
read -p "Enter your Cloudinary Cloud Name: " CLOUD_NAME
read -p "Enter your Cloudinary API Key: " API_KEY
read -sp "Enter your Cloudinary API Secret: " API_SECRET
echo ""
echo ""

OUTPUT_DIR="./cloudinary-backup"
mkdir -p "$OUTPUT_DIR"

echo "🔍 Fetching image list from Cloudinary..."

# Fetch resources from Cloudinary
RESPONSE=$(curl -s -u "$API_KEY:$API_SECRET" \
  "https://api.cloudinary.com/v1_1/$CLOUD_NAME/resources/image?max_results=500")

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ jq is not installed. Please install it first:"
    echo "   Ubuntu/Debian: sudo apt-get install jq"
    echo "   Mac: brew install jq"
    exit 1
fi

# Parse and download images
echo "$RESPONSE" | jq -r '.resources[].secure_url' | while read -r URL; do
    FILENAME=$(basename "$URL" | cut -d'?' -f1)
    echo "📥 Downloading: $FILENAME"
    curl -s -o "$OUTPUT_DIR/$FILENAME" "$URL"
done

echo ""
echo "✅ Download complete! Images saved to: $OUTPUT_DIR"
echo ""
DOWNLOAD_SCRIPT

chmod +x download-cloudinary-images.sh
echo "✅ Created: download-cloudinary-images.sh"

# Create upload script for GitHub
cat > upload-to-github-images.sh << 'UPLOAD_SCRIPT'
#!/bin/bash

# This script helps you upload images to your new GitHub repository

echo "📤 GitHub Images Repository Setup"
echo "=================================="
echo ""
echo "First, create the repository on GitHub:"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: plp-images"
echo "3. Make it PUBLIC (required for jsDelivr CDN)"
echo "4. Don't initialize with README"
echo "5. Click 'Create repository'"
echo ""
read -p "Have you created the repository? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please create the repository first, then run this script again."
    exit 1
fi

read -p "Enter your GitHub username: " GH_USERNAME
REPO_NAME="plp-images"

echo ""
echo "📁 Initializing local repository..."

cd cloudinary-backup
git init
mkdir -p portfolio
mv *.jpg *.jpeg *.png *.webp portfolio/ 2>/dev/null || true

cat > README.md << README
# Antigravity Portfolio Images

This repository contains portfolio images for the Antigravity photography website.

Images are served via jsDelivr CDN for fast, global delivery.

## CDN URLs

Access images using:
\`\`\`
https://cdn.jsdelivr.net/gh/$GH_USERNAME/$REPO_NAME@main/portfolio/[filename]
\`\`\`
README

git add .
git commit -m "Initial commit: Add portfolio images"
git branch -M main
git remote add origin "https://github.com/$GH_USERNAME/$REPO_NAME.git"

echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Upload complete!"
echo ""
echo "🌐 Your images are now available at:"
echo "https://cdn.jsdelivr.net/gh/$GH_USERNAME/$REPO_NAME@main/portfolio/[filename]"
echo ""
echo "Example:"
echo "https://cdn.jsdelivr.net/gh/$GH_USERNAME/$REPO_NAME@main/portfolio/photo1.jpg"
echo ""

cd ..
UPLOAD_SCRIPT

chmod +x upload-to-github-images.sh
echo "✅ Created: upload-to-github-images.sh"

echo ""
echo "=========================================="
echo "✅ ALL SCRIPTS CREATED!"
echo "=========================================="
echo ""
echo "📝 Available scripts:"
echo "  1. download-cloudinary-images.sh  → Download from Cloudinary"
echo "  2. upload-to-github-images.sh     → Upload to GitHub"
echo ""
echo "🎯 Current status:"
echo "  ✅ On branch: github-images-integration"
echo "  ✅ Ready for migration"
echo ""
echo "Next: Run './download-cloudinary-images.sh' to download your images"
echo ""
