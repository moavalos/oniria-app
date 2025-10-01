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
    const objectTextureUrl = activeRoom?.skin?.objectTextureUrl
        ? activeRoom.skin.objectTextureUrl
        : "";
    const environmentTextureUrl = activeRoom?.skin?.environmentTextureUrl
        ? activeRoom.skin.environmentTextureUrl
        : "";

    const [oTex, eTex] = useKTX2(
        [objectTextureUrl, environmentTextureUrl],
        "./basis/"
    );

    // si no hay room, devolvemos null
    const gltf = useGLTF(
        activeRoom?.meshUrl as string  //TODO: poner un modelo vacío
    );


    if (activeRoom && gltf.scene) {
        activeRoom.addScene(gltf.scene);
        activeRoom.setTextures({
            objectTexture: oTex as THREE.Texture,
            environmentTexture: eTex as THREE.Texture,
        });
    }


    console.log("useLoader render", { activeRoom, gltf, oTex, eTex });
    return { room: activeRoom ?? null };
}
