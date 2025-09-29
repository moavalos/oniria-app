import useLoader from "@engine/hooks/useLoader";
import { useMemo } from "react";
import { MaterialService } from "../services/MaterialService";
import { useEngineAPI } from "../context/EngineProvider";

export default function RendererSystem() {
  const { activeRoom, activeSkin } = useEngineAPI();
  const { scene, oTex, eTex } = useLoader({ activeRoom, activeSkin });
  const settings = activeRoom?.getSettings();

  //console.log(scene);
  useMemo(() => {
    if (scene && oTex && eTex) {
      const materialService = new MaterialService(oTex, eTex, settings);
      materialService.applyToScene(scene);
    }
  }, [scene, oTex, eTex]);

  return scene && <primitive object={scene} />;
}
