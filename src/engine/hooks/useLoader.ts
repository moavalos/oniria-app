import { useGLTF, useKTX2 } from "@react-three/drei";
import * as THREE from "three";
import type { Room } from "../entities/Room";

type LoaderResult = {
    room: Room | null;
};
interface UseLoaderParams {
    activeRoom: Room | null;
}

export function useLoader({
    activeRoom,
}: UseLoaderParams): LoaderResult {

    if (!activeRoom) return { room: null };

    const objectTextureUrl = activeRoom.skin.getObjectTextureUrl() || "";
    const environmentTextureUrl = activeRoom.skin.getEnvironmentTextureUrl() || "";

    if (!objectTextureUrl || !environmentTextureUrl) return { room: null };

    // cargar texturas
    const [oTex, eTex] = useKTX2([objectTextureUrl, environmentTextureUrl], "./basis/");

    // cargar modelo    
    const gltf = useGLTF(activeRoom?.getMeshUrl() as string); //TODO: poner un modelo vacío


    if (activeRoom && gltf.scene) {
        activeRoom.setScene(gltf.scene);
        activeRoom.setTextures({
            objectTexture: oTex as THREE.Texture,
            environmentTexture: eTex as THREE.Texture,
        });
    }

    return { room: activeRoom };
}
