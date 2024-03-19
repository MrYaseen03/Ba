// First of all install npm i cloudinary
// Then multer to upload imgage, files, Pdfs and many more
// npm i multer

import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // FS means File System. It is available in node we don't install it
import { url } from "inspector";


// Configuration of cloudinary from .env file
// This code will found on cloudinar
cloudinary.config({
    cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
    api_key: 'process.env.CLOUDINARY_API_KEY', 
    api_secret: 'process.env.CLOUDINARY_API_SECRET'
});


const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        //Upload the file on cloudinary
        const  response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // File has been Uplaoded successfully
        console.log("File is uplaoded on cloudinary successfully",response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)// remove the  locally saved temporary file as the upload operation got  failed
        return null;
    }
}

export {uploadOnCloudinary}