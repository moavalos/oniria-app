import * as THREE from 'three';
import { EventEmitter } from '../utils/EventEmitter';

// Definir los tipos de eventos que puede emitir el Node
interface NodeEventMap {
    onNextNode: { nodeId: string };
    onPrevNode: { nodeId: string };
    [key: string]: unknown; // Index signature para satisfacer EventMap
}

/**
 * Entidad que representa un nodo 3D con un grupo de objetos Three.js
 * Extiende EventEmitter para emitir eventos de navegación
 */
export class Node extends EventEmitter<NodeEventMap> {
    public readonly id: string;

    private group: THREE.Group<THREE.Object3DEventMap> | null = null;

    private _version: number = 0;

    /**
     * Crea una nueva instancia de Node
     * 
     * @param id - Identificador único del nodo
     */
    constructor(id: string) {
        super(); // Llamar al constructor de EventEmitter

        if (!id?.trim()) {
            throw new Error('El ID del nodo no puede estar vacío');
        }

        this.id = id;
    }

    /**
     * Establece el grupo Three.js para este nodo
     * 
     * @param group - Grupo de Three.js a asociar
     */
    setGroup(group: THREE.Group<THREE.Object3DEventMap>): void {
        if (!group) {
            throw new Error('El grupo no puede ser nulo');
        }
        this.group = group;
        this._version++;
    }

    /**
     * Obtiene el grupo Three.js de este nodo
     * 
     * @returns Grupo asociado al nodo o null si no existe
     */
    getGroup(): THREE.Group<THREE.Object3DEventMap> | null {
        return this.group;
    }

    /**
     * Obtiene la versión actual del nodo para tracking de cambios
     * 
     * @returns Número de versión actual
     */
    getVersion(): number {
        return this._version;
    }

    /**
     * Busca un objeto por nombre dentro del grupo del nodo
     */
    getObjectByName(name: string): THREE.Object3D | null {
        if (!name?.trim()) {
            throw new Error('El nombre del objeto no puede estar vacío');
        }

        if (!this.group) {
            console.warn(`Nodo ${this.id}: No hay grupo establecido, no se puede encontrar el objeto '${name}'`);
            return null;
        }

        const object = this.group.getObjectByName(name);
        return object || null;
    }

    /**
     * Obtiene todos los objetos hijos del grupo del nodo
     */
    getChildren(): THREE.Object3D[] {
        if (!this.group) {
            return [];
        }
        return this.group.children;
    }

    /**
     * Verifica si el nodo tiene un grupo válido
     */
    hasGroup(): boolean {
        return this.group !== null;
    }

    /**
     * Limpia la referencia del grupo
     */
    clearGroup(): void {
        this.group = null;
        this._version++;
    }

    /**
     * Agrega un objeto al grupo del nodo
     */
    addObject(object: THREE.Object3D): void {
        if (!object) {
            throw new Error('El objeto no puede ser nulo');
        }

        if (!this.group) {
            throw new Error(`Nodo ${this.id}: No hay grupo establecido, no se puede agregar el objeto`);
        }

        this.group.add(object);
        this._version++;
    }

    /**
     * Remueve un objeto del grupo del nodo
     */
    removeObject(object: THREE.Object3D): void {
        if (!object) {
            throw new Error('El objeto no puede ser nulo');
        }

        if (!this.group) {
            console.warn(`Nodo ${this.id}: No hay grupo establecido, no se puede remover el objeto`);
            return;
        }

        this.group.remove(object);
        this._version++;
    }

    /**
     * Obtiene la posición del grupo del nodo
     */
    getPosition(): THREE.Vector3 | null {
        if (!this.group) {
            return null;
        }
        return this.group.position.clone();
    }

    /**
     * Obtiene la rotación del grupo del nodo
     */
    getRotation(): THREE.Euler | null {
        if (!this.group) {
            return null;
        }
        return this.group.rotation.clone();
    }

    /**
     * Obtiene la escala del grupo del nodo
     */
    getScale(): THREE.Vector3 | null {
        if (!this.group) {
            return null;
        }
        return this.group.scale.clone();
    }

    /**
     * Establece la visibilidad del grupo del nodo
     */
    setVisible(visible: boolean): void {
        if (!this.group) {
            console.warn(`Nodo ${this.id}: No hay grupo establecido, no se puede establecer la visibilidad`);
            return;
        }
        this.group.visible = visible;
        this._version++;
    }

    /**
     * Obtiene la visibilidad del grupo del nodo
     */
    isVisible(): boolean {
        if (!this.group) {
            return false;
        }
        return this.group.visible;
    }

    /**
     * Obtiene información de debug del nodo
     */
    getDebugInfo(): {
        id: string;
        hasGroup: boolean;
        childrenCount: number;
        version: number;
        visible: boolean;
        position: THREE.Vector3 | null;
        rotation: THREE.Euler | null;
        scale: THREE.Vector3 | null;
    } {
        return {
            id: this.id,
            hasGroup: this.hasGroup(),
            childrenCount: this.getChildren().length,
            version: this.getVersion(),
            visible: this.isVisible(),
            position: this.getPosition(),
            rotation: this.getRotation(),
            scale: this.getScale()
        };
    }

    /**
     * Navegar al siguiente nodo
     * Emite el evento 'onNextNode' para disparar animaciones
     */
    next(): void {
        console.log(`📍 Navegando al siguiente nodo desde: ${this.id}`);
        this.emit('onNextNode', { nodeId: this.id });
    }

    /**
     * Navegar al nodo anterior  
     * Emite el evento 'onPrevNode' para disparar animaciones
     */
    prev(): void {
        console.log(`📍 Navegando al nodo anterior desde: ${this.id}`);
        this.emit('onPrevNode', { nodeId: this.id });
    }
}