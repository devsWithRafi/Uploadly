import { ReactNode } from 'react';
import { ImageDataProvider } from './ImageContext';

const ImageProvider = ({ children }: { children: ReactNode }) => {
    return <ImageDataProvider>{children}</ImageDataProvider>;
};

export default ImageProvider;
