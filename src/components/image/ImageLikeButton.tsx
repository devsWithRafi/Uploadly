'use client';

import { AddLikes } from '@/actions/action';
import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdHeart } from 'react-icons/io';

const ImageLikeButton = ({ image }: { image: imagesType }) => {
    const { currentUser } = useCurrentUser();
    const router = useRouter();
    // HANDLE LIKES PART
    const imageLikes = image._count.likes;
    const alreadyLiked: boolean = image.likes.some(
        (l) => l.userId === currentUser?.id && l.imageId === image.id
    );

    const [liked, setLiked] = useState(alreadyLiked);
    const [likes, setLikes] = useState(imageLikes);
    const { fetchImages } = useImages();

    const handleLikeClick = async (userId: string, imageId: string) => {
        setLiked((prev) => !prev);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
        try {
            await AddLikes({ userId, imageId });
            fetchImages();
        } catch {
            setLiked(alreadyLiked);
        }
    };
    return (
        <section className="flex items-center justify-center gap-1 text-gray-400">
            <IoMdHeart
                onClick={() =>
                    currentUser
                        ? handleLikeClick(currentUser.id, image.id)
                        : router.push('/signup')
                }
                size={22}
                className={cn(
                    'cursor-pointer hover:text-pink-400 transition',
                    currentUser && liked && 'text-pink-400'
                )}
            />
            <div className="text-[15px] select-none flex items-center gap-1">
                <span>{likes}</span>
                <span>Like</span>
            </div>
        </section>
    );
};

export default ImageLikeButton;
