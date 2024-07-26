import {AvailibilityData} from "../models/AvailibilityData";

export const getRoomAvailability = async (roomId: number): Promise<AvailibilityData> => {
    const response = await fetch(
        `https://dcontent.inviacdn.net/shared/dev/test-api/room/${roomId}`
    );
    const data: AvailibilityData = await response.json();
    return data;
}