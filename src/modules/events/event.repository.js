import { Event } from '../../models/Event.js'

export const makeEventRepository = () => {
    const create = async data => {
        const event = await Event.create(data)
        return event.toJSON()
    }

    const findById = async id => {
        const event = await Event.findByPk(id)
        return event ? event.toJSON() : null
    }

    const findByArtistId = async artistId => {
        const events = await Event.findAll({ where: { artistId } })
        return events.map(e => e.toJSON())
    }

    const findBySpaceId = async spaceId => {
        const events = await Event.findAll({ where: { spaceId } })
        return events.map(e => e.toJSON())
    }

    const findAll = async (filters = {}) => {
        const where = {}
        if (filters.status) where.status = filters.status

        const events = await Event.findAll({ where })
        return events.map(e => e.toJSON())
    }

    const update = async (id, data) => {
        const [affected] = await Event.update(data, {
            where: { id },
            returning: true
        })

        if (!affected) return null

        const updated = await Event.findByPk(id)
        return updated ? updated.toJSON() : null
    }

    const remove = async id => {
        const deleted = await Event.destroy({ where: { id } })
        return deleted > 0
    }

    const updateProgress = async (id, amount) => {
        const event = await Event.findByPk(id)
        if (!event) return null

        const newProgress = parseFloat(event.currentProgress) + parseFloat(amount)
        await event.update({ currentProgress: newProgress })

        return event.toJSON()
    }

    return {
        create,
        findById,
        findByArtistId,
        findBySpaceId,
        findAll,
        update,
        remove,
        updateProgress
    }
}
