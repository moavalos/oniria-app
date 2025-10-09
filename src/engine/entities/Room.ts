import * as THREE from 'three';
import { type AnimationAction, type ObjectEventArray } from '../config/room.type';
import { Skin } from './Skin';
import { ConfigManager, type ProcessedRoomObjects } from '../utils/ConfigManager';
import { EventEmitter } from '../utils/EventEmitter';

// Eventos que puede emitir Room
interface RoomEventMap {
    'change': { room: Room; changeType: 'scene' | 'skin' | 'textures' };
}

export class Room extends EventEmitter<RoomEventMap> {
    public readonly id: string;
    public skin: Skin;
    private scene: THREE.Group<THREE.Object3DEventMap> | null = null;
    private objectTexture: THREE.Texture | null = null;
    private environmentTexture: THREE.Texture | null = null;
    private portal: THREE.Object3D | undefined = undefined;
    private readonly meshUrl: string;
    private configManager: ConfigManager;

    constructor(id: string, skin: Skin) {
        super(); // ✅ Llamar constructor de EventEmitter

        if (!id?.trim()) {
            throw new Error('Room ID cannot be empty');
        }
        if (!skin) {
            throw new Error('Skin is required');
        }

        this.id = id;
        this.skin = skin;
        this.meshUrl = `models/${id}.gltf`;
        this.configManager = ConfigManager.getInstance();

        console.log(`🏠 Room[${this.id}] - Constructor called (EventEmitter)`, {
            skinId: skin.id,
            stack: new Error().stack?.split('\n')[1]?.trim()
        });
    }

    // Método para cargar la configuración cuando sea necesario
    async loadConfig(): Promise<ProcessedRoomObjects> {
        try {
            return await this.configManager.getProcessedObjects(this.id);
        } catch (error) {
            console.error(`Failed to load config for room ${this.id}:`, error);
            throw new Error(`Configuration could not be loaded: ${error}`);
        }
    }

    getMeshUrl(): string {
        return this.meshUrl;
    }

    applySkin(skin: Skin): void {
        if (!skin) {
            throw new Error('Skin cannot be null');
        }
        this.skin = skin;
    }

    setScene(scene: THREE.Group<THREE.Object3DEventMap>): void {
        if (!scene) {
            throw new Error('Scene cannot be null');
        }
        this.scene = scene;
        this.portal = scene.getObjectByName("portal") || undefined;

        // ✅ Solo emitir evento change
        this.emit('change', { room: this, changeType: 'scene' });

        console.log(`🏠 Room[${this.id}] - setScene() emitted change event`, {
            scene: scene.name || 'unnamed',
            portal: !!this.portal,
        });
    }

    setSkin(skin: Skin): void {
        if (!skin) {
            throw new Error('Skin cannot be null');
        }
        this.skin = skin;

        // ✅ Solo emitir evento change
        this.emit('change', { room: this, changeType: 'skin' });

        console.log(`🏠 Room[${this.id}] - setSkin() emitted change event`, {
            skin: skin.id,
        });
    }

    setTextures({ objectTexture, environmentTexture }: { objectTexture: THREE.Texture, environmentTexture: THREE.Texture }): void {
        if (!objectTexture || !environmentTexture) {
            throw new Error('Both objectTexture and environmentTexture are required');
        }
        this.objectTexture = objectTexture;
        this.environmentTexture = environmentTexture;

        // ✅ Solo emitir evento change
        this.emit('change', { room: this, changeType: 'textures' });

        console.log(`🏠 Room[${this.id}] - setTextures() emitted change event`, {
            objectTexture: objectTexture.name || 'unnamed',
            environmentTexture: environmentTexture.name || 'unnamed',
        });
    }

    // ❌ Método deprecado - El core manejará las versiones centralmente
    // getVersion(): number {
    //     return this._version;
    // }

    getObjectTexture(): THREE.Texture | null {
        return this.objectTexture;
    }

    getEnvironmentTexture(): THREE.Texture | null {
        return this.environmentTexture;
    }

    getScene(): THREE.Group<THREE.Object3DEventMap> | null {
        return this.scene;
    }

    getPortal(): THREE.Object3D | undefined {
        return this.portal;
    }

    getObjectByName(name: string): THREE.Object3D | null {
        if (!name?.trim()) {
            throw new Error('Object name cannot be empty');
        }
        if (!this.scene) {
            return null;
        }
        return this.scene.getObjectByName(name) || null;
    }

    // Métodos delegados al ConfigManager
    async getLookAtableObjects(): Promise<Record<string, THREE.Vector3>> {
        if (!this.scene) {
            return {};
        }
        return this.configManager.getLookAtableObjects(this.id, this.scene);
    }

    /**
     * Obtiene objetos con lookAtOffset (versión síncrona - asume que la config ya está cargada)
     */
    getLookAtableObjectsSync(): Record<string, THREE.Vector3> {
        if (!this.scene) {
            return {};
        }
        return this.configManager.getLookAtableObjectsSync(this.scene);
    }

    async getAnimatableObjects(): Promise<Record<string, AnimationAction>> {
        return this.configManager.getAnimatableObjects(this.id);
    }

    /**
     * Obtiene objetos animables (versión síncrona - asume que la config ya está cargada)
     */
    getAnimatableObjectsSync(): Record<string, AnimationAction> {
        return this.configManager.getAnimatableObjectsSync();
    }

    async getInteractableObjects(): Promise<Record<string, ObjectEventArray>> {
        if (!this.scene) {
            return {};
        }
        return this.configManager.getInteractableObjects(this.id, this.scene);
    }

    /**
     * Obtiene objetos interactuables (versión síncrona - asume que la config ya está cargada)
     */
    getInteractableObjectsSync(): Record<string, ObjectEventArray> {
        if (!this.scene) return {};

        return this.configManager.getInteractableObjectsSync(this.scene);
    }

    async getColorableObjects(): Promise<Record<string, string>> {
        return this.configManager.getColorableObjects(this.id);
    }

    /**
     * Obtiene objetos con colores (versión síncrona - asume que la config ya está cargada)
     */
    getColorableObjectsSync(): Record<string, string> {
        return this.configManager.getColorableObjectsSync();
    }

    async getAllObjects(): Promise<ProcessedRoomObjects> {
        return this.configManager.getProcessedObjects(this.id, this.scene || undefined);
    }

    // Utility methods
    hasScene(): boolean {
        return this.scene !== null;
    }

    hasTextures(): boolean {
        return this.objectTexture !== null && this.environmentTexture !== null;
    }

    dispose(): void {
        if (this.scene) {
            // Limpieza de recursos de Three.js
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => material.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });
        }

        if (this.objectTexture) this.objectTexture.dispose();
        if (this.environmentTexture) this.environmentTexture.dispose();

        // Limpiar configuración actual si coincide con esta room
        this.configManager.clearCurrent();

        this.scene = null;
        this.objectTexture = null;
        this.environmentTexture = null;
        this.portal = undefined;

        // ✅ Remover todos los listeners del EventEmitter
        this.removeAllListeners();
    }
}