'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: () => void;
}

const Portal = ({ children, isOpen, setIsOpen }: PortalProps) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow || 'auto';
        };
    }, [isOpen]);

    if (!mounted) return null;

    // POETAL
    return createPortal(
        <section
            onClick={setIsOpen}
            className={cn(
                'w-screen h-screen left-0 right-0 top-0 bottom-0 fixed flex items-center justify-center z-[999] bg-black/35 inset-0 ease-in-out duration-300',
                isOpen
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
            )}
        >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </section>,
        document.body
    );
};

export default Portal;
