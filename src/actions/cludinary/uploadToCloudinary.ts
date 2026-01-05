import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadToCloudinary = (buffer: Buffer) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: 'Uplodly' }, (error, result) => {
                if (error) return reject(error);
                if (!result)
                    return reject(new Error('No result from cludinary!'));
                resolve(result);
            })
            .end(buffer);
    });
};
