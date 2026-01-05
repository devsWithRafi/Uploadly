import { uploadToCloudinary } from '@/actions/cludinary/uploadToCloudinary';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const userId = formData.get('userId') as string;
    const imageFile = formData.get('image') as File;

    if (!title || !description || !imageFile || !userId || !category) {
        return NextResponse.json(
            { success: false, error: 'Missing required fields' },
            { status: 400 }
        );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // UPLOAD IMAGE TO CLOUDINARY
    const imgData = await uploadToCloudinary(buffer);
    const imageUrl = imgData.secure_url;

    if (!imageUrl) {
        return NextResponse.json(
            { success: false, error: 'Upload fail!' },
            { status: 500 }
        );
    }

    // CREATE NEW IMAGE
    const image = await prisma.image.create({
        data: {
            title,
            description,
            category,
            userId,
            imageUrl,
        },
    });

    if (!image) {
        return NextResponse.json(
            { success: false, error: 'Image Upload fail!' },
            { status: 500 }
        );
    }
    return NextResponse.json(
        { success: true, message: 'Image upload successful' },
        { status: 200 }
    );
}
