'use client';
import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import Portal from '../Portal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCurrentUser } from '@/context/user-context/UserContext';
import DeletePopup from '../ui/DeletePopup';

const ImageDeleteButton = ({ image }: { image: imagesType }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { currentUser } = useCurrentUser();
    const { fetchImages } = useImages();

    const handleDelete = async () => {
        const payLoad = {
            imageId: image.id,
            userId: currentUser?.id,
        };
        try {
            setLoading(true);
            const res = await axios.delete('/api/delete-image', {
                data: payLoad,
            });
            if (res.status === 200) {
                toast.success('Image deleted successful!');
                fetchImages();
            } else toast.error('Image deleted failed!');
        } catch (error) {
            toast.error('Image delete failed!');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="h-10 w-10 bg-white shadow text-black flex items-center justify-center rounded-full cursor-pointer hover:text-gray-600 text-[20px] max-[500px]:text-[18px] max-[500px]:h-9 max-[500px]:w-9"
            >
                <AiOutlineDelete />
            </button>

            <Portal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                <DeletePopup
                    deleteItemName="Image"
                    loading={loading}
                    onCancel={() => setIsOpen(false)}
                    onDelete={handleDelete}
                />
            </Portal>
        </>
    );
};

export default ImageDeleteButton;
