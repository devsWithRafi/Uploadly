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
import RedirectToProfile from '@/components/RedirectToProfile';
import ImageNotFound from '@/components/ImageNotFound';
import Footer from '@/components/layouts/Footer';

const ImageViewPage = () => {
    const { images } = useImages();
    const { currentUser } = useCurrentUser();
    const params = useParams();

    const slug = Array.isArray(params.imageId)
        ? params.imageId[0]
        : params.imageId;
    const imageId = slug?.split('--')[1];

    const imageFound = images?.find((item) => item.id === imageId);

    const imageSuggetions = images?.filter((item) =>
        currentUser
            ? item.userId !== imageFound?.userId &&
              item.userId !== currentUser.id
            : item.userId !== imageFound?.userId
    );

    if (!imageFound) return;

    return !images ? (
        <ImageNotFound />
    ) : (
        <>
            <Navber />
            <main className="w-full pt-30 py-20">
                <Container className="mx-auto xl:w-300 lg:w-250 md:px-10 px-5">
                    {/* IMAGE AUTHOR INFO HEADER */}
                    <header className="flex items-center border-b justify-between font-poppins py-5 mb-5">
                        {/* LEFT SIDE */}
                        <div className="flex items-center sm:gap-4 gap-2">
                            {/* AVATER */}
                            <RedirectToProfile image={imageFound}>
                                <div className="flex items-center cursor-pointer justify-center sm:w-15 w-10 sm:h-15 h-10 rounded-full overflow-hidden">
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
                            </RedirectToProfile>
                            <div className="flex flex-col">
                                <RedirectToProfile image={imageFound}>
                                    <h2 className="font-semibold text-[16px] cursor-pointer hover:underline capitalize">
                                        {imageFound.user.name}
                                    </h2>
                                </RedirectToProfile>
                                <p className="text-zinc-500 text-[12px]">
                                    {imageFound.user.bio
                                        ? imageFound.user.bio
                                        : 'No bio added yet'}
                                </p>
                            </div>
                        </div>
                        {/* RIGHT SIDE */}
                        <div className="flex items-center sm:gap-5 gap-2">
                            <span className="w-10 h-10 bg-white shadow rounded-full flex items-center justify-center">
                                <AiOutlineMail className="text-[20px]" />
                            </span>
                            <ImageBookmarkButton image={imageFound} />
                        </div>
                    </header>

                    {/* IMAGE INFO */}
                    <ImageInfoBox image={imageFound} />

                    {/* AUTHOR INFO BOTTOM */}
                    {currentUser &&
                    imageFound.userId === currentUser.id ? null : (
                        <ImageAuthorHeaderInfo image={imageFound} />
                    )}

                    {/* YOU MIGNT ALSO LIKE */}
                    {imageSuggetions && imageSuggetions.length > 0 && (
                        <section className="border-t border-zinc-300 mt-15 py-5">
                            <div className="flex items-center justify-between text-[16px] py-5">
                                <h1 className="font-poppins font-semibold capitalize">
                                    You might also like
                                </h1>
                            </div>
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
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
            <Footer />
        </>
    );
};

export default ImageViewPage;
