'use client';
import { imagesType } from '@/context/imagesContext/ImageContext';
import { useState } from 'react';
import { BiMessageSquareDetail } from 'react-icons/bi';
import Portal from '../Portal';
import Sideber from '../Sideber';
import { cn } from '@/lib/utils';
import FeedbacksProvider from '@/context/feedbackContext/FeedbacksProvider';

const ImageCommentButton = ({
    image,
    className,
    textStyle,
    iconStyle,
}: {
    image: imagesType;
    className?: string;
    textStyle?: string;
    iconStyle?: string;
}) => {
    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
    return (
        <>
            <button
                onClick={() => setIsCommentOpen((prev) => !prev)}
                className={cn(
                    'text-[14px] text-zinc-400 select-none flex items-center gap-1',
                    className
                )}
            >
                <BiMessageSquareDetail
                    className={cn(
                        'cursor-pointer hover:text-zinc-600 duration-200 text-[20px]',
                        iconStyle
                    )}
                />
                <span className={cn('text-[15px]', textStyle)}>
                    {image._count.comments}
                </span>
            </button>
            {/* PORTAL AND COMMENT SIDEBER */}
            <Portal
                isOpen={isCommentOpen}
                setIsOpen={() => setIsCommentOpen(false)}
            >
                <FeedbacksProvider imageId={image.id}>
                    <Sideber
                        isOpen={isCommentOpen}
                        image={image}
                        setIsOpen={() => setIsCommentOpen(false)}
                    />
                </FeedbacksProvider>
            </Portal>
        </>
    );
};

export default ImageCommentButton;
