import { cn } from '@/lib/utils';
import { IoWarningOutline } from 'react-icons/io5';
import { Spinner } from './spinner';
import { ReactElement } from 'react';

interface DeletePopupProps {
    loading?: boolean;
    onDelete: () => void;
    onCancel: () => void;
    deleteItemName: string;
    deleteDescription?: ReactElement;
}

const DeletePopup = ({
    loading = false,
    onDelete,
    onCancel,
    deleteItemName,
    deleteDescription,
}: DeletePopupProps) => {
    return (
        <main className="bg-white w-120 max-[510px]:w-[95vw] rounded-2xl shadow-lg">
            <section
                className={cn(
                    'p-8 flex flex-col gap-2 items-center max-[510px]:p-5',
                    loading && 'opacity-[0.4] pointer-events-none select-none'
                )}
            >
                {/* WARNING ICON */}
                <div className="bg-red-400/5 p-2 rounded-full text-red-600">
                    <div className="bg-red-400/15 rounded-full p-3">
                        <IoWarningOutline className="text-[40px] max-[510px]:text-[35px]" />
                    </div>
                </div>
                {/* WARNINGS */}
                <h1 className="font-poppins mt-2 font-semibold text-2xl max-[510px]:text-xl text-center">
                    Delete {deleteItemName}
                </h1>
                {deleteDescription ? (
                    deleteDescription
                ) : (
                    <p className="font-space font-medium text-zinc-500 text-center text-[16px] max-[510px]:text-[14px]">
                        {`Are you sure you want to delete this ${deleteItemName}? This action
                    cannot be undone.`}
                    </p>
                )}

                {/* BUTTONS */}
                <div className="text-white mt-7 max-[510px]:mt-5 flex flex-row max-[510px]:flex-col-reverse max-[510px]:gap-2 items-center justify-between w-full gap-5 font-poppins text-[16px]">
                    <button
                        onClick={onCancel}
                        className="text-black border hover:bg-zinc-100 border-zinc-400 w-full p-3 rounded-sm cursor-pointer duration-200 max-[510px]:p-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className={cn(
                            'bg-red-600 border-red-600 border hover:bg-red-700 w-full p-3 rounded-sm cursor-pointer duration-200 max-[510px]:p-2'
                        )}
                    >
                        {loading ? (
                            <span className="flex items-center gap-1 justify-center">
                                <Spinner /> Deleting...
                            </span>
                        ) : (
                            <span>Delete</span>
                        )}
                    </button>
                </div>
            </section>
        </main>
    );
};

export default DeletePopup;
