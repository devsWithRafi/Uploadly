'use client';

import Logo from '../ui/Logo';
import { Container } from '../Container';
import Link from 'next/link';

import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub } from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import { useImages } from '@/context/imagesContext/ImageContext';
import { useFormateSlug } from '@/hooks/useFormateSlug';
import { SignedIn } from '@clerk/nextjs';

const facebookUrl = '/';
const githubUrl = 'https://github.com/devsWithRafi';
const linkedinUrl = 'https://www.linkedin.com/in/md-saiful-islam-rafi/';
const twitterUrl = 'https://x.com/SaifulIsla55717';

const Footer = () => {
    const { images } = useImages();
    const { formateSlug } = useFormateSlug();
    const imageCatSet = new Set(images?.map((item) => item.category));
    const imageCategories = [...imageCatSet];

    const date: Date = new Date();
    const currentYear = date.getFullYear();

    return (
        <footer className="w-full bg-gray-50">
            <Container className="flex flex-col xl:px-5 px-10">
                <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-15 items-start py-15">
                    {/* FOOTER LEFT */}
                    <div className="w-full flex flex-col items-start gap-5 lg:col-span-2">
                        <Logo
                            textClassName="sm:text-3xl text-xl"
                            imgClassName="md:scale-[1] scale-[0.7] sm:-ml-0 -ml-4"
                        />
                        <p className="font-space sm:text-md text-sm font-medium text-zinc-500 lg:w-[40%]">
                            Share your favorite images with the world, connect
                            with an engaged community, and receive likes and
                            feedback.
                        </p>
                        {/* SOCIAL LINKS */}
                        <div className="flex items-center gap-2 mt-5">
                            <Link
                                href={facebookUrl}
                                className="sm:p-3 p-2 rounded-full bg-white shadow-md hover:bg-parple hover:text-white hover:shadow-xl/40 hover:shadow-parple hover:border-0 duration-300"
                            >
                                <FaFacebookF size={15} />
                            </Link>
                            <Link
                                href={linkedinUrl}
                                className="sm:p-3 p-2 rounded-full bg-white shadow-md hover:bg-parple hover:text-white hover:shadow-xl/40 hover:shadow-parple hover:border-0 duration-300"
                            >
                                <FaLinkedinIn size={15} />
                            </Link>
                            <Link
                                href={githubUrl}
                                className="sm:p-3 p-2 rounded-full bg-white shadow-md hover:bg-parple hover:text-white hover:shadow-xl/40 hover:shadow-parple hover:border-0 duration-300"
                            >
                                <FiGithub size={15} />
                            </Link>
                            <Link
                                href={twitterUrl}
                                className="sm:p-3 p-2 rounded-full bg-white shadow-md hover:bg-parple hover:text-white hover:shadow-xl/40 hover:shadow-parple hover:border-0 duration-300"
                            >
                                <FaXTwitter size={15} />
                            </Link>
                        </div>
                    </div>
                    {/* FOOTER RIGHT */}
                    <div className="w-full flex sm:flex-row flex-col gap-10 justify-between">
                        <div className="font-space flex flex-col gap-2">
                            <h2 className="font-semibold lg:text-xl text-lg mb-2">
                                Cetegories
                            </h2>
                            {imageCategories.slice(0, 5).map((item, idx) => (
                                <Link
                                    href={`/?category=${formateSlug(item!)}`}
                                    key={idx}
                                    className="font-medium lg:text-md text-sm text-gray-500 hover:underline hover:text-zinc-700"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        <div className="font-space flex flex-col gap-2">
                            <h2 className="font-semibold lg:text-xl text-lg mb-2">
                                Pages
                            </h2>
                            <Link
                                href={'/'}
                                className="font-medium lg:text-md text-sm text-gray-500 hover:underline hover:text-zinc-700"
                            >
                                Home
                            </Link>
                            <SignedIn>
                                <Link
                                    href={'/profile'}
                                    className="font-medium lg:text-md text-sm text-gray-500 hover:underline hover:text-zinc-700"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={'/profile'}
                                    className="font-medium lg:text-md text-sm text-gray-500 hover:underline hover:text-zinc-700"
                                >
                                    My Collection
                                </Link>
                                <Link
                                    href={'/profile'}
                                    className="font-medium lg:text-md text-sm text-gray-500 hover:underline hover:text-zinc-700"
                                >
                                    My Bookmarks
                                </Link>
                            </SignedIn>
                        </div>
                    </div>
                </section>
                {/* COPYRIGHT */}
                <section className="w-full text-center sm:text-md text-sm py-7 border-t border-zinc-200 mt-5 font-space font-medium text-gray-500">
                    © {currentYear} Uploadly. All rights reserved
                </section>
            </Container>
        </footer>
    );
};

export default Footer;
