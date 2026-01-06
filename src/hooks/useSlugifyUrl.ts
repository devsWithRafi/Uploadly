import slugify from 'slugify';

export const useSlugifyUrl = (title: string, id: string) => {
    const shortTitle = title.slice(0, 60).trim();
    const slug = slugify(shortTitle, {
        lower: true,
        strict: true,
    });

    return `${slug}--${id}`;
};
