import React from 'react'
import { formatPrice } from '../utils/formatPrice'

interface RoomCardProps {
    id: number
    name: string
    originalPrice: number
    checkedPrice?: number | null
    currency: string
    availabilityStatus?: string
    onCheckAvailability: (id: number) => void
    onBook: (roomId: number) => void
}

const RoomCard: React.FC<RoomCardProps> = ({
    id,
    name,
    originalPrice,
    checkedPrice,
    currency,
    availabilityStatus,
    onCheckAvailability,
    onBook,
}) => {
    const priceDifference = originalPrice - (checkedPrice || 0)
    return (
        <div className="border rounded-lg p-4 shadow-md w-64 flex flex-col h-full hover:scale-105">
            <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                <p className="text-gray-700">
                    Original Price: {formatPrice(originalPrice, currency)}
                </p>
                {checkedPrice && (
                    <p className="text-gray-700">
                        New Price: {formatPrice(checkedPrice, currency)}
                    </p>
                )}
                {checkedPrice && (
                    <p
                        className={
                            priceDifference <= 0
                                ? 'text-red-700'
                                : 'text-green-700'
                        }
                    >
                        Price Difference:{' '}
                        {formatPrice(Math.abs(priceDifference), currency)}
                    </p>
                )}
                {availabilityStatus && (
                    <p className="text-gray-700">
                        Availability: {availabilityStatus}
                    </p>
                )}
            </div>
            <div className="flex space-x-2 mt-4 justify-center">
                <button
                    onClick={() => onCheckAvailability(id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Check Availability
                </button>
                <button
                    onClick={() => onBook(id)}
                    className={`px-4 py-2 text-white rounded ${
                        availabilityStatus === 'available'
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-gray-500 cursor-not-allowed'
                    }`}
                    disabled={availabilityStatus !== 'available'}
                >
                    Book
                </button>
            </div>
        </div>
    )
}

export default RoomCard
