'use client';

import ImageBox from '@/components/image/ImageBox';
import ProfileHeader from '@/components/layouts/ProfileHeader';
import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { useEffect, useState } from 'react';
import { MdOutlineCollections } from 'react-icons/md';
import { LuBookmarkCheck } from 'react-icons/lu';
import axios from 'axios';
import { cn } from '@/lib/utils';
import FirstUploadImageBox from '@/components/image/FirstUploadImageBox';

type bookMarkedType = {
    id: string;
    userId: string;
    imageId: string;
    image: imagesType;
};

const ProfilePage = () => {
    const { currentUser } = useCurrentUser();

    const [selected, setSelected] = useState<string>('collections');
    const [bookmarkedImg, setBookmarkedImg] = useState<bookMarkedType[]>([]);

    const { images } = useImages();
    const currentUserImages = images?.filter(
        (img) => img.userId === currentUser.id
    );

    const fetchBookMarks = async () => {
        const res = await axios.post('/api/get-bookmarked-images', {
            userId: currentUser.id,
        });

        const data = await res.data;

        if (data.length > 0) setBookmarkedImg(data);
        else setBookmarkedImg([]);
    };

    useEffect(() => {
        fetchBookMarks();
    }, [selected]);

    const showBookmarks = async () => {
        if (currentUser) {
            fetchBookMarks();
            setSelected('bookmarks');
        }
    };

    return (
        <>
            <ProfileHeader user={currentUser} />

            <section className="bg-eliment w-full min-h-screen pt-20 px-5">
                {/* COLLECTIONS */}
                <div className="">
                    <div className="border-b border-gray-200 flex items-center justify-start w-full">
                        <button
                            onClick={() => setSelected('collections')}
                            className={cn(
                                'flex items-center cursor-pointer px-5 max-[500px]:px-3.5 max-[500px]:py-2 py-2.5 gap-2 text-md max-[500px]:text-sm font-poppins uppercase font-medium text-zinc-500 hover:text-zinc-800 border-b-2 border-transparent  duration-300 ease-in-out',
                                selected === 'collections' &&
                                    'text-zinc-800 border-b-2 border-zinc-800'
                            )}
                        >
                            <MdOutlineCollections className="text-[20px] max-[500px]:text-[18px]" />
                            Collections
                        </button>
                        <button
                            onClick={showBookmarks}
                            className={cn(
                                'flex items-center cursor-pointer px-5 max-[500px]:px-3.5 max-[500px]:py-2 py-2.5 gap-2 text-md max-[500px]:text-sm font-poppins uppercase font-medium text-zinc-500 hover:text-zinc-800 border-b-2 border-transparent  duration-300 ease-in-out',
                                selected === 'bookmarks' &&
                                    'text-zinc-800 border-b-2 border-zinc-800'
                            )}
                        >
                            <LuBookmarkCheck className="text-[20px] max-[500px]:text-[18px]" />
                            Bookmarks
                        </button>
                    </div>
                    {/* UPLOADED IMAGE HERE */}
                    {selected === 'collections' && (
                        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-5 mt-10">
                            {currentUserImages &&
                            currentUserImages?.length > 0 ? (
                                currentUserImages.map((item) => (
                                    <ImageBox
                                        key={item.id}
                                        image={item}
                                        editMode={true}
                                    />
                                ))
                            ) : (
                                <FirstUploadImageBox />
                            )}
                        </div>
                    )}
                    {/* BOOKMARKED IMAGE HERE */}
                    {selected === 'bookmarks' && (
                        <div
                            className={cn(
                                'w-full py-5 mt-10',
                                bookmarkedImg?.length > 0 &&
                                    'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'
                            )}
                        >
                            {bookmarkedImg?.length > 0 ? (
                                bookmarkedImg.map((item) => (
                                    <ImageBox
                                        key={item.id}
                                        image={item.image}
                                        editMode={true}
                                    />
                                ))
                            ) : (
                                <div className="w-full border border-zinc-300 border-dashed mt-10 p-10 rounded text-center font-space font-medium text-zinc-500 md:h-100 h-70 flex items-center justify-center">
                                    You don’t have any bookmarks yet
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
