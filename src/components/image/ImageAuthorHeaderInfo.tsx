import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import Image from 'next/image';
import React from 'react';
import RedirectToProfile from '../RedirectToProfile';
import ImageBox from './ImageBox';

const ImageAuthorHeaderInfo = ({ image }: { image: imagesType }) => {
    const { images } = useImages();
    const authorsImageCollections = images?.filter(
        (item) => item.userId === image?.userId && item.id !== image.id
    );
    return (
        <section className="mt-30">
            {/* AVATER */}
            <div className="w-full flex items-center justify-between gap-8">
                <span className="w-full h-0.5 bg-gray-200" />
                <RedirectToProfile image={image}>
                    <div className="flex cursor-pointer items-center justify-center min-w-20 min-h-20 aspect-square rounded-full overflow-hidden">
                        {image.user.image && (
                            <Image
                                src={image.user.image}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full h-full"
                            />
                        )}
                    </div>
                </RedirectToProfile>
                <span className="w-full h-0.5 bg-gray-200" />
            </div>
            <div className="flex flex-col text-center items-center justify-center mt-5">
                <RedirectToProfile image={image}>
                    <h2 className="font-space cursor-pointer hover:underline capitalize font-semibold text-2xl">
                        {image.user.name}
                    </h2>
                </RedirectToProfile>
                <p className="text-zinc-500 font-space">
                    {image.user.bio ? image.user.bio : 'No bio added'}
                </p>
            </div>
            {/* MORE BY AUTHOR */}
            {authorsImageCollections && authorsImageCollections.length > 0 && (
                <div className="mt-10">
                    <div className="flex items-center justify-between text-[16px] py-5">
                        <h1 className="font-poppins font-semibold capitalize">
                            More by{' '}
                            <span className="text-parple">
                                {image.user.name}
                            </span>
                        </h1>
                        <RedirectToProfile image={image}>
                            <span className="cursor-pointer hover:underline">
                                View Profile
                            </span>
                        </RedirectToProfile>
                    </div>
                    {/* AUTHORS IMAGE COLLECTIONS */}
                    <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                        {authorsImageCollections.slice(0, 6).map((item) => (
                            <ImageBox
                                key={item.id}
                                image={item}
                                varient="small"
                            />
                        ))}
                    </section>
                </div>
            )}
        </section>
    );
};

export default ImageAuthorHeaderInfo;
