import { z } from 'zod';

export const signUpFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at last 2 characters.',
    }),
    email: z.string().email({ message: 'Invalid Email Formate' }).min(2),
    password: z.string().min(6, {
        message: 'Password must be at last 6 characters',
    }),
});

export const loginFormSchema = z.object({
    email: z.string().email({ message: 'Invalid Email Formate' }).min(2),
    password: z.string().min(6, {
        message: 'Password must be at last 6 characters',
    }),
});
