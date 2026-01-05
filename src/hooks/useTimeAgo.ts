// npm install date-fns
import { formatDistanceToNowStrict } from 'date-fns';
import { useEffect, useState } from 'react';

const getShortTimeAgo = (date: Date | string) => {
    const result = formatDistanceToNowStrict(new Date(date));

    return result
        .replace(' seconds', ' sec')
        .replace(' second', ' sec')
        .replace(' minutes', ' min')
        .replace(' minute', ' min')
        .replace(' hours', ' hr')
        .replace(' hour', ' hr')
        .replace(' days', ' day')
        .replace(' day', ' day')
        .replace(' months', ' month')
        .replace(' month', ' month')
        .replace(' years', ' yr')
        .replace(' year', ' yr');
};

export const useTimeAgo = (date: Date | string) => {
    const [timeAgo, setTimeAgo] = useState<string>('');

    useEffect(() => {
        const update = () => setTimeAgo(getShortTimeAgo(date));

        update();

        const internal = setInterval(update, 60 * 1000); // update every 1 min

        return () => clearInterval(internal);
    }, [date]);

    return timeAgo
};
