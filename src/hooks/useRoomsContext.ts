import {useContext, useMemo} from "react";
import {RoomsContext} from "../components/RoomContext";

export const useRoomsContext = () => {
    const context = useContext(RoomsContext)
    if (!context) {
        throw new Error('useRoomsContext must be used within a RoomsProvider')
    }
    return context
}

export const usePaginationData = () => {
    const context = useRoomsContext()

    const paginationData = useMemo(
        () => ({
            currentPage: context.currentPage,
            numberOfPages: context.numberOfPages,
            setPage: context.setPage,
        }),
        [context.currentPage, context.numberOfPages, context.setPage]
    )

    return paginationData
}
