import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    const { userId } = await params;

    if (!userId) {
        return NextResponse.json(
            { success: false, error: 'User id is required!' },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            comments: true,
        },
    });

    if (!user) {
        return NextResponse.json(
            { success: false, error: 'User not found!' },
            { status: 409 }
        );
    }

    return NextResponse.json(user);
}
