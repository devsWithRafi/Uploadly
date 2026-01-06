import React, { ReactNode } from 'react';
import { SearchberContextProvider } from './SearchberContext';

const SearchberProvider = ({ children }: { children: ReactNode }) => {
    return <SearchberContextProvider>{children}</SearchberContextProvider>;
};

export default SearchberProvider;
