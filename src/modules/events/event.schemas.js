// src/modules/events/event.schemas.js
import { z } from 'zod'

export const eventSchemas = {
    createEvent: z.object({

        spaceId: z
            .string({ required_error: 'Space ID is required.' })
            .uuid({ message: 'Invalid event ID format.' }),

        title: z
            .string({ required_error: 'Event title is required.' })
            .min(5, { message: 'Event title must be at least 5 characters long.' })
            .max(150, { message: 'Event title cannot exceed 150 characters.' }),

        description: z
            .string({ required_error: 'Event description is required.' })
            .min(20, { message: 'Event description must be at least 20 characters long.' })
            .max(1000, { message: 'Event description cannot exceed 1000 characters.' }),

        dateTime: z
            .string({ required_error: 'Event date and time is required.' })
            .refine(
                date => new Date(date) > new Date(),
                { message: 'Event date must be in the future.' }
            ),

        financialGoal: z
            .number({
                required_error: 'Financial goal is required.',
                invalid_type_error: 'Financial goal must be a number.'
            })
            .positive({ message: 'Financial goal must be greater than 0.' }),

        imageUrl: z
            .string()
            .url({ message: 'Invalid URL format for image.' })
            .max(255, { message: 'Image URL cannot exceed 255 characters.' })
            .optional(),

        status: z
            .enum(['active', 'finished', 'cancelled'], {
                errorMap: () => ({ message: 'Invalid event status. Must be active, finished, or cancelled.' })
            })
            .optional()
    }),

    updateEvent: z
        .object({
            title: z
                .string()
                .min(5, { message: 'Event title must be at least 5 characters long.' })
                .max(150, { message: 'Event title cannot exceed 150 characters.' })
                .optional(),

            description: z
                .string()
                .min(20, { message: 'Event description must be at least 20 characters long.' })
                .max(1000, { message: 'Event description cannot exceed 1000 characters.' })
                .optional(),

            dateTime: z
                .string()
                .datetime({ message: 'Invalid date and time format.' })
                .refine(
                    date => new Date(date) > new Date(),
                    { message: 'Event date must be in the future.' }
                )
                .optional(),

            financialGoal: z
                .number({ invalid_type_error: 'Financial goal must be a number.' })
                .positive({ message: 'Financial goal must be greater than 0.' })
                .optional(),

            imageUrl: z
                .string()
                .url({ message: 'Invalid URL format for image.' })
                .max(255, { message: 'Image URL cannot exceed 255 characters.' })
                .optional(),

            status: z
                .enum(['active', 'finished', 'cancelled'], {
                    errorMap: () => ({ message: 'Invalid event status. Must be active, finished, or cancelled.' })
                })
                .optional()
        })
        .refine(data => Object.keys(data).length > 0, {
            message: 'At least one field must be provided for update.'
        })
}
