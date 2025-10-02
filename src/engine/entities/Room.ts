import * as THREE from 'three';
import { type AnimationAction, type ObjectEventArray } from '../config/room.type';
import { Skin } from './Skin';
import { ConfigManager, type ProcessedRoomObjects } from '../utils/ConfigManager';

export class Room {
    public readonly id: string;
    public skin: Skin;

    private scene: THREE.Group<THREE.Object3DEventMap> | null = null;
    private objectTexture: THREE.Texture | null = null;
    private environmentTexture: THREE.Texture | null = null;
    private portal: THREE.Object3D | undefined = undefined;
    private readonly meshUrl: string;
    private configManager: ConfigManager;

    constructor(id: string, skin: Skin) {
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
    }

    // Factory method estático para crear Room con configuración precargada
    static async create(id: string, skin: Skin): Promise<Room> {
        if (!id?.trim()) {
            throw new Error('Room ID cannot be empty');
        }
        if (!skin) {
            throw new Error('Skin is required');
        }

        try {
            // Precargar la configuración usando ConfigManager
            const configManager = ConfigManager.getInstance();
            await configManager.getConfig(id);
            
            // Crear la room (la configuración ya está en caché)
            return new Room(id, skin);
        } catch (error) {
            console.error(`Failed to create room ${id}:`, error);
            throw new Error(`Room could not be created: ${error}`);
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

        // Invalidar caché de objetos procesados ya que la escena cambió
        this.configManager.invalidateProcessedObjects(this.id);
    }

    setSkin(skin: Skin): void {
        if (!skin) {
            throw new Error('Skin cannot be null');
        }
        this.skin = skin;
    }

    setTextures({ objectTexture, environmentTexture }: { objectTexture: THREE.Texture, environmentTexture: THREE.Texture }): void {
        if (!objectTexture || !environmentTexture) {
            throw new Error('Both objectTexture and environmentTexture are required');
        }
        this.objectTexture = objectTexture;
        this.environmentTexture = environmentTexture;
    }

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

    async getAnimatableObjects(): Promise<Record<string, AnimationAction>> {
        return this.configManager.getAnimatableObjects(this.id);
    }

    async getInteractableObjects(): Promise<Record<string, ObjectEventArray>> {
        if (!this.scene) {
            return {};
        }
        return this.configManager.getInteractableObjects(this.id, this.scene);
    }

    async getColorableObjects(): Promise<Record<string, string>> {
        return this.configManager.getColorableObjects(this.id);
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

        // Limpiar caché relacionado con esta room
        this.configManager.removeFromCache(this.id);

        this.scene = null;
        this.objectTexture = null;
        this.environmentTexture = null;
        this.portal = undefined;
    }
}