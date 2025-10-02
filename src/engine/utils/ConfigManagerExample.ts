import { ConfigManager } from './ConfigManager';
import { Room } from '../entities/Room';
import { Skin } from '../entities/Skin';

/**
 * Ejemplo de uso del ConfigManager refactorizado
 * Demuestra cómo usar el ConfigManager para gestionar configuraciones de rooms
 */

async function ejemploUsoConfigManager() {
    // 1. Obtener instancia del ConfigManager (singleton)
    const configManager = ConfigManager.getInstance();

    // 2. Precargar configuraciones al inicio de la aplicación
    await configManager.preloadConfigs(['oniria', 'room2', 'room3']);

    // 3. Crear una room (ahora más simple, sin configuración interna)
    const skin = new Skin('oniria');
    const room = new Room('oniria', skin);

    // 4. Usar el ConfigManager para obtener objetos específicos
    // (esto debe hacerse después de setScene para objetos que requieren coordenadas)

    // Obtener solo animaciones (no requiere escena)
    const animatables = await configManager.getAnimatableObjects('oniria');
    console.log('Objetos animables:', animatables);
    // Output: { dog_handler: { target: "dog_handler", type: "pendulum", ... }, cooler: { ... } }

    // Obtener solo colores (no requiere escena)
    const colorables = await configManager.getColorableObjects('oniria');
    console.log('Objetos con color:', colorables);
    // Output: { led_1: "#FF00FF", led_2: "#FFFFFF", pc_emissive: "#1AFFFF", ... }

    // 5. Simular setScene (normalmente viene del GLTF loader)
    // const scene = new THREE.Group();
    // room.setScene(scene);

    // 6. Obtener objetos que requieren coordenadas de escena
    // const lookAtables = await room.getLookAtableObjects();
    // const interactables = await room.getInteractableObjects();

    // 7. Obtener todos los objetos procesados de una vez
    // const allObjects = await room.getAllObjects();
    // console.log('Todos los objetos:', allObjects);

    // 8. Estadísticas del caché
    const stats = configManager.getCacheStats();
    console.log('Estadísticas de caché:', stats);
    // Output: { cachedConfigs: 3, processedObjects: 1, loadingConfigs: 0, cacheKeys: [...] }

    // 9. Limpieza (opcional)
    // configManager.removeFromCache('oniria');
    // room.dispose(); // También limpia el caché automáticamente
}

// Ejemplo de uso en un componente React
export function useRoomWithConfigManager(roomId: string, skinId: string) {
    const [room, setRoom] = useState<Room | null>(null);
    const [objects, setObjects] = useState<{
        lookAtable: Record<string, THREE.Vector3>;
        animatable: Record<string, AnimationAction>;
        interactable: Record<string, ObjectEventArray>;
        colorable: Record<string, string>;
    } | null>(null);

    useEffect(() => {
        const setupRoom = async () => {
            try {
                const configManager = ConfigManager.getInstance();

                // Precargar configuración
                await configManager.preloadConfigs([roomId]);

                // Crear room
                const skin = new Skin(skinId);
                const newRoom = new Room(roomId, skin);
                setRoom(newRoom);

                // Obtener objetos que no requieren escena
                const [animatable, colorable] = await Promise.all([
                    configManager.getAnimatableObjects(roomId),
                    configManager.getColorableObjects(roomId)
                ]);

                setObjects(prev => ({
                    ...prev,
                    animatable,
                    colorable,
                    lookAtable: {},
                    interactable: {}
                }));

            } catch (error) {
                console.error('Error setting up room:', error);
            }
        };

        if (roomId && skinId) {
            setupRoom();
        }
    }, [roomId, skinId]);

    const updateSceneObjects = useCallback(async (scene: THREE.Group) => {
        if (!room) return;

        room.setScene(scene);

        // Ahora obtener objetos que requieren escena
        const [lookAtable, interactable] = await Promise.all([
            room.getLookAtableObjects(),
            room.getInteractableObjects()
        ]);

        setObjects(prev => ({
            ...prev!,
            lookAtable,
            interactable
        }));
    }, [room]);

    return { room, objects, updateSceneObjects };
}

export default ejemploUsoConfigManager;