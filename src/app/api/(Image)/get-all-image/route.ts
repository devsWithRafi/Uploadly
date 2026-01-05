import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const images = await prisma.image.findMany({
        include: {
            user: true,
            likes: true,
            bookmark: true,
            comments: true,
            _count: {
                select: {
                    likes: true,
                    comments: true
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!images) {
        return NextResponse.json(
            { success: false, error: 'Image collections are Empty!' },
            { status: 400 }
        );
    }

    return NextResponse.json(images);
}
