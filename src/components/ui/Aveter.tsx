'use client';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const Aveter = () => {
    const { currentUser } = useCurrentUser();
    return (
        <main className="relative font-poppins group w-60 flex justify-end">
            <Link
                href={'/profile'}
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
            >
                {currentUser && (
                    <Image
                        src={currentUser.image}
                        alt=""
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                )}
            </Link>

            <section className="bg-white max-h-0 p-0 group-hover:max-h-100 group-hover:p-5 shadow-md w-60 overflow-hidden absolute mt-12 rounded flex flex-col items-center">
                {currentUser && (
                    <Image
                        src={currentUser.image}
                        alt=""
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                )}
                <Link
                    href={'/profile'}
                    className="text-zinc-800 font-semibold text-xl hover:underline"
                >
                    {currentUser.name}
                </Link>
                <div className="w-full border-t mt-2 font-space flex flex-col font-normal text-[15px] text-zinc-500">
                    <Link
                        href={'/profile'}
                        className="hover:underline hover:text-zinc-800 mt-2"
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
                    <button className="font-normal font-space border-t w-full mt-10 pt-2 cursor-pointer hover:text-zinc-900">
                        Sign Out
                    </button>
                </SignOutButton>
            </section>
        </main>
    );
};

export default Aveter;
