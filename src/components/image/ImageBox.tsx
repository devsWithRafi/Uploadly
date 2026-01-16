'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Spinner } from '../ui/spinner';
import ImageLikeButton from './ImageLikeButton';
import { imagesType } from '@/context/imagesContext/ImageContext';
import ImageBookmarkButton from './ImageBookmarkButton';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import Link from 'next/link';
import RedirectToProfile from '../RedirectToProfile';
import ImageCommentButton from './ImageCommentButton';
import { useSlugifyUrl } from '@/hooks/useSlugifyUrl';
import ImageEditButton from './ImageEditButton';
import { useCurrentUser } from '@/context/user-context/UserContext';
import ImageShareButton from './ImageShareButton';
import { BiDotsVertical } from 'react-icons/bi';
import ImageDeleteButton from './ImageDeleteButton';
import ImageDownloadBtn from './ImageDownloadBtn';
import { RxCross2 } from 'react-icons/rx';

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
    const [imageEditClicked, setImageEditClicked] = useState<boolean>(false);

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
                {imageLoaded &&
                    currentUser?.id === image.userId &&
                    editMode && (
                        <section className="absolute top-3 group/inner duration-300 right-3 opacity-100 group-hover:opacity-100 flex flex-col rounded-full">
                            <div
                                onClick={() =>
                                    setImageEditClicked((prev) => !prev)
                                }
                                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center group-hover/inner:text-zinc-600 text-[20px] max-[500px]:text-[18px] max-[500px]:h-9 max-[500px]:w-9"
                            >
                                {!imageEditClicked ? (
                                    <BiDotsVertical />
                                ) : (
                                    <RxCross2 />
                                )}
                            </div>
                            <div
                                className={cn(
                                    'group-hover/inner:max-h-30 max-h-0 overflow-hidden duration-300 group-hover/inner:mt-1 opacity-0 group-hover/inner:opacity-100',
                                    imageEditClicked &&
                                        'max-h-30 mt-1 opacity-100'
                                )}
                            >
                                <ImageEditButton image={image} />
                            </div>
                            <div
                                className={cn(
                                    'group-hover/inner:max-h-30 max-h-0 overflow-hidden duration-300 group-hover/inner:mt-1 opacity-0 group-hover/inner:opacity-100',
                                    imageEditClicked &&
                                        'max-h-30 mt-1 opacity-100'
                                )}
                            >
                                <ImageDeleteButton image={image} />
                            </div>
                        </section>
                    )}
                {/* NEW IMAGE BADGE */}
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
                    <div className="absolute w-full bottom-0 flex gap-2 justify-between p-5 h-22 bg-linear-to-b from-transparent to-black/50 text-white opacity-0 group-hover:opacity-100 duration-300 max-[500px]:opacity-100 max-[500px]:h-20">
                        <h1 className="font-poppins font-medium text-2xl max-[500px]:text-xl mb-2 drop-shadow-xl w-full overflow-hidden text-ellipsis text-nowrap">
                            {image.title}
                        </h1>

                        <div className="flex gap-2">
                            {/* BOOKMARK BUTTON */}
                            <ImageBookmarkButton image={image} />
                            {/* DOWNLOAD BUTTON */}
                            <ImageDownloadBtn image={image} />
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
                            {image.user.name.slice(0, 10)}
                        </h1>
                        {/* TIMESTAMP */}
                        <div className="text-gray-400 capitalize text-[14px] font-poppins flex items-center gap-1">
                            <span>{imageCreatedAt}</span>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="flex items-center sm:gap-5 gap-3">
                        {/* REACTS */}
                        <ImageLikeButton
                            image={image}
                            iconStyle="sm:text-[22px] text-[20px]"
                        />
                        {/* COMMENTS */}
                        <ImageCommentButton
                            image={image}
                            iconStyle="sm:text-[20px] text-[18px]"
                        />
                        {/* SHARE */}
                        <ImageShareButton
                            image={image}
                            className="text-[20px]"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ImageBox;
