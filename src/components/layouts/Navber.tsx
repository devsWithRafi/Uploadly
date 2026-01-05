'use client';
import Logo from '../ui/Logo';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi2';
import { Button } from '../ui/button';
import { UserButton } from '@clerk/nextjs';
import { FiArrowRight } from 'react-icons/fi';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Portal from '../Portal';
import { useState } from 'react';
import UploadImageForm from '../image/UploadImageForm';
import { CircleFadingPlus } from 'lucide-react';

const Navber = () => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);

    return (
        <section className="w-full fixed top-0 left-0 right-0 h-20 shadow-md bg-eliment z-[50]">
            {/* main */}
            <div className="w-full max-w-[1600px] h-full mx-auto flex items-center justify-between gap-10 px-3">
                {/* LEFT SIDE */}
                <div className="flex items-center justify-center gap-10 w-full">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                    <div className="w-full text-gray-500 flex items-center justify-between h-13 px-5 rounded-full text-[15px] bg-gray-100">
                        <input
                            type="text"
                            className="w-full border-0 outline-0 h-full"
                            placeholder="What are you looking for?"
                        />
                        <FiSearch size={22} className="ml-2 cursor-pointer" />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="text-gray-500 flex items-center justify-end gap-10 w-full font-space">
                    {/* IF SIGNEDIN */}
                    <SignedIn>
                        <div className="flex items-center justify-center gap-5 font-medium">
                            <Link
                                href="/"
                                className="hover:text-black transition-all"
                            >
                                Explore
                            </Link>
                            <Link
                                href="/"
                                className="hover:text-black transition-all"
                            >
                                My Collection
                            </Link>
                        </div>
                    </SignedIn>

                    {/* IF SIGNEDIN */}
                    <SignedIn>
                        <div className="flex items-center gap-5 ml-5 font-medium">
                            <div className="flex items-center justify-center scale-[1.3] bg-zinc-800 rounded-full p-1">
                                <UserButton />
                            </div>
                            <Button
                                onClick={() => setIsUploadOpen((prev) => !prev)}
                                className="rounded-full w-[120px] p-5.5 cursor-pointer"
                            >
                                Upload
                                <CircleFadingPlus size={20} />
                            </Button>
                            <Portal
                                isOpen={isUploadOpen}
                                setIsOpen={() =>
                                    setIsUploadOpen((prev) => !prev)
                                }
                            >
                                <UploadImageForm />
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
            </div>
        </section>
    );
};

export default Navber;
