// src/modules/spaces/space.routes.js
import { Router } from 'express'
import { makeSpaceService } from '../modules/spaces/space.service.js'
import { makeSpaceController } from '../modules/spaces/space.controller.js'
import { ensureAuth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createSpaceSchema, updateSpaceSchema } from '../modules/spaces/space.schemas.js'

export const spaceRouter = () => {
    const router = Router()

    const spaceController = makeSpaceController()

    // Public
    router.get('/', spaceController.getAll)
    router.get('/:id', spaceController.getById)
    router.get('/supporter/:supporterId', spaceController.getBySupporter)

    // Protected (supporters managing their own spaces)
    router.post(
        '/',
        ensureAuth,
        validate({ body: createSpaceSchema }),
        spaceController.create
    )

    router.put(
        '/:id',
        ensureAuth,
        validate({ body: updateSpaceSchema }),
        spaceController.update
    )

    router.delete(
        '/:id',
        ensureAuth,
        spaceController.remove
    )

    return router
}
