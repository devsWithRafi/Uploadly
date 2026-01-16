import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import Portal from './Portal';
import DeletePopup from './ui/DeletePopup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFeedbacks } from '@/context/feedbackContext/FeedbackContext';
import { useImages } from '@/context/imagesContext/ImageContext';
import { cn } from '@/lib/utils';

interface DeleteFeedbackProps {
    commentId: string | number;
    userId: string;
    imageId: string;
    className?: string;
}

const DeleteFeedback = ({
    commentId,
    userId,
    imageId,
    className,
}: DeleteFeedbackProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { fetchFeedbacks } = useFeedbacks();
    const { fetchImages } = useImages();

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await axios.delete('/api/delete-comment', {
                data: {
                    commentId,
                    userId,
                    imageId,
                },
            });

            if (res.status === 200) {
                toast.success('Feedback deleted successful!');
                fetchFeedbacks();
                fetchImages();
                setLoading(false);
                setIsOpen(false);
                return;
            } else {
                toast.error('Feedback deletion failed!');
                setLoading(false);
                return;
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    'cursor-pointer hover:text-red-700 duration-300',
                    className
                )}
            >
                <MdDeleteOutline size={17} />
            </button>

            <Portal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                <DeletePopup
                    loading={loading}
                    onCancel={() => setIsOpen(false)}
                    onDelete={handleDelete}
                    deleteItemName="Feedback"
                />
            </Portal>
        </>
    );
};

export default DeleteFeedback;
