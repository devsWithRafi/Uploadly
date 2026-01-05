import prisma from '@/lib/prisma';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req);

        const { id } = evt.data;
        const eventType = evt.type;

        // CREATE NEW USER
        if (eventType === 'user.created') {
            const userMatched = await prisma.user.findUnique({
                where: {
                    email: evt.data.email_addresses[0]?.email_address,
                },
            });

            if (!userMatched) {
                await prisma.user.create({
                    data: {
                        name: `${evt.data.first_name} ${evt.data.last_name}`,
                        clerkId: id!,
                        email: evt.data.email_addresses[0]?.email_address,
                        image: evt.data.image_url,
                    },
                });
            }
        }
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error verifying webhook', { status: 400 });
    }
}
