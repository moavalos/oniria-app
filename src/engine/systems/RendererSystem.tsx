import { useMemo } from "react";
import useLoader from "@engine/hooks/useLoader";
import { MaterialService } from "@engine/services";
import { useEngineAPI } from "@engine/context/EngineProvider";

export default function RendererSystem() {
  const { activeRoom, activeSkin } = useEngineAPI();
  const { scene, oTex, eTex } = useLoader({ activeRoom, activeSkin });
  if (!scene) return null;
  // aplicar materiales
  // obtener settings de la room
  const settings = activeRoom?.getSettings();
  const materialService = useMemo(
    () => (scene ? new MaterialService(scene) : null),
    [scene, settings]
  );

  //console.log(scene);
  useMemo(() => {
    if (!materialService || !scene || !oTex || !eTex) return;
    materialService.applyMaterials(oTex, eTex, settings);
  }, [scene, materialService, oTex, eTex, settings]);

  return scene && <primitive object={scene} />;
}
