import { Social } from '@/generated/prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useUsersSocials = (userId: string) => {
    const [data, setData] = useState<Social | null>();
    const fetchSocial = async () => {
        try {
            const res = await axios.post('/api/get-user-socials', { userId });
            const data = res.data;

            if (!data) throw new Error('Data not found');

            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSocial();
    }, [userId]);

    return data;
};
