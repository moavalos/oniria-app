import { RendererSystem } from "@engine/systems";
import { useEngineAPI } from "../context/EngineApiProvider";
import { useRoomState } from "../hooks/useRoomState";
import { useEffect } from "react";

/**
 * RoomScene alternativo que usa useRoomState para mayor control
 * Demuestra cómo usar el nuevo sistema de configuración
 */
export default function RoomSceneAdvanced() {
  const { roomId, skinId } = useEngineAPI();
  const {
    activeRoom,
    isLoading,
    error,
    roomObjects,
    registerRoom,
    updateRoomObjects,
    hasRoom,
    hasScene
  } = useRoomState();

  // Efecto para registrar room cuando cambian los IDs
  useEffect(() => {
    if (roomId && skinId) {
      registerRoom(roomId, skinId);
    }
  }, [roomId, skinId, registerRoom]);

  // Efecto para actualizar objetos cuando la escena está lista
  useEffect(() => {
    if (hasRoom && hasScene) {
      updateRoomObjects();
    }
  }, [hasRoom, hasScene, updateRoomObjects]);

  // Estados de carga y error con componentes más elaborados
  if (isLoading) {
    return (
      <group>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color="orange" wireframe />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 0.1, 2]} />
          <meshBasicMaterial color="gray" />
        </mesh>
        {/* Indicador de carga animado */}
      </group>
    );
  }

  if (error) {
    console.error('RoomSceneAdvanced Error:', error);
    return (
      <group>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="red" />
        </mesh>
        {/* Indicador de error */}
      </group>
    );
  }

  // Debug: Mostrar información de objetos cargados
  if (roomObjects && process.env.NODE_ENV === 'development') {
    console.log('🎯 Room Objects Loaded:', {
      lookAtables: Object.keys(roomObjects.lookAtable).length,
      animatables: Object.keys(roomObjects.animatable).length,
      interactables: Object.keys(roomObjects.interactable).length,
      colorables: Object.keys(roomObjects.colorable).length
    });
  }

  // Solo renderizar si todo está listo
  return activeRoom && hasScene ? <RendererSystem /> : null;
}

// Hook personalizado para acceder a objetos específicos de la room
export function useRoomObjects() {
  const { roomObjects } = useRoomState();
  
  return {
    lookAtables: roomObjects?.lookAtable ?? {},
    animatables: roomObjects?.animatable ?? {},
    interactables: roomObjects?.interactable ?? {},
    colorables: roomObjects?.colorable ?? {},
    hasObjects: !!roomObjects,
    
    // Helpers específicos
    getObjectColor: (objectName: string) => roomObjects?.colorable[objectName],
    isObjectAnimatable: (objectName: string) => objectName in (roomObjects?.animatable ?? {}),
    isObjectInteractable: (objectName: string) => objectName in (roomObjects?.interactable ?? {}),
    getLookAtPosition: (objectName: string) => roomObjects?.lookAtable[objectName],
  };
}