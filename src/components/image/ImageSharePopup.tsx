import Logo from '../ui/Logo';
import { useState } from 'react';
import { FiLink } from 'react-icons/fi';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { cn } from '@/lib/utils';
import { FaFacebookF } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa6';
import { FaPinterestP } from 'react-icons/fa';

const ImageSharePopup = () => {
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);

    const shareLinks = [
        {
            platform: 'directLink',
            link: `${encodedUrl}`,
            icon: <FiLink />,
        },
        {
            platform: 'facebook',
            link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: <FaFacebookF />,
        },
        {
            platform: 'linkedin',
            link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            icon: <FaLinkedinIn />,
        },
        {
            platform: 'pinterest',
            link: `https://pinterest.com/pin/create/button/?url=${encodedUrl}`,
            icon: <FaPinterestP />,
        },
        {
            platform: 'twitter',
            link: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
            icon: <FaXTwitter />,
        },
        {
            platform: 'whatsapp',
            link: `https://wa.me/?text=${encodeURIComponent(
                `Check this out ${currentUrl}`
            )}`,
            icon: <FaWhatsapp />,
        },
    ];

    const [selected, setSelected] = useState<string>(shareLinks[0].platform);
    const [selectedLink, setSelectedLink] = useState<string>(
        shareLinks[0].link
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const handleSelecting = (platform: string, link: string) => {
        setSelected(platform);
        setSelectedLink(link);
    };

    const copyToClickBoard = async (text: string) => {
        setLoading(true);
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setLoading(false);
        setTimeout(() => setCopied(false), 3000);
    };
    return (
        <main className="bg-zinc-100 w-130 max-[580px]:w-[95vw] rounded-xl p-10 max-[580px]:p-4 max-[580px]:px-8 px-15">
            <div className='max-[580px]:scale-[0.8]'>
                <Logo />
            </div>
            {/* SOCIALS LINKS */}
            <section className="py-5 mt-3 border-t border-gray-300">
                <h2 className="font-poppins mb-5 text-2xl max-[580px]:text-xl font-medium">
                    Share this link
                </h2>
                <div className="flex max-[580px]:flex-wrap max-[580px]:gap-5 items-center justify-between w-full">
                    {shareLinks.map((item, index) => (
                        <button
                            onClick={() =>
                                handleSelecting(item.platform, item.link)
                            }
                            key={index}
                            className={cn(
                                'w-13 h-13 max-[580px]:w-10 max-[580px]:h-10 cursor-pointer overflow-hidden bg-white shadow flex items-center justify-center rounded-full ease duration-300 hover:scale-[1.1] hover:shadow-xl/50 hover:shadow-parple hover:bg-parple hover:text-white',
                                selected === item.platform &&
                                    'scale-[1.1] shadow-xl/50 shadow-parple bg-parple text-white'
                            )}
                        >
                            <span className='text-[20px] max-[580px]:text-[15px]'>{item.icon}</span>
                        </button>
                    ))}
                </div>
                <div className="w-full mt-10 overflow-hidden border-2 border-zinc-500 px-5 h-12 max-[580px]:h-10 max-[580px]:rounded-md rounded-xl flex items-center justify-center font-space text-zinc-500">
                    <span className="w-full overflow-x-auto text-nowrap">
                        {selectedLink}
                    </span>
                </div>
                {/* COPY BUTTON */}
                <Button
                    onClick={() => copyToClickBoard(selectedLink)}
                    className="w-full p-6 max-[580px]:p-5 mt-3 cursor-pointer duration-300"
                >
                    {loading ? (
                        <Spinner />
                    ) : copied ? (
                        <>
                            Copied
                        </>
                    ) : (
                        <>Copy</>
                    )}
                </Button>
            </section>
        </main>
    );
};

export default ImageSharePopup;
