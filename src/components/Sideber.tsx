'use client';
import { AddComments } from '@/actions/action';
import { imagesType, useImages } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { User } from '@/generated/prisma/client';
import { cn } from '@/lib/utils';
import axios from 'axios';
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

interface CommentsType {
    id: number | string;
    comment: string;
    userId: string;
    imageId: string;
    user: User;
}

const Sideber = ({ isOpen, image }: { isOpen: boolean; image: imagesType }) => {
    const { fetchImages } = useImages();
    const [comment, setComment] = useState<string>('');
    const { currentUser } = useCurrentUser();
    const [allComments, setAllComments] = useState<CommentsType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const showComments = async () => {
        try {
            const res = await axios.post('/api/get-all-comments', {
                imageId: image.id,
            });
            const data = await res.data;
            if (!data) {
                console.log('Oops comments data not found!');
                setAllComments([]);
                return;
            }
            setAllComments(data);
        } catch (error) {
            setAllComments([]);
            console.log(error);
        }
    };

    useEffect(() => {
        showComments();
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
        await AddComments({ imageId, userId, comment });
        setComment('');
        showComments();
        fetchImages();

        setLoading(false);
    };

    return (
        <main
            className={cn(
                'fixed top-0 w-120 right-0 p-10 h-screen bg-white shadow-md ease duration-500',
                !isOpen ? 'translate-x-full' : 'translate-x-0'
            )}
        >
            <div className="font-poppins font-medium text-[20px]">
                Feedbacks
            </div>
            <section
                className={cn(
                    'relative max-h-full overflow-y-auto',
                    allComments?.length < 1 &&
                        'flex items-center justify-center w-full h-full'
                )}
            >
                {/* COMMENTS */}
                {allComments?.length > 0 && (
                    <div className="flex flex-col">
                        {allComments?.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start py-3 gap-2 font-medium font-poppins"
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
                                <div>
                                    {/* Persons name */}
                                    <h2 className="mt-2 text-[16px]">
                                        {item.user.name}
                                    </h2>
                                    {/* comment */}
                                    <h2 className="font-medium font-space text-[14px] text-zinc-600">
                                        {item.comment}
                                    </h2>
                                </div>
                            </div>
                        ))}

                        <span className="w-full h-50 mt-5 text-center font-poppins">
                            That’s all the feedback so far!
                        </span>
                    </div>
                )}
                {allComments?.length < 1 && (
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
