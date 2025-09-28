import { useGLTF, useKTX2 } from "@react-three/drei";
import { useEngineStore } from "@engine/store/engineStore";

export default function useLoader() {
    const { activeRoom, activeSkin } = useEngineStore((s) => s);

    // cargar GLTF
    const { scene } = useGLTF(activeRoom?.meshUrl || "");

    // argar texturas KTX2
    const [oTex, eTex] = useKTX2([
        activeSkin?.objectTextureUrl || "",
        activeSkin?.environmentTextureUrl || "",
    ]);

    return { scene, oTex, eTex };
}
