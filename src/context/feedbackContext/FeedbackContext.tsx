import { User } from '@/generated/prisma/client';
import axios from 'axios';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface CommentsType {
    id: number | string;
    comment: string;
    userId: string;
    imageId: string;
    user: User;
}

interface FeedbackContextType {
    allFeedacks: CommentsType[];
    isLoading: boolean;
    imageId: string;
    fetchFeedbacks: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export const FeedbacksContextProvider = ({
    children,
    imageId,
}: {
    children: ReactNode;
    imageId: string;
}) => {
    const [allFeedacks, setAllFeedbacks] = useState<CommentsType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchFeedbacks = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/get-all-comments/${imageId}`);
            const data = await res.data;

            if (!data) {
                console.log('Oops comments data not found!');
                setAllFeedbacks([]);
                setIsLoading(false);
                return;
            }
            setAllFeedbacks(data);
        } catch (error) {
            setAllFeedbacks([]);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FeedbackContext.Provider
            value={{ allFeedacks, fetchFeedbacks, imageId, isLoading }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

// HOOKS
export const useFeedbacks = () => {
    const context = useContext(FeedbackContext);
    if (!context) throw new Error('Feedbacks context not found!');
    return context;
};
