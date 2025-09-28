import roomSettings from "@engine/config/roomSettings.json";
import { Skin } from './Skin';
import type { RoomSettings, RoomSettingsMap } from "../config/roomSettings.type";


export class Room {

    private settings: RoomSettings;

    constructor(public id: string,
        public name: string,
        public meshUrl: string | null,
        public currentSkin: Skin
    ) {
        const allSettings = roomSettings as RoomSettingsMap;
        this.settings = allSettings[this.name] || allSettings["default"];
    }

    applySkin(skin: Skin) {
        this.currentSkin = skin;
    }

    getSettings() {
        return this.settings;
    }
}