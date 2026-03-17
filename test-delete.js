const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'drc7k7lei',
    api_key: '629765658655481',
    api_secret: 'wdBZAmZvnOyBRVddIBApWTIWIlY',
    secure: true,
});

async function run() {
    try {
        console.log("Fetching images in folder...");
        const fetchRes = await cloudinary.api.resources({ type: "upload", prefix: `portfolio/baby-shower/neha-jitin/` });
        const ids = fetchRes.resources.map(r => r.public_id);
        console.log("Found images:", ids);
        
        if (ids.length > 0) {
            console.log("Attempting to delete:", ids[0]);
            const delRes = await cloudinary.uploader.destroy(ids[0], { invalidate: true });
            console.log("Delete result:", delRes);
        } else {
            console.log("No images found to delete.");
        }
    } catch(e) {
        console.error("Error:", e);
    }
}
run();
