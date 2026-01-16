'use client';
import { useImages } from '@/context/imagesContext/ImageContext';
import { IoIosArrowDown } from 'react-icons/io';
import { BiCategoryAlt } from 'react-icons/bi';
import Link from 'next/link';
import { useFormateSlug } from '@/hooks/useFormateSlug';

const NavExploreButton = () => {
    const { images } = useImages();
    const { formateSlug } = useFormateSlug();
    const imageCatSet = new Set(images?.map((item) => item.category));
    const imageCategories = [...imageCatSet];
    return (
        <>
            <section className="hover:text-black relative transition-all cursor-pointer group">
                <button className="flex items-center justify-center gap-2">
                    Explore <IoIosArrowDown />
                </button>
                <div className="absolute bg-white left-0 w-50 shadow rounded-md mt-5 duration-300 overflow-hidden max-h-0 group-hover:max-h-100 opacity-0 group-hover:opacity-100 overflow-y-auto">
                    <span className="border-b py-3 px-5 w-full flex items-center gap-1 text-zinc-800">
                        <BiCategoryAlt />
                        Categoreis
                    </span>
                    {imageCategories && (
                        <div className="flex flex-col mt-5 font-normal text-zinc-500">
                            {imageCategories.length > 0 ? (
                                imageCategories?.map((item, idx) => (
                                    <Link
                                        href={`/?category=${formateSlug(
                                            item!
                                        )}`}
                                        key={idx}
                                        className="w-full px-5 py-2 hover:bg-gray-100 hover:text-zinc-900"
                                    >
                                        {item}
                                    </Link>
                                ))
                            ) : (
                                <span className="w-full px-5 py-2 hover:bg-gray-100 hover:text-zinc-900">
                                    Empty
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default NavExploreButton;
