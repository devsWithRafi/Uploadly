import { ReactNode } from 'react';

import Navber from '@/components/layouts/Navber';
import Footer from '@/components/layouts/Footer';

const ProfileLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navber />
            <section className="bg-eliment w-full max-w-400 mx-auto min-h-screen pt-20">
                {children}
            </section>
            <Footer />
        </>
    );
};

export default ProfileLayout;
