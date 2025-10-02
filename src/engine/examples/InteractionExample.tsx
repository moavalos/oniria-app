import { InteractionSystem, type InteractionConfig } from "../systems";
import type { ObjectEvent } from "../config/room.type";

// Ejemplo de uso del InteractionSystem configurable desde la UI
export function InteractionExample() {
  // Configuración personalizada de interacciones
  const interactionConfig: InteractionConfig = {
    enableRaycasting: true,
    raycastingLayers: [0, 1], // Solo detectar objetos en las capas 0 y 1
    debugMode: true,
  };

  // Handlers para eventos de interacción
  const handleHoverEnter = (objectName: string, event: ObjectEvent) => {
    console.log(`🔍 Hover enter en: ${objectName}`, event);
    // Aquí podrías cambiar el cursor, mostrar tooltip, etc.
    document.body.style.cursor = "pointer";
  };

  const handleHoverLeave = (objectName: string, event: ObjectEvent) => {
    console.log(`↩️ Hover leave en: ${objectName}`, event);
    // Restaurar cursor
    document.body.style.cursor = "default";
  };

  const handleClick = (objectName: string, event: ObjectEvent) => {
    console.log(`🖱️ Click en: ${objectName}`, event);
    // Ejecutar lógica específica del objeto
    if (objectName === "custom_button") {
      alert("¡Botón personalizado activado!");
    }
  };

  const handleInteractionStateChange = (hoveredObjects: string[]) => {
    console.log(`📊 Objetos siendo hover: [${hoveredObjects.join(", ")}]`);
    // Actualizar UI con la lista de objetos en hover
  };

  return (
    <InteractionSystem
      config={interactionConfig}
      onHoverEnter={handleHoverEnter}
      onHoverLeave={handleHoverLeave}
      onClick={handleClick}
      onInteractionStateChange={handleInteractionStateChange}
      enableInteractions={true}
      autoConfigureForRoom={true} // También carga interacciones de la habitación
      showDebugControls={true}
    />
  );
}

// Ejemplo avanzado con control programático
export function AdvancedInteractionExample() {
  const interactionConfig: InteractionConfig = {
    enableRaycasting: true,
    raycastingLayers: [0], // Solo capa principal
    debugMode: false,
  };

  const handleHoverEnter = (objectName: string, event: ObjectEvent) => {
    // Lógica avanzada de hover
    console.log(`🎯 Interacción avanzada con: ${objectName}`, {
      eventType: event.type,
      timestamp: new Date().toISOString(),
    });
  };

  const handleClick = (_objectName: string, event: ObjectEvent) => {
    // Ejecutar diferentes acciones según el tipo de evento
    switch (event.type) {
      case "animation":
        console.log("🎬 Ejecutando animación:", event);
        break;
      case "function":
        console.log("⚡ Ejecutando función:", event);
        break;
      default:
        console.log("🔧 Evento personalizado:", event);
    }
  };

  const handleInteractionStateChange = (hoveredObjects: string[]) => {
    // Notificar a otros sistemas sobre el estado de interacción
    if (hoveredObjects.length > 0) {
      console.log(`🎯 ${hoveredObjects.length} objeto(s) en foco`);
    }
  };

  return (
    <InteractionSystem
      config={interactionConfig}
      onHoverEnter={handleHoverEnter}
      onClick={handleClick}
      onInteractionStateChange={handleInteractionStateChange}
      enableInteractions={true}
      autoConfigureForRoom={false} // Solo interacciones manuales
      showDebugControls={false} // Sin controles de debug
    />
  );
}

export default InteractionExample;
