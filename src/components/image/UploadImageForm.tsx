'use client';
import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useState,
} from 'react';
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

const UploadImageForm = () => {
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
                'w-150 h-[90vh] bg-white overflow-y-auto p-5 rounded',
                uploading && 'pointer-events-none select-none'
            )}
        >
            {/* IMAGE INPUT AND PREVIW BOX */}
            <div
                {...getRootProps()}
                className={cn(
                    'w-full aspect-[2/1.2] flex items-center justify-center relative',
                    image ? 'border-0' : 'border-2',
                    isDragActive
                        ? 'border-dashed border-blue-500'
                        : 'border-dashed border-gray-400'
                )}
            >
                {!image && (
                    <div className="absolute flex text-center items-center flex-col gap-1">
                        <LuImagePlus size={60} className="text-zinc-400" />
                        <h2 className="font-poppins capitalize font-semibold mt-5">
                            choose a file or drag & drop it here
                        </h2>
                        <h2 className="font-josefin text-zinc-400 text-[14px] uppercase font-medium">
                            jpg, jpeg, png, webp formats only
                        </h2>
                        <Button
                            variant={'outline'}
                            className="font-poppins text-gray-500 px-5 cursor-pointer mt-4"
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
                className="w-full flex flex-col gap-5 p-5 mt-2"
            >
                <div className="flex flex-col gap-2 font-poppins font-medium">
                    <label>Category*</label>
                    <Input
                        required
                        placeholder="Category"
                        className="p-5"
                        name="category"
                        onChange={handleChange}
                        value={inputData.category}
                    />
                </div>
                <div className="flex flex-col gap-2 font-poppins font-medium">
                    <label>Title*</label>
                    <Input
                        required
                        placeholder="Title"
                        className="p-5"
                        name="title"
                        onChange={handleChange}
                        value={inputData.title}
                    />
                </div>
                <div className="flex flex-col gap-2 font-poppins font-medium">
                    <label>Description*</label>
                    <Textarea
                        required
                        placeholder="Description"
                        className="p-5 resize-none min-h-30 max-h-50"
                        rows={4}
                        name="description"
                        onChange={handleChange}
                        value={inputData.description}
                    />
                </div>

                <Button
                    type="submit"
                    className={cn(
                        'p-6 uppercase cursor-pointer',
                        uploading && 'pointer-events-none bg-gray-600'
                    )}
                >
                    {uploading && <Spinner />}
                    {uploading ? 'Uploading...' : 'Submit'}
                </Button>
            </form>
        </section>
    );
};

export default UploadImageForm;
