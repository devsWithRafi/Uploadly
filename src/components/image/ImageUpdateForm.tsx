'use client';

import { useImages } from '@/context/imagesContext/ImageContext';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import axios from 'axios';
import { Spinner } from '../ui/spinner';
import { cn } from '@/lib/utils';

interface ImageUpdateProps {
    imageId: string;
    userId: string;
    onSuccess: () => void;
    setIsOpen?: () => void;
}

interface inputDataType {
    title: string;
    category: string;
    description: string;
}

const ImageUpdateForm = ({
    imageId,
    userId,
    onSuccess,
    setIsOpen,
}: ImageUpdateProps) => {
    const { images, fetchImages } = useImages();
    const imageFound = images?.find((item) => item.id === imageId);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputData, setInputData] = useState<inputDataType>({
        category: '',
        title: '',
        description: '',
    });

    useEffect(() => {
        if (!imageFound) return;
        const addPreviusData = () => {
            setInputData({
                ...inputData,
                category: imageFound.category || '',
                title: imageFound.title || '',
                description: imageFound.description || '',
            });
        };
        addPreviusData();
    }, [imageFound]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put('/api/edit-image', {
                userId,
                imageId,
                title: inputData.title,
                description: inputData.description,
                category: inputData.category,
            });
            const data = await res.data;
            if (data.success === true) {
                fetchImages();
                onSuccess();
                toast.success('Image Update Successful!');
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="w-150 max-[650px]:w-[95vw] max-h-[95vh] overflow-y-auto bg-white rounded-xl p-8 max-[500px]:p-5">
            <form
                onSubmit={handleSubmit}
                className={cn(
                    'flex flex-col gap-5 w-full',
                    loading && 'pointer-events-none select-none opacity-[0.7]'
                )}
            >
                {imageFound && (
                    <Image
                        src={imageFound.imageUrl}
                        alt=""
                        width={1000}
                        height={1000}
                        className="w-full aspect-[2/1.3]"
                    />
                )}
                <Input
                    placeholder="Title"
                    name="title"
                    value={inputData.title}
                    onChange={handleChange}
                    className="py-6 max-[500px]:py-4.5 text-[16px] max-[500px]:text-[14px] max-[500px]:rounded-sm"
                />
                <Input
                    placeholder="Category"
                    name="category"
                    value={inputData.category}
                    onChange={handleChange}
                    className="py-6 max-[500px]:py-4.5 text-[16px] max-[500px]:text-[14px] max-[500px]:rounded-sm"
                />
                <Textarea
                    placeholder="Description"
                    rows={5}
                    name="description"
                    value={inputData.description}
                    onChange={handleChange}
                    className="min-h-30 max-h-50 resize-none w-full text-left text-[16px] max-[500px]:text-[14px]"
                />

                <Button
                    type="submit"
                    className="w-full p-5.5 font-poppins text-[15px]"
                >
                    {loading ? (
                        <span className="flex items-center gap-1">
                            <Spinner /> Updating...
                        </span>
                    ) : (
                        <span>Update</span>
                    )}
                </Button>
                <Button type='button'
                    onClick={setIsOpen}
                    variant={'outline'}
                    className="p-5 font-poppins w-full text-[15px] -mt-2"
                >
                    Cancel
                </Button>
            </form>
        </section>
    );
};

export default ImageUpdateForm;
