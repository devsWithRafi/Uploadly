'use client';

import { AddToBookMark } from '@/actions/action';
import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineBookmarkAdded } from 'react-icons/md';
import { MdOutlineBookmarkAdd } from 'react-icons/md';

const ImageBookmarkButton = ({ image }: { image: imagesType }) => {
    const { currentUser } = useCurrentUser();
    const router = useRouter();

    // HANDLE BOOKMARK PART
    const alreadyBookMarked: boolean = image.bookmark?.some(
        (bm) => bm.userId === currentUser?.id && bm.imageId === image.id
    );

    const [bookMarked, setBookMarked] = useState(alreadyBookMarked);
    const { fetchImages } = useImages();

    const handleBookmarkClick = async (userId: string, imageId: string) => {
        setBookMarked((prev) => !prev);
        try {
            await AddToBookMark({ userId, imageId }); // SERVER COMPONENT
            fetchImages();
        } catch {
            setBookMarked(alreadyBookMarked);
        }
    };
    return (
        <button
            onClick={() =>
                currentUser
                    ? handleBookmarkClick(currentUser.id, image.id)
                    : router.push('/signup')
            }
            className={cn(
                'h-10 w-10 bg-white shadow text-black flex items-center justify-center rounded-full cursor-pointer hover:text-gray-600 text-[20px] max-[500px]:text-[18px] max-[500px]:h-9 max-[500px]:w-9'
            )}
        >
            {currentUser && bookMarked ? (
                <MdOutlineBookmarkAdded className="text-pink-400" />
            ) : (
                <MdOutlineBookmarkAdd />
            )}
        </button>
    );
};

export default ImageBookmarkButton;
