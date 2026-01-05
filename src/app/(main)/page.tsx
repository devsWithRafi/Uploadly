'use client';

import ImageBox from '@/components/image/ImageBox';
import { useImages } from '@/context/imagesContext/ImageContext';

const HomePage = () => {
    const { images } = useImages();

    return (
        <section className="w-full h-screen mt-30">
            <div className="grid grid-cols-3 gap-5 w-full">
                {images?.map((item) => (
                    <ImageBox key={item.id} image={item} />
                ))}
            </div>
        </section>
    );
};

export default HomePage;
