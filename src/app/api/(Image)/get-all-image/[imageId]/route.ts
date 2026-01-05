import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { imageId: string } }
) {
    const { imageId } = await params;
    if (!imageId) {
        return NextResponse.json(
            { success: false, error: 'Image not found!' },
            { status: 409 }
        );
    }

    const image = await prisma.image.findUnique({
        where: {
            id: imageId,
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
    });

    return NextResponse.json(image);
}
