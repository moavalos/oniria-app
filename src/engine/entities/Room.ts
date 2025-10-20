import * as THREE from 'three';

import { Skin } from './Skin';
import { ConfigManager, type ProcessedRoomObjects } from '../utils/ConfigManager';
import { type AnimationAction, type LookatableObject, type ObjectEventArray } from '../config/room.type';

/**
 * Entidad que representa una Room 3D completa con su geometría, materiales,
 * configuración y funcionalidades de interacción. Gestiona el portal de navegación,
 * objetos interactivos y la aplicación de skins personalizados.
 */
export class Room {
    private objectTexture: THREE.Texture | null = null;

    private environmentTexture: THREE.Texture | null = null;

    private portal: THREE.Object3D | undefined = undefined;

    /**
     * Crea una nueva instancia de Room.
     * 
     * @param _id - Identificador único de la Room
     * @param _skin - Skin asociado a la Room para texturas y materiales
     * @param _scene - Grupo de Three.js que contiene la geometría de la Room
     * @param _configManager - Gestor de configuración para objetos interactivos
     * @throws Error si el ID está vacío o el skin es nulo
     */
    constructor(
        private _id: string,
        private _skin: Skin,
        private _scene: THREE.Group<THREE.Object3DEventMap>,
        private _configManager: ConfigManager) {

        if (!_id?.trim()) {
            throw new Error('El ID de la Room no puede estar vacío');
        }
        if (!_skin) {
            throw new Error('El skin es requerido para la Room');
        }

        this.searchAndAssignPortal(_scene);
    }

    /**
     * Busca y asigna el portal de navegación en la escena de la Room.
     * El portal es el objeto que permite la navegación entre Rooms.
     * 
     * @param _scene - Escena donde buscar el portal
     */
    private searchAndAssignPortal(_scene: THREE.Group<THREE.Object3DEventMap>): void {
        this.portal = _scene.getObjectByName('portal') || undefined;
    }

    /**
     * Carga la configuración de objetos interactivos de la Room de forma asíncrona.
     * 
     * @returns Promesa con los objetos procesados de la Room
     * @throws Error si no se puede cargar la configuración
     */
    async loadConfig(): Promise<ProcessedRoomObjects> {
        try {
            return await this._configManager.getProcessedObjects(this._id);
        } catch (error) {
            throw new Error(`No se pudo cargar la configuración de la Room ${this._id}: ${error}`);
        }
    }

    /**
     * Aplica un nuevo skin a la Room, actualizando texturas y materiales.
     * 
     * @param _skin - Nuevo skin a aplicar
     * @throws Error si el skin es nulo
     */
    applySkin(_skin: Skin): void {
        if (!_skin) {
            throw new Error('El skin no puede ser nulo');
        }
        this._skin = _skin;
    }

    /**
     * Establece una nueva escena para la Room y busca el portal en ella.
     * 
     * @param _scene - Nueva escena de Three.js
     * @throws Error si la escena es nula
     */
    set_Scene(_scene: THREE.Group<THREE.Object3DEventMap>): void {
        if (!_scene) {
            throw new Error('La escena no puede ser nula');
        }
        this._scene = _scene;
        this.searchAndAssignPortal(_scene);
    }

    /**
     * Establece un nuevo skin para la Room.
     * 
     * @param _skin - Skin a establecer
     * @throws Error si el skin es nulo
     */
    setSkin(_skin: Skin): void {
        if (!_skin) {
            throw new Error('El skin no puede ser nulo');
        }
        this._skin = _skin;
    }

    /**
     * Establece las texturas de objeto y ambiente de la Room.
     * 
     * @param textures - Objeto con texturas de objeto y ambiente
     * @throws Error si alguna textura es nula
     */
    setTextures({ objectTexture, environmentTexture }: {
        objectTexture: THREE.Texture;
        environmentTexture: THREE.Texture
    }): void {
        if (!objectTexture || !environmentTexture) {
            throw new Error('Ambas texturas (objeto y ambiente) son requeridas');
        }
        this.objectTexture = objectTexture;
        this.environmentTexture = environmentTexture;
    }

    /**
     * Obtiene el identificador único de la Room.
     * 
     * @returns ID de la Room
     */
    get_Id(): string {
        return this._id;
    }

    /**
     * Obtiene el skin actual de la Room.
     * 
     * @returns Skin asociado a la Room
     */
    get_Skin(): Skin {
        return this._skin;
    }

    /**
     * Obtiene la textura de objeto de la Room.
     * 
     * @returns Textura de objeto o null si no está establecida
     */
    getObjectTexture(): THREE.Texture | null {
        return this.objectTexture;
    }

    /**
     * Obtiene la textura de ambiente de la Room.
     * 
     * @returns Textura de ambiente o null si no está establecida
     */
    getEnvironmentTexture(): THREE.Texture | null {
        return this.environmentTexture;
    }

    /**
     * Obtiene la escena de Three.js de la Room.
     * 
     * @returns Grupo de Three.js que contiene la geometría de la Room
     */
    get_Scene(): THREE.Group<THREE.Object3DEventMap> | null {
        return this._scene;
    }

    /**
     * Obtiene el portal de navegación de la Room.
     * 
     * @returns Portal de la Room o undefined si no existe
     */
    getPortal(): THREE.Object3D | undefined {
        return this.portal;
    }

    getObjectByName(name: string): THREE.Object3D | null {
        if (!name?.trim()) {
            throw new Error('Object name cannot be empty');
        }
        if (!this._scene) {
            return null;
        }
        return this._scene.getObjectByName(name) || null;
    }

    async getLookAtableObjectByName(name: string): Promise<LookatableObject | null> {
        if (!name?.trim()) {
            throw new Error('Object name cannot be empty');
        }

        if (!this._scene) {
            return null;
        }

        // Buscar el objeto en la escena
        const object3D = this._scene.getObjectByName(name);
        if (!object3D) {
            return null;
        }

        // Verificar que tenga lookAtOffset en la configuración
        const config = await this._configManager.getConfig(this._id);
        if (!config?.objects[name]?.lookAtOffset) {
            return null;
        }

        // Calcular target (posición del objeto)
        const target = new THREE.Vector3();
        object3D.getWorldPosition(target);

        // Calcular position (posición de la cámara usando lookAtOffset)
        const offset = new THREE.Vector3(...config.objects[name].lookAtOffset!);
        const position = target.clone().add(offset);

        return { target, position };
    }

    /**
     * Obtiene todos los objetos "lookatable" (enfocables) de la Room.
     * 
     * @returns Record con objetos enfocables y sus posiciones
     */
    async getLookAtableObjects(): Promise<Record<string, THREE.Vector3>> {
        if (!this._scene) {
            return {};
        }
        return this._configManager.getLookAtableObjects(this._id, this._scene);
    }

    /**
     * Obtiene todos los objetos animables de la Room.
     * 
     * @returns Record con objetos animables y sus acciones
     */
    async getAnimatableObjects(): Promise<Record<string, AnimationAction>> {
        return this._configManager.getAnimatableObjects(this._id);
    }

    /**
     * Obtiene todos los objetos interactivos de la Room.
     * 
     * @returns Record con objetos interactivos y sus eventos
     */
    async getInteractableObjects(): Promise<Record<string, ObjectEventArray>> {
        if (!this._scene) {
            return {};
        }
        return this._configManager.getInteractableObjects(this._id, this._scene);
    }

    /**
     * Obtiene todos los objetos coloreables de la Room.
     * 
     * @returns Record con objetos coloreables y sus colores
     */
    async getColorableObjects(): Promise<Record<string, string>> {
        return this._configManager.getColorableObjects(this._id);
    }

    /**
     * Obtiene todos los objetos procesados de la Room.
     * 
     * @returns Objetos procesados completos de la Room
     */
    async getAllObjects(): Promise<ProcessedRoomObjects> {
        return this._configManager.getProcessedObjects(this._id, this._scene || undefined);
    }

    /**
     * Verifica si la Room tiene una escena asignada.
     * 
     * @returns true si tiene escena, false en caso contrario
     */
    has_Scene(): boolean {
        return this._scene !== null;
    }

    /**
     * Verifica si la Room tiene texturas asignadas.
     * 
     * @returns true si tiene ambas texturas, false en caso contrario
     */
    hasTextures(): boolean {
        return this.objectTexture !== null && this.environmentTexture !== null;
    }

    /**
     * Libera todos los recursos de la Room incluyendo geometrías,
     * materiales, texturas y referencias.
     */
    dispose(): void {
        console.log("[Room]: Liberando recursos de la Room", this._id);

        if (this._scene) {
            // Limpieza de recursos de Three.js
            this._scene.traverse((child) => {
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

        this._configManager.clearCurrent();
        this._scene.clear();
        this.objectTexture = null;
        this.environmentTexture = null;
        this.portal = undefined;
    }
}