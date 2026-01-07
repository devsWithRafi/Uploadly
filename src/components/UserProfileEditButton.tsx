import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import Portal from './Portal';
import UserProfileUpdateForm from './UserProfileUpdateForm';

const UserProfileEditButton = () => {
    const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);
    return (
        <button
            onClick={() => setUpdateFormOpen((prev) => !prev)}
            className="absolute bg-white min-w-8 max-w-8 h-8 rounded-full flex items-center justify-center bottom-3 right-3 shadow-md cursor-pointer font-poppins capitalize text-[13px] group hover:px-3 hover:max-w-100 duration-300 overflow-hidden"
        >
            <FiEdit />
            <span className="group-hover:max-w-50 opacity-0 group-hover:opacity-100 max-w-0 group-hover:ml-1 overflow-hidden p-0 duration-300">
                Edit profile
            </span>
            {/* PORTAL */}
            <Portal
                isOpen={updateFormOpen}
                setIsOpen={() => setUpdateFormOpen(!updateFormOpen)}
            >
                <UserProfileUpdateForm setIsOpen={setUpdateFormOpen} />
            </Portal>
        </button>
    );
};

export default UserProfileEditButton;
