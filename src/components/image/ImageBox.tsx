'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Spinner } from '../ui/spinner';
import ImageLikeButton from './ImageLikeButton';
import { imagesType } from '@/context/imagesContext/ImageContext';
import ImageBookmarkButton from './ImageBookmarkButton';
import { HiOutlineDownload } from 'react-icons/hi';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import Link from 'next/link';
import RedirectToProfile from '../RedirectToProfile';
import ImageCommentButton from './ImageCommentButton';
import { useSlugifyUrl } from '@/hooks/useSlugifyUrl';
import { FiEdit } from 'react-icons/fi';
import { useCurrentUser } from '@/context/user-context/UserContext';
import Portal from '../Portal';
import ImageUpdateForm from './ImageUpdateForm';
import ImageEditButton from './ImageEditButton';

const ImageBox = ({
    image,
    varient,
    editMode = false,
}: {
    image: imagesType;
    varient?: string;
    editMode?: boolean;
}) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const { currentUser } = useCurrentUser();
    const imageCreatedAt = useTimeAgo(image.createdAt);

    return (
        <main className="w-full">
            {/* IMAGE BOX TOP */}
            <section className="overflow-hidden w-full aspect-[2/1.4] flex items-center justify-center rounded-md relative cursor-pointer group">
                <Link
                    href={`/${useSlugifyUrl(image.title, image.id)}`}
                    className="w-full h-full"
                >
                    <Image
                        src={image.imageUrl}
                        alt=""
                        width={500}
                        height={300}
                        onLoad={() => setImageLoaded(true)}
                        className={cn(
                            'w-full h-full ease-in-out duration-300',
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                </Link>

                {/* EDIT IMAGE */}
                {imageLoaded && currentUser.id === image.userId && editMode && (
                    <section className="absolute top-3 duration-300 right-3 opacity-0 group-hover:opacity-100">
                        <ImageEditButton image={image} />
                    </section>
                )}

                <div className="flex items-center gap-3">
                    {(imageCreatedAt.includes('min') ||
                        imageCreatedAt.includes('sec')) && (
                        <span className="absolute bg-red-500/70 shadow top-3 left-3 px-3 rounded font-space leading-3 h-7 flex items-center justify-center text-white">
                            NEW
                        </span>
                    )}
                </div>

                {/* LOADER */}
                {!imageLoaded && (
                    <span className="absolute w-full h-full flex items-center justify-center text-gray-500 font-poppins">
                        <Spinner className=" mr-1" /> Loading...
                    </span>
                )}
                {/* IMAGE BOTTOM */}
                {imageLoaded && (
                    <div className="absolute w-full bottom-0 flex justify-between p-5 py-8 bg-linear-to-b from-transparent to-black/50 text-white opacity-0 group-hover:opacity-100 duration-300">
                        {!varient && (
                            <h1 className="font-poppins font-medium text-2xl mb-2 drop-shadow-xl">
                                {image.title.length > 25
                                    ? image.title.slice(0, 25) + '...'
                                    : image.title}
                            </h1>
                        )}

                        {varient === 'small' && (
                            <h1 className="font-poppins font-medium text-lg mb-2 drop-shadow-xl">
                                {image.title.length > 20
                                    ? image.title.slice(0, 20) + '...'
                                    : image.title}
                            </h1>
                        )}
                        <div className="flex gap-2">
                            <ImageBookmarkButton image={image} />
                            <button className="h-10 w-10 bg-white shadow text-black flex items-center justify-center rounded-full cursor-pointer hover:text-gray-600">
                                <HiOutlineDownload size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </section>
            {/* BOTTOM */}
            <section className="py-5">
                <div className="flex items-center justify-between gap-3 text-lg text-white font-poppins">
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        <RedirectToProfile image={image}>
                            <div
                                className={cn(
                                    'w-8 h-8 bg-gray-300 rounded-full relative overflow-hidden cursor-pointer',
                                    varient === 'small' && 'w-7 h-7'
                                )}
                            >
                                <Image
                                    src={image.user.image!}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="w-full h-full"
                                />
                            </div>
                        </RedirectToProfile>
                        <h1
                            className={cn(
                                'text-gray-500 text-[15px] font-medium',
                                varient === 'small' && 'text-[13px]'
                            )}
                        >
                            {varient === 'small'
                                ? image.user.name.slice(0, 10)
                                : image.user.name}
                        </h1>
                        {/* TIMESTAMP */}
                        <div className="text-gray-400 capitalize text-[14px] font-poppins flex items-center gap-1">
                            <span>{imageCreatedAt}</span>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="flex items-center gap-5">
                        {/* REACTS */}
                        <ImageLikeButton
                            image={image}
                            text={varient === 'small' ? false : true}
                        />
                        {/* COMMENTS */}
                        <ImageCommentButton
                            image={image}
                            text={varient === 'small' ? false : true}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ImageBox;
