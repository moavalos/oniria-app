import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useEngineCore } from "@engine/Engine";
import { useThreeLoader } from "@engine/hooks";
import { useProgress } from "@engine/hooks/useProgress";

interface AssetItem {
  url: string;
  type: "gltf" | "texture" | "ktx2" | "audio" | "binary";
}

export default function RoomRendererTest() {
  const core = useEngineCore();

  const { loopService } = core;

  // Estados del loader
  const [room, setRoom] = useState<any>(null);
  const [loadedAssets, setLoadedAssets] = useState<{ [key: string]: any }>({});
  const [assetsToLoad, setAssetsToLoad] = useState<AssetItem[]>([]);

  // Referencias
  const portalMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  // Hook de carga con Three.js nativo - PASAR EL RENDERER
  const { loadAssets, resetLoader } = useThreeLoader(core.gl!);
  const { active: isLoading, progress } = useProgress();
  console.log("🎯 RoomRendererTest:", {
    activeRoom: core.activeRoom,
    isLoading,
    progress,
    hasRoom: !!room,
    assetsCount: Object.keys(loadedAssets).length,
  });

  // Configuración de uniforms del Portal
  const portalUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPortalAlpha: { value: 1.0 },
      uDensity: { value: 4.5 },
      uRadius: { value: 1.2 },
      uAngle: { value: 3.2 },
      uHue: { value: 0.74 },
      uSaturation: { value: 0.58 },
      uRadiusFactor: { value: 1.5 },
      uGainOffset: { value: 0.5 },
      uGainScale: { value: 3.0 },
    }),
    []
  );

  // Detectar cambio de room activa y preparar assets
  useEffect(() => {
    if (!core.activeRoom) {
      console.log("🚫 No hay room activa");
      setRoom(null);
      setLoadedAssets({});
      setAssetsToLoad([]);
      resetLoader();
      return;
    }

    console.log("🎯 Nueva room detectada:", core.activeRoom);

    // Resetear estado
    setRoom(null);
    setLoadedAssets({});
    resetLoader();

    // Definir assets a cargar basados en la room activa
    const assets: AssetItem[] = [
      { url: "/models/oniria.gltf", type: "gltf" },
      { url: "/skins/oniria_wall.ktx2", type: "ktx2" },
      { url: "/skins/oniria_object.ktx2", type: "ktx2" },
    ];

    setAssetsToLoad(assets);
  }, [core.activeRoom, resetLoader]);

  // Iniciar carga cuando se definan los assets
  useEffect(() => {
    if (assetsToLoad.length === 0) return;

    const startLoading = async () => {
      try {
        console.log("🚀 Iniciando carga de assets:", assetsToLoad);
        const assets = await loadAssets(assetsToLoad);

        console.log("✅ Assets cargados:", Object.keys(assets));
        setLoadedAssets(assets);

        // Crear room con los assets cargados
        await createRoomFromAssets(assets);
      } catch (err) {
        console.error("❌ Error cargando assets:", err);
      }
    };

    startLoading();
  }, [assetsToLoad, loadAssets]);

  // Crear room a partir de los assets cargados
  const createRoomFromAssets = async (assets: { [key: string]: any }) => {
    try {
      console.log("🏠 Creando room con assets cargados");

      // Aquí usarías tu lógica para crear la room
      // Por ahora simulo la creación
      const mockRoom = {
        hasScene: () => true,
        getScene: () => assets.oniria?.scene || new THREE.Scene(),
        getPortal: () => {
          // Buscar portal en la escena
          if (assets.oniria?.scene) {
            let portal = null;
            assets.oniria.scene.traverse((child: THREE.Object3D) => {
              if (child.name.toLowerCase().includes("portal")) {
                portal = child;
              }
            });
            return portal;
          }
          return null;
        },
      };

      setRoom(mockRoom);
      console.log("✅ Room creada exitosamente");
    } catch (error) {
      console.error("❌ Error creando room:", error);
    }
  };

  // Aplicar materiales cuando la room esté lista
  useEffect(() => {
    if (!room || !room.hasScene()) return;

    const applyMaterials = async () => {
      try {
        console.log("🎨 Aplicando materiales a la room");

        const materialService = core.getMaterialService();
        await materialService.applyMaterialsToRoom(room);

        const portal = room.getPortal();
        if (portal) {
          console.log("🌀 Configurando portal");
          materialService.applyMaterialsToPortal(portal, portalUniforms);
          const material = (portal as THREE.Mesh)
            ?.material as THREE.ShaderMaterial;
          if (material) {
            portalMaterialRef.current = material;
          }
        }
      } catch (error) {
        console.error("❌ Error aplicando materiales:", error);
      }
    };

    applyMaterials();
  }, [room, portalUniforms, core]);

  // Animación del portal
  useEffect(() => {
    if (!loopService) return;

    const cb = (_: unknown, dt: number) => {
      if (!portalMaterialRef.current) return;
      portalMaterialRef.current.uniforms.uTime.value += dt;
    };

    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService]);

  // Determinar la escena a renderizar
  const scene = useMemo(() => {
    return room?.getScene();
  }, [room]);

  return (
    <>
      {/* Sistema de loading propio */}
      {/* <LoaderSystem
        isLoading={isLoading}
        progress={progress}
        error={error}
        onLoadStart={() => console.log("🚀 RoomRendererTest: Carga iniciada")}
        onLoadProgress={(p) =>
          console.log(`📊 RoomRendererTest: ${Math.round(p)}%`)
        }
        onLoadComplete={() =>
          console.log("✅ RoomRendererTest: Carga completada")
        }
        onLoadError={(err) => console.error("❌ RoomRendererTest: Error:", err)}
      /> */}

      {/* Renderizar escena solo cuando esté lista */}
      {scene ? (
        <primitive object={scene} />
      ) : !isLoading ? (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      ) : null}
    </>
  );
}
