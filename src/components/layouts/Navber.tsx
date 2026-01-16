'use client';
import Logo from '../ui/Logo';
import Link from 'next/link';
import { Button } from '../ui/button';
import { UserButton } from '@clerk/nextjs';
import { FiArrowRight } from 'react-icons/fi';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Portal from '../Portal';
import { useState } from 'react';
import UploadImageForm from '../image/UploadImageForm';
import { CircleFadingPlus } from 'lucide-react';
import Aveter from '../ui/Aveter';
import SearchBer from '../SearchBer';
import NavExploreButton from '../NavExploreButton';
import MobileMenu from './MobileMenu';

const Navber = () => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

    return (
        <>
            <section className="w-full fixed top-0 left-0 right-0 h-23 bg-eliment z-[50] md:flex hidden md:px-5 shadow">
                {/* main */}
                <main className="w-full max-w-[1600px] h-full mx-auto md:flex hidden items-center justify-between gap-10 px-3">
                    {/* LEFT SIDE */}
                    <div className="flex items-center justify-center gap-10 w-full">
                        <Link href={'/'}>
                            <Logo />
                        </Link>
                        {/* SEARCHBER */}
                        <SearchBer />
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="text-gray-500 flex items-center justify-end gap-10 lg:w-full font-space">
                        {/* IF SIGNEDIN */}
                        <div className="lg:flex hidden items-start justify-center gap-5 font-medium">
                            <NavExploreButton />
                            <SignedIn>
                                <Link
                                    href="/profile"
                                    className="hover:text-black transition-all"
                                >
                                    My Collection
                                </Link>
                            </SignedIn>
                        </div>

                        {/* IF SIGNEDIN */}
                        <SignedIn>
                            <div className="flex items-center gap-5 ml-5 font-medium">
                                <div className="flex items-center justify-center rounded-full ">
                                    {/* <UserButton /> */}
                                    <Aveter />
                                </div>
                                <Button
                                    onClick={() =>
                                        setIsUploadOpen((prev) => !prev)
                                    }
                                    className="rounded-full w-[120px] p-5.5 cursor-pointer"
                                >
                                    Upload
                                    <CircleFadingPlus size={20} />
                                </Button>
                                <Portal
                                    isOpen={isUploadOpen}
                                    setIsOpen={() => setIsUploadOpen(false)}
                                >
                                    <UploadImageForm
                                        setIsOpen={() => setIsUploadOpen(false)}
                                    />
                                </Portal>
                            </div>
                        </SignedIn>

                        {/* IF SIGNED OUT */}
                        <SignedOut>
                            <Link href={'/signup'}>
                                <Button className="rounded-full w-[140px] p-5.5">
                                    Get Sarted <FiArrowRight />
                                </Button>
                            </Link>
                        </SignedOut>
                    </div>
                </main>
            </section>
            {/* MOBILE MENU */}
            <MobileMenu />
        </>
    );
};

export default Navber;
