'use client';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { Spinner } from '../ui/spinner';
import toast from 'react-hot-toast';
import { useImages } from '@/context/imagesContext/ImageContext';
import { Textarea } from '../ui/textarea';
import { LuImagePlus } from 'react-icons/lu';

const UploadImageForm = ({ setIsOpen }: { setIsOpen?: () => void }) => {
    const InitialInputData = {
        title: '',
        description: '',
        category: '',
    };
    const [uploading, setUploading] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [inputData, setInputData] = useState(InitialInputData);
    const { currentUser } = useCurrentUser();
    const { fetchImages } = useImages();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (!acceptedFiles[0].type.startsWith('image/')) {
            toast.error('Only image files allowed');
            return;
        }

        if (acceptedFiles && acceptedFiles[0]) {
            const images = URL.createObjectURL(acceptedFiles[0]);
            setImage(images);
            setFile(acceptedFiles[0]);
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));

        console.log(inputData);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file && currentUser) {
            try {
                setUploading(true);

                const formData = new FormData();
                formData.append('title', inputData.title);
                formData.append('description', inputData.description);
                formData.append('image', file);
                formData.append('userId', currentUser.id);
                formData.append('category', inputData.category.trim());

                const res = await axios.post('/api/create-image', formData);
                const data = res.data;

                setInputData(InitialInputData);
                setImage('');
                fetchImages();

                if (data.success === true)
                    toast.success('Image upload successful!');
                else toast.error(data.error);
            } catch (error) {
                console.log(error);
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <section
            className={cn(
                'md:w-150 w-[95vw] md:h-[90vh] max-h-[90vh] bg-white overflow-y-auto p-5 rounded',
                uploading && 'pointer-events-none select-none'
            )}
        >
            {/* IMAGE INPUT AND PREVIW BOX */}
            <div
                {...getRootProps()}
                className={cn(
                    'w-full aspect-[2/1.2] flex items-center justify-center relative',
                    uploading && 'opacity-[0.5]',
                    image ? 'border-0' : 'sm:border-2 border',
                    isDragActive
                        ? 'border-dashed border-blue-500'
                        : 'border-dashed border-gray-400'
                )}
            >
                {!image && (
                    <div className="absolute flex text-center items-center flex-col gap-1">
                        <LuImagePlus className="text-zinc-400 sm:text-[60px] text-[40px]" />
                        <h2 className="font-poppins capitalize font-semibold mt-5 sm:text-[17px] text-[14px]">
                            choose a file or drag & drop it here
                        </h2>
                        <h2 className="font-josefin text-zinc-400 sm:text-[14px] text-[12px] uppercase font-medium">
                            jpg, jpeg, png, webp formats only
                        </h2>
                        <Button
                            variant={'outline'}
                            className="font-poppins text-gray-500  sm:text-[15px] text-[13px] px-5 cursor-pointer mt-4"
                        >
                            Browse File
                        </Button>
                    </div>
                )}
                {/* IMAGE INPUT */}
                <input
                    {...getInputProps()}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    required
                    className="hidden"
                />
                {/* IMAGE PREVIW */}
                {image && (
                    <Image
                        src={image}
                        alt=""
                        width={500}
                        height={500}
                        className="w-full h-full"
                    />
                )}
            </div>
            {/* FORM HERE */}
            <form
                onSubmit={handleSubmit}
                className={cn(
                    'w-full flex flex-col gap-5 sm:p-5 py-5 mt-2',
                    uploading && 'opacity-[0.5]'
                )}
            >
                <div className="flex flex-col gap-2 font-poppins font-medium">
                    <label className="sm:text-[16px] text-[15px]">
                        Category*
                    </label>
                    <Input
                        required
                        placeholder="Category"
                        className="p-5 sm:text-[15px] text-[13px]"
                        name="category"
                        onChange={handleChange}
                        value={inputData.category}
                    />
                </div>
                <div className="flex flex-col gap-2 font-poppins font-medium">
                    <label className="sm:text-[16px] text-[15px]">Title*</label>
                    <Input
                        required
                        placeholder="Title"
                        className="p-5 sm:text-[15px] text-[13px]"
                        name="title"
                        onChange={handleChange}
                        value={inputData.title}
                    />
                </div>
                <div className="flex flex-col gap-2 font-poppins font-medium">
                    <label className="sm:text-[16px] text-[15px]">
                        Description*
                    </label>
                    <Textarea
                        required
                        placeholder="Description"
                        className="p-5 resize-none min-h-30 max-h-50 sm:text-[15px] text-[13px]"
                        rows={4}
                        name="description"
                        onChange={handleChange}
                        value={inputData.description}
                    />
                </div>

                <Button
                    type="submit"
                    className={cn(
                        'sm:p-6 p-5 uppercase cursor-pointer mt-7',
                        uploading && 'pointer-events-none bg-gray-600'
                    )}
                >
                    {uploading && <Spinner />}
                    {uploading ? 'Uploading...' : 'Submit'}
                </Button>
                <Button
                    onClick={setIsOpen}
                    type="button"
                    variant={'outline'}
                    className="sm:p-6 p-4 uppercase cursor-pointer"
                >
                    Cancel
                </Button>
            </form>
        </section>
    );
};

export default UploadImageForm;
