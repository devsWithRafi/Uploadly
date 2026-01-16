import Link from 'next/link';
import backgroundImage404 from '@/assets/background404.webp'

const bgImg =
    'https://www.typecalendar.com/wp-content/uploads/2023/09/Free-White-Background-Template.jpg?gid=989';

const NotFoundPage = () => {
    return (
        <section className="w-screen font-poppins h-screen capitalize text-zinc-900 gap-5 flex flex-col items-center justify-center px-5">
            <div
                style={{ backgroundImage: `url(${bgImg})` }}
                className="bg-cover bg-center bg-no-repeat w-full h-full fixed top-0 left-0 right-0 bottom-0 -z-1 opacity-[0.8] blur-sm"
            />
            <div className="lg:text-[25rem] text-[15rem] max-[545px]:text-[9rem] font-medium text-zinc-400/80 pointer-events-none select-none">
                404
            </div>
            <h2 className="font-space lg:text-3xl text-xl font-medium text-gray-800 -mt-20 max-[545px]:-mt-10 text-center">
                Sorry, that page could not be found!
            </h2>
            <Link href="/" className="bg-zinc-800 rounded lg:px-6 px-5 lg:py-3 py-2 text-white mt-2 lg:text-[17px] text-[14px]">
                Back to home
            </Link>
        </section>
    );
};

export default NotFoundPage;
