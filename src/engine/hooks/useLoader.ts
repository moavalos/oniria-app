import { useGLTF, useKTX2 } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import type { Room } from "../entities/Room";

type LoaderResult = {
    room: Room | null;
    isLoading: boolean;
    error: string | null;
};

interface UseLoaderParams {
    activeRoom: Room | null;
}

export function useLoader({ activeRoom }: UseLoaderParams): LoaderResult {
    const [configuredRoom, setConfiguredRoom] = useState<Room | null>(null);

    const urls = useMemo(() => {
        if (!activeRoom) return null;

        return {
            mesh: activeRoom.getMeshUrl(),
            objectTexture: activeRoom.skin.getObjectTextureUrl(),
            environmentTexture: activeRoom.skin.getEnvironmentTextureUrl(),
        };
    }, [activeRoom]);

    //TODO: agregar el fallback model
    const gltf = useGLTF(urls?.mesh || "/models/oniria.gltf");
    const [oTex, eTex] = useKTX2(
        urls && urls.objectTexture && urls.environmentTexture
            ? [urls.objectTexture, urls.environmentTexture]
            : ["/skins/oniria_object.ktx2", "/skins/oniria_wall.ktx2"],
        "./basis/"
    );

    // Efectos secundarios en useEffect, no en render
    useEffect(() => {
        if (!activeRoom || !urls || !gltf.scene || !oTex || !eTex) {
            setConfiguredRoom(null);
            return;
        }

        console.log("Setting scene and textures for room:", activeRoom.id);
        activeRoom.setScene(gltf.scene);
        activeRoom.setTextures({
            objectTexture: oTex as THREE.Texture,
            environmentTexture: eTex as THREE.Texture,
        });

        // Solo setear el room cuando esté completamente configurado
        setConfiguredRoom(activeRoom);
    }, [activeRoom, gltf.scene, oTex, eTex, urls]);

    // if (!urls) return { room: null, isLoading: false, error: "No active room" };
    // if (!urls.mesh) return { room: null, isLoading: false, error: "Room mesh URL is missing" };
    // if (!urls.objectTexture) return { room: null, isLoading: false, error: "Object texture URL is missing" };
    // if (!urls.environmentTexture) return { room: null, isLoading: false, error: "Environment texture URL is missing" };

    return {
        room: configuredRoom, // Retornamos el room configurado, no el activeRoom directo
        isLoading: !gltf.scene || !oTex || !eTex || !configuredRoom,
        error: null
    };
}