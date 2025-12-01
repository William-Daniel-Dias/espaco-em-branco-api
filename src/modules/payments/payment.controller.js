import { makePaymentService } from "./payment.service.js"

export const makePaymentController = () => {
    const paymentService = makePaymentService()

    const create = async (req, res, next) => {
        try {
            const userId = req.user.id

            const result = await paymentService.createPayment({
                eventId: req.body.eventId,
                userId,
                value: req.body.value
            })

            return res.status(201).json({
                message: 'Payment created successfully.',
                payment: result.payment,
                event: result.event
            })
        } catch (err) {
            next(err)
        }
    }

    const getById = async (req, res, next) => {
        try {
            const { id } = req.params
            const payment = await paymentService.getPaymentById(id)

            if (!payment) {
                return res.status(404).json({
                    message: 'Payment not found.',
                    errorCode: 'PAYMENT_NOT_FOUND'
                })
            }

            return res.status(200).json({ payment })
        } catch (err) {
            next(err)
        }
    }

    const getByEvent = async (req, res, next) => {
        try {
            const { eventId } = req.params
            const result = await paymentService.getPaymentsByEvent(eventId)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    const getByUser = async (req, res, next) => {
        try {
            const { userId } = req.params
            const result = await paymentService.getPaymentsByUser(userId)
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    const getAll = async (req, res, next) => {
        try {
            const payments = await paymentService.getAllPayments()
            return res.status(200).json({ payments })
        } catch (err) {
            next(err)
        }
    }

    return {
        create,
        getById,
        getByEvent,
        getByUser,
        getAll
    }
}
