import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId } = await req.json();
    if (!userId) {
        return NextResponse.json(
            { success: false, error: 'User id is required!' },
            { status: 400 }
        );
    }

    const social = await prisma.social.findUnique({
        where: { userId },
    });

    if (!social) {
        return NextResponse.json(
            {
                success: false,
                error: 'This user didnt have any social account!',
            },
            { status: 400 }
        );
    }

    return NextResponse.json(social);
}
