// src/modules/spaces/space.routes.js
import { Router } from 'express'
import { makeSpaceService } from '../modules/spaces/space.service.js'
import { makeSpaceController } from '../modules/spaces/space.controller.js'
import { spaceSchemas } from '../modules/spaces/space.schemas.js'
import { ensureAuth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'

export const spaceRouter = () => {
    const router = Router()

    const spaceService = makeSpaceService()
    const spaceController = makeSpaceController({ spaceService })

    // Public
    router.get('/', spaceController.getAll)
    router.get('/:id', spaceController.getById)
    router.get('/supporter/:supporterId', spaceController.getBySupporter)

    // Protected (supporters managing their own spaces)
    router.post(
        '/',
        ensureAuth,
        validate({ body: spaceSchemas.createSpace }),
        spaceController.create
    )

    router.put(
        '/:id',
        ensureAuth,
        validate({ body: spaceSchemas.updateSpace }),
        spaceController.update
    )

    router.delete(
        '/:id',
        ensureAuth,
        spaceController.remove
    )

    return router
}
