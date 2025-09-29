import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";



export type EngineSettings = {
    activeRoom: Room;
    activeSkin: Skin
}

export type EngineAPI = {
    activeRoom: Room;
    setActiveRoom: (room: Room) => void;
    activeSkin: Skin;
    setSkin: (skin: Skin) => void;
}