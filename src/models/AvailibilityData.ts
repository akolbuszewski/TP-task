import {Price} from "./Price";

export interface AvailibilityData {
    availabilityStatus: 'available' | 'onRequest' | 'soldout' | 'error';
    price: Price | null;
}