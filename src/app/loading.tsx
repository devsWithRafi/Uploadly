import logo from '@/assets/logo.png';
import Image from 'next/image';

const PageLoader = () => {
    return (
        <section className="fixed bg-white top-0 bottom-0 left-0 right-0 w-screen h-screen flex items-center justify-center">
            <div className="bg-white overflow-hidden relative w-20 h-20 aspect-square rounded-full flex items-center justify-center shadow-md">
                <span className="bg-white absolute animate-spin w-full h-full rounded-full border-t-zinc-500 border-t-2" />
                <Image
                    src={logo}
                    alt=""
                    width={50}
                    height={50}
                    className="w-full h-full scale-[0.7] select-none pointer-events-none"
                />
            </div>
        </section>
    );
};

export default PageLoader;
