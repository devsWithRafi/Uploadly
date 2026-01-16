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
                className="h-10 w-10 bg-white shadow text-black flex items-center justify-center rounded-full cursor-pointer hover:text-gray-600"
            >
                <FiEdit size={17} />
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
