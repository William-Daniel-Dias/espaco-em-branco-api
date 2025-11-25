import { makeEventService } from "./event.service.js"

export const makeEventController = () => {
    const eventService = makeEventService()

    const create = async (request, response, next) => {
        try {
            const artistId = request.body.artistId ?? request.user?.id

            const event = await eventService.createEvent({
                artistId,
                spaceId: request.body.spaceId,
                title: request.body.title,
                description: request.body.description,
                dateTime: request.body.dateTime,
                financialGoal: request.body.financialGoal,
                imageUrl: request.body.imageUrl,
                status: request.body.status
            })

            return response.status(201).json({
                message: 'Event created successfully.',
                event
            })
        } catch (err) {
            next(err)
        }
    }

    const getById = async (request, response, next) => {
        try {
            const { id } = request.params
            const event = await eventService.getEventById(id)

            if (!event) {
                return response.status(404).json({
                    message: 'Event not found.',
                    errorCode: 'EVENT_NOT_FOUND'
                })
            }

            return response.status(200).json({ event })
        } catch (err) {
            next(err)
        }
    }

    const getByArtist = async (request, response, next) => {
        try {
            const { artistId } = request.params
            const events = await eventService.getEventsByArtist(artistId)
            return response.status(200).json({ events })
        } catch (err) {
            next(err)
        }
    }

    const getBySpace = async (request, response, next) => {
        try {
            const { spaceId } = request.params
            const events = await eventService.getEventsBySpace(Number(spaceId))
            return response.status(200).json({ events })
        } catch (err) {
            next(err)
        }
    }

    const getAll = async (request, response, next) => {
        try {
            const { status } = request.query
            const events = await eventService.getAllEvents({ status })
            return response.status(200).json({ events })
        } catch (err) {
            next(err)
        }
    }

    const update = async (request, response, next) => {
        try {
            const { id } = request.params
            const requestuesterId = request.user.id

            const updated = await eventService.updateEvent({
                id,
                requestuesterId,
                data: request.body
            })

            return response.status(200).json({
                message: 'Event updated successfully.',
                event: updated
            })
        } catch (err) {
            next(err)
        }
    }

    const remove = async (request, response, next) => {
        try {
            const { id } = request.params
            const requestuesterId = request.user.id

            await eventService.deleteEvent({ id, requestuesterId })

            return response.status(204).send()
        } catch (err) {
            next(err)
        }
    }

    return {
        create,
        getById,
        getByArtist,
        getBySpace,
        getAll,
        update,
        remove
    }
}
