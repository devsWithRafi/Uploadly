import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsProps {
    params: {
        userId: string;
    };
}

export async function GET(req: NextRequest, context: ParamsProps) {
    const { userId } = await context.params;

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
