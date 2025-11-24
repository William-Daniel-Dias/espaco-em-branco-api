import { HttpError } from "../../utils/httpError.js"
import { makeUserRepository } from "../users/user.repository.js"
import { makeSpaceRepository } from "./space.repository.js"

export const makeSpaceService = () => {
    const spaceRepository = makeSpaceRepository()
    const userRepository = makeUserRepository()

    const createSpace = async ({ supporterId, name, address, capacity, photoUrl, description }) => {
        const supporter = await userRepository.findById(supporterId)

        if (!supporter) {
            throw new HttpError('Supporter not found.', 404, 'SUPPORTER_NOT_FOUND')
        }

        if (supporter.userType !== 'supporter') {
            throw new HttpError('User is not a supporter.', 403, 'USER_NOT_SUPPOTER')
        }

        const space = await spaceRepository.create({
            supporterId,
            name,
            address,
            capacity,
            photoUrl,
            description
        })

        return space
    }

    const getSpaceById = async id => {
        const space = await spaceRepository.findById(id)

        if(!space) {
            throw new HttpError('Space not found.', 404, 'SPACE_NOT_FOUND')
        }

        return space
    }

    const getSpacesBySupporter = async supporterId => {
        return await spaceRepository.findBySupporterId(supporterId)
    }

    const getAllSpace = async () => {
        return await spaceRepository.findAll()
    }

    const updateSpace = async ({ id, requesterId, data }) => {
        const space = await spaceRepository.findById(id)

        if (!space) {
            throw new HttpError('Space not found.', 404, 'SPACE_NOT_FOUND')
        }

        if (space.supporterId !== requesterId) {
            throw new HttpError('You are note allowed to update this space.', 403, 'UNAUTHORIZED_SPACE_UPDATE')
        }

        const updated = await spaceRepository.update(id, data)
        return updated
    }

    const deleteSpace = async ({ id, requesterId }) => {
        const space = await spaceRepository.findById(id)

        if (!space) {
            throw new HttpError('Space not found.', 404, 'SPACE_NOT_FOUND')
        }

        if (space.supporterID !== requesterId){
            throw new HttpError('You are not allowed to delete this space.', 403, 'UNAUTHORIZED_SPACE_DELETE')
        }

        const deleted = await spaceRepository.remove(id)
        return deleted
    }

    return {
        createSpace,
        getAllSpace,
        getSpacesBySupporter,
        getSpaceById,
        updateSpace,
        deleteSpace
    }

}