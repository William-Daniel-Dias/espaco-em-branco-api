import { Router } from 'express'
import { makePaymentController } from '../modules/payments/payment.controller.js'
import { ensureAuth } from '../middlewares/auth.js'
import { paymentSchemas } from '../modules/payments/payment.schemas.js'
import { validate } from '../middlewares/validate.js'

export const paymentRouter = () => {
    const router = Router()

    const paymentController = makePaymentController()

    // Public routes
    router.get('/event/:eventId', paymentController.getByEvent)

    // Protected routes
    router.post(
        '/',
        ensureAuth,
        validate({ body: paymentSchemas.createPayment }),
        paymentController.create
    )

    router.get(
        '/:id',
        ensureAuth,
        paymentController.getById
    )

    router.get(
        '/user/:userId',
        ensureAuth,
        paymentController.getByUser
    )

    router.get(
        '/',
        ensureAuth,
        paymentController.getAll
    )

    return router
}
