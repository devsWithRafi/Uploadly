import Image from 'next/image';
import logo from '@/assets/logo.png';

const Logo = () => {
    return (
        <div className="flex items-center justify-center font-poppins font-bold text-black text-3xl">
            <Image
                src={logo}
                alt="logo"
                width={50}
                height={50}
                className="w-12.5 h-12.5 select-none pointer-events-none"
            />
            Uploadly
        </div>
    );
};

export default Logo;
