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
 * Gestor centralizado de configuraciones de habitaciones
 * Proporciona caché, carga asíncrona y procesamiento de objetos
 */
export class ConfigManager {
    private static instance: ConfigManager | null = null;
    private configCache = new Map<string, RoomConfig>();
    private processedObjectsCache = new Map<string, ProcessedRoomObjects>();
    private loadingPromises = new Map<string, Promise<RoomConfig>>();

    private constructor() { }

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    /**
     * Obtiene todos los objetos procesados para una habitación
     */
    async getProcessedObjects(roomId: string, scene?: THREE.Group<THREE.Object3DEventMap>): Promise<ProcessedRoomObjects> {
        // Verificar si ya están procesados en caché
        const cacheKey = roomId;
        if (this.processedObjectsCache.has(cacheKey)) {
            const cached = this.processedObjectsCache.get(cacheKey)!;
            // Si necesitamos coordenadas de mundo y hay escena, recalcular lookAtables
            if (scene && Object.keys(cached.lookAtable).length > 0) {
                cached.lookAtable = this.extractLookAtableObjects(await this.getConfig(roomId), scene);
            }
            return cached;
        }

        const config = await this.getConfig(roomId);
        const processed: ProcessedRoomObjects = {
            lookAtable: scene ? this.extractLookAtableObjects(config, scene) : {},
            animatable: this.extractAnimatableObjects(config),
            interactable: scene ? this.extractInteractableObjects(config, scene) : {},
            colorable: this.extractColorableObjects(config)
        };

        this.processedObjectsCache.set(cacheKey, processed);
        return processed;
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

        for (const [name, obj] of Object.entries(config.objects)) {
            if (obj.interceptable && obj.event) {
                interactables[name] = Array.isArray(obj.event) ? obj.event : [obj.event];
            }
        }

        return this.mapHandlersToChildObjects(scene, interactables);
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

        Object.entries(handlers).forEach(([name, event]) => {
            if (this.isHandlerObject(name)) {
                const childName = this.getChildObjectName(scene, name);
                if (childName) {
                    mapped[childName] = event;
                }
            } else {
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
        const child = handler?.children[0]; // el primer mesh hijo
        return child?.name || null;
    }
    /**
     * Obtiene la configuración de una habitación
     * Usa caché si está disponible, sino la carga
     */
    async getConfig(roomId: string): Promise<RoomConfig> {
        if (!roomId?.trim()) {
            throw new Error('Room ID cannot be empty');
        }

        // Si está en caché, devolverla inmediatamente
        if (this.configCache.has(roomId)) {
            return this.configCache.get(roomId)!;
        }

        // Si ya se está cargando, devolver esa promesa
        if (this.loadingPromises.has(roomId)) {
            return this.loadingPromises.get(roomId)!;
        }

        // Cargar la configuración
        const loadingPromise = this.loadConfig(roomId);
        this.loadingPromises.set(roomId, loadingPromise);

        try {
            const config = await loadingPromise;
            this.configCache.set(roomId, config);
            return config;
        } catch (error) {
            console.error(`Failed to load config for room ${roomId}:`, error);
            throw error;
        } finally {
            this.loadingPromises.delete(roomId);
        }
    }

    private async loadConfig(roomId: string): Promise<RoomConfig> {
        return loadRoomConfig(roomId);
    }

    /**
     * Invalida la caché de objetos procesados para una habitación
     */
    invalidateProcessedObjects(roomId: string): void {
        this.processedObjectsCache.delete(roomId);
    }

    /**
     * Verifica si una configuración está en caché
     */
    isConfigCached(roomId: string): boolean {
        return this.configCache.has(roomId);
    }

    /**
     * Precarga configuraciones de múltiples habitaciones
     */
    async preloadConfigs(roomIds: string[]): Promise<void> {
        const loadPromises = roomIds.map(id => this.getConfig(id));
        await Promise.all(loadPromises);
    }

    /**
     * Limpia la caché de configuraciones
     */
    clearCache(): void {
        this.configCache.clear();
        this.processedObjectsCache.clear();
        this.loadingPromises.clear();
    }

    /**
     * Elimina una configuración específica del caché
     */
    removeFromCache(roomId: string): void {
        this.configCache.delete(roomId);
        this.processedObjectsCache.delete(roomId);
        this.loadingPromises.delete(roomId);
    }

    /**
     * Obtiene estadísticas del caché
     */
    getCacheStats(): {
        cachedConfigs: number;
        processedObjects: number;
        loadingConfigs: number;
        cacheKeys: string[];
    } {
        return {
            cachedConfigs: this.configCache.size,
            processedObjects: this.processedObjectsCache.size,
            loadingConfigs: this.loadingPromises.size,
            cacheKeys: Array.from(this.configCache.keys())
        };
    }
}