import { uploadToCloudinaryAndOverwrite } from '@/actions/cludinary/uploadToCloudinary';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const formData = await req.formData();
    const userId = formData.get('userId') as string;
    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const coverImageFile = formData.get('coverImage') as File | null;
    const profileImageFile = formData.get('profileImage') as File | null;
    const platforms = JSON.parse(formData.get('platforms') as string);

    // cheack user exist or not
    const isUserExist = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!isUserExist) {
        return NextResponse.json(
            { success: false, error: 'Sorry user not found!' },
            { status: 400 }
        );
    }

    const updatedData: any = { name, bio };

    // IUpload cover image if changed
    if (coverImageFile) {
        const bytes = await coverImageFile?.arrayBuffer();
        const buffer = bytes && Buffer.from(bytes);

        const uploaded = await uploadToCloudinaryAndOverwrite(
            buffer,
            // old public id needed for replacing image
            isUserExist.coverImagePublicId || undefined
        );

        updatedData.coverImage = uploaded.secure_url;
        updatedData.coverImagePublicId = uploaded.public_id;
    }

    // Upload profile image if changed
    if (profileImageFile) {
        const bytes = await profileImageFile?.arrayBuffer();
        const buffer = bytes && Buffer.from(bytes);

        const uploaded = await uploadToCloudinaryAndOverwrite(
            buffer,
            // old public id needed for replacing image
            isUserExist.imagePublicId || undefined
        );

        updatedData.image = uploaded.secure_url;
        updatedData.imagePublicId = uploaded.public_id;
    }

    await prisma.user.update({
        where: { id: userId },
        data: updatedData,
    });

    await prisma.social.upsert({
        where: { userId },
        update: { platforms: platforms },
        create: {
            userId,
            platforms: platforms,
        },
    });

    return NextResponse.json(
        { success: true, message: 'Profile updated successful!' },
        { status: 200 }
    );
}
