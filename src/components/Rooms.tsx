import { useRoomsContext } from './RoomContext'
import RoomCard from './RoomCard'

export const Rooms = () => {
    const data = useRoomsContext()

    return data.paginatedRooms.map((room) => (
        <RoomCard
            key={room.id}
            id={room.id}
            name={room.name}
            originalPrice={room?.price?.value}
            checkedPrice={room?.currentPrice?.value}
            currency={room?.price?.currencyCode}
            availabilityStatus={room.availabilityStatus}
            onCheckAvailability={data.checkAvailability}
            onBook={data.book}
        />
    ))
}
