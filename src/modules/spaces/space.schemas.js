import { z } from "zod";

export const createSpaceSchema = () => z.object({
    supporterId: z
        .string({ message: 'Supporter ID must be an integer.' }),
    name: z
        .string({ required_error: 'Space name is required.' })
        .min(3, { message: 'Space name must be at least 3 characters long.' })
        .max(100, { massage: 'Space name cannot exceed 100 characters.' }),
    address: z
        .string({ required_error: 'Address is required.' })
        .min(5, { message: 'Address must be at least 5 characters long.' })
        .max(255, { massage: 'Address cannot exceed 255 characters.' }),
    capacity: z
        .number({
            required_error: 'Capacity is required.',
            invalid_type_error: 'Capacity must be a number.'
        })
        .int({ message: 'Capacity must be an integer.' })
        .min(1, { message: 'Capacity must be at least 1.' }),
    photoUrl: z
        .string()
        .url({ message: 'Invalid URL format for photo.' })
        .max(255, { massage: 'Photo URL cannot exceed 255 characters.' })
        .optional(),
    description: z
        .string()
        .max(2000, { massage: 'Description cannot exceed 2000 characters.' })
        .optional()
})

export const updateSpaceSchema = () => z
    .object({
    name: z
        .string()
        .min(3, { message: 'Space name must be at least 3 characters long.' })
        .max(100, { massage: 'Space name cannot exceed 100 characters.' })
        .optional(),

    address: z
        .string()
        .min(5, { message: 'Address must be at least 5 characters long.' })
        .max(255, { massage: 'Address cannot exceed 255 characters.' })
        .optional(),

    capacity: z
        .number({
            invalid_type_error: 'Capacity must be a number.'
        })
        .int({ message: 'Capacity must be an integer.' })
        .min(1, { message: 'Capacity must be at least 1.' })
        .optional(),

    photoUrl: z
        .string()
        .url({ message: 'Invalid URL format for photo.' })
        .max(255, { massage: 'Photo URL cannot exceed 255 characters.' })
        .optional(),

    description: z
        .string()
        .max(2000, { massage: 'Description cannot exceed 2000 characters.' })
        .optional()
    })
    .refine(data => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for upadate.'
    })
