'use client';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { Button } from '../ui/button';
import Portal from '../Portal';
import UploadImageForm from './UploadImageForm';
import { useState } from 'react';

const FirstUploadImageBox = () => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
    return (
        <section className="border-2 w-full aspect-[2/1.5] rounded-xl border-zinc-200 border-dashed flex flex-col gap-2 items-center justify-center p-5 text-center">
            <MdOutlineCloudUpload size={100} className="text-[#787eff] z-1" />
            <h2 className="font-poppins font-semibold text-2xl">
                Upload your first shot
            </h2>
            <p className="text-[15px] font-medium font-space text-zinc-500 w-[80%]">
                Show off your best work. Get feedback, likes and be a part of a
                growing community.
            </p>
            <Button
                onClick={() => setIsUploadOpen((prev) => !prev)}
                className="p-6 rounded-full cursor-pointer font-space mt-5"
            >
                Upload your first shot
            </Button>
            {/* IMAGE UPLOAD POPUP */}
            <Portal
                isOpen={isUploadOpen}
                setIsOpen={() => setIsUploadOpen((prev) => !prev)}
            >
                <UploadImageForm />
            </Portal>
        </section>
    );
};

export default FirstUploadImageBox;
