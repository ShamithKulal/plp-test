#!/bin/bash

# Complete Migration Guide: Cloudinary → GitHub + jsDelivr
# Step-by-step interactive guide

cat << 'GUIDE'
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║        CLOUDINARY → GITHUB + JSDELIVR MIGRATION GUIDE           ║
║                                                                  ║
║              Complete Step-by-Step Instructions                 ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

📋 OVERVIEW
═══════════════════════════════════════════════════════════════════

This migration will:
  ✓ Keep your code repository lightweight
  ✓ Create a separate repository for images
  ✓ Use GitHub + jsDelivr CDN (unlimited, free)
  ✓ Eliminate Cloudinary rate limits
  ✓ Improve performance

Total Time: ~30 minutes

═══════════════════════════════════════════════════════════════════
STEP 1: PREPARE YOUR GIT REPOSITORY
═══════════════════════════════════════════════════════════════════

📍 What you'll do:
  • Push current work on backoffice-portfolio branch
  • Create new branch: github-images-integration
  • Set up directory structure

🚀 Run this command:
  ./migrate-to-github-images.sh

This script will:
  ✓ Check your current branch
  ✓ Commit any pending changes
  ✓ Push backoffice-portfolio
  ✓ Create github-images-integration branch
  ✓ Create helper scripts

═══════════════════════════════════════════════════════════════════
STEP 2: DOWNLOAD IMAGES FROM CLOUDINARY (OPTIONAL)
═══════════════════════════════════════════════════════════════════

📍 If you want to backup your Cloudinary images:

🚀 Run this command:
  ./download-cloudinary-images.sh

You'll need:
  • Your Cloudinary Cloud Name
  • Your Cloudinary API Key
  • Your Cloudinary API Secret

Images will be saved to: ./cloudinary-backup/

⚠️  NOTE: If your images are already on your local machine, skip this step!

═══════════════════════════════════════════════════════════════════
STEP 3: CREATE GITHUB REPOSITORY FOR IMAGES
═══════════════════════════════════════════════════════════════════

📍 Create a new repository on GitHub:

1. Go to: https://github.com/new

2. Settings:
   Repository name: plp-images
   Visibility: PUBLIC ⚠️ (required for jsDelivr CDN)
   Description: Portfolio images for Antigravity photography website
   
   ❌ DO NOT check "Add a README file"
   ❌ DO NOT add .gitignore
   ❌ DO NOT add license

3. Click "Create repository"

4. ⚠️ KEEP THE PAGE OPEN - you'll need the commands shown

═══════════════════════════════════════════════════════════════════
STEP 4: UPLOAD IMAGES TO GITHUB
═══════════════════════════════════════════════════════════════════

📍 Option A: Use the upload script (automated)

🚀 Run this command:
  ./upload-to-github-images.sh

This will:
  ✓ Initialize git in cloudinary-backup folder
  ✓ Organize images into portfolio/ folder
  ✓ Create README
  ✓ Push to GitHub

═══════════════════════════════════════════════════════════════════

📍 Option B: Manual upload (if you prefer)

1. Navigate to cloudinary-backup folder:
   cd cloudinary-backup

2. Initialize git:
   git init
   mkdir portfolio
   mv *.jpg *.jpeg *.png portfolio/
   git add .
   git commit -m "Initial commit: Add portfolio images"

3. Connect to GitHub:
   git remote add origin https://github.com/YOUR_USERNAME/plp-images.git
   git branch -M main
   git push -u origin main

4. Go back to your project:
   cd ..

═══════════════════════════════════════════════════════════════════
STEP 5: UPDATE YOUR CODE TO USE GITHUB URLS
═══════════════════════════════════════════════════════════════════

📍 Automatically replace Cloudinary URLs with GitHub + jsDelivr

🚀 Run this command:
  ./update-code-to-github.sh

This script will:
  ✓ Find all Cloudinary references in your code
  ✓ Replace with jsDelivr CDN URLs
  ✓ Create backups of all modified files
  ✓ Generate a migration summary

⚠️  IMPORTANT: 
  • Review all changes manually before committing
  • Test your application locally
  • Check MIGRATION_SUMMARY.md for details

═══════════════════════════════════════════════════════════════════
STEP 6: TEST YOUR APPLICATION
═══════════════════════════════════════════════════════════════════

📍 Before committing, test thoroughly:

1. Start your development server:
   npm run dev  (or your start command)

2. Check:
   ✓ Portfolio images load correctly
   ✓ All pages render properly
   ✓ No console errors
   ✓ Images load fast (CDN is working)
   ✓ Mobile view works

3. Test different scenarios:
   ✓ Reload page multiple times (should be instant - cached)
   ✓ Check network tab (images from jsdelivr.net)
   ✓ Try on slow connection (use Chrome DevTools throttling)

═══════════════════════════════════════════════════════════════════
STEP 7: COMMIT AND PUSH YOUR CHANGES
═══════════════════════════════════════════════════════════════════

📍 If everything works:

git add .
git commit -m "feat: Migrate from Cloudinary to GitHub + jsDelivr CDN

- Replace Cloudinary URLs with jsDelivr CDN
- Create separate plp-images repository
- Remove rate limit dependency
- Improve performance with global CDN
"

git push origin github-images-integration

═══════════════════════════════════════════════════════════════════
STEP 8: CREATE PULL REQUEST AND MERGE
═══════════════════════════════════════════════════════════════════

📍 On GitHub:

1. Go to your repository
2. Click "Pull requests" → "New pull request"
3. Set:
   base: backoffice-portfolio
   compare: github-images-integration
4. Title: "Migrate from Cloudinary to GitHub + jsDelivr"
5. Description: Copy from MIGRATION_SUMMARY.md
6. Create pull request
7. Review changes one more time
8. Merge when ready

═══════════════════════════════════════════════════════════════════
STEP 9: CLEANUP (OPTIONAL)
═══════════════════════════════════════════════════════════════════

After successful merge:

1. Remove Cloudinary dependencies:
   npm uninstall cloudinary  (if installed)

2. Delete backup files:
   rm -rf backup-*
   rm *.original

3. Remove downloaded images:
   rm -rf cloudinary-backup

4. Update your .env file (remove Cloudinary credentials)

═══════════════════════════════════════════════════════════════════
📊 FINAL URL STRUCTURE
═══════════════════════════════════════════════════════════════════

Old (Cloudinary):
  https://res.cloudinary.com/yourcloud/image/upload/v123/portfolio/photo.jpg

New (GitHub + jsDelivr):
  https://cdn.jsdelivr.net/gh/USERNAME/plp-images@main/portfolio/photo.jpg

Benefits:
  ✅ No rate limits
  ✅ Unlimited bandwidth
  ✅ Global CDN
  ✅ 100% free forever
  ✅ Lightning fast
  ✅ Version control for images

═══════════════════════════════════════════════════════════════════
🆘 TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════

Problem: Images not loading from jsDelivr
Solution: 
  • Check if plp-images repo is PUBLIC
  • Wait 5 minutes (jsDelivr needs to index new repo)
  • Verify URL format is exactly correct
  • Check file extensions match (case-sensitive)

Problem: Script permission denied
Solution:
  chmod +x migrate-to-github-images.sh
  chmod +x download-cloudinary-images.sh
  chmod +x upload-to-github-images.sh
  chmod +x update-code-to-github.sh

Problem: Want to rollback
Solution:
  git checkout backoffice-portfolio
  git branch -D github-images-integration

═══════════════════════════════════════════════════════════════════
✅ CHECKLIST
═══════════════════════════════════════════════════════════════════

Before you start:
  [ ] You're in your antigravity project directory
  [ ] You're on backoffice-portfolio branch
  [ ] All current work is committed

Step 1: Git Setup
  [ ] Ran migrate-to-github-images.sh
  [ ] Now on github-images-integration branch

Step 2: Download (optional)
  [ ] Downloaded images from Cloudinary
  [ ] Or have images locally ready

Step 3: GitHub Repo
  [ ] Created plp-images repository
  [ ] Repository is PUBLIC
  [ ] Did NOT initialize with README

Step 4: Upload
  [ ] Uploaded images to GitHub
  [ ] Images are in portfolio/ folder
  [ ] Can see them on github.com

Step 5: Update Code
  [ ] Ran update-code-to-github.sh
  [ ] Reviewed MIGRATION_SUMMARY.md
  [ ] Checked modified files

Step 6: Testing
  [ ] Local server runs
  [ ] Images load correctly
  [ ] No console errors
  [ ] Fast loading confirmed

Step 7: Commit
  [ ] Committed changes
  [ ] Pushed to github-images-integration

Step 8: Merge
  [ ] Created pull request
  [ ] Reviewed changes
  [ ] Merged to backoffice-portfolio

Step 9: Cleanup
  [ ] Removed old dependencies
  [ ] Cleaned up backups

═══════════════════════════════════════════════════════════════════

Ready to start? Run: ./migrate-to-github-images.sh

GUIDE

echo ""
read -p "Press Enter to continue..."
