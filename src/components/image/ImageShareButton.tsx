'use client';
import { useState } from 'react';
import { IoMdShareAlt } from 'react-icons/io';
import Portal from '../Portal';
import ImageSharePopup from './ImageSharePopup';
import { imagesType } from '@/context/imagesContext/ImageContext';

const ImageShareButton = ({
    image,
    text = true,
}: {
    image: imagesType;
    text?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="text-[14px] text-zinc-400 select-none flex items-center gap-1 cursor-pointer"
            >
                {text && <h2 className="font-medium">Share</h2>}
                <IoMdShareAlt size={20} />
            </button>
            {/* PORTAL */}
            <Portal
                isOpen={isOpen}
                setIsOpen={() => setIsOpen((prev) => !prev)}
            >
                <ImageSharePopup />
            </Portal>
        </>
    );
};

export default ImageShareButton;
