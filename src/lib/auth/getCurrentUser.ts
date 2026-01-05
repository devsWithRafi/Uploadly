import { currentUser } from '@clerk/nextjs/server';
import prisma from '../prisma';

export async function getCurrentUser() {
    const clerkUser = await currentUser();

    if (!clerkUser) return null;

    return await prisma.user.findFirst({
        where: {
            clerkId: clerkUser.id,
        },
    });
}
