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

// FOR REPLACING OR OVERWRITING IMAGES
export const uploadToCloudinaryAndOverwrite = (
    buffer: Buffer,
    public_id?: string
) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const options: any = {
            folder: public_id ? undefined : 'Uplodly',
        };
        if (public_id) {
            options.public_id = public_id;
            options.overwrite = true;
            options.invalidate = true;
            delete options.folder;
        }
        cloudinary.uploader
            .upload_stream(options, (error, result) => {
                if (error) return reject(error);
                if (!result)
                    return reject(new Error('No result from cludinary!'));
                resolve(result);
            })
            .end(buffer);
    });
};
