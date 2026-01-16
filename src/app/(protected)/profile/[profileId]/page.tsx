'use client';

import ImageBox from '@/components/image/ImageBox';
import ProfileHeader from '@/components/layouts/ProfileHeader';
import { imagesType } from '@/context/imagesContext/ImageContext';
import { Image, User } from '@/generated/prisma/client';
import { cn } from '@/lib/utils';
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
    const [selected, setSelected] = useState<string>('collections');

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
            {user && <ProfileHeader user={user} />}
            {user && (
                <section className="bg-eliment w-full min-h-screen pt-20 px-5">
                    {/* COLLECTIONS */}
                    <div className="">
                        <div className="border-b border-gray-200 flex items-center justify-start">
                            <button
                                onClick={() => setSelected('collections')}
                                className={cn(
                                    'flex items-center cursor-pointer px-5 max-[500px]:px-3.5 max-[500px]:py-2 py-2.5 gap-2 text-md font-poppins uppercase font-medium text-zinc-500 hover:text-zinc-800 border-b-2 border-transparent  duration-300 ease-in-out',
                                    selected === 'collections' &&
                                        'text-zinc-800 border-b-2 border-zinc-800'
                                )}
                            >
                                <MdOutlineCollections className="text-[20px] max-[500px]:text-[18px]" />
                                Collections
                            </button>
                        </div>
                        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-5 mt-10">
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
