'use client';

import { imagesType } from '@/context/imagesContext/ImageContext';
import { useCurrentUser } from '@/context/user-context/UserContext';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface RedirectToProfileProps {
    children: ReactNode;
    className?: string;
    image: imagesType;
}

const RedirectToProfile = ({
    children,
    className,
    image,
}: RedirectToProfileProps) => {
    const router = useRouter();
    const { currentUser } = useCurrentUser();
    const redirectToProfile = () => {
        if (
            currentUser?.clerkId.replaceAll(' ', '') ===
            image.user.clerkId.replaceAll(' ', '')
        ) {
            router.push('/profile');
        } else {
            router.push(`/profile/${image.user.clerkId}`);
        }
    };

    return (
        <section onClick={redirectToProfile} className={className}>
            {children}
        </section>
    );
};

export default RedirectToProfile;
