import { HttpError } from '../../utils/httpError.js'
import { makeEventRepository } from './event.repository.js'
import { makeUserRepository } from '../users/user.repository.js'
import { makeSpaceRepository } from '../spaces/space.repository.js'

export const makeEventService = () => {
  const eventRepository = makeEventRepository()
  const userRepository = makeUserRepository()
  const spaceRepository = makeSpaceRepository()

  const createEvent = async ({
    artistId,
    spaceId,
    title,
    description,
    dateTime,
    financialGoal,
    imageUrl,
    status
  }) => {
    // Validate artist exists and is of type 'artist'
    const artist = await userRepository.findById({id:artistId})
    
    if (!artist) {
      throw new HttpError('Artist not found.', 404, 'ARTIST_NOT_FOUND')
    }
    if (artist.userType !== 'artist') {
      throw new HttpError('User is not an artist.', 403, 'USER_NOT_ARTIST')
    }

    // Validate space exists
    const space = await spaceRepository.findById(spaceId)
    if (!space) {
      throw new HttpError('Space not found.', 404, 'SPACE_NOT_FOUND')
    }

    const event = await eventRepository.create({
      artistId,
      spaceId,
      title,
      description,
      dateTime,
      financialGoal,
      currentProgress: 0,
      imageUrl,
      status: status || 'active'
    })

    return event
  }

  const getEventById = async id => {
    return await eventRepository.findById(id)
  }

  const getEventsByArtist = async artistId => {
    return await eventRepository.findByArtistId(artistId)
  }

  const getEventsBySpace = async spaceId => {
    return await eventRepository.findBySpaceId(spaceId)
  }

  const getAllEvents = async filters => {
    return await eventRepository.findAll(filters)
  }

  const updateEvent = async ({ id, requesterId, data }) => {
    const event = await eventRepository.findById(id)

    if (!event) {
      throw new HttpError('Event not found.', 404, 'EVENT_NOT_FOUND')
    }

    // Verify that the requester is the owner of the event
    if (event.artistId !== requesterId) {
      throw new HttpError('You are not allowed to update this event.', 403, 'UNAUTHORIZED_EVENT_UPDATE')
    }

    const updated = await eventRepository.update(id, data)
    return updated
  }

  const deleteEvent = async ({ id, requesterId }) => {
    const event = await eventRepository.findById(id)

    if (!event) {
      throw new HttpError('Event not found.', 404, 'EVENT_NOT_FOUND')
    }

    // Verify that the requester is the owner of the event
    if (event.artistId !== requesterId) {
      throw new HttpError('You are not allowed to delete this event.', 403, 'UNAUTHORIZED_EVENT_DELETE')
    }

    // Don't allow deletion if event has progress
    if (parseFloat(event.currentProgress) > 0) {
      throw new HttpError(
        'Cannot delete event with existing contributions.',
        400,
        'EVENT_HAS_CONTRIBUTIONS'
      )
    }

    return await eventRepository.remove(id)
  }

  const updateEventProgress = async (id, amount) => {
    const event = await eventRepository.findById(id)

    if (!event) {
      throw new HttpError('Event not found.', 404, 'EVENT_NOT_FOUND')
    }

    if (event.status !== 'active') {
      throw new HttpError('Cannot update progress for inactive events.', 400, 'EVENT_NOT_ACTIVE')
    }

    return await eventRepository.updateProgress(id, amount)
  }

  return {
    createEvent,
    getEventById,
    getEventsByArtist,
    getEventsBySpace,
    getAllEvents,
    updateEvent,
    deleteEvent,
    updateEventProgress
  }
}
