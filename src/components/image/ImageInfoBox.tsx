import { imagesType } from '@/context/imagesContext/ImageContext';
import Image from 'next/image';
import ImageLikeButton from './ImageLikeButton';
import ImageCommentButton from './ImageCommentButton';
import ImageShareButton from './ImageShareButton';
import { HiOutlineDownload } from 'react-icons/hi';
import useDownload from '@/hooks/useDownload';
import { Spinner } from '../ui/spinner';

const ImageInfoBox = ({ image }: { image: imagesType }) => {
    const { handleDownload, loading } = useDownload();

    return (
        <section className="w-full flex flex-col gap-5 items-start">
            <h1 className="font-space font-semibold md:text-3xl sm:text-2xl text-xl">
                {image.title}
            </h1>
            <Image
                src={image.imageUrl}
                alt=""
                width={1000}
                height={0}
                className="w-full h-auto"
            />
            <div className="flex items-center sm:gap-5 gap-3">
                {/* LIKE BUTTON */}
                <span className="bg-gray-100 sm:w-17 sm:h-9 h-7.5 w-13 flex items-center justify-center rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white ease-in-out duration-300 group">
                    <ImageLikeButton
                        image={image}
                        iconStyle="sm:text-[22px] text-[17px]"
                        textStyle="group-hover:text-white duration-300"
                    />
                </span>
                {/* FEEDBACK BUTTON */}
                <span className="bg-gray-100 sm:w-17 sm:h-9 h-7.5 w-13 flex items-center justify-center rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white ease-in-out duration-300 group">
                    <ImageCommentButton
                        image={image}
                        iconStyle="sm:text-[20px] text-[15px] group-hover:text-white duration-300 hover:text-white"
                        textStyle="group-hover:text-white duration-300"
                    />
                </span>
                {/* SHARE BUTTON */}
                <span className="bg-gray-100 sm:w-17 sm:h-9 h-7.5 w-13 flex items-center justify-center rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white ease-in-out duration-300 group">
                    <ImageShareButton
                        image={image}
                        className="text-[22px] group-hover:text-white duration-300 hover:text-white"
                    />
                </span>
                {/* DOWNLOAD BUTTON */}
                <span className="bg-gray-100 sm:w-17 sm:h-9 h-7.5 w-13 flex items-center justify-center rounded-full cursor-pointer hover:bg-zinc-800 hover:text-white ease-in-out duration-300 group">
                    <button
                        onClick={(e) =>
                            handleDownload(e, image.imageUrl, image.title)
                        }
                    >
                        {!loading ? (
                            <HiOutlineDownload className="sm:text-[20px] text-[15px] text-zinc-500 group-hover:text-white duration-300" />
                        ) : (
                            <Spinner className="scale-[1.2] text-zinc-500" />
                        )}
                    </button>
                </span>
            </div>
            <p className="font-space text-zinc-500 md:text-xl text-sm mt-5">
                {image.description}
            </p>
        </section>
    );
};

export default ImageInfoBox;
