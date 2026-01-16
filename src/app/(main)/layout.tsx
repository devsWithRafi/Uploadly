import Footer from '@/components/layouts/Footer';
import Navber from '@/components/layouts/Navber';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navber />
            <main className="px-3 max-w-400 mx-auto">{children}</main>
            <Footer />
        </>
    );
};

export default layout;
