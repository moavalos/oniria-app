/// <reference types="vite-plugin-glsl/ext" />
import * as THREE from "three";
import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";
import type { ColorRepresentation } from "three";
import type { AnimationService, CameraService, LoopService, TargetRegisterService } from "../services";
import { InteractionService } from '../services/InteractionService';




export type UserSettings = {
    activeRoom: Room;
    activeSkin: Skin
}

export type EngineSettings = {
    backgroundColor: ColorRepresentation
}

export type EngineCoreAPI = {
    activeRoom: Room | null;
    activeSkin: Skin | null;
}

export type EngineAPI = EngineCoreAPI & {
    loopService: LoopService | null;
    registerService: TargetRegisterService | null;
    animationService: AnimationService | null;
    interactionService: InteractionService | null;
    cameraService: CameraService | null;
    scene: THREE.Scene | null;
    camera: THREE.Camera | null;
    gl: THREE.WebGLRenderer | null;
}

