import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId } = await req.json();

    if (!userId) {
        return NextResponse.json({
            success: false,
            message: 'User id is required!',
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            clerkId: userId,
        },
        include: {
            images: true,
        },
    });

    if (!user) {
        return NextResponse.json({
            success: false,
            message: 'User not found!',
        });
    }

    return NextResponse.json(user);
}
