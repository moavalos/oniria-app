import * as THREE from 'three';

import { type AnimationAction, type ObjectEventArray } from '../config/room.type';
import { Skin } from './Skin';
import { ConfigManager, type ProcessedRoomObjects } from '../utils/ConfigManager';




/**
 * Entidad que representa una sala 3D con su geometría, materiales y configuración
 */
export class Room {
    public readonly id: string;

    public skin: Skin;

    private scene: THREE.Group<THREE.Object3DEventMap> | null = null;

    private objectTexture: THREE.Texture | null = null;

    private environmentTexture: THREE.Texture | null = null;

    private portal: THREE.Object3D | undefined = undefined;

    private readonly meshUrl: string;

    private configManager: ConfigManager;

    /**
     * Crea una nueva instancia de Room
     * 
     * @param id - Identificador único de la sala
     * @param skin - Skin asociado a la sala
     */
    constructor(id: string, skin: Skin) {

        if (!id?.trim()) {
            throw new Error('El ID de la sala no puede estar vacío');
        }
        if (!skin) {
            throw new Error('El skin es requerido');
        }

        this.id = id;
        this.skin = skin;
        this.meshUrl = `models/${id}.gltf`;
        this.configManager = ConfigManager.getInstance();

    }

    /**
     * Carga la configuración de la sala de forma asíncrona
     * 
     * @returns Promesa con los objetos procesados de la sala
     */
    async loadConfig(): Promise<ProcessedRoomObjects> {
        try {
            return await this.configManager.getProcessedObjects(this.id);
        } catch (error) {
            throw new Error(`No se pudo cargar la configuración: ${error}`);
        }
    }

    /**
     * Obtiene la URL del modelo 3D de la sala
     * 
     * @returns URL del archivo GLTF
     */
    getMeshUrl(): string {
        return this.meshUrl;
    }

    /**
     * Aplica un nuevo skin a la sala
     * 
     * @param skin - Nuevo skin a aplicar
     */
    applySkin(skin: Skin): void {
        if (!skin) {
            throw new Error('El skin no puede ser nulo');
        }
        this.skin = skin;
    }

    setScene(scene: THREE.Group<THREE.Object3DEventMap>): void {
        if (!scene) {
            throw new Error('La escena no puede ser nula');
        }
        this.scene = scene;

        // Buscar y asignar el portal en la escena
        this.portal = scene.getObjectByName('portal') || undefined;
    }

    setSkin(skin: Skin): void {
        if (!skin) {
            throw new Error('El skin no puede ser nulo');
        }
        this.skin = skin;

    }

    setTextures({ objectTexture, environmentTexture }: { objectTexture: THREE.Texture; environmentTexture: THREE.Texture }): void {
        if (!objectTexture || !environmentTexture) {
            throw new Error('Ambas texturas (objeto y ambiente) son requeridas');
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


    }
}