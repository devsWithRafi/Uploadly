import { imagesType } from '@/context/imagesContext/ImageContext';
import Image from 'next/image';
import ImageLikeButton from './ImageLikeButton';
import ImageCommentButton from './ImageCommentButton';
import ImageShareButton from './ImageShareButton';

const ImageInfoBox = ({ image }: { image: imagesType }) => {
    return (
        <section className="w-full flex flex-col gap-5 items-start">
            <h1 className="font-space font-semibold text-3xl">{image.title}</h1>
            <Image
                src={image.imageUrl}
                alt=""
                width={1000}
                height={1000}
                className="w-full"
            />
            <div className="flex items-center gap-5">
                <span className="bg-gray-100 px-5 py-2 rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white ease-in-out duration-300">
                    <ImageLikeButton image={image} />
                </span>
                <span className="bg-gray-100 px-5 py-2 rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white ease-in-out duration-300">
                    <ImageCommentButton image={image} />
                </span>
                <span className="bg-gray-100 px-5 py-2 rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white ease-in-out duration-300">
                    <ImageShareButton image={image} />
                </span>
            </div>
            <p className="font-space text-zinc-500 text-xl mt-5">
                {image.description}
            </p>
        </section>
    );
};

export default ImageInfoBox;
