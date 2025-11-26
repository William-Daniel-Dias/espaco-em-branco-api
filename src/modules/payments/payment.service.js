import { HttpError } from '../../utils/httpError.js'
import { makePaymentRepository } from './payment.repository.js'
import { makeEventRepository } from '../events/event.repository.js'
import { makeUserRepository } from '../users/user.repository.js'

export const makePaymentService = () => {
    const paymentRepository = makePaymentRepository()
    const eventRepository = makeEventRepository()
    const userRepository = makeUserRepository()

    const createPayment = async ({ eventId, userId, value }) => {
        // Validate event exists and is active
        const event = await eventRepository.findById(eventId)
        if (!event) {
            throw new HttpError('Event not found.', 404, 'EVENT_NOT_FOUND')
        }

        if (event.status !== 'active') {
            throw new HttpError('Cannot contribute to inactive events.', 400, 'EVENT_NOT_ACTIVE')
        }

        // Validate user exists
        const user = await userRepository.findById(userId)
        if (!user) {
            throw new HttpError('User not found.', 404, 'USER_NOT_FOUND')
        }

        // Create payment
        const payment = await paymentRepository.create({
            eventId,
            userId,
            value
        })

        // Update event progress
        await eventRepository.updateProgress(eventId, value)

        // Get updated event data
        const updatedEvent = await eventRepository.findById(eventId)

        return {
            payment,
            event: {
                id: updatedEvent.id,
                currentProgress: updatedEvent.currentProgress,
                financialGoal: updatedEvent.financialGoal,
                progressPercentage: (
                    (parseFloat(updatedEvent.currentProgress) / parseFloat(updatedEvent.financialGoal)) * 100
                ).toFixed(2)
            }
        }
    }

    const getPaymentById = async id => {
        return await paymentRepository.findById(id)
    }

    const getPaymentsByEvent = async eventId => {
        // Validate event exists
        const event = await eventRepository.findById(eventId)
        if (!event) {
            throw new HttpError('Event not found.', 404, 'EVENT_NOT_FOUND')
        }

        const payments = await paymentRepository.findByEventId(eventId)
        const total = await paymentRepository.getTotalByEventId(eventId)
        const count = await paymentRepository.countByEventId(eventId)

        return {
            payments,
            summary: {
                totalAmount: total,
                totalContributions: count,
                averageContribution: count > 0 ? (total / count).toFixed(2) : 0
            }
        }
    }

    const getPaymentsByUser = async userId => {
        // Validate user exists
        const user = await userRepository.findById(userId)
        if (!user) {
            throw new HttpError('User not found.', 404, 'USER_NOT_FOUND')
        }

        const payments = await paymentRepository.findByUserId(userId)

        const total = payments.reduce((sum, payment) => {
            return sum + parseFloat(payment.value)
        }, 0)

        return {
            payments,
            summary: {
                totalAmount: total,
                totalContributions: payments.length
            }
        }
    }

    const getAllPayments = async () => {
        return await paymentRepository.findAll()
    }

    return {
        createPayment,
        getPaymentById,
        getPaymentsByEvent,
        getPaymentsByUser,
        getAllPayments
    }
}
