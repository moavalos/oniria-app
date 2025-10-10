import type { RoomConfig } from "../config/room.type";


export async function loadRoomConfig(name: string): Promise<RoomConfig> {
    const config: RoomConfig = (await import(`../config/rooms/${name}.json`)).default;
    return config;
}
