import { useGLTF, useKTX2 } from "@react-three/drei";
import * as THREE from "three";
import type { Room } from "../entities/Room";
import type { Skin } from "../entities/Skin";

type LoaderResult = {
    scene: THREE.Group | null;
    oTex: THREE.Texture | null;
    eTex: THREE.Texture | null;
};

interface UseLoaderParams {
    activeRoom: Room | null;
    activeSkin: Skin | null;
}

export default function useLoader({ activeRoom, activeSkin }: UseLoaderParams): LoaderResult {
    const objectTextureUrl = activeSkin?.objectTextureUrl
        ? `./skins/${activeSkin.objectTextureUrl}`
        : "";
    const environmentTextureUrl = activeSkin?.environmentTextureUrl
        ? `./skins/${activeSkin.environmentTextureUrl}`
        : "";

    const [oTex, eTex] = useKTX2(
        [objectTextureUrl, environmentTextureUrl],
        "./basis/"
    );

    // si no hay room, devolvemos null
    const gltf = useGLTF(
        activeRoom?.meshUrl ? `./models/${activeRoom.meshUrl}` : "/models/empty.glb"
    );

    return {
        scene: gltf.scene ?? null,
        oTex: oTex ?? null,
        eTex: eTex ?? null,
    };
}
