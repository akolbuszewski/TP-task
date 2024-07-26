import React, { useState } from 'react'
import { useRoomsContext } from './RoomContext'

type SortOption = 'name' | 'price'

export const Sort: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<SortOption>('price')
    const { sortRooms, checkAvailability } = useRoomsContext()

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value as SortOption)
        sortRooms(e.target.value as SortOption)
    }

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Sort By</h2>
            <label className="block mb-2">
                <input
                    type="radio"
                    name="sort"
                    value="name"
                    checked={selectedOption === 'name'}
                    onChange={handleRadioChange}
                    className="mr-2"
                />
                Name
            </label>
            <label className="block">
                <input
                    type="radio"
                    name="sort"
                    value="price"
                    checked={selectedOption === 'price'}
                    onChange={handleRadioChange}
                    className="mr-2"
                />
                Price
            </label>
            <button
                onClick={() => checkAvailability('all')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Check All
            </button>
        </div>
    )
}
