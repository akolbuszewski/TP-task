import { Price } from './Price'

export interface RoomData {
    id: number
    name: string
    price: Price | null
}
