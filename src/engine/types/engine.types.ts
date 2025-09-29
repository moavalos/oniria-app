import * as THREE from "three";
import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";
import type { ColorRepresentation } from "three";
import type { LoopService } from "../services";



export type UserSettings = {
    activeRoom: Room;
    activeSkin: Skin
}

export type EngineSettings = {
    backgroundColor: ColorRepresentation
}

export type EngineAPI = {
    loopService: LoopService | null;
    activeRoom: Room | null;
    setActiveRoom: (room: Room) => void;
    activeSkin: Skin | null;
    setSkin: (skin: Skin) => void;
    scene: THREE.Scene | null;
    camera: THREE.Camera | null;
    gl: THREE.WebGLRenderer | null;
}

export type AnimationConfig = {
    target: string; // nombre del mesh/handler
    type: "pendulum" | "float" | "rotate";
    params: Record<string, any>; // parámetros específicos de la animación
    loop?: boolean; // repetir indefinidamente
};

export type LightSettings = {
    color: string;
};

export type TextSettings = {
    fontSize: number;
    fontColor: string;
    fontFamily: string;
};

export type EmissiveSettings = {
    color: string;
};

export type RoomSettings = {
    light?: Record<string, LightSettings>;
    text: TextSettings;
    animation?: Array<AnimationConfig>;
};

// Un diccionario de settings 
export type RoomSettingsMap = Record<string, RoomSettings>;