
const cloudinary = require('../utils/cloudinary.config')


const  uploadImage = async(file)=>{
 try {

    if (!file ) {
    throw new Error("File buffer is missing");
    }
    return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "posts",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    uploadStream.end(file);
  });
    

 } catch (error) {
    console.log(error)
     throw new Error("Something went wrong")
     
 }
}

module.exports = uploadImage;