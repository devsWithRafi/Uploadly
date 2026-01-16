'use client';
import { useState } from 'react';
import { IoMdShareAlt } from 'react-icons/io';
import Portal from '../Portal';
import ImageSharePopup from './ImageSharePopup';
import { imagesType } from '@/context/imagesContext/ImageContext';
import { cn } from '@/lib/utils';

const ImageShareButton = ({
    image,
    className,
}: {
    image?: imagesType;
    className?: string;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    'text-[14px] text-zinc-400 hover:text-zinc-600 duration-200 select-none flex items-center gap-1 cursor-pointer',
                    className
                )}
            >
                <IoMdShareAlt/>
            </button>
            {/* PORTAL */}
            <Portal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                <ImageSharePopup />
            </Portal>
        </>
    );
};

export default ImageShareButton;
