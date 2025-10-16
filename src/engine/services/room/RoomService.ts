import { Room } from "@engine/entities/Room";
import { ConfigManager } from "@engine/utils/ConfigManager";
import type { AssetManager } from "../assets/AssetManager";

export class RoomService {
    private assetManager: AssetManager | null = null;

    private configManager: ConfigManager | null = null;

    async load(roomId: string, skinId: string): Promise<Room> {
        const roomPath = `/models/${roomId}/room.gltf`;
        const objectsPath = `/skins/${roomId}/objects.ktk2`;
        const wallPath = `/skins/${roomId}/wall.ktk2`;

        console.log(`[RoomService] Loading room ${roomId} with skin ${skinId}`);

        // Podés cargar en paralelo
        const [gltf, objectsTex, wallTex, config] = await Promise.all([
            this.gltfLoader.loadAsync(roomPath),
            this.loadKtx2Texture(objectsPath),
            this.loadKtx2Texture(wallPath),
            this.config.loadRoomConfig(`/configs/${roomId}.json`),
        ]);

        const room = new Room(roomId, skinId, gltf.scene, config);
        room.setTextures(objectsTex, wallTex);
        return room;
    }

    private async loadKtx2Texture(path: string) {
        // Podés usar KTX2Loader si está integrado
        // return await this.ktx2Loader.loadAsync(path);
        return path;
    }
}
