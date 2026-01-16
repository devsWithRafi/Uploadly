import { imagesType } from '@/context/imagesContext/ImageContext';
import { HiOutlineDownload } from 'react-icons/hi';
import { Spinner } from '../ui/spinner';
import useDownload from '@/hooks/useDownload';

const ImageDownloadBtn = ({ image }: { image: imagesType }) => {
    const { handleDownload, loading } = useDownload();

    return (
        <button
            onClick={(e) => handleDownload(e, image.imageUrl, image.title)}
            className="h-10 w-10 bg-white shadow text-black flex items-center justify-center rounded-full cursor-pointer hover:text-gray-600 text-[20px] max-[500px]:text-[18px] max-[500px]:h-9 max-[500px]:w-9"
        >
            {!loading ? (
                <HiOutlineDownload />
            ) : (
                <Spinner className="scale-[1.3] max-[500px]:scale-100" />
            )}
        </button>
    );
};

export default ImageDownloadBtn;
