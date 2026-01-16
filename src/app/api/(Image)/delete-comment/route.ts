import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    const { commentId, userId, imageId } = await req.json();

    if (!commentId || !userId || !imageId) {
        return NextResponse.json(
            {
                success: false,
                error: 'ImageId, UserID& CommentID is required!',
            },
            { status: 400 }
        );
    }

    // FIND COMMENTS
    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId,
            userId,
            imageId,
        },
    });

    if (!comment) {
        return NextResponse.json(
            { success: false, error: 'Comment not found!' },
            { status: 404 }
        );
    }

    await prisma.comment.delete({
        where: {
            id: comment.id,
        },
    });
    return NextResponse.json(
        { success: true, message: 'Comment deleted success!' },
        { status: 200 }
    );
}
