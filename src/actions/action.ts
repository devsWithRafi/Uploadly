'use server';

import prisma from '@/lib/prisma';

type AddLikesType = {
    userId: string;
    imageId: string;
};

type AddBookMarkType = AddLikesType;
type AddCommentType = AddLikesType & {
    comment: string;
};

// ADD LIKES TO IMAGE
export async function AddLikes({ userId, imageId }: AddLikesType) {
    const alreayLiked = await prisma.like.findUnique({
        where: {
            userId_imageId: {
                userId,
                imageId,
            },
        },
    });

    if (alreayLiked) {
        await prisma.like.delete({
            where: { id: alreayLiked.id },
        });
        return { liked: false };
    } else {
        await prisma.like.create({
            data: { userId, imageId },
        });
        return { liked: true };
    }
}
// ADD IMAGE TO BOOKMARK
export async function AddToBookMark({ userId, imageId }: AddBookMarkType) {
    const alreayBookmarked = await prisma.bookmark.findFirst({
        where: {
            userId,
            imageId,
        },
    });

    if (alreayBookmarked) {
        await prisma.bookmark.delete({
            where: { id: alreayBookmarked.id },
        });
        return { bookMarked: false };
    } else {
        await prisma.bookmark.create({
            data: { userId, imageId },
        });
        return { bookMarked: true };
    }
}
// ADD IMAGE TO BOOKMARK
export async function AddComments({
    userId,
    imageId,
    comment,
}: AddCommentType) {
    if (!userId || !comment || !imageId) return;

    await prisma.comment.create({
        data: {
            userId,
            imageId,
            comment,
        },
    });

    return { commented: true };
}
