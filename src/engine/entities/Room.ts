import * as THREE from 'three';
import { type AnimationAction, type LookatableObject, type ObjectEventArray } from '../config/room.type';
import { Skin } from './Skin';
import { ConfigManager, type ProcessedRoomObjects } from '../utils/ConfigManager';




/**
 * Entidad que representa una sala 3D con su geometría, materiales y configuración
 */
export class Room {

    private objectTexture: THREE.Texture | null = null;

    private environmentTexture: THREE.Texture | null = null;

    private portal: THREE.Object3D | undefined = undefined;

    /**
     * Crea una nueva instancia de Room
     * 
     * @param _id - Identificador único de la sala
     * @param _skin - Skin asociado a la sala
     */
    constructor(
        private _id: string,
        private _skin: Skin,
        private _scene: THREE.Group<THREE.Object3DEventMap>,
        private _configManager: ConfigManager) {

        if (!_id?.trim()) {
            throw new Error('El ID de la room no puede estar vacío');
        }
        if (!_skin) {
            throw new Error('El _skin es requerido');
        }

        // Buscar y asignar el portal en la escena
        this.searchAndAssignPortal(_scene);
    }

    /**
     * Busca y asigna el portal en la escena dada
     */
    private searchAndAssignPortal(_scene: THREE.Group<THREE.Object3DEventMap>): void {
        console.log("[Room] Buscando portal en scene:", _scene.name);
        console.log("[Room] Objetos en la scene:", _scene.children.map(child => ({
            name: child.name,
            type: child.type,
            uuid: child.uuid.substring(0, 8)
        })));

        this.portal = _scene.getObjectByName('portal') || undefined;

        console.log("[Room.searchAndAssignPortal] Portal asignado:", this.portal?.name);
        console.log("[Room.searchAndAssignPortal] Portal type:", this.portal?.type);
        console.log("[Room.searchAndAssignPortal] Portal uuid:", this.portal?.uuid);

        if (this.portal) {
            console.log("[Room] Portal encontrado:", this.portal.name, this.portal.type);
        } else {
            console.warn("[Room] Portal NO encontrado con nombre 'portal'");
            // Buscar objetos que podrían ser el portal
            const portalCandidates = _scene.children.filter(child =>
                child.name.toLowerCase().includes('portal') ||
                child.name.toLowerCase().includes('gate') ||
                child.name.toLowerCase().includes('door')
            );
            console.log("[Room] Candidatos a portal:", portalCandidates.map(c => c.name));
        }
    }

    /**
     * Carga la configuración de la sala de forma asíncrona
     * 
     * @returns Promesa con los objetos procesados de la sala
     */
    async loadConfig(): Promise<ProcessedRoomObjects> {
        try {
            return await this._configManager.getProcessedObjects(this._id);
        } catch (error) {
            throw new Error(`No se pudo cargar la configuración: ${error}`);
        }
    }


    /**
     * Aplica un nuevo _skin a la sala
     * 
     * @param _skin - Nuevo _skin a aplicar
     */
    applySkin(_skin: Skin): void {
        if (!_skin) {
            throw new Error('El _skin no puede ser nulo');
        }
        this._skin = _skin;
    }

    set_Scene(_scene: THREE.Group<THREE.Object3DEventMap>): void {
        if (!_scene) {
            throw new Error('La escena no puede ser nula');
        }
        this._scene = _scene;

        // Buscar y asignar el portal en la nueva escena
        this.searchAndAssignPortal(_scene);
    }

    setSkin(_skin: Skin): void {
        if (!_skin) {
            throw new Error('El _skin no puede ser nulo');
        }
        this._skin = _skin;

    }

    setTextures({ objectTexture, environmentTexture }: { objectTexture: THREE.Texture; environmentTexture: THREE.Texture }): void {
        if (!objectTexture || !environmentTexture) {
            throw new Error('Ambas texturas (objeto y ambiente) son requeridas');
        }
        this.objectTexture = objectTexture;
        this.environmentTexture = environmentTexture;
    }

    get_Id(): string {
        return this._id;
    }

    get_Skin(): Skin {
        return this._skin;
    }


    getObjectTexture(): THREE.Texture | null {
        return this.objectTexture;
    }

    getEnvironmentTexture(): THREE.Texture | null {
        return this.environmentTexture;
    }

    get_Scene(): THREE.Group<THREE.Object3DEventMap> | null {
        return this._scene;
    }

    getPortal(): THREE.Object3D | undefined {
        console.log("[Room.getPortal] Portal actual:", this.portal);
        console.log("[Room.getPortal] Portal type:", this.portal?.type);
        console.log("[Room.getPortal] Portal name:", this.portal?.name);
        console.log("[Room.getPortal] Portal uuid:", this.portal?.uuid);
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

    // Métodos delegados al ConfigManager
    async getLookAtableObjects(): Promise<Record<string, THREE.Vector3>> {
        if (!this._scene) {
            return {};
        }
        return this._configManager.getLookAtableObjects(this._id, this._scene);
    }


    async getAnimatableObjects(): Promise<Record<string, AnimationAction>> {
        return this._configManager.getAnimatableObjects(this._id);
    }


    async getInteractableObjects(): Promise<Record<string, ObjectEventArray>> {
        if (!this._scene) {
            return {};
        }
        return this._configManager.getInteractableObjects(this._id, this._scene);
    }


    async getColorableObjects(): Promise<Record<string, string>> {
        return this._configManager.getColorableObjects(this._id);
    }


    async getAllObjects(): Promise<ProcessedRoomObjects> {
        return this._configManager.getProcessedObjects(this._id, this._scene || undefined);
    }

    // Utility methods
    has_Scene(): boolean {
        return this._scene !== null;
    }

    hasTextures(): boolean {
        return this.objectTexture !== null && this.environmentTexture !== null;
    }

    dispose(): void {
        console.log("[Room.dispose] Disposing room:", this._id);
        console.log("[Room.dispose] Portal antes de dispose:", this.portal?.name);

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

        // Limpiar configuración actual si coincide con esta room
        this._configManager.clearCurrent();

        this._scene.clear();
        this.objectTexture = null;
        this.environmentTexture = null;
        this.portal = undefined;
    }
}