import React from 'react';

interface RoomCardProps {
    id: number;
    name: string;
    originalPrice?: number;
    checkedPrice?: number | null;
    currency?: string;
    availabilityStatus?: string;
    onCheckAvailability: (id: number) => void;
    onBook: (roomId: number) => void;
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
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-gray-700">
                Original Price: {originalPrice} {currency}
            </p>
            {checkedPrice && (
                <p className="text-gray-700">
                    New Price: {checkedPrice} {currency}
                </p>
            )}
            {availabilityStatus && <p className="text-gray-700">Availability: {availabilityStatus}</p>}
            <div className="flex space-x-2 mt-4">
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
    );
};

export default RoomCard;