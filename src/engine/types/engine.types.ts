import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";
import { AnimationService } from '../services/AnimationService';

export type EngineSettings = {
    activeRoom: Room;
    activeSkin: Skin
}

export type EngineAPI = {
    animationService: AnimationService | null;
    activeRoom: Room | null;
    setActiveRoom: (room: Room) => void;
    activeSkin: Skin | null;
    setSkin: (skin: Skin) => void;
}