'use client';

import { Container } from '@/components/Container';
import ImageBookmarkButton from '@/components/image/ImageBookmarkButton';
import ImageBox from '@/components/image/ImageBox';
import ImageLikeButton from '@/components/image/ImageLikeButton';
import Navber from '@/components/layouts/Navber';
import RedirectToProfile from '@/components/RedirectToProfile';
import { useImages } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { IoMdShareAlt } from 'react-icons/io';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { AiOutlineMail } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoLaptopOutline } from 'react-icons/io5';
import Sideber from '@/components/Sideber';
import { useState } from 'react';
import Portal from '@/components/Portal';

const ImageViewPage = () => {
    const { images } = useImages();
    const { imageId } = useParams();
    const imageFound = images?.find((item) => item.id === imageId);
    const { currentUser } = useCurrentUser();

    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

    const authorsImageCollections = images?.filter(
        (item) =>
            item.userId === imageFound?.userId && item.id !== imageFound.id
    );

    const imageSuggetions = images?.filter(
        (item) =>
            item.userId !== imageFound?.userId && item.userId !== currentUser.id
    );

    if (!imageFound) return;

    return (
        <>
            <Navber />
            <main className="w-full pt-20">
                <Container className="mx-auto w-[60%]">
                    {/* IMAGE AUTHOR INFO HEADER */}
                    <section className="flex items-center justify-between font-poppins py-10">
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-4">
                            {/* AVATER */}
                            <div className="flex items-center justify-center w-15 h-15 rounded-full overflow-hidden">
                                {imageFound.user.image && (
                                    <Image
                                        src={imageFound.user.image}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h2 className="font-semibold text-[16px]">
                                    {imageFound.user.name}
                                </h2>
                                <p className="text-zinc-500 text-[12px]">
                                    {imageFound.user.bio
                                        ? imageFound.user.bio
                                        : 'No bio added'}
                                </p>
                            </div>
                        </div>
                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-5">
                            <span className="w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
                                <AiOutlineMail size={20} />
                            </span>
                            <ImageBookmarkButton image={imageFound} />
                        </div>
                    </section>
                    {/* IMAGE INFO */}
                    <section className="w-full flex flex-col gap-5 items-start">
                        <h1 className="font-space font-semibold text-3xl">
                            {imageFound.title}
                        </h1>
                        <Image
                            src={imageFound.imageUrl}
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full"
                        />
                        <div className="flex items-center gap-5">
                            <button className="bg-gray-100 px-5 py-2 rounded-full">
                                <ImageLikeButton image={imageFound} />
                            </button>
                            <button
                                onClick={() =>
                                    setIsCommentOpen((prev) => !prev)
                                }
                                className="bg-gray-100 px-5 py-2 rounded-full text-[15px] select-none flex items-center gap-1 text-zinc-500 cursor-pointer"
                            >
                                <BiMessageSquareDetail size={20} />
                                <h2 className="font-medium">0</h2>
                                <h2 className="font-medium">Comments</h2>
                            </button>
                            <button className="bg-gray-100 px-5 py-2 rounded-full text-[15px] select-none flex items-center gap-1 text-zinc-500 cursor-pointer">
                                <h2 className="font-medium">Share</h2>
                                <IoMdShareAlt size={20} />
                            </button>
                        </div>
                        {/* <h2>{imageFound.description}</h2> */}
                        <p className="font-space text-zinc-500 text-xl mt-5">
                            {imageFound.description}
                        </p>
                    </section>

                    {/* AUTHOR INFO BOTTOM */}
                    <section className="mt-30">
                        {/* AVATER */}
                        <div className="w-full flex items-center justify-between gap-8">
                            <span className="w-full h-0.5 bg-gray-200" />
                            <div className="flex items-center justify-center min-w-20 min-h-20 aspect-square rounded-full overflow-hidden">
                                {imageFound.user.image && (
                                    <Image
                                        src={imageFound.user.image}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className="w-full h-full"
                                    />
                                )}
                            </div>
                            <span className="w-full h-0.5 bg-gray-200" />
                        </div>
                        <div className="flex flex-col text-center items-center justify-center mt-5">
                            <h2 className="font-space font-semibold text-2xl">
                                {imageFound.user.name}
                            </h2>
                            <p className="text-zinc-500 font-space">
                                {imageFound.user.bio
                                    ? imageFound.user.bio
                                    : 'No bio added'}
                            </p>
                            <div className="flex items-center gap-5 font-space mt-2">
                                <span className="flex items-center gap-1 text-[13px] text-zinc-800 cursor-pointer">
                                    <AiOutlineMail size={20} />
                                    {imageFound.user.email}
                                </span>
                                <span className="flex items-center gap-1 text-[13px] text-zinc-800 cursor-pointer">
                                    <IoLaptopOutline size={20} />
                                    {'protfolio.com'}
                                </span>
                            </div>
                        </div>
                        {/* MORE BY AUTHOR */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between text-[16px] py-5">
                                <h1 className="font-poppins font-semibold">
                                    More by {imageFound.user.name}
                                </h1>
                                <RedirectToProfile image={imageFound}>
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
                                                varient='small'
                                            />
                                        ))}
                            </section>
                        </div>
                    </section>
                    {/* YOU MIGNT ALSO LIKE */}
                    {imageSuggetions && imageSuggetions.length > 0 && (
                        <section className="border-t border-zinc-300 mt-15 py-5">
                            <div className="flex items-center justify-between text-[16px] py-5">
                                <h1 className="font-poppins font-semibold">
                                    You might also like
                                </h1>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                {imageSuggetions.slice(0, 6).map((item) => (
                                    <ImageBox key={item.id} image={item} varient='small'/>
                                ))}
                            </div>
                        </section>
                    )}
                </Container>
            </main>

            <Portal
                isOpen={isCommentOpen}
                setIsOpen={() => setIsCommentOpen((prev) => !prev)}
            >
                <Sideber isOpen={isCommentOpen}/>
            </Portal>
        </>
    );
};

export default ImageViewPage;
