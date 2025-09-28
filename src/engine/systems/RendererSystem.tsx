import useLoader from "@engine/hooks/useLoader";
import { useMemo } from "react";
import { useEngine } from "../hooks/useEngine";
import { MaterialService } from "../services/MaterialService";

export default function RendererSystem() {
  const { scene, oTex, eTex } = useLoader();
  const { activeRoom } = useEngine();
  const settings = activeRoom?.getSettings();

  //console.log(scene);
  useMemo(() => {
    if (scene && oTex && eTex) {
      const materialService = new MaterialService(oTex, eTex, settings);
      materialService.applyToScene(scene);
    }
  }, [scene, oTex, eTex]);

  return <primitive object={scene} />;
}
