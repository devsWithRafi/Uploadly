import React, { ReactNode } from 'react';
import { UserDataProvider } from './UserContext';
import { User } from '@/generated/prisma/client';

const CurrentUserProvider = ({
    currentUser,
    children,
}: {
    children: ReactNode;
    currentUser: User | null;
}) => {
    return (
        <UserDataProvider currentUser={currentUser}>
            {children}
        </UserDataProvider>
    );
};

export default CurrentUserProvider;
