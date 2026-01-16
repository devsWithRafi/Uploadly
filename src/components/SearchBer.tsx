'use client';
import { useFormateSlug } from '@/hooks/useFormateSlug';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBer = ({ className }: { className?: string }) => {
    const router = useRouter();
    const { formateSlug } = useFormateSlug();
    const [searchValue, setSearchValue] = useState({
        value: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchValue({
            ...searchValue,
            [name]: value.trim(),
        });
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/?search=${formateSlug(searchValue.value)}`);
    };
    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'w-full text-gray-500 flex items-center justify-between h-13 px-1 rounded-full text-[15px] bg-gray-100 overflow-hidden border-3 border-transparent hover:border-[#EA4C89]/20 focus-within:border-[#EA4C89]/20 focus-within:bg-transparent hover:bg-transparent duration-200',
                className
            )}
        >
            <input
                type="text"
                name="value"
                className="w-full border-0 outline-0 h-full px-3 font-poppins"
                placeholder="What are you looking for?"
                onChange={handleChange}
            />
            <button
                type="submit"
                className="bg-[#EA4C89] cursor-pointer p-2 rounded-full text-white hover:bg-[#EA4C89]/90 duration-200"
            >
                <FiSearch size={22} />
            </button>
        </form>
    );
};

export default SearchBer;
