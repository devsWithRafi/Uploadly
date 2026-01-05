import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const Container = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <section className={cn('px-3 max-w-400 mx-auto', className)}>
            {children}
        </section>
    );
};
