import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const comments = await prisma.comment.findMany({
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
