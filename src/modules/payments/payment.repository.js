import { Payment } from '../../models/Payment.js'

export const makePaymentRepository = () => {
    const create = async data => {
        const payment = await Payment.create(data)
        return payment.toJSON()
    }

    const findById = async id => {
        const payment = await Payment.findByPk(id)
        return payment ? payment.toJSON() : null
    }

    const findByEventId = async eventId => {
        const payments = await Payment.findAll({ where: { eventId } })
        return payments.map(p => p.toJSON())
    }

    const findByUserId = async userId => {
        const payments = await Payment.findAll({ where: { userId } })
        return payments.map(p => p.toJSON())
    }

    const findAll = async () => {
        const payments = await Payment.findAll()
        return payments.map(p => p.toJSON())
    }

    const getTotalByEventId = async eventId => {
        const payments = await Payment.findAll({ where: { eventId } })
        const total = payments.reduce((sum, payment) => {
            return sum + parseFloat(payment.value)
        }, 0)
        return total
    }

    const countByEventId = async eventId => {
        return await Payment.count({ where: { eventId } })
    }

    return {
        create,
        findById,
        findByEventId,
        findByUserId,
        findAll,
        getTotalByEventId,
        countByEventId
    }
}
