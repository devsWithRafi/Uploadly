'use client';

import { createContext, ReactNode, useContext } from 'react';

import { User } from '@/generated/prisma/client';

type CurrentUser = User | null;

type UserContextType = {
    currentUser: User | null;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserDataProvider = ({
    currentUser,
    children,
}: {
    children: ReactNode;
    currentUser: CurrentUser | null;
}) => {
    return (
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('User context not found!');
    return context;
};
