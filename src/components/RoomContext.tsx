import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { getRoomsData } from '../services/getRoomsData'
import { getRoomAvailability } from '../services/getRoomAvailability'
import { RoomState } from '../models/RoomState'
import { sortRooms } from '../utils/sortRooms'

const PAGE_SIZE = 4

export interface RoomsContextProps {
    rooms: RoomState[]
    currentPage: number
    numberOfPages: number
    paginatedRooms: RoomState[]
    sortRooms: (criteria: 'price' | 'name') => void
    checkAvailability: (id: number | 'all') => void
    setPage: (page: number) => void
    book: (roomId: number) => void
}

export const RoomsContext = createContext<RoomsContextProps | undefined>(undefined)

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
        setRooms((rooms) => sortRooms(rooms, sortCriteria))
        setPaginatedRooms(
            rooms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        )
    }, [sortCriteria])

    useEffect(() => {
        setPaginatedRooms(
            rooms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        )
    }, [rooms, currentPage])

    const book = useCallback((roomId: number) => {
        console.log(`Booking room with id: ${roomId}`);
    }, [])

    const fetchRooms = async () => {
        try {
            const data = await getRoomsData()
            setRooms(sortRooms(data, sortCriteria))
        } catch (error) {
            console.error(`Error fetching rooms data: ${error}`)
        }
    }

    const checkAvailability = async (id: number | 'all') => {
            if (id === 'all') {
                const allIds = rooms.map((room) => room.id)
                const roomsAvailibility = await Promise.all(
                    allIds.map(async (id) => {
                        const roomAvailibility = await getRoomAvailability(id)
                        return {
                            id,
                            ...roomAvailibility,
                        }
                    })
                )
                setRooms((prevRooms) =>
                    prevRooms.map((room) => {
                        const data = roomsAvailibility.find(
                            (r) => r.id === room.id
                        )
                        return {
                            ...room,
                            availabilityStatus: data?.availabilityStatus,
                            currentPrice: data?.price,
                        }
                    })
                )
            } else {
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

