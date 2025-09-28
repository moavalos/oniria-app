export type LightingSettings = {
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
    lighting: LightingSettings;
    text: TextSettings;
    emissive: EmissiveSettings;
};

// Un diccionario de settings por nombre ("default", "lobby", etc)
export type RoomSettingsMap = Record<string, RoomSettings>;
