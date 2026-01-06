'use client';

import ImageBox from '@/components/image/ImageBox';
import { useImages } from '@/context/imagesContext/ImageContext';
import { useSearchber } from '@/context/serchber-context/SearchberContext';

const HomePage = () => {
    const { images } = useImages();
    const { value } = useSearchber();
    const query = value.trim().toLowerCase();

    const filterdImages =
        query === ''
            ? images
            : images?.filter((item) =>
                  [item.title, item.description, item.category].some((feild) =>
                      feild?.toLowerCase().includes(query)
                  )
              );

    console.log(filterdImages);

    return (
        <section className="w-full h-screen mt-30">
            <div className="grid grid-cols-3 gap-5 w-full">
                {filterdImages?.map((item) => (
                    <ImageBox key={item.id} image={item} />
                ))}
            </div>
        </section>
    );
};

export default HomePage;
