'use client';

import { createContext, ReactNode, useContext } from 'react';
import type { Prisma } from '@prisma/client';

type CurrentUser = Prisma.UserGetPayload<{}> | null;

const UserContext = createContext<CurrentUser>(null);

export const UserDataProvider = ({
    currentUser,
    children,
}: {
    children: ReactNode;
    currentUser: CurrentUser;
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
