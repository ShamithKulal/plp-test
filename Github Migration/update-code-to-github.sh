#!/bin/bash

# Code Migration Script: Update Cloudinary URLs to GitHub + jsDelivr
# This script finds and replaces Cloudinary URLs in your codebase

echo "🔄 Code Migration: Cloudinary → GitHub + jsDelivr"
echo "=================================================="
echo ""

read -p "Enter your GitHub username: " GH_USERNAME
REPO_NAME="plp-images"
JSDELIVR_BASE="https://cdn.jsdelivr.net/gh/$GH_USERNAME/$REPO_NAME@main/portfolio"

echo ""
echo "📋 Configuration:"
echo "  GitHub User: $GH_USERNAME"
echo "  Repository: $REPO_NAME"
echo "  CDN Base URL: $JSDELIVR_BASE"
echo ""
read -p "Is this correct? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted. Please run again with correct details."
    exit 1
fi

# Backup current code
echo "💾 Creating backup..."
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r . "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ Backup created: $BACKUP_DIR"

echo ""
echo "🔍 Scanning for Cloudinary references..."
echo ""

# Find files containing Cloudinary URLs
FILES_WITH_CLOUDINARY=$(grep -r "cloudinary" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.json" -l . 2>/dev/null | grep -v node_modules | grep -v "$BACKUP_DIR")

if [ -z "$FILES_WITH_CLOUDINARY" ]; then
    echo "❌ No Cloudinary references found in code."
    echo "Please check if you're in the correct directory."
    exit 1
fi

echo "📄 Files containing Cloudinary references:"
echo "$FILES_WITH_CLOUDINARY"
echo ""

# Show example transformations
echo "🔧 Example transformations:"
echo ""
echo "Before:"
echo "  'https://res.cloudinary.com/yourcloud/image/upload/v123/portfolio/photo.jpg'"
echo ""
echo "After:"
echo "  '$JSDELIVR_BASE/photo.jpg'"
echo ""
read -p "Proceed with replacement? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Aborted. No changes made."
    exit 1
fi

# Function to update a file
update_file() {
    local FILE=$1
    echo "  ✏️  Updating: $FILE"
    
    # Create a temporary file for manual review
    cp "$FILE" "${FILE}.original"
    
    # Replace Cloudinary URLs - this is a template, you'll need to customize based on actual URLs
    sed -i.bak "s|https://res\.cloudinary\.com/[^/]*/image/upload/[^/]*/portfolio/|${JSDELIVR_BASE}/|g" "$FILE"
    sed -i.bak "s|cloudinary\.com/[^/]*/image/upload/[^/]*/|${JSDELIVR_BASE}/|g" "$FILE"
    
    rm "${FILE}.bak" 2>/dev/null || true
}

# Process each file
echo ""
echo "🔄 Processing files..."
while IFS= read -r FILE; do
    update_file "$FILE"
done <<< "$FILES_WITH_CLOUDINARY"

echo ""
echo "✅ Code update complete!"
echo ""
echo "=========================================="
echo "📋 WHAT WAS CHANGED:"
echo "=========================================="
echo ""
echo "✅ Replaced Cloudinary URLs with jsDelivr CDN URLs"
echo "✅ Original files backed up with .original extension"
echo "✅ Full backup in: $BACKUP_DIR"
echo ""
echo "=========================================="
echo "⚠️  IMPORTANT: MANUAL REVIEW REQUIRED"
echo "=========================================="
echo ""
echo "Please review the changes manually:"
echo ""
echo "1. Check each modified file:"
for FILE in $FILES_WITH_CLOUDINARY; do
    echo "   - $FILE"
done
echo ""
echo "2. Compare with originals if needed:"
echo "   diff file.js file.js.original"
echo ""
echo "3. Test your application locally"
echo ""
echo "4. If everything works:"
echo "   git add ."
echo "   git commit -m 'Migrate from Cloudinary to GitHub + jsDelivr'"
echo "   git push origin github-images-integration"
echo ""
echo "5. If something broke:"
echo "   git checkout ."
echo "   # Restore from backup: $BACKUP_DIR"
echo ""

# Create a summary file
cat > MIGRATION_SUMMARY.md << SUMMARY
# Migration Summary: Cloudinary → GitHub + jsDelivr

**Date:** $(date)
**Branch:** github-images-integration

## Configuration

- **GitHub Username:** $GH_USERNAME
- **Repository:** $REPO_NAME
- **CDN Base URL:** $JSDELIVR_BASE

## Files Modified

$(echo "$FILES_WITH_CLOUDINARY" | sed 's/^/- /')

## URL Pattern

**Old Pattern:**
\`\`\`
https://res.cloudinary.com/[cloud-name]/image/upload/v[version]/portfolio/[filename]
\`\`\`

**New Pattern:**
\`\`\`
$JSDELIVR_BASE/[filename]
\`\`\`

## Benefits

✅ **No rate limits** on image fetching
✅ **Global CDN** (jsDelivr)
✅ **100% free** forever
✅ **Faster** than Cloudinary free tier
✅ **Separate** image repository (lightweight code)

## Testing Checklist

- [ ] Portfolio images load correctly
- [ ] All image URLs are valid
- [ ] No Cloudinary references remain
- [ ] Performance is acceptable
- [ ] Mobile view works
- [ ] Admin dashboard works (if applicable)

## Rollback Plan

If issues occur:
\`\`\`bash
git checkout backoffice-portfolio
# Or restore from: $BACKUP_DIR
\`\`\`

## Next Steps

1. Test locally
2. Commit changes
3. Create Pull Request: github-images-integration → backoffice-portfolio
4. Merge after testing
5. Remove Cloudinary dependency (optional)

SUMMARY

echo "📄 Migration summary saved to: MIGRATION_SUMMARY.md"
echo ""
