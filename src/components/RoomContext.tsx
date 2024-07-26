import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { getRoomsData } from '../services/getRoomsData'
import { getRoomAvailability } from '../services/getRoomAvailability'
import { RoomState } from '../models/RoomState'

const PAGE_SIZE = 4

interface RoomsContextProps {
    rooms: RoomState[]
    currentPage: number
    numberOfPages: number
    paginatedRooms: RoomState[]
    sortRooms: (criteria: 'price' | 'name') => void
    checkAvailability: (id: number) => void
    setPage: (page: number) => void
    book: (roomId: number) => void
}

const RoomsContext = createContext<RoomsContextProps | undefined>(undefined)

export const RoomsProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [rooms, setRooms] = useState<RoomState[]>([])
    const [paginatedRooms, setPaginatedRooms] = useState<RoomState[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortCriteria, setSortCriteria] = useState<'price' | 'name'>('price')

    useEffect(() => {
        fetchRooms()
    }, [])

    useEffect(() => {
        sortRooms(sortCriteria)
        setPaginatedRooms(
            rooms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        )
    }, [sortCriteria])

    useEffect(() => {
        setPaginatedRooms(
            rooms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        )
    }, [rooms, currentPage])

    const fetchRooms = async () => {
        try {
            const data = await getRoomsData()
            setRooms(data)
        } catch (error) {
            alert(`Error fetching rooms data: ${error}`)
        }
    }

    const sortRooms = (criteria: 'price' | 'name') => {
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
        setRooms(sorted)
    }

    const checkAvailability = async (id: number) => {
        const data = await getRoomAvailability(id)
        setRooms((prevRooms) =>
            prevRooms.map((room) =>
                room.id === id
                    ? {
                          ...room,
                          availabilityStatus: data.availabilityStatus,
                          currentPrice: data.price,
                      }
                    : room
            )
        )
    }

    const book = (roomId: number) => {
        alert(`Booking room with id: ${roomId}`)
    }

    const numberOfPages = Math.ceil(rooms.length / PAGE_SIZE)

    return (
        <RoomsContext.Provider
            value={{
                rooms,
                sortRooms: setSortCriteria,
                checkAvailability,
                currentPage,
                numberOfPages,
                paginatedRooms,
                setPage: setCurrentPage,
                book,
            }}
        >
            {children}
        </RoomsContext.Provider>
    )
}

export const useRoomsContext = () => {
    const context = useContext(RoomsContext)
    if (!context) {
        throw new Error('useRoomsContext must be used within a RoomsProvider')
    }
    return context
}
