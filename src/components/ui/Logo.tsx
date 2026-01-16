import Image from 'next/image';
import logo from '@/assets/logo.png';
import { cn } from '@/lib/utils';
interface LogoProps {
    imgClassName?: string;
    textClassName?: string;
}
const Logo = ({ imgClassName, textClassName }: LogoProps) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center font-poppins font-bold text-black text-3xl',
                textClassName
            )}
        >
            <Image
                src={logo}
                alt="logo"
                width={50}
                height={50}
                className={cn(
                    'w-12.5 h-12.5 select-none pointer-events-none',
                    imgClassName
                )}
            />
            Uploadly
        </div>
    );
};

export default Logo;
