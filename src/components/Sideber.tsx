'use client';

import { AddComments } from '@/actions/action';
import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiSendPlaneLine } from 'react-icons/ri';
import { BiMessageSquareError } from 'react-icons/bi';
import { Spinner } from './ui/spinner';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import RedirectToProfile from './RedirectToProfile';
import { Button } from './ui/button';
import { BiLogInCircle } from 'react-icons/bi';
import { useFeedbacks } from '@/context/feedbackContext/FeedbackContext';
import { RxCross2 } from 'react-icons/rx';
import DeleteFeedback from './DeleteFeedback';

const Sideber = ({
    isOpen,
    setIsOpen,
    image,
}: {
    isOpen?: boolean;
    setIsOpen?: () => void;
    image: imagesType;
}) => {
    const { fetchImages } = useImages();
    const [comment, setComment] = useState<string>('');
    const { currentUser } = useCurrentUser();
    const [loading, setLoading] = useState<boolean>(false);

    const { allFeedacks, fetchFeedbacks, isLoading } = useFeedbacks();

    useEffect(() => {
        if (isOpen) fetchFeedbacks();
    }, [isOpen]);

    const handleComment = async () => {
        setLoading(true);
        if (!comment) {
            toast.error('The comment box is epmty!');
            setLoading(false);
            return;
        }
        const userId = currentUser.id;
        const imageId = image.id;
        // server action
        await AddComments({ imageId, userId, comment });
        setComment('');
        fetchFeedbacks();
        fetchImages();

        setLoading(false);
    };

    return (
        <main
            className={cn(
                'fixed top-0 sm:w-120 w-full right-0 p-10 h-screen bg-white shadow-md ease duration-500',
                !isOpen ? 'translate-x-full' : 'translate-x-0'
            )}
        >
            <div className="font-poppins font-medium text-[20px] flex items-center justify-between border-b border-zinc-300 py-2">
                Feedbacks
                <button
                    onClick={setIsOpen}
                    className="cursor-pointer text-zinc-500 hover:-rotate-90 duration-300 hover:text-zinc-950"
                >
                    <RxCross2 size={25} />
                </button>
            </div>
            <section
                className={cn(
                    'relative max-h-full overflow-y-auto pt-5',
                    allFeedacks?.length < 1 &&
                        'flex items-center justify-center w-full h-full'
                )}
            >
                {/* COMMENTS */}

                {isLoading ? (
                    <span className="flex items-center gap-1 font-space text-zinc-500">
                        <Spinner />
                        Loading...
                    </span>
                ) : (
                    allFeedacks?.length > 0 && (
                        <div className="flex flex-col">
                            {allFeedacks?.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start py-3 gap-2 font-medium font-poppins group"
                                >
                                    {/* AVATER */}
                                    <RedirectToProfile image={image}>
                                        <Image
                                            src={item.user.image!}
                                            alt=""
                                            width={200}
                                            height={200}
                                            className="min-w-10 min-h-10 max-w-10 max-h-10 aspect-square rounded-full cursor-pointer"
                                        />
                                    </RedirectToProfile>
                                    <div className="flex mt-2 items-start justify-between w-full">
                                        <div>
                                            {/* Persons name */}
                                            <h2 className="text-[16px]">
                                                {item.user.name}
                                            </h2>
                                            {/* comment */}
                                            <h2 className="font-medium font-space text-[14px] text-zinc-600">
                                                {item.comment}
                                            </h2>
                                        </div>
                                        {/* comment delete button */}
                                        {currentUser &&
                                            item.userId === currentUser.id &&
                                            item.imageId === image.id && (
                                                <DeleteFeedback
                                                    commentId={item.id}
                                                    userId={currentUser.id}
                                                    imageId={item.imageId}
                                                    className="opacity-0 group-hover:opacity-100"
                                                />
                                            )}
                                    </div>
                                </div>
                            ))}

                            <span className="w-full h-50 mt-5 text-center font-poppins">
                                That’s all the feedback so far!
                            </span>
                        </div>
                    )
                )}
                {!isLoading && allFeedacks?.length < 1 && (
                    <div className="-mt-30 w-full h-full flex items-center justify-center flex-col text-center font-poppins">
                        <BiMessageSquareError
                            size={70}
                            className="text-zinc-400"
                        />
                        <h2 className="font-medium text-xl">
                            No comments yet.
                        </h2>
                        <h2 className="font-space text-zinc-500 text-md">
                            Be the first to comment.
                        </h2>
                    </div>
                )}
            </section>
            {/* COMMENT INPUT */}
            <div
                className={cn(
                    'w-full h-30 bg-white/90 backdrop-blur-[5px] absolute bottom-0 left-0 p-5 px-10',
                    loading && 'pointer-events-none select-none'
                )}
            >
                <SignedIn>
                    <div className="flex items-center justify-between border border-zinc-400 h-10 px-[5px] rounded-full gap-2">
                        <input
                            type="text"
                            placeholder="Write here..."
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            className="w-full border-0 outline-0 h-full pl-4 text-zinc-500"
                        />
                        <button
                            onClick={handleComment}
                            className={cn(
                                'flex items-center gap-1 rounded-full bg-zinc-200 px-3 py-[3px] font-poppins text-[15px] cursor-pointer select-none hover:bg-black hover:text-white ease-in-out duration-200',
                                loading && 'pointer-events-none select-none'
                            )}
                        >
                            {loading ? <Spinner /> : <RiSendPlaneLine />}
                            {loading ? 'Sening' : 'Send'}
                        </button>
                    </div>
                </SignedIn>
                <SignedOut>
                    <Link href="/signin">
                        <Button className="w-full p-5.5 font-poppins">
                            <BiLogInCircle /> Login
                        </Button>
                    </Link>
                </SignedOut>
            </div>
        </main>
    );
};

export default Sideber;
