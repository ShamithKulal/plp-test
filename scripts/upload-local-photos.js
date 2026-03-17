const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'drc7k7lei',
  api_key: '629765658655481',
  api_secret: 'wdBZAmZvnOyBRVddIBApWTIWIlY',
  secure: true
});

const baseDir = path.join(__dirname, '..', 'public');
const categories = ['haldi-mehandi', 'house-warming', 'prewedding'];

async function uploadPhotos() {
  console.log('Starting bulk upload to Cloudinary...');

  for (const category of categories) {
    const categoryPath = path.join(baseDir, category);
    
    if (!fs.existsSync(categoryPath)) {
      console.log(`Category folder not found: ${categoryPath}`);
      continue;
    }

    const clients = fs.readdirSync(categoryPath).filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());
    
    for (const client of clients) {
      const clientPath = path.join(categoryPath, client);
      const files = fs.readdirSync(clientPath).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
      });

      console.log(`\nFound ${files.length} images for ${category}/${client}`);
      
      let uploadCount = 0;
      for (const file of files) {
        const filePath = path.join(clientPath, file);
        const cloudinaryFolder = `portfolio/${category}/${client}`;
        
        try {
          process.stdout.write(`Uploading ${file} to ${cloudinaryFolder}... `);
          await cloudinary.uploader.upload(filePath, {
            folder: cloudinaryFolder,
            use_filename: true,
            unique_filename: false,
            overwrite: true
          });
          process.stdout.write(`DONE\n`);
          uploadCount++;
        } catch (error) {
          process.stdout.write(`FAILED\n`);
          console.error(error);
        }
      }
      console.log(`Successfully uploaded ${uploadCount}/${files.length} images for ${client}.`);
    }
  }
  
  console.log('\nBulk upload complete!');
}

uploadPhotos();
