/* eslint-disable no-unused-vars */
import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";
import type { ColorRepresentation } from "three";

// Estados del motor 3D
export enum EngineState {
    CREATED = "CREATED",
    INITIALIZING = "INITIALIZING",
    LOADING_ASSETS = "LOADING_ASSETS",
    READY = "READY",
    RUNNING = "RUNNING",
    PAUSED = "PAUSED",
    DISPOSING = "DISPOSING",
    DISPOSED = "DISPOSED",
}



export type UserSettings = {
    activeRoom: Room;
    activeSkin: Skin
}

export type EngineSettings = {
    backgroundColor: ColorRepresentation
}



