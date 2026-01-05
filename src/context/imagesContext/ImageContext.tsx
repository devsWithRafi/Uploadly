'use client';

import { Image, User } from '@/generated/prisma/client';
import axios from 'axios';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import { useCurrentUser } from '../user-context/UserContext';

type imgLikes = {
    id?: number | string;
    userId: string;
    imageId: string;
};

type imgComment = {
    id?: number | string;
    comment: string;

    userId: string;
    imageId: string;
};

type imgBookmark = imgLikes;

type image = Image & {
    likes: imgLikes[];
    comments: imgComment[];
    bookmark: imgBookmark[];
    _count: {
        likes: number;
        comments: number;
    };
};
export type imagesType = image & {
    user: User;
};

interface ImageContextType {
    images: imagesType[] | null;
    fetchImages: () => void;
}

const ImageContext = createContext<ImageContextType | null>(null);

export const ImageDataProvider = ({ children }: { children: ReactNode }) => {
    const [images, setImages] = useState<imagesType[] | null>(null);
    const { currentUser } = useCurrentUser();

    const fetchImages = async () => {
        try {
            const res = await axios.get('/api/get-all-image');
            if (res.data.success === false) {
                console.log('Image fetch faild!');
                return;
            }
            setImages(res.data);
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong! image fetch error');
        }
    };

    useEffect(() => {
        fetchImages();
    }, [currentUser?.id]);

    return (
        <ImageContext.Provider value={{ images, fetchImages }}>
            {children}
        </ImageContext.Provider>
    );
};

// HOOK
export const useImages = () => {
    const context = useContext(ImageContext);
    if (!context) throw new Error('Error: Image context is empty!');
    return context;
};
