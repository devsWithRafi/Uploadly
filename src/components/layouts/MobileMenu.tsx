'use client';

import Link from 'next/link';
import Logo from '../ui/Logo';
import { FiSearch } from 'react-icons/fi';
import Aveter from '../ui/Aveter';
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { useFormateSlug } from '@/hooks/useFormateSlug';
import { useImages } from '@/context/imagesContext/ImageContext';
import { cn } from '@/lib/utils';
import SearchBer from '../SearchBer';
import { RxCross2 } from 'react-icons/rx';
import { CirclePlus } from 'lucide-react';
import Portal from '../Portal';
import UploadImageForm from '../image/UploadImageForm';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '../ui/button';

const MobileMenu = () => {
    const { images } = useImages();
    const { formateSlug } = useFormateSlug();
    const imageCatSet = new Set(images?.map((item) => item.category));
    const imageCategories = [...imageCatSet];

    const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
    const [isExploreActive, setIsExploreActive] = useState<boolean>(false);
    const [isSearchberOpen, setIsSearchberOpen] = useState<boolean>(false);
    const [isCreateImage, setIsCreateImage] = useState<boolean>(false);

    return (
        <>
            <main className="bg-white/90 backdrop-blur-[15px] md:hidden z-[50] flex flex-col fixed top-0 left-0 right-0 items-center justify-evenly  w-full border-t text-[20px] shadow-md">
                <section className="w-full flex items-center justify-between px-5 py-2 border-b border-zinc-400">
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => (
                                setIsMenuActive((prev) => !prev),
                                setIsSearchberOpen(false)
                            )}
                            className="cursor-pointer duration-300"
                        >
                            {isMenuActive ? (
                                <RxCross2 size={30} />
                            ) : (
                                <BiMenuAltLeft size={30} />
                            )}
                        </button>
                        <Link href={'/'}>
                            <Logo
                                textClassName="text-md -ml-2"
                                imgClassName="scale-[0.7]"
                            />
                        </Link>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-4">
                        {/* SEARCH BUTTON */}
                        <button
                            onClick={() => (
                                setIsSearchberOpen((prev) => !prev),
                                setIsMenuActive(false)
                            )}
                            className={cn(
                                'cursor-pointer text-zinc-500 hover:text-zinc-800 duration-300',
                                isSearchberOpen && 'text-parple'
                            )}
                        >
                            <FiSearch size={20} />
                        </button>
                        <SignedIn>
                            {/* CREATE BUTTON */}
                            <button
                                onClick={() => setIsCreateImage(true)}
                                className={cn(
                                    'cursor-pointer text-zinc-500 hover:text-zinc-800 duration-300',
                                    isCreateImage && 'text-parple'
                                )}
                            >
                                <CirclePlus size={20} />
                            </button>
                            <Aveter />
                        </SignedIn>
                        <SignedOut>
                            <Link href={'/signin'}>
                                <Button className="rounded-full px-6 py-5">
                                    Get Started
                                </Button>
                            </Link>
                        </SignedOut>
                    </div>
                </section>
                {/* MENU */}
                {!isSearchberOpen && (
                    <section
                        className={cn(
                            'w-full px-5 max-h-0 overflow-hidden opacity-0 font-space font-semibold duration-300 text-[17px] flex flex-col',
                            isMenuActive && 'py-3 mt-3 opacity-100 max-h-screen'
                        )}
                    >
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 border-b border-zinc-300 py-3 w-full hover:text-zinc-500 duration-300"
                        >
                            Home
                        </Link>
                        {/* EXPLORE BUTTON */}
                        <div className="w-full flex flex-col border-b border-zinc-300 py-3">
                            <button
                                onClick={() =>
                                    setIsExploreActive((prev) => !prev)
                                }
                                className="flex items-center gap-2 w-full duration-300 cursor-pointer hover:text-zinc-500"
                            >
                                Explore{' '}
                                {!isExploreActive ? (
                                    <IoIosArrowDown />
                                ) : (
                                    <IoIosArrowUp />
                                )}
                            </button>
                            <div
                                className={cn(
                                    'flex flex-col gap-3 max-h-0 overflow-hidden text-[15px] font-space font-normal text-zinc-500 duration-300 opacity-0',
                                    isExploreActive &&
                                        'mt-5 max-h-70 opacity-100'
                                )}
                            >
                                {imageCategories?.map((item, idx) => (
                                    <Link
                                        href={`/?category=${formateSlug(
                                            item!
                                        )}`}
                                        key={idx}
                                        className="w-full duration-300 hover:text-zinc-950"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <SignedIn>
                            <Link
                                href={'/profile'}
                                className="flex items-center gap-2 border-b border-zinc-300 py-3 w-full hover:text-zinc-500 duration-300"
                            >
                                Profile
                            </Link>
                            <Link
                                href={'/profile'}
                                className="flex items-center gap-2 border-b border-zinc-300 py-3 w-full hover:text-zinc-500 duration-300"
                            >
                                My Collection
                            </Link>
                            <Link
                                href={'/profile'}
                                className="flex items-center gap-2 border-b border-zinc-300 py-3 w-full hover:text-zinc-500 duration-300"
                            >
                                My Bookmarks
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <Link href={'/signin'} className="w-full">
                                <Button className="mt-5 rounded-full w-full">
                                    Sign in
                                </Button>
                            </Link>
                        </SignedOut>
                    </section>
                )}

                {/* SEARCHBER */}
                <section
                    className={cn(
                        'w-full px-5 max-h-0 overflow-hidden font-space font-semibold text-[17px] flex flex-col opacity-0 duration-300',
                        isSearchberOpen && 'py-10 max-h-70 opacity-100'
                    )}
                >
                    <SearchBer className="bg-transparent border-2 border-[#EA4C89]/20 hover;border-[#EA4C89]/50 focus-within:border-[#EA4C89]/50  text-[13px]" />
                </section>
            </main>
            {/* IMAGE UPLOAD FORM POPUP */}
            <Portal
                isOpen={isCreateImage}
                setIsOpen={() => setIsCreateImage(false)}
            >
                <UploadImageForm setIsOpen={() => setIsCreateImage(false)} />
            </Portal>
        </>
    );
};

export default MobileMenu;
