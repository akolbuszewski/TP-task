import {RoomData} from "../models/RoomData";

export const getRoomsData = async (): Promise<RoomData[]> => {
    const response = await fetch(
        'https://dcontent.inviacdn.net/shared/dev/test-api/rooms'
    );
    const data: RoomData[] = await response.json();
    return data;
};
