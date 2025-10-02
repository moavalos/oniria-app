import * as THREE from 'three';
import type { RoomConfig, AnimationAction, ObjectEventArray } from '../config/room.type';
import { loadRoomConfig } from './ConfigLoader';

/**
 * Objetos procesados por el ConfigManager
 */
export interface ProcessedRoomObjects {
    lookAtable: Record<string, THREE.Vector3>;
    animatable: Record<string, AnimationAction>;
    interactable: Record<string, ObjectEventArray>;
    colorable: Record<string, string>;
}

/**
 * Gestor de configuraciones de habitaciones - carga bajo demanda
 * Solo mantiene la configuración de la habitación activa
 */
export class ConfigManager {
    private static instance: ConfigManager | null = null;
    private currentConfig: RoomConfig | null = null;
    private currentRoomId: string | null = null;

    private constructor() { }

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    /**
     * Obtiene la configuración de una habitación
     */
    async getConfig(roomId: string): Promise<RoomConfig> {
        if (!roomId?.trim()) {
            throw new Error('Room ID cannot be empty');
        }

        // Si es la misma habitación que ya tenemos cargada, devolverla
        if (this.currentRoomId === roomId && this.currentConfig) {
            return this.currentConfig;
        }

        // Cargar nueva configuración
        try {
            this.currentConfig = await loadRoomConfig(roomId);
            this.currentRoomId = roomId;
            return this.currentConfig;
        } catch (error) {
            console.error(`Failed to load config for room ${roomId}:`, error);
            throw error;
        }
    }

    /**
     * Obtiene todos los objetos procesados para una habitación
     */
    async getProcessedObjects(roomId: string, scene?: THREE.Group<THREE.Object3DEventMap>): Promise<ProcessedRoomObjects> {
        const config = await this.getConfig(roomId);
        return {
            lookAtable: scene ? this.extractLookAtableObjects(config, scene) : {},
            animatable: this.extractAnimatableObjects(config),
            interactable: scene ? this.extractInteractableObjects(config, scene) : {},
            colorable: this.extractColorableObjects(config)
        };
    }

    /**
     * Obtiene objetos con lookAtOffset
     */
    async getLookAtableObjects(roomId: string, scene: THREE.Group<THREE.Object3DEventMap>): Promise<Record<string, THREE.Vector3>> {
        const config = await this.getConfig(roomId);
        return this.extractLookAtableObjects(config, scene);
    }

    /**
     * Obtiene objetos animables
     */
    async getAnimatableObjects(roomId: string): Promise<Record<string, AnimationAction>> {
        const config = await this.getConfig(roomId);
        return this.extractAnimatableObjects(config);
    }

    /**
     * Obtiene objetos interactuables
     */
    async getInteractableObjects(roomId: string, scene: THREE.Group<THREE.Object3DEventMap>): Promise<Record<string, ObjectEventArray>> {
        const config = await this.getConfig(roomId);
        return this.extractInteractableObjects(config, scene);
    }

    /**
     * Obtiene objetos con colores
     */
    async getColorableObjects(roomId: string): Promise<Record<string, string>> {
        const config = await this.getConfig(roomId);
        return this.extractColorableObjects(config);
    }

    /**
     * Limpia la configuración actual (cuando se cambia de habitación)
     */
    clearCurrent(): void {
        this.currentConfig = null;
        this.currentRoomId = null;
    }

    // Métodos privados de extracción
    private extractLookAtableObjects(config: RoomConfig, scene: THREE.Group<THREE.Object3DEventMap>): Record<string, THREE.Vector3> {
        const lookAtables: Record<string, THREE.Vector3> = {};

        for (const [name, obj] of Object.entries(config.objects)) {
            if (obj.lookAtOffset) {
                const object3D = scene.getObjectByName(name);
                if (object3D) {
                    const worldPos = new THREE.Vector3();
                    object3D.getWorldPosition(worldPos);
                    const offset = new THREE.Vector3(...obj.lookAtOffset);
                    lookAtables[name] = worldPos.add(offset);
                }
            }
        }

        return lookAtables;
    }

    private extractAnimatableObjects(config: RoomConfig): Record<string, AnimationAction> {
        const animatables: Record<string, AnimationAction> = {};

        for (const [name, obj] of Object.entries(config.objects)) {
            if (obj.animation) {
                animatables[name] = obj.animation;
            }
        }

        return animatables;
    }

    private extractInteractableObjects(config: RoomConfig, scene: THREE.Group<THREE.Object3DEventMap>): Record<string, ObjectEventArray> {
        const interactables: Record<string, ObjectEventArray> = {};

        console.log("🔍 [ConfigManager] Extracting interactables from config:", config.objects);

        for (const [name, obj] of Object.entries(config.objects)) {
            if (obj.interceptable && obj.event) {
                console.log(`✅ [ConfigManager] Found interceptable: ${name}`, obj);
                // Asegurar que event es siempre un array
                const eventArray = Array.isArray(obj.event) ? obj.event : [obj.event];
                console.log(`🔄 [ConfigManager] Normalized event for ${name}:`, eventArray);
                interactables[name] = eventArray;
            } else {
                console.log(`⏭️ [ConfigManager] Skipping ${name}, interceptable: ${obj.interceptable}, event: ${!!obj.event}`);
            }
        }

        console.log("🔍 [ConfigManager] Raw interactables before mapping:", interactables);
        const mapped = this.mapHandlersToChildObjects(scene, interactables);
        console.log("🔍 [ConfigManager] Final mapped interactables:", mapped);

        return mapped;
    }

    private extractColorableObjects(config: RoomConfig): Record<string, string> {
        const colorables: Record<string, string> = {};

        for (const [name, obj] of Object.entries(config.objects)) {
            if (obj.color) {
                colorables[name] = obj.color;
            }
        }

        return colorables;
    }

    private mapHandlersToChildObjects(
        scene: THREE.Group<THREE.Object3DEventMap>,
        handlers: Record<string, ObjectEventArray>
    ): Record<string, ObjectEventArray> {
        const mapped: Record<string, ObjectEventArray> = {};

        console.log("🗺️ [ConfigManager] Mapping handlers to child objects:", handlers);

        Object.entries(handlers).forEach(([name, event]) => {
            if (this.isHandlerObject(name)) {
                console.log(`🔄 [ConfigManager] ${name} is a handler object, looking for child...`);
                const childName = this.getChildObjectName(scene, name);
                if (childName) {
                    console.log(`✅ [ConfigManager] Mapped ${name} -> ${childName}`);
                    mapped[childName] = event;
                } else {
                    console.log(`❌ [ConfigManager] No child found for handler ${name}`);
                }
            } else {
                console.log(`➡️ [ConfigManager] ${name} is not a handler, keeping as-is`);
                mapped[name] = event;
            }
        });

        return mapped;
    }

    private isHandlerObject(name: string): boolean {
        return name.includes("_handler");
    }

    private getChildObjectName(scene: THREE.Group<THREE.Object3DEventMap>, handlerName: string): string | null {
        const handler = scene.getObjectByName(handlerName);
        console.log(`🔍 [ConfigManager] Looking for handler "${handlerName}" in scene...`, !!handler);
        
        if (handler) {
            const child = handler.children[0]; // el primer mesh hijo
            console.log(`🔍 [ConfigManager] Handler children:`, handler.children.map(c => c.name));
            const childName = child?.name || null;
            console.log(`🔍 [ConfigManager] Child name:`, childName);
            return childName;
        }
        
        return null;
    }
}