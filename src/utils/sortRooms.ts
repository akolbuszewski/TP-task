import { RoomState } from '../models/RoomState'

export const sortRooms = (rooms: RoomState[], criteria: 'price' | 'name') => {
    const sorted = [...rooms]
    if (criteria === 'price') {
        sorted.sort(
            (a, b) =>
                (a?.currentPrice?.value || a?.price?.value || Infinity) -
                (b?.currentPrice?.value || b?.price?.value || Infinity)
        )
    } else if (criteria === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name))
    }
    return sorted
}
