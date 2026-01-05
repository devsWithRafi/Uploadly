'use client';

import ImageBox from '@/components/image/ImageBox';
import ProfileHeader from '@/components/layouts/ProfileHeader';
import { imagesType } from '@/context/imagesContext/ImageContext';
import { Image, User } from '@/generated/prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineCollections } from 'react-icons/md';

type UserType = User & {
    images: Image[];
};

const ViewUsers = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [userImages, setUserImages] = useState<imagesType[] | null>(null);
    const { profileId } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.post('/api/get-user', {
                    userId: profileId,
                });
                const data = await res.data;
                if (!data) {
                    toast.error('User not found!');
                    router.push('/');
                    return;
                }
                setUser(data);
            } catch (error) {
                toast.error('Somthing went wrong!');
                console.log(error);
            }
        };
        fetchUser();
    }, [profileId]);

    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                if (!user) return;
                const res = await axios.post('/api/get-users-images', {
                    userId: user.id,
                });
                const data = await res.data;
                if (!data) {
                    toast.error('User Images not found!');
                    return;
                }
                setUserImages(data);
            } catch (error) {
                toast.error('Somthing went wrong!');
                console.log(error);
            }
        };
        fetchUserImages();
    }, [user]);

    return (
        <section>
            {user && (
                <ProfileHeader
                    name={user.name}
                    avater={user.image}
                    bio={user.bio}
                    createdAt={user.createdAt}
                />
            )}
            {user && (
                <section className="bg-eliment w-full min-h-screen pt-20">
                    {/* COLLECTIONS */}
                    <div className="">
                        <div className="px-5 py-5 border-b border-gray-200 flex items-center justify-start">
                            <div className="flex items-center gap-2 text-lg font-poppins uppercase font-medium text-gray-400 hover:text-black transition-all">
                                <MdOutlineCollections size={23} />
                                <Link href={'/profile'}>Collections</Link>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-3 gap-5 py-5 mt-10">
                            {/* USERS COLLECTIONS */}
                            {userImages?.map((item) => (
                                <ImageBox key={item.id} image={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </section>
    );
};

export default ViewUsers;
