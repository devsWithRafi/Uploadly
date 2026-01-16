import { MouseEvent, useState } from 'react';

const useDownload = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDownload = async (
        e: MouseEvent<HTMLButtonElement>,
        imageUrl: string,
        imageTitle: string
    ) => {
        e.preventDefault();
        try {
            setLoading(true);
            const imgRes = await fetch(imageUrl);
            if (!imgRes.ok) {
                setLoading(false);
                return;
            }

            const blob = await imgRes.blob();

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `Uploadly-${imageTitle.slice(0, 10)}`;

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            URL.revokeObjectURL(downloadLink.href);
            setLoading(false);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleDownload,
        loading,
    };
};

export default useDownload;
