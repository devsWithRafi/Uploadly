import { imagesType } from '@/context/imagesContext/ImageContext';
import Image from 'next/image';
import React, { useState } from 'react';
import ImageLikeButton from './ImageLikeButton';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoMdShareAlt } from 'react-icons/io';
import Portal from '../Portal';
import Sideber from '../Sideber';
import ImageCommentButton from './ImageCommentButton';

const ImageInfoBox = ({ image }: { image: imagesType }) => {
    return (
        <section className="w-full flex flex-col gap-5 items-start">
            <h1 className="font-space font-semibold text-3xl">{image.title}</h1>
            <Image
                src={image.imageUrl}
                alt=""
                width={1000}
                height={1000}
                className="w-full"
            />
            <div className="flex items-center gap-5">
                <span className="bg-gray-100 px-5 py-2 rounded-full">
                    <ImageLikeButton image={image} />
                </span>
                <span className="bg-gray-100 px-5 py-2 rounded-full">
                    <ImageCommentButton image={image} />
                </span>
                <span className="bg-gray-100 px-5 py-2 rounded-full text-[15px] select-none flex items-center gap-1 text-zinc-500 cursor-pointer">
                    <h2 className="font-medium">Share</h2>
                    <IoMdShareAlt size={20} />
                </span>
            </div>
            {/* <h2>{image.description}</h2> */}
            <p className="font-space text-zinc-500 text-xl mt-5">
                {image.description}
            </p>
        </section>
    );
};

export default ImageInfoBox;
