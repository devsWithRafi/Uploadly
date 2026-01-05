import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex bg-gray-100 items-center justify-center w-screen h-screen">
            {children}
            <Toaster />
        </div>
    );
};

export default AuthLayout;
