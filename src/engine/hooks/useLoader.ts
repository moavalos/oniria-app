import { useGLTF, useKTX2 } from "@react-three/drei";
import { useEngineStore } from "@engine/store/engineStore";

export default function useLoader() {
    const { activeRoom, activeSkin } = useEngineStore((s) => s);

    // argar texturas KTX2
    const [oTex, eTex] = useKTX2(
        [
            `./skins/${activeSkin?.objectTextureUrl || ""}`,
            `./skins/${activeSkin?.environmentTextureUrl || ""}`,
        ],
        "./basis/"
    );

    console.log(oTex, eTex);

    // cargar GLTF
    const { scene } = useGLTF(`./models/${activeRoom?.meshUrl || ""}`);

    return { scene, oTex, eTex };
}
