import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const { userId, imageId, title, description, category } = await req.json();

    if (!userId || !imageId || !title || !description || !category) {
        return NextResponse.json(
            { success: false, error: 'All fileds are required!' },
            { status: 409 }
        );
    }

    // FIND IMAGE
    const imageExist = await prisma.image.findFirst({
        where: {
            id: imageId,
            userId,
        },
    });

    if (!imageExist) {
        return NextResponse.json(
            { success: false, error: 'Image not found!' },
            { status: 409 }
        );
    }

    // EDIT IMAGE
    await prisma.image.update({
        where: {
            id: imageId,
            userId,
        },
        data: {
            title,
            description,
            category,
        },
    });

    return NextResponse.json(
        { success: true, message: 'Image Updated successful!' },
        { status: 200 }
    );
}
