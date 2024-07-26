import { RoomData } from './RoomData'
import { Price } from './Price'

export type RoomState = RoomData & {
    availabilityStatus?: 'available' | 'onRequest' | 'soldout' | 'error'
    currentPrice?: Price | null
}
