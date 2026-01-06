'use client';

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react';

interface SearchberContextType {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}
const SearchberContext = createContext<SearchberContextType | null>(null);

export const SearchberContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [value, setValue] = useState<string>('');
    return (
        <SearchberContext.Provider value={{ value, setValue }}>
            {children}
        </SearchberContext.Provider>
    );
};

export const useSearchber = () => {
    const context = useContext(SearchberContext);
    if (!context) {
        throw new Error('Searcher context not found!');
    }
    return context;
};
