import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsProps {
    params: {
        imageId: string;
    };
}

export async function GET(req: NextRequest, context: ParamsProps) {
    const { imageId } = await context.params;
    
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
