import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import Portal from '../Portal';
import ImageUpdateForm from './ImageUpdateForm';
import { imagesType } from '@/context/imagesContext/ImageContext';

const ImageEditButton = ({ image }: { image: imagesType }) => {
    const [editPopupOpen, setEditPopupOpen] = useState<boolean>(false);

    return (
        <>
            <button
                onClick={() => setEditPopupOpen((prev) => !prev)}
                className="h-10 w-10 bg-white shadow text-black flex items-center justify-center rounded-full cursor-pointer hover:text-gray-600 text-[17px] max-[500px]:text-[15px] max-[500px]:h-9 max-[500px]:w-9"
            >
                <FiEdit />
            </button>
            {/* PORTAL */}
            <Portal
                isOpen={editPopupOpen}
                setIsOpen={() => setEditPopupOpen(false)}
            >
                <ImageUpdateForm
                    imageId={image.id}
                    userId={image.userId}
                    onSuccess={() => setEditPopupOpen(false)}
                    setIsOpen={() => setEditPopupOpen(false)}
                />
            </Portal>
        </>
    );
};

export default ImageEditButton;
