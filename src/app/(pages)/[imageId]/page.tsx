'use client';

import { Container } from '@/components/Container';
import ImageBookmarkButton from '@/components/image/ImageBookmarkButton';
import ImageBox from '@/components/image/ImageBox';
import Navber from '@/components/layouts/Navber';
import { useImages } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { AiOutlineMail } from 'react-icons/ai';
import ImageAuthorHeaderInfo from '@/components/image/ImageAuthorHeaderInfo';
import ImageInfoBox from '@/components/image/ImageInfoBox';

const ImageViewPage = () => {
    const { images } = useImages();
    const { imageId } = useParams();
    const imageFound = images?.find((item) => item.id === imageId);
    const { currentUser } = useCurrentUser();

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
                    <ImageInfoBox image={imageFound} />

                    {/* AUTHOR INFO BOTTOM */}
                    <ImageAuthorHeaderInfo image={imageFound} />

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
                                    <ImageBox
                                        key={item.id}
                                        image={item}
                                        varient="small"
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </Container>
            </main>
        </>
    );
};

export default ImageViewPage;
