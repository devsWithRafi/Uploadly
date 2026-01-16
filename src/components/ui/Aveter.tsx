'use client';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Spinner } from './spinner';
import { cn } from '@/lib/utils';

const Aveter = () => {
    const { currentUser } = useCurrentUser();
    const [avaterLoaded, setAvaterLoaded] = useState<boolean>(false);
    const [menuAvaterLoaded, setMenuAvaterLoaded] = useState<boolean>(false);
    return (
        <main className="relative font-poppins group flex justify-end">
            <Link
                href={'/profile'}
                className="md:w-12 w-8 h-8 md:h-12 rounded-full overflow-hidden flex items-center justify-center cursor-pointer bg-zinc-100"
            >
                {currentUser && (
                    <Image
                        src={currentUser.image}
                        alt=""
                        width={50}
                        height={50}
                        onLoad={() => setAvaterLoaded(true)}
                        className={cn(
                            'rounded-full w-full duration-300',
                            avaterLoaded ? 'opacity-100' : 'opacity-0'
                        )}
                    />
                )}
                {!avaterLoaded && <Spinner className="scale-[1.2] absolute" />}
            </Link>

            <section className="bg-white max-h-0 p-0 group-hover:max-h-100 group-hover:opacity-100 opacity-0 group-hover:p-5 shadow-md sm:w-60 w-50 overflow-hidden absolute mt-12 rounded flex flex-col items-center duration-300">
                <Link
                    href={'/profile'}
                    className="md:w-15 w-10 h-10 md:h-15 rounded-full overflow-hidden flex items-center justify-center cursor-pointer bg-zinc-100"
                >
                    {currentUser && (
                        <Image
                            src={currentUser.image}
                            alt=""
                            width={60}
                            height={60}
                            onLoad={() => setMenuAvaterLoaded(true)}
                            className={cn(
                                'rounded-full w-full duration-300',
                                menuAvaterLoaded ? 'opacity-100' : 'opacity-0'
                            )}
                        />
                    )}
                    {!menuAvaterLoaded && <Spinner className="scale-[1.3] absolute" />}
                </Link>
                <Link
                    href={'/profile'}
                    className="text-zinc-800 font-semibold mt-4 md:text-xl text-[16px] hover:text-zinc-600"
                >
                    {currentUser?.name.slice(0, 13)}
                </Link>
                <div className="w-full border-t mt-2 font-space flex flex-col font-normal md:text-[15px] text-[14px] text-zinc-500">
                    <Link
                        href={'/profile'}
                        className="hover:underline hover:text-zinc-800 mt-5"
                    >
                        Visit profile
                    </Link>
                    <Link
                        href={'/profile'}
                        className="hover:underline hover:text-zinc-800"
                    >
                        Visit collections
                    </Link>
                </div>
                <SignOutButton>
                    <button className="font-normal font-space border-t w-full mt-10 pt-2 cursor-pointer hover:text-zinc-900 md:text-[18px] text-[15px]">
                        Sign Out
                    </button>
                </SignOutButton>
            </section>
        </main>
    );
};

export default Aveter;
