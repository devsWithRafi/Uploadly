export const useFormateSlug = () => {
    const formateSlug = (text: string) => {
        return text
            .trim()
            .replaceAll(' ', '-')
            .replaceAll('&', '')
            .toLowerCase();
    };

    return {formateSlug};
};
