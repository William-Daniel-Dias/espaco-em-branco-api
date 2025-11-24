import { Space } from "../../models/Space.js"

export const makeSpaceRepository = () => {
    const create = async data => {
        const space = await Space.creste(data)
        return space.toJSON()
    }
    
    const findById = async id => {
        const space = await Space.findByPk(id)
        return space ? space.toJSON() : null
    }

    const findBySupporterId = async supporterId => {
        const spaces = await Space.findAll({ where: { supporterId }})
        return spaces.map(s => s.toJSON())
    }

    const findAll = async () => {
        const spaces = await Space.findAll()
        return spaces.map(s => s.toJSON())
    }

    const update = async (id, data) => {
        const [affected] = await Space.update(data, {
            where: { id },
            returning: true
        })

        if (!affected) return null

        const updated = await Space.findByPk(id)
        return updated ? updated.toJSON() : null
    }

    const remove = async id => {
        const deleted = await Space.destroy({ where: { id }})
        return deleted > 0
    }

    return {
        create,
        findById,
        findBySupporterId,
        findAll,
        update,
        remove
    }
}