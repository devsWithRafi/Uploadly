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
} from 'react-icons/fa6';
import { Spinner } from '../ui/spinner';

const defaultAveter =
    'https://sothebys-com.brightspotcdn.com/dims4/default/6a8c506/2147483647/strip/true/crop/1000x1000+0+0/resize/684x684!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F8e%2F9c%2F972bfa1645c08ca0919ea68aabfe%2F4609.png';

interface UserProfileType {
    avater: string | null;
    bio: string | null;
    name: string | null;
    createdAt?: Date | string;
}

const ProfileHeader = ({ avater, bio, name, createdAt }: UserProfileType) => {
    const [imageLoded, setImgaeLoded] = useState<boolean>(false);
    return (
        <div className="flex flex-col items-center mt-10">
            {/* PROFILE IMAGE */}
            <div className="w-[180px] bg-eliment flex items-center justify-center aspect-square rounded-full z-1 relative">
                {!imageLoded && (
                    <div className="flex absolute items-center gap-1 text-gray-400 text-[15px]">
                        <Spinner />
                        <h2>Loading...</h2>
                    </div>
                )}

                <Image
                    onLoad={() => setImgaeLoded(true)}
                    src={avater || defaultAveter}
                    alt="profile"
                    width={400}
                    height={400}
                    className={`w-full h-full rounded-full transition-all ${
                        imageLoded ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            </div>
            {/* INFO */}
            <div className="flex flex-col items-center text-center text-black font-poppins text-4xl font-medium mt-2">
                <h1 className="font-bold">{name || 'Mr Guest'}</h1>
                <p className="text-xl font-normal text-gray-500 font-space">
                    {bio || 'No bio added yet'}
                </p>
                {/* SOCIAL LINKS */}
                <div className="flex items-center gap-5 text-[20px] text-gray-600 mt-3">
                    <Link
                        href={'/'}
                        className="hover:text-white ease-in-out duration-300 rounded-full bg-gray-100 h-8 w-8 flex items-center justify-center text-[15px] shadow hover:bg-black"
                    >
                        <FaFacebook />
                    </Link>
                    <Link
                        href={'/'}
                        className="hover:text-white ease-in-out duration-300 rounded-full bg-gray-100 h-8 w-8 flex items-center justify-center text-[15px] shadow hover:bg-black"
                    >
                        <FaInstagram />
                    </Link>
                    <Link
                        href={'/'}
                        className="hover:text-white ease-in-out duration-300 rounded-full bg-gray-100 h-8 w-8 flex items-center justify-center text-[15px] shadow hover:bg-black"
                    >
                        <FaLinkedin />
                    </Link>
                    <Link
                        href={'/'}
                        className="hover:text-white ease-in-out duration-300 rounded-full bg-gray-100 h-8 w-8 flex items-center justify-center text-[15px] shadow hover:bg-black"
                    >
                        <FaGithub />
                    </Link>
                    <Link
                        href={'/'}
                        className="hover:text-white ease-in-out duration-300 rounded-full bg-gray-100 h-8 w-8 flex items-center justify-center text-[15px] shadow hover:bg-black"
                    >
                        <FaSquareXTwitter />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
