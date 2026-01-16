import { ReactNode } from 'react';
import { FeedbacksContextProvider } from './FeedbackContext';

interface FeedbacksProviderProps {
    children: ReactNode;
    imageId: string;
}
const FeedbacksProvider = ({ imageId, children }: FeedbacksProviderProps) => {
    return (
        <FeedbacksContextProvider imageId={imageId}>
            {children}
        </FeedbacksContextProvider>
    );
};

export default FeedbacksProvider;
