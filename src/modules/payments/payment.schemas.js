import { z } from 'zod'

export const paymentSchemas = {
  createPayment: z.object({
    eventId: z
      .string({ required_error: 'Event ID is required.' })
      .uuid({ message: 'Invalid event ID format.' }),

    value: z
      .number({
        required_error: 'Payment value is required.',
        invalid_type_error: 'Payment value must be a number.'
      })
      .positive({ message: 'Payment value must be greater than 0.' })
      .refine(
        val => {
          const decimalPlaces = (val.toString().split('.')[1] || '').length
          return decimalPlaces <= 2
        },
        { message: 'Payment value cannot have more than 2 decimal places.' }
      )
  })
}
