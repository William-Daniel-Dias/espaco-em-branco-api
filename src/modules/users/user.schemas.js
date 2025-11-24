import { z } from 'zod';

export const createUserSchema = () => z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters long.' })
        .max(100, { message: 'Name cannot exceed 100 characters' }),
    email: z
        .email({ message: 'Invalid email format.' })
        .max(255, { message: 'Email cannot exceed 255 characters' }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long.' }),
    userType: z.enum(['artist', 'supporter', 'public'],
        {
            errorMap: () => ({ message: 'Invalid user type. Must be artist, supporter, or public.' })
        })
})

export const loginUserSchema = () => (z.object({
    email: z.email({ message: 'Invalid email format.' }),
    password: z.string()
        .min(1, { message: 'Password cannot be empty.' })
})
)