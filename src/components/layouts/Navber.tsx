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
import { useCurrentUser } from '@/context/user-context/UserContext';
import SearchBer from '../SearchBer';

const Navber = () => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
    const { currentUser } = useCurrentUser();

    return (
        <section className="w-full fixed top-0 left-0 right-0 h-20 shadow-md bg-eliment z-[50]">
            {/* main */}
            <div className="w-full max-w-[1600px] h-full mx-auto flex items-center justify-between gap-10 px-3">
                {/* LEFT SIDE */}
                <div className="flex items-center justify-center gap-10 w-full">
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                    {/* SEARCHBER */}
                    <SearchBer />
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
                                href="/profile"
                                className="hover:text-black transition-all"
                            >
                                My Collection
                            </Link>
                        </div>
                    </SignedIn>

                    {/* IF SIGNEDIN */}
                    <SignedIn>
                        <div className="flex items-center gap-5 ml-5 font-medium">
                            <div className="flex items-center justify-center rounded-full ">
                                {/* <UserButton /> */}
                                <Link href={'/profile'}>
                                    <Aveter image={currentUser.image} />
                                </Link>
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
