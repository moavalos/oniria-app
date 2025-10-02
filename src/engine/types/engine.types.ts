import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";
import type { ColorRepresentation } from "three";


export type UserSettings = {
    activeRoom: Room;
    activeSkin: Skin
}

export type EngineSettings = {
    backgroundColor: ColorRepresentation
}



