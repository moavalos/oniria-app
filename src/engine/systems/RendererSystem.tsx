import useLoader from "@engine/hooks/useLoader";
import { useMemo } from "react";
import * as THREE from "three";

import { useEngine } from "../hooks/useEngine";

export default function RendererSystem() {
  const { scene, oTex, eTex } = useLoader();
  const { activeRoom } = useEngine();
  const settings = activeRoom?.getSettings();

  useMemo(() => {
    // apply textures to the scene
    if (scene && oTex && eTex) {
      const objMaterial = new THREE.MeshBasicMaterial({ map: oTex });
      const envMaterial = new THREE.MeshBasicMaterial({ map: eTex });
      const lightMaterial = new THREE.MeshBasicMaterial({
        color: settings?.lighting.color || 0xffffff,
      });
      const emissiveMaterial = new THREE.MeshBasicMaterial({
        color: settings?.emissive.color || 0xffffff,
      });

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.name === "objects") {
            mesh.material = objMaterial;
          } else if (mesh.name === "walls") {
            mesh.material = envMaterial;
          } else if (mesh.name.includes("light")) {
            mesh.material = lightMaterial;
          } else if (mesh.name.includes("emissive")) {
            mesh.material = emissiveMaterial;
          }
        }
      });
    }
  }, [scene, oTex, eTex]);

  return <primitive object={scene} />;
}
