import Image from 'next/image';
import NotFoundImage from '@/assets/image404.png';
const ImageNotFound = () => {
    return (
        <section className="flex flex-col gap-2 font-poppins items-center justify-center w-full h-full">
            <Image
                src={NotFoundImage}
                alt=""
                width={1000}
                height={1000}
                className="sm:w-130 w-100 h-auto select-none pointer-events-none -mt-10"
            />
            <h2 className='sm:text-3xl text-xl font-medium'>No results found</h2>
            <p className='text-zinc-500 sm:text-md text-sm text-center px-2'>It seems we can’t find any results based on your search.</p>
        </section>
    );
};

export default ImageNotFound;
