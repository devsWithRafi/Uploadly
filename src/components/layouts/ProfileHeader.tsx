'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaSquareXTwitter,
    FaPinterest,
} from 'react-icons/fa6';
import { BsPersonWorkspace } from 'react-icons/bs';
import { Spinner } from '../ui/spinner';
import { useUsersSocials } from '@/hooks/useUsersSocials';
import { useCurrentUser } from '@/context/user-context/UserContext';
import UserProfileEditButton from '../UserProfileEditButton';
import defaultCoverImage from '@/assets/defaultCover.png';
import defaultAveter from '@/assets/defaultAveter.png';
import { User } from '@/generated/prisma/client';
import { useImages } from '@/context/imagesContext/ImageContext';
import { AiOutlineMail } from 'react-icons/ai';

const socialIcons = {
    facebook: FaFacebook,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    twitter: FaSquareXTwitter,
    github: FaGithub,
    pinterest: FaPinterest,
    portfolio: BsPersonWorkspace,
};

const ProfileHeader = ({ user }: { user: User }) => {
    const [imageLoded, setImgaeLoded] = useState<boolean>(false);
    const { currentUser } = useCurrentUser();
    const socialData = useUsersSocials(user.id);
    const { images } = useImages();
    const socialPlatforms = socialData?.platforms;

    const totalImages =
        images && images?.filter((item) => item.userId === user.id);
    const totalLikes = totalImages
              ?.map((item) => item._count.likes)
              ?.reduce((sum, value) => sum + value, 0)
       
    const totalFedbacks =
        images &&
        totalImages
            ?.map((item) => item._count.comments)
            ?.reduce((sum, value) => sum + value, 0);

    return (
        <header className="flex flex-col items-center md:mt-4 -mt-2">
            {/* PROFILE COVER IMAGE */}
            <section className="w-full xl:aspect-[8/1] lg:aspect-[8/1.2] md:aspect-[8/1.3] aspect-[8/2]  overflow-hidden">
                <Image
                    src={user.coverImage || defaultCoverImage}
                    alt=""
                    width={2000}
                    height={300}
                    className="w-full h-auto"
                />
            </section>
            {/* PROFILE IMAGE */}
            <main className="lg:w-[80%] w-full lg:px-0 px-5 flex flex-col items-start gap-5">
                <div className="flex flex-row max-[600px]:flex-col max-[600px]:items-center max-[600px]:w-full items-start gap-7 mt-5">
                    {/* IMAGE SECTION */}
                    <section className="lg:w-[180px] w-[140px] flex items-center justify-center aspect-square rounded-full z-1 relative max-[600px]:-mt-20 max-[600px]:bg-white max-[600px]:p-2 max-[600px]:w-[155px]">
                        {/* IMAGE LOADER */}
                        {!imageLoded && (
                            <div className="flex absolute items-center gap-1 text-gray-400 text-[15px]">
                                <Spinner />
                                <h2>Loading...</h2>
                            </div>
                        )}

                        <Image
                            onLoad={() => setImgaeLoded(true)}
                            src={user.image || defaultAveter}
                            alt="profile"
                            width={400}
                            height={400}
                            className={`w-full h-full rounded-full transition-all ${
                                imageLoded ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        {/* PROFILE EDIT BUTTON */}
                        {user.id === currentUser?.id && (
                            <UserProfileEditButton />
                        )}
                    </section>
                    {/* INFO */}
                    <section className="flex text-left flex-col items-start text-black font-poppins font-medium mt-2 max-[600px]:text-center max-[600px]:w-full max-[600px]:items-center max-[600px]:mt-0">
                        <h1 className="font-bold font-poppins lg:text-4xl text-2xl">
                            {user.name || 'Mr Guest'}
                        </h1>
                        <p className="lg:text-xl text-md font-normal text-gray-500 font-space">
                            {user.bio || 'No bio added yet'}
                        </p>
                        {/* SOCIAL LINKS */}
                        <div className="flex items-center gap-3 lg:text-[20px] text-[17px] text-zinc-500 mt-3">
                            {socialPlatforms &&
                                Object.keys(socialPlatforms).map((key) => {
                                    const keys =
                                        key as keyof typeof socialIcons;
                                    const socialKeys =
                                        key as keyof typeof socialPlatforms;
                                    const SocialIcon = socialIcons[keys];
                                    return (
                                        socialPlatforms[socialKeys] &&
                                        keys !== 'portfolio' && (
                                            <Link
                                                key={key}
                                                href={
                                                    socialPlatforms[socialKeys]
                                                }
                                                className=" hover:text-zinc-800 duration-300 hover:scale-[1.1]"
                                            >
                                                <SocialIcon />
                                            </Link>
                                        )
                                    );
                                })}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-[13px] font-normal font-space mt-5 text-zinc-500">
                            <Link
                                href="/"
                                className="flex items-center gap-1 border border-gray-400 lg:p-1.5 p-1 lg:px-3 px-4 rounded-full"
                            >
                                <AiOutlineMail />
                                {user.email}
                            </Link>
                            {socialPlatforms &&
                                Object.keys(socialPlatforms).map((key) => {
                                    const keys =
                                        key as keyof typeof socialPlatforms;
                                    return (
                                        keys === 'portfolio' &&
                                        socialPlatforms[keys] && (
                                            <Link
                                                href={socialPlatforms[keys]}
                                                key={key}
                                                className="flex items-center gap-1 border border-gray-400 lg:p-1.5 p-1 lg:px-3 px-4 rounded-full"
                                            >
                                                <BsPersonWorkspace />
                                                Portfolio
                                            </Link>
                                        )
                                    );
                                })}
                        </div>
                    </section>
                </div>
                {/* RECORDS */}
                <section className="flex items-center gap-5 justify-between mt-7 w-80 max-[600px]:w-full max-[600px]:justify-evenly h-18 px-5 py-2 rounded border border-zinc-300">
                    <span className="flex flex-col-reverse uppercase font-space items-center justify-center text-[14px] text-zinc-500 h-full">
                        Images
                        <span className="font-medium text-[22px]">
                            {totalImages?.length}
                        </span>
                    </span>
                    <span className="w-[1px] h-full bg-gray-300" />
                    <span className="flex flex-col-reverse uppercase font-space items-center justify-center text-[14px] text-zinc-500 h-full">
                        Likes
                        <span className="font-medium text-[22px]">
                            {totalLikes}
                        </span>
                    </span>
                    <span className="w-[1px] h-full bg-gray-300" />
                    <span className="flex flex-col-reverse uppercase font-space items-center justify-center text-[14px] text-zinc-500 h-full">
                        Feedbacks
                        <span className="font-medium text-[22px]">
                            {totalFedbacks}
                        </span>
                    </span>
                </section>
            </main>
        </header>
    );
};

export default ProfileHeader;
