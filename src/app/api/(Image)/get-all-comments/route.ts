import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { imageId } = await req.json();
    if (!imageId) {
        return NextResponse.json(
            { success: false, error: 'Image id is required!' },
            { status: 400 }
        );
    }

    const comments = await prisma.comment.findMany({
        where: { imageId },
        include: {
            user: true,
        },
    });

    if (!comments) {
        return NextResponse.json(
            { success: false, error: 'Oops comment is empty' },
            { status: 400 }
        );
    }

    return NextResponse.json(comments);
}
