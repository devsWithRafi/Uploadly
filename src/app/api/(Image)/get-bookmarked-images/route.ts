import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId } = await req.json();

    if (!userId) {
        return NextResponse.json(
            { success: false, error: 'User id is missing!' },
            { status: 409 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return NextResponse.json(
            { success: false, error: 'User Not Found!' },
            { status: 409 }
        );
    }

    const bookMarkd = await prisma.bookmark.findMany({
        where: { userId },
        orderBy: {
            image: { createdAt: 'desc' },
        },
        include: {
            image: {
                include: {
                    likes: true,
                    comments: true,
                    user: true,
                    bookmark: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        },
                    },
                },
            },
        },
    });

    if (!bookMarkd) {
        return NextResponse.json(
            { success: false, error: 'The bookmark is empty!' },
            { status: 401 }
        );
    }

    return NextResponse.json(bookMarkd);
}
