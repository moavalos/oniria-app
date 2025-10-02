import { Engine } from "@/engine";
import { useRoomState, useRoomObjects } from "@/engine/hooks/useRoomState";
import { useEffect } from "react";

/**
 * Ejemplo de uso del nuevo sistema refactorizado en Home
 * Demuestra el flujo completo con ConfigManager y EngineCore
 */
export default function HomeRefactored() {
  const {
    activeRoom,
    isLoading,
    error,
    registerRoom,
    hasScene,
    hasTextures,
  } = useRoomState();

  const {
    lookAtables,
    animatables,
    interactables,
    colorables,
    hasObjects,
    getObjectColor,
    isObjectAnimatable,
  } = useRoomObjects();

  // Configuración hardcodeada (vendría del backend)
  const backendSettings = {
    roomId: "oniria",
    skinId: "oniria",
  };

  useEffect(() => {
    const { roomId, skinId } = backendSettings;
    if (roomId && skinId) {
      registerRoom(roomId, skinId);
    }
  }, [registerRoom]);

  // Debug info para desarrollo
  useEffect(() => {
    if (hasObjects && process.env.NODE_ENV === "development") {
      console.log("🎨 Objetos con color:", Object.keys(colorables));
      console.log("🎬 Objetos animables:", Object.keys(animatables));
      console.log("🖱️ Objetos interactables:", Object.keys(interactables));
      console.log("👀 Objetos lookAtables:", Object.keys(lookAtables));

      // Ejemplos de uso de helpers
      console.log("Color del LED 1:", getObjectColor("led_1")); // "#FF00FF"
      console.log(
        "¿Dog handler es animable?:",
        isObjectAnimatable("dog_handler")
      ); // true
    }
  }, [
    hasObjects,
    colorables,
    animatables,
    interactables,
    lookAtables,
    getObjectColor,
    isObjectAnimatable,
  ]);

  return (
    <div className="p-5 h-full w-full rounded-3xl bg-gradient-to-b from-black/80 via-black/30 to-black/80">
      {/* Panel de debug en desarrollo */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 left-4 bg-black/70 text-white p-4 rounded-lg text-sm z-10">
          <h3 className="font-bold mb-2">🔧 Engine Status</h3>
          <div>Room: {activeRoom?.id || "None"}</div>
          <div>Loading: {isLoading ? "⏳" : "✅"}</div>
          <div>Has Scene: {hasScene ? "✅" : "❌"}</div>
          <div>Has Textures: {hasTextures ? "✅" : "❌"}</div>
          <div>Objects Loaded: {hasObjects ? "✅" : "❌"}</div>
          {error && <div className="text-red-400">Error: {error}</div>}
        </div>
      )}

      {/* Renderizado del Engine */}
      <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
        <Engine.Core>
          {/* 
            El RoomScene refactorizado maneja automáticamente:
            - Registro de room/skin usando core.registerRoom()
            - Carga de configuración via ConfigManager
            - Estados de loading/error
            - Renderizado solo cuando todo está listo
          */}
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>

      {/* Panel de información de objetos */}
      {hasObjects && process.env.NODE_ENV === "development" && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white p-4 rounded-lg text-xs z-10 max-w-xs">
          <h4 className="font-bold mb-2">📦 Loaded Objects</h4>
          <div>Colors: {Object.keys(colorables).length}</div>
          <div>Animations: {Object.keys(animatables).length}</div>
          <div>Interactions: {Object.keys(interactables).length}</div>
          <div>LookAt Points: {Object.keys(lookAtables).length}</div>
        </div>
      )}
    </div>
  );
}

// Componente RoomScene refactorizado (importado)
import RoomScene from "@/engine/scenes/RoomScene";
