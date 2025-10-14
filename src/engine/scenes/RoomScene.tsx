import { useEngineCore } from "@engine/core";
import { RoomRenderer } from "../systems";

/**
 * Escena principal para renderizar salas 3D.
 * Gestiona la carga y renderizado de salas con sus respectivos skins.
 */
export default function RoomScene() {
  const core = useEngineCore();

  // Solo renderizar si hay una room activa registrada en el core
  return core.activeRoom ? <RoomRenderer /> : null;
}
