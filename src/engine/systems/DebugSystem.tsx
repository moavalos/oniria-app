import React from "react";
import { button, useControls } from "leva";
import { useEngineCore } from "../Engine";
import { useTransitions } from "../hooks";
import * as THREE from "three";

export interface DebugSystemProps {
  enabled?: boolean;
  panels?: {
    engine?: boolean;
    camera?: boolean;
    animation?: boolean;
    interaction?: boolean;
    scene?: boolean;
    performance?: boolean;
  };
}

export default function DebugSystem({
  enabled = true,
  panels = {
    engine: true,
    camera: true,
    animation: true,
    interaction: true,
    scene: true,
    performance: true,
  },
}: DebugSystemProps) {
  if (!enabled) return null;

  return (
    <>
      {panels.engine && <EngineDebugPanel />}
      {panels.camera && <CameraDebugPanel />}
      {panels.animation && <AnimationDebugPanel />}
      {panels.interaction && <InteractionDebugPanel />}
      {panels.scene && <SceneDebugPanel />}
      {panels.performance && <PerformanceDebugPanel />}
    </>
  );
}

// Panel de Engine General
function EngineDebugPanel() {
  const core = useEngineCore();
  const { activeRoom } = core;

  useControls("🔧 Engine", {
    activeRoom: {
      value: activeRoom?.constructor.name || "none",
      disabled: true,
      label: "Active Room",
    },
    loopRunning: {
      value: "running",
      disabled: true,
      label: "Loop Status",
    },
    restartEngine: button(() => {
      console.log("🔄 Restarting engine...");
    }),
    exportState: button(() => {
      const state = {
        room: activeRoom?.constructor.name,
        scene: activeRoom?.getScene()?.children.length,
        timestamp: Date.now(),
      };
      console.log("📤 Engine State:", state);
    }),
  });

  return null;
}

// Panel de Cámara
function CameraDebugPanel() {
  const core = useEngineCore();
  const { activeRoom } = core;
  const cameraService = core.getCameraService();
  const { viewNodes } = useTransitions();

  // Obtener lookAtables
  const lookAtables = React.useMemo(() => {
    if (!activeRoom) return {};
    return activeRoom.getLookAtableObjectsSync();
  }, [activeRoom]);

  const options = React.useMemo(() => Object.keys(lookAtables), [lookAtables]);

  const { target } = useControls("📷 Camera", {
    target: {
      value: "scene",
      options: ["scene", ...options],
      label: "Focus Target",
    },
    resetCamera: button(() => {
      cameraService?.setLookAt(
        new THREE.Vector3(-3.5, 3, 6),
        new THREE.Vector3(0, 1.8, 0),
        true
      );
    }),
    frontView: button(() => {
      cameraService?.setLookAt(
        new THREE.Vector3(0, 2, 5),
        new THREE.Vector3(0, 1, 0),
        true
      );
    }),
    topView: button(() => {
      cameraService?.setLookAt(
        new THREE.Vector3(0, 10, 0),
        new THREE.Vector3(0, 0, 0),
        true
      );
    }),
    sideView: button(() => {
      cameraService?.setLookAt(
        new THREE.Vector3(5, 2, 0),
        new THREE.Vector3(0, 1, 0),
        true
      );
    }),
    viewNodesBtn: button(() => {
      cameraService?.setLookAt(
        new THREE.Vector3(-3.5, 3, 6),
        new THREE.Vector3(0, 1.8, 0),
        true
      );
      viewNodes({});
    }),
  });

  // Efecto para cambiar target
  React.useEffect(() => {
    if (!target || !cameraService || target === "scene") return;

    const objPos = activeRoom
      ?.getObjectByName(target)
      ?.getWorldPosition(new THREE.Vector3());
    const from = lookAtables[target];

    if (from && objPos) {
      cameraService.setLookAt(from, objPos, true);
    }
  }, [target, cameraService, lookAtables, activeRoom]);

  return null;
}

// Panel de Animaciones
function AnimationDebugPanel() {
  const core = useEngineCore();
  const { activeRoom } = core;

  useControls("🎬 Animation", {
    totalClips: {
      value: activeRoom?.getScene()?.animations?.length || 0,
      disabled: true,
      label: "Total Clips",
    },
    playAll: button(() => {
      console.log("▶️ Playing all animations");
    }),
    pauseAll: button(() => {
      console.log("⏸️ Pausing all animations");
    }),
    stopAll: button(() => {
      console.log("⏹️ Stopping all animations");
    }),
  });

  return null;
}

// Panel de Interacciones
function InteractionDebugPanel() {
  const core = useEngineCore();
  const { activeRoom } = core;

  const interactables = React.useMemo(() => {
    if (!activeRoom) return {};
    return activeRoom.getInteractableObjectsSync();
  }, [activeRoom]);

  const interactablesList = Object.keys(interactables);

  useControls("🎯 Interaction", {
    totalInteractables: {
      value: interactablesList.length,
      disabled: true,
      label: "Total Interactables",
    },
    interactableObjects: {
      value: interactablesList.join(", ") || "none",
      disabled: true,
      label: "Objects",
    },
    simulateHover: button(() => {
      console.log("🖱️ Simulating hover on first interactable");
      if (interactablesList[0]) {
        console.log(`Hover: ${interactablesList[0]}`);
      }
    }),
    logInteractables: button(() => {
      console.log("📋 Interactables:", interactables);
    }),
  });

  return null;
}

// Panel de Escena
function SceneDebugPanel() {
  const core = useEngineCore();
  const { activeRoom } = core;

  const sceneInfo = React.useMemo(() => {
    const scene = activeRoom?.getScene();
    if (!scene) return { objects: 0, lights: 0, meshes: 0 };

    let objects = 0;
    let lights = 0;
    let meshes = 0;

    scene.traverse((child) => {
      objects++;
      if (child.type.includes("Light")) lights++;
      if (child.type === "Mesh") meshes++;
    });

    return { objects, lights, meshes };
  }, [activeRoom]);

  const [wireframeMode, setWireframeMode] = React.useState(false);

  useControls("🌍 Scene", {
    totalObjects: {
      value: sceneInfo.objects,
      disabled: true,
      label: "Total Objects",
    },
    lights: {
      value: sceneInfo.lights,
      disabled: true,
      label: "Lights",
    },
    meshes: {
      value: sceneInfo.meshes,
      disabled: true,
      label: "Meshes",
    },
    logScene: button(() => {
      const scene = activeRoom?.getScene();
      if (scene) {
        console.log("🌳 Scene Graph:", scene);
        scene.traverse((child) => {
          console.log(`- ${child.name} (${child.type})`);
        });
      }
    }),
    toggleWireframe: button(() => {
      const scene = activeRoom?.getScene();
      scene?.traverse((child) => {
        if (child.type === "Mesh") {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const material = Array.isArray(mesh.material)
              ? mesh.material[0]
              : mesh.material;
            if ("wireframe" in material) {
              material.wireframe = !material.wireframe;
            }
          }
        }
      });
      setWireframeMode(!wireframeMode);
    }),
  });

  return null;
}

// Panel de Performance
function PerformanceDebugPanel() {
  const [frameRate, setFrameRate] = React.useState(0);
  const [memoryUsage, setMemoryUsage] = React.useState(0);
  const [isProfileling, setIsProfiiling] = React.useState(false);

  React.useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const updateStats = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFrameRate(frameCount);
        frameCount = 0;
        lastTime = currentTime;

        // Memory usage (si está disponible)
        if ("memory" in performance) {
          const memory = (performance as any).memory;
          setMemoryUsage(Math.round(memory.usedJSHeapSize / 1024 / 1024));
        }
      }

      requestAnimationFrame(updateStats);
    };

    updateStats();
  }, []);

  useControls("⚡ Performance", {
    frameRate: {
      value: `${frameRate} FPS`,
      disabled: true,
      label: "Frame Rate",
    },
    memoryUsage: {
      value: `${memoryUsage} MB`,
      disabled: true,
      label: "Memory Usage",
    },
    startProfiling: button(() => {
      console.log("🔍 Starting performance profiling...");
      console.time("Performance Profile");
      setIsProfiiling(true);
    }),
    endProfiling: button(() => {
      console.timeEnd("Performance Profile");
      console.log("✅ Performance profiling ended");
      setIsProfiiling(false);
    }),
    forceGC: button(() => {
      if ("gc" in window && typeof (window as any).gc === "function") {
        (window as any).gc();
        console.log("🗑️ Garbage collection forced");
      } else {
        console.log("⚠️ GC not available");
      }
    }),
    profilingStatus: {
      value: isProfileling ? "Running" : "Stopped",
      disabled: true,
      label: "Profiling Status",
    },
  });

  return null;
}
