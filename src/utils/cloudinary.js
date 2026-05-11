import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({
    path: './.env'
})

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


const uploadFilesOnCloudinary = async (localFile) => {
    try {
        if(!localFile) return null;

        const uploadResult =  await cloudinary.uploader.upload(localFile,
            {
                resource_type: "auto"
            }
        )
        fs.unlinkSync(localFile);
        console.log("File uploaded Successfully",
            uploadResult.url
        )
        return uploadResult
    } catch (error) {
     fs.unlinkSync(localFile);

    return null;
}
}

export {uploadFilesOnCloudinary}




