import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import Image from 'next/image';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { IoLaptopOutline } from 'react-icons/io5';
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
                <div className="flex items-center gap-5 font-space mt-2">
                    <span className="flex items-center hover:underline gap-1 text-[13px] text-zinc-800 cursor-pointer">
                        <AiOutlineMail size={20} />
                        {image.user.email}
                    </span>
                    <span className="flex items-center hover:underline gap-1 text-[13px] text-zinc-800 cursor-pointer">
                        <IoLaptopOutline size={20} />
                        {'protfolio.com'}
                    </span>
                </div>
            </div>
            {/* MORE BY AUTHOR */}
            <div className="mt-10">
                <div className="flex items-center justify-between text-[16px] py-5">
                    <h1 className="font-poppins font-semibold">
                        More by {image.user.name}
                    </h1>
                    <RedirectToProfile image={image}>
                        <span className="cursor-pointer hover:underline">
                            View Profile
                        </span>
                    </RedirectToProfile>
                </div>
                {/* AUTHORS IMAGE COLLECTIONS */}
                <section className="grid grid-cols-3 gap-5">
                    {authorsImageCollections &&
                        authorsImageCollections
                            .slice(0, 6)
                            .map((item) => (
                                <ImageBox
                                    key={item.id}
                                    image={item}
                                    varient="small"
                                />
                            ))}
                </section>
            </div>
        </section>
    );
};

export default ImageAuthorHeaderInfo;
