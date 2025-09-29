import { useGLTF, useKTX2 } from "@react-three/drei";

export default function useLoader({
    activeRoom,
    activeSkin,
}: {
    activeRoom: any;
    activeSkin: any;
}) {
    // argar texturas KTX2
    const [oTex, eTex] = useKTX2(
        [
            `./skins/${activeSkin?.objectTextureUrl || ""}`,
            `./skins/${activeSkin?.environmentTextureUrl || ""}`,
        ],
        "./basis/"
    );

    // cargar GLTF
    const { scene } = useGLTF(`./models/${activeRoom?.meshUrl || ""}`);

    return { scene, oTex, eTex };
}
