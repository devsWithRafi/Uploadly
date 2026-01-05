import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId } = await req.json();
    if (!userId) {
        return NextResponse.json(
            { success: false, error: 'Image not found!' },
            { status: 409 }
        );
    }

    const image = await prisma.image.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
            likes: true,
            _count: {
                select: {
                    likes: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return NextResponse.json(image);
}
