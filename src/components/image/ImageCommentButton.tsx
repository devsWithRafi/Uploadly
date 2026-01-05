'use client';
import { imagesType } from '@/context/imagesContext/ImageContext';
import { useState } from 'react';
import { BiMessageSquareDetail } from 'react-icons/bi';
import Portal from '../Portal';
import Sideber from '../Sideber';
import { cn } from '@/lib/utils';

const ImageCommentButton = ({
    image,
    text = true,
}: {
    image: imagesType;
    text?: boolean;
}) => {
    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
    return (
        <>
            <button
                onClick={() => setIsCommentOpen((prev) => !prev)}
                className="text-[14px] text-zinc-400 select-none flex items-center gap-1"
            >
                <BiMessageSquareDetail
                    size={17}
                    className="cursor-pointer hover:text-zinc-600 duration-200"
                />
                <span>{image._count.comments}</span>
                <span className={cn('', !text && 'hidden')}>Comments</span>
            </button>
            {/* PORTAL AND COMMENT SIDEBER */}
            <Portal
                isOpen={isCommentOpen}
                setIsOpen={() => setIsCommentOpen((prev) => !prev)}
            >
                <Sideber isOpen={isCommentOpen} image={image} />
            </Portal>
        </>
    );
};

export default ImageCommentButton;
