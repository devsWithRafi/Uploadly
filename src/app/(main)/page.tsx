'use client';

import ImageBox from '@/components/image/ImageBox';
import ImageNotFound from '@/components/ImageNotFound';
import { useImages } from '@/context/imagesContext/ImageContext';
import { useFormateSlug } from '@/hooks/useFormateSlug';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const { images } = useImages();
    const { formateSlug } = useFormateSlug();
    const router = useRouter();

    const searchParams = useSearchParams();
    const searchCategory = searchParams.get('category');
    const searchImage = searchParams.get('search');
    const imageCategories = new Set(images?.map((item) => item.category));

    const [catSelected, setCatSelected] = useState<string>('discover');

    const query: string = searchImage!;
    const filterdImages = !query
        ? images
        : images?.filter((item) =>
              [item.title, item.description, item.category].some((feild) =>
                  formateSlug(feild!).includes(query)
              )
          );

    const categoryImages = images?.filter(
        (item) => formateSlug(item.category!) === searchCategory
    );

    useEffect(() => {
        const settingCategory = () => {
            if (searchCategory) {
                const cetegory = categoryImages?.map(
                    (item) => item.category
                )[0];
                setCatSelected(cetegory!);
            } else if (searchImage) {
                const cetegory = filterdImages?.map((item) => item.category)[0];
                setCatSelected(cetegory!);
            } else {
                setCatSelected('discover');
            }
        };
        settingCategory();
    }, [searchCategory, searchImage]);

    return (
        <section className="w-full min-h-screen md:mt-30 mt-15 md:p-0 py-10 flex flex-col items-center">
            {images && (
                <div className="flex text-nowrap items-center border-b mt-5 border-zinc-200 font-poppins md:text-[15px] text-[13px] font-medium overflow-x-auto overflow-hidden md:w-auto w-[90%]">
                    {[...imageCategories].length > 0 &&
                        ['discover', ...imageCategories]
                            ?.slice(0, 9)
                            .map((item, idx) => (
                                <span
                                    onClick={() => (
                                        item !== 'discover'
                                            ? router.push(
                                                  `/?category=${formateSlug(
                                                      item!
                                                  )}`
                                              )
                                            : router.push(`/`),
                                        setCatSelected(item!)
                                    )}
                                    key={idx}
                                    className={cn(
                                        'cursor-pointer border-b-2 border-transparent p-1 px-3 capitalize duration-300 text-zinc-500 hover:text-zinc-800',
                                        catSelected === item &&
                                            'border-zinc-700 text-zinc-800'
                                    )}
                                >
                                    {item?.slice(0, 20)}
                                </span>
                            ))}
                </div>
            )}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-full py-20">
                {!searchCategory &&
                    filterdImages?.map((item) => (
                        <ImageBox key={item.id} image={item} />
                    ))}
                {searchCategory &&
                    categoryImages?.map((item) => (
                        <ImageBox key={item.id} image={item} />
                    ))}
            </div>
            {images &&
                (filterdImages?.length ?? 0) === 0 &&
                (categoryImages?.length ?? 0) === 0 && <ImageNotFound />}
        </section>
    );
};

export default HomePage;
