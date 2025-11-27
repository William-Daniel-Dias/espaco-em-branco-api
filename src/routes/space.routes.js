import { Router } from 'express'
import { makeSpaceController } from '../modules/spaces/space.controller.js'
import { ensureAuth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { spaceSchema } from '../modules/spaces/space.schemas.js'

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
        validate({ body: spaceSchema.createSpaceSchema }),
        spaceController.create
    )

    router.put(
        '/:id',
        ensureAuth,
        validate({ body: spaceSchema.updateSpaceSchema }),
        spaceController.update
    )

    router.delete(
        '/:id',
        ensureAuth,
        spaceController.remove
    )

    return router
}
