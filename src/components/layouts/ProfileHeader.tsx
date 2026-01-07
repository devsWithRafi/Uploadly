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
    const socialPlatforms = socialData?.platforms;

    return (
        <header className="flex flex-col items-center mt-10">
            {/* PROFILE COVER IMAGE */}
            <section className="w-full bg-gray-200 aspect-[8/1] overflow-hidden">
                <Image
                    src={user.coverImage || defaultCoverImage}
                    alt=""
                    width={2000}
                    height={300}
                    className="w-full"
                />
            </section>
            {/* PROFILE IMAGE */}
            <section className="w-[180px] -mt-20 p-2 bg-eliment flex items-center justify-center aspect-square rounded-full z-1 relative">
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
                {user.id === currentUser?.id && <UserProfileEditButton />}
            </section>
            {/* INFO */}
            <section className="flex flex-col items-center text-center text-black font-poppins text-4xl font-medium mt-2">
                <h1 className="font-bold font-poppins">
                    {user.name || 'Mr Guest'}
                </h1>
                <p className="text-xl font-normal text-gray-500 font-space">
                    {user.bio || 'No bio added yet'}
                </p>
                {/* SOCIAL LINKS */}
                <div className="flex items-center gap-5 text-[20px] text-gray-600 mt-3">
                    {socialPlatforms &&
                        Object.keys(socialPlatforms).map((key) => {
                            const keys = key as keyof typeof socialIcons;
                            const socialKeys =
                                key as keyof typeof socialPlatforms;
                            const SocialIcon = socialIcons[keys];
                            return (
                                socialPlatforms[socialKeys] && (
                                    <Link
                                        key={key}
                                        href={socialPlatforms[socialKeys]}
                                        className="hover:text-white ease-in-out duration-300 rounded-full bg-gray-100 h-8 w-8 flex items-center justify-center text-[15px] shadow hover:bg-black"
                                    >
                                        <SocialIcon />
                                    </Link>
                                )
                            );
                        })}
                </div>
            </section>
        </header>
    );
};

export default ProfileHeader;
