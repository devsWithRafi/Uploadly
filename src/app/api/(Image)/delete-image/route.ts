import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    const { imageId, userId } = await req.json();

    if (!imageId || !userId) {
        return NextResponse.json(
            { success: false, error: 'Image id and user id is required!' },
            { status: 401 }
        );
    }

    const image = await prisma.image.findUnique({
        where: { id: imageId, userId },
    });

    if (!image) {
        return NextResponse.json(
            { success: false, error: 'Image not found!' },
            { status: 409 }
        );
    }

    await prisma.image.delete({
        where: { id: image.id },
    });

    return NextResponse.json(
        { success: true, message: 'Image deleted successful!' },
        { status: 200 }
    );
}
