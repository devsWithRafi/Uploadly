'use client';
import Image from 'next/image';

const Aveter = ({ image }: { image: string }) => {
    return (
        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
            {image && (
                <Image
                    src={image}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full"
                />
            )}
        </div>
    );
};

export default Aveter;
