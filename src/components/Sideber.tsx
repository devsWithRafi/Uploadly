import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { RiSendPlaneLine } from 'react-icons/ri';

const avater =
    'https://cdn.dribbble.com/users/1139587/avatars/normal/1505eea2a08ad61ec8f358fd2765da6e.png?1693764784';

const Sideber = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <main
            className={cn(
                'fixed top-0 w-120 right-0 p-5 pt-28 h-screen bg-white shadow-md ease duration-500',
                !isOpen ? 'translate-x-full' : 'translate-x-0'
            )}
        >
            <div className="font-poppins font-medium text-[20px] px-5">
                Feedbacks
            </div>
            <section className="relative max-h-full overflow-y-auto p-5">
                {/* COMMENTS */}
                <div className="flex flex-col">
                    {[...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-start py-3 gap-2 font-medium font-poppins"
                        >
                            {/* AVATER */}
                            <Link href={'/'}>
                                <Image
                                    src={avater}
                                    alt=""
                                    width={200}
                                    height={200}
                                    className="min-w-10 min-h-10 max-w-10 max-h-10 aspect-square rounded-full"
                                />
                            </Link>
                            <div>
                                {/* Persons name */}
                                <h2 className="mt-2 text-[16px]">
                                    Dmitry Lepisov
                                </h2>
                                {/* comment */}
                                <h2 className="mt-2 font-medium font-space text-[14px] text-zinc-600">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Inventore numquam dolor
                                    est fugiat similique accusantium a
                                    perspiciatis natus ad nostrum!
                                </h2>
                                <span className="mt-2 font-normal font-space text-[13px] text-zinc-500">
                                    15 minutes
                                </span>
                            </div>
                        </div>
                    ))}
                    <span className="w-full h-50 mt-5 text-center font-poppins">
                        That’s all the feedback so far!
                    </span>
                </div>
            </section>
            {/* COMMENT INPUT */}
            <div className="w-full h-30 bg-white/90 backdrop-blur-[5px] absolute bottom-0 left-0 p-5 px-10">
                <div className="flex items-center justify-between border border-zinc-400 h-10 px-[5px] rounded-full gap-2">
                    <input
                        type="text"
                        placeholder="Write here..."
                        className="w-full border-0 outline-0 h-full pl-4 text-zinc-500"
                    />
                    <span className="flex items-center gap-1 rounded-full bg-zinc-200 px-3 py-[3px] font-poppins text-[15px] cursor-pointer select-none hover:bg-black hover:text-white ease-in-out duration-200">
                        <RiSendPlaneLine />
                        Send
                    </span>
                </div>
            </div>
        </main>
    );
};

export default Sideber;
