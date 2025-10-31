import { useEngineCore } from "@engine/core";
import { useEffect, useState } from "react";
import { ImageManager } from "../services/managers/ImageManager";
import type * as THREE from "three";

interface ImageSceneProps {
  imageUrl: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

/**
 * Escena para renderizar una imagen con efecto de reveal
 *
 * Recibe la URL de la imagen por props y crea el plano
 */
export default function ImageScene(props: ImageSceneProps) {
  const core = useEngineCore();
  const [imagePlane, setImagePlane] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!core || !props.imageUrl) return;

    let mounted = true;

    const createImage = async () => {
      try {
        console.log("[ImageScene]: Creando plano con URL:", props.imageUrl);

        // Obtener el ImageManager del core
        const imageManager = core.getService(ImageManager);
        if (!imageManager) {
          console.error("[ImageScene]: ImageManager no disponible");
          return;
        }

        // Crear el plano de imagen con la URL
        const plane = await imageManager.createImagePlane(props.imageUrl);

        if (!mounted) {
          return;
        }

        setImagePlane(plane);
      } catch (error) {
        console.error("[ImageScene]: Error al crear plano de imagen:", error);
      }
    };

    createImage();

    return () => {
      mounted = false;
    };
  }, [core, props.imageUrl]);

  // Renderizar el plano de imagen en la escena
  if (!imagePlane) return null;

  return <primitive {...props} object={imagePlane} />;
}
