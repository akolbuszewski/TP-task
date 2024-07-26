import { useRoomsContext } from './RoomContext'
import RoomCard from './RoomCard'

export const Rooms = () => {
    const data = useRoomsContext()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.paginatedRooms.map((room) => (
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
            ))}
        </div>
    )
}
