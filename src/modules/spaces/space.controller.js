import { makeSpaceService } from "./space.service.js"

export const makeSpaceController = () => {
    const spaceService = makeSpaceService()

    const create = async (req, res, next) => {
        try {
            const supporterId = req.user?.id


            const space = await spaceService.createSpace({
                supporterId,
                name: req.body.name,
                address: req.body.address,
                capacity: req.body.capacity,
                photoUrl: req.body.photoUrl,
                description: req.body.description
            })

            return res.status(201).json({
                message: 'Space created successfully.',
                space
            })
        } catch (err) {
            next(err)
        }
    }

    const getById = async (req, res, next) => {
        try {
            const { id } = req.params
            const space = await spaceService.getSpaceById(id)

            if (!space) {
                return res.status(404).json({
                    message: 'Space not found.',
                    errorCode: 'SPACE_NOT_FOUND'
                })
            }

            return res.status(200).json({ space })
        } catch (err) {
            next(err)
        }
    }

    const getBySupporter = async (req, res, next) => {
        try {
            const { supporterId } = req.params
            const spaces = await spaceService.getSpacesBySupporter(Number(supporterId))
            return res.status(200).json(spaces)
        } catch (err) {
            next(err)
        }
    }

    const getAll = async (req, res, next) => {
        try {
            const spaces = await spaceService.getAllSpace()
            return res.status(200).json(spaces)
        } catch (err) {
            next(err)
        }
    }

    const update = async (req, res, next) => {
        try {
            const { id } = req.params
            const requesterId = req.user.id // from auth middleware

            const updated = await spaceService.updateSpace({
                id,
                requesterId,
                data: req.body
            })

            return res.status(200).json({
                message: 'Space updated successfully.',
                space: updated
            })
        } catch (err) {
            next(err)
        }
    }

    const remove = async (req, res, next) => {
        try {
            const { id } = req.params
            const requesterId = req.user.id

            await spaceService.deleteSpace({ id, requesterId })

            return res.status(204).send()
        } catch (err) {
            next(err)
        }
    }

    return {
        create,
        getById,
        getBySupporter,
        getAll,
        update,
        remove
    }
}
