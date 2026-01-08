import { uploadToCloudinaryAndOverwrite } from '@/actions/cludinary/uploadToCloudinary';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const formData = await req.formData();
    const userId = formData.get('userId') as string;
    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const coverImageFile = formData.get('coverImage') as File | null;
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
    // If user change there image
    if (coverImageFile) {
        const bytes = await coverImageFile?.arrayBuffer();
        const buffer = bytes && Buffer.from(bytes);

        // old public id needed for replacing image
        const coverImageOldPublicId = isUserExist.coverImagePublicId;
        const image = coverImageOldPublicId
            ? await uploadToCloudinaryAndOverwrite(
                  buffer,
                  coverImageOldPublicId
              )
            : await uploadToCloudinaryAndOverwrite(buffer);
        // prisma.$transaction means it can perform
        // multiple oparetion at the same time
        await prisma.$transaction([
            prisma.user.update({
                where: { id: userId },
                data: {
                    name,
                    bio,
                    coverImage: image.secure_url,
                    coverImagePublicId: image.public_id,
                },
            }),
            // prisma upsert() -> means if the table already exist then
            // update it otherwise create it, So we didnt need to handle
            // this with if-else conditions
            prisma.social.upsert({
                where: { userId },
                update: { platforms: platforms },
                create: {
                    userId,
                    platforms: platforms,
                },
            }),
        ]);

        return NextResponse.json(
            { success: true, message: 'Social profile updated success!' },
            { status: 200 }
        );
    } else {
        await prisma.$transaction([
            prisma.user.update({
                where: { id: userId },
                data: {
                    name,
                    bio,
                },
            }),
            prisma.social.upsert({
                where: { userId },
                update: { platforms: platforms },
                create: {
                    userId,
                    platforms: platforms,
                },
            }),
        ]);

        return NextResponse.json(
            { success: true, message: 'Social profile created success!' },
            { status: 200 }
        );
    }
}
