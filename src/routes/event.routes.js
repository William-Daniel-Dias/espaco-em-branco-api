import { Router } from 'express'
import { ensureAuth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { makeEventController } from '../modules/events/event.controller.js'
import { eventSchemas } from '../modules/events/event.schemas.js'

export const eventRouter = () => {
    const router = Router()

    const eventController = makeEventController()

    // Public routes
    router.get('/', eventController.getAll)
    router.get('/artists', ensureAuth, eventController.getByArtist)
    router.get('/space/:spaceId', eventController.getBySpace)
    router.get('/:id', eventController.getById)
    
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
