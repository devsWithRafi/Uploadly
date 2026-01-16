import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsProps {
    params: Promise<{ imageId: string }>;
}

export async function GET(req: NextRequest, context: ParamsProps) {
    const { imageId } = await context.params;
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
            comments: true,
            _count: {
                select: {
                    likes: true,
                    comments: true,
                },
            },
        },
    });

    return NextResponse.json(image);
}
