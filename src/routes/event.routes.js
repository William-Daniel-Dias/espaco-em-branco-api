import { Router } from 'express'
import { ensureAuth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { makeEventService } from '../modules/events/event.service.js'
import { makeEventController } from '../modules/events/event.controller.js'
import { eventSchemas } from '../modules/events/event.schemas.js'

export const eventRouter = () => {
    const router = Router()

    const eventService = makeEventService()
    const eventController = makeEventController()

    // Public routes
    router.get('/', eventController.getAll)
    router.get('/:id', eventController.getById)
    router.get('/artist/:artistId', eventController.getByArtist)
    router.get('/space/:spaceId', eventController.getBySpace)

    // Protected routes (artists managing their events)
    router.post(
        '/',
        ensureAuth,
        validate({ body: eventSchemas.createEvent }),
        eventController.create
    )

    router.put(
        '/:id',
        ensureAuth,
        validate({ body: eventSchemas.updateEvent }),
        eventController.update
    )

    router.delete(
        '/:id',
        ensureAuth,
        eventController.remove
    )

    return router
}
