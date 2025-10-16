import React, { useEffect, useState } from "react";
import { button, useControls } from "leva";

import { useEngineCore } from "@engine/core";
import { useEngineStore } from "@engine/core/store/engineStore";
import { useEngineState, useTransitions } from "../hooks";
import { EngineState } from "@engine/core/types/engine.types";
import * as THREE from "three";
import { CameraService } from "../services";

export interface DebugSystemProps {
  enabled?: boolean;
  panels?: {
    engine?: boolean;
    camera?: boolean;
    animation?: boolean;
    interaction?: boolean;
    scene?: boolean;
    performance?: boolean;
    node?: boolean;
  };
}

/**
 * Sistema de debug del motor 3D.
 * Proporciona paneles de debug para inspeccionar el estado del motor en tiempo real.
 */
export default function DebugSystem({
  enabled = true,
  panels = {
    engine: true,
    camera: true,
    animation: true,
    interaction: true,
    scene: true,
    performance: true,
    node: true,
  },
}: DebugSystemProps) {
  const engineState = useEngineState();

  // Solo mostrar cuando el engine esté listo (para debug)
  const isEngineReady = engineState === EngineState.READY;

  if (!enabled) return null;

  return (
    <>
      {panels.engine && <EngineDebugPanel />}
      {isEngineReady && panels.camera && <CameraDebugPanel />}
      {isEngineReady && panels.node && <NodeDebugPanel />}
    </>
  );
}

// Panel de Engine General
function EngineDebugPanel() {
  const core = useEngineCore();
  const engineState = useEngineState();
  const { dreamModalVisible, setDreamModalVisible } = useEngineStore();

  // Crear un objeto de controles que se actualice reactivamente
  const controls = React.useMemo(
    () => ({
      engineState: {
        value: engineState,
        disabled: true,
        label: "Engine State",
      },
      activeRoom: {
        value: core.getCurrentRoom()?.constructor.name || "none",
        disabled: true,
        label: "Active Room",
      },
      loopRunning: {
        value: "running",
        disabled: true,
        label: "Loop Status",
      },
      "--- Actions ---": { value: "", disabled: true },
      openDreamModal: button(() => {
        console.log("🎬 Opening Dream Modal...");
        setDreamModalVisible(true);
      }),
      closeDreamModal: button(() => {
        console.log("🎬 Closing Dream Modal...");
        setDreamModalVisible(false);
      }),
      dreamModalStatus: {
        value: dreamModalVisible ? "Visible" : "Hidden",
        disabled: true,
        label: "Dream Modal",
      },
      "--- Debug ---": { value: "", disabled: true },
      restartEngine: button(() => {
        console.log("🔄 Restarting engine...");
      }),
      exportState: button(() => {
        const state = {
          room: core.getCurrentRoom()?.constructor.name,
          engineState: engineState,
          scene: core.getCurrentRoom()?.get_Scene()?.children.length,
          dreamModal: dreamModalVisible,
          timestamp: Date.now(),
        };
        console.log("📤 Engine State:", state);
      }),
    }),
    [
      engineState,
      core.getCurrentRoom(),
      dreamModalVisible,
      setDreamModalVisible,
    ]
  );
  useControls("🔧 Engine", controls, [
    engineState,
    core.getCurrentRoom(),
    dreamModalVisible,
  ]);

  return null;
}

// Panel de Cámara
function CameraDebugPanel() {
  const core = useEngineCore();
  const engineState = useEngineState();
  const cameraService = core.getService(CameraService);
  const { viewNodes } = useTransitions();

  // Estado para lookAtables (usando patrón async como AnimationSystem)
  const [lookAtables, setLookAtables] = useState<Record<string, any>>({});

  const isEngineReady = engineState === EngineState.READY;

  const activeRoom = core.getCurrentRoom();

  // Cargar lookAtables de forma asíncrona
  useEffect(() => {
    if (!isEngineReady || !activeRoom) {
      setLookAtables({});
      return;
    }

    const loadLookAtables = async () => {
      try {
        const roomLookAtables = await activeRoom.getLookAtableObjects();
        console.log(roomLookAtables);
        setLookAtables(roomLookAtables || {});
      } catch (error) {
        console.error("Error cargando objetos lookAtables:", error);
        setLookAtables({});
      }
    };

    loadLookAtables();
  }, [activeRoom, isEngineReady]);

  const options = React.useMemo(() => Object.keys(lookAtables), [lookAtables]);

  // Crear controles reactivos
  const cameraControls = React.useMemo(
    () => ({
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
        viewNodes();
      }),
    }),
    [options, cameraService, viewNodes]
  );

  const { target } = useControls("📷 Camera", cameraControls, [options]);

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

// Node Debug Panel para controlar los shaders del nodo
function NodeDebugPanel() {
  // Usar el store para los uniforms del nodo (más eficiente)
  const { nodeUniforms, setNodeUniform, setNodeUniforms, resetNodeUniforms } =
    useEngineStore();

  // Controles de Leva para los uniforms del nodo
  useControls(
    "🌀 Node Shader",
    {
      // Controles de plasma/energía
      uPlasmaStrength: {
        value: nodeUniforms.uPlasmaStrength,
        min: 0.0,
        max: 3.0,
        step: 0.1,
        label: "Plasma Strength",
        onChange: (value) => setNodeUniform("uPlasmaStrength", value),
      },
      uGlassStrength: {
        value: nodeUniforms.uGlassStrength,
        min: 0.0,
        max: 3.0,
        step: 0.1,
        label: "Glass Strength",
        onChange: (value) => setNodeUniform("uGlassStrength", value),
      },
      // Controles de forma
      uPlasmaRadius: {
        value: nodeUniforms.uPlasmaRadius,
        min: 0.5,
        max: 2.0,
        step: 0.05,
        label: "Plasma Radius",
        onChange: (value) => setNodeUniform("uPlasmaRadius", value),
      },

      // Controles de fresnel
      uFresnelWidth: {
        value: nodeUniforms.uFresnelWidth,
        min: 0.1,
        max: 1.0,
        step: 0.1,
        label: "Fresnel Width",
        onChange: (value) => setNodeUniform("uFresnelWidth", value),
      },
      uFresnelIntensity: {
        value: nodeUniforms.uFresnelIntensity,
        min: 0.5,
        max: 5.0,
        step: 0.1,
        label: "Fresnel Intensity",
        onChange: (value) => setNodeUniform("uFresnelIntensity", value),
      },

      uFresnelBright: {
        value: nodeUniforms.uFresnelBright,
        min: 0.5,
        max: 5.0,
        step: 0.1,
        label: "Fresnel Brightness",
        onChange: (value) => setNodeUniform("uFresnelBright", value),
      },

      // Botones de presets
      "Reset to Default": button(() => {
        resetNodeUniforms();
      }),

      "High Energy Preset": button(() => {
        setNodeUniforms({
          uPlasmaStrength: 2.5,
          uGlassStrength: 2.0,
          uFresnelIntensity: 3.5,
        });
      }),

      "Subtle Preset": button(() => {
        setNodeUniforms({
          uPlasmaStrength: 0.5,
          uGlassStrength: 0.7,
          uFresnelIntensity: 1.5,
        });
      }),
    },
    [] // Solo depender del estado del engine
  );

  // Sección para controles de PLASMA
  useControls(
    "🔥 Plasma Colors",
    {
      uPlasmaColor: {
        value: nodeUniforms.uPlasmaColor,
        label: "Plasma Color",
        onChange: (value) => setNodeUniform("uPlasmaColor", value),
      },
      uPlasmaColorIntensity: {
        value: nodeUniforms.uPlasmaColorIntensity,
        min: 0.0,
        max: 3.0,
        step: 0.1,
        label: "Plasma Intensity",
        onChange: (value) => setNodeUniform("uPlasmaColorIntensity", value),
      },
      uPlasmaColorMapX: {
        value: nodeUniforms.uPlasmaColorMap[0],
        min: -2.0,
        max: 2.0,
        step: 0.1,
        label: "Plasma Map X",
        onChange: (value) => {
          const newMap = [...nodeUniforms.uPlasmaColorMap] as [
            number,
            number,
            number,
            number
          ];
          newMap[0] = value;
          setNodeUniforms({ uPlasmaColorMap: newMap });
        },
      },
      uPlasmaColorMapY: {
        value: nodeUniforms.uPlasmaColorMap[1],
        min: -2.0,
        max: 2.0,
        step: 0.1,
        label: "Plasma Map Y",
        onChange: (value) => {
          const newMap = [...nodeUniforms.uPlasmaColorMap] as [
            number,
            number,
            number,
            number
          ];
          newMap[1] = value;
          setNodeUniforms({ uPlasmaColorMap: newMap });
        },
      },
      uPlasmaColorMapZ: {
        value: nodeUniforms.uPlasmaColorMap[2],
        min: -0.01,
        max: 0.01,
        step: 0.001,
        label: "Plasma Map Z",
        onChange: (value) => {
          const newMap = [...nodeUniforms.uPlasmaColorMap] as [
            number,
            number,
            number,
            number
          ];
          newMap[2] = value;
          setNodeUniforms({ uPlasmaColorMap: newMap });
        },
      },
      uPlasmaColorMapW: {
        value: nodeUniforms.uPlasmaColorMap[3],
        min: -2.0,
        max: 2.0,
        step: 0.1,
        label: "Plasma Map W",
        onChange: (value) => {
          const newMap = [...nodeUniforms.uPlasmaColorMap] as [
            number,
            number,
            number,
            number
          ];
          newMap[3] = value;
          setNodeUniforms({ uPlasmaColorMap: newMap });
        },
      },

      // === PALETA PROCEDURAL DEL PLASMA ===
      uPlasmaOffset: {
        value: nodeUniforms.uPlasmaOffset,
        label: "Plasma Offset (Base)",
        onChange: (value) => setNodeUniform("uPlasmaOffset", value),
      },
      uPlasmaAmplitude: {
        value: nodeUniforms.uPlasmaAmplitude,
        label: "Plasma Amplitude (Variation)",
        onChange: (value) => setNodeUniform("uPlasmaAmplitude", value),
      },
      uPlasmaFrequency: {
        value: nodeUniforms.uPlasmaFrequency,
        label: "Plasma Frequency (Speed)",
        onChange: (value) => setNodeUniform("uPlasmaFrequency", value),
      },
      uPlasmaPhase: {
        value: nodeUniforms.uPlasmaPhase,
        label: "Plasma Phase (Shift)",
        onChange: (value) => setNodeUniform("uPlasmaPhase", value),
      },

      // Presets de plasma
      "🔴 Fire Plasma": button(() => {
        setNodeUniforms({
          uPlasmaColor: [2.5, 0.8, 0.3],
          uPlasmaColorMap: [-0.8, 0.7, 0.001, 0.0],
          uPlasmaOffset: [0.8, 0.4, 0.2],
          uPlasmaAmplitude: [0.7, 0.3, 0.1],
          uPlasmaFrequency: [1.2, 0.8, 0.6],
        });
      }),
      "🔵 Ice Plasma": button(() => {
        setNodeUniforms({
          uPlasmaColor: [0.3, 1.5, 2.0],
          uPlasmaColorMap: [-0.3, 0.8, 0.001, 0.0],
          uPlasmaOffset: [0.2, 0.6, 0.9],
          uPlasmaAmplitude: [0.1, 0.4, 0.6],
          uPlasmaFrequency: [0.8, 1.0, 1.2],
        });
      }),
      "🟢 Toxic Plasma": button(() => {
        setNodeUniforms({
          uPlasmaColor: [0.5, 2.2, 0.3],
          uPlasmaColorMap: [-0.6, 0.9, 0.001, 0.0],
          uPlasmaOffset: [0.3, 0.8, 0.2],
          uPlasmaAmplitude: [0.2, 0.7, 0.1],
          uPlasmaFrequency: [0.6, 1.4, 0.8],
        });
      }),
    },
    []
  );

  // Sección para controles de CRISTAL/VIDRIO
  useControls(
    "💎 Glass Colors",
    {
      uGlassColorBase: {
        value: nodeUniforms.uGlassColorBase,
        label: "Glass Base Color",
        onChange: (value) => setNodeUniform("uGlassColorBase", value),
      },
      uGlassOffset: {
        value: nodeUniforms.uGlassOffset,
        label: "Offset (Base)",
        onChange: (value) => setNodeUniform("uGlassOffset", value),
      },
      uGlassAmplitude: {
        value: nodeUniforms.uGlassAmplitude,
        label: "Amplitude (Variation)",
        onChange: (value) => setNodeUniform("uGlassAmplitude", value),
      },
      uGlassFrequency: {
        value: nodeUniforms.uGlassFrequency,
        label: "Frequency (Speed)",
        onChange: (value) => setNodeUniform("uGlassFrequency", value),
      },
      uGlassPhase: {
        value: nodeUniforms.uGlassPhase,
        label: "Phase (Shift)",
        onChange: (value) => setNodeUniform("uGlassPhase", value),
      },
      uGlassTint: {
        value: nodeUniforms.uGlassTint,
        label: "Glass Tint",
        onChange: (value) => setNodeUniform("uGlassTint", value),
      },

      // Control de gamma
      uGammaCorrection: {
        value: nodeUniforms.uGammaCorrection,
        min: 0.5,
        max: 3.0,
        step: 0.1,
        label: "Gamma Correction",
        onChange: (value) => setNodeUniform("uGammaCorrection", value),
      },

      // Presets de cristal
      "� Cool Glass": button(() => {
        setNodeUniforms({
          uGlassColorBase: [-1.1, 0.5, 0.9],
          uGlassOffset: [0.97, 0.65, -0.56],
          uGlassAmplitude: [0.51, 0.3, 0.27],
          uGlassFrequency: [0, 0, 0],
          uGlassPhase: [-0.35, 0.28, 0.89],
          uGlassTint: [-0.5, 1, -1.8],
          uGammaCorrection: 1.8,
        });
      }),
      "� Warm Glass": button(() => {
        setNodeUniforms({
          uGlassOffset: [0.2, 0.1, 0.0],
          uGlassAmplitude: [0.5, 0.3, 0.1],
          uGlassTint: [1.0, 0.7, 0.5],
        });
      }),
      "� Mystic Glass": button(() => {
        setNodeUniforms({
          uGlassOffset: [0.1, 0.0, 0.2],
          uGlassAmplitude: [0.4, 0.1, 0.5],
          uGlassTint: [0.8, 0.4, 1.0],
        });
      }),
    },
    []
  );

  return null;
}
