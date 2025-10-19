import * as THREE from 'three';

/**
 * Entidad que representa un nodo 3D con un grupo de objetos Three.js
 * Extiende EventEmitter para emitir eventos de navegación
 */
export class Node {
    public readonly id: string;

    private group: THREE.Group<THREE.Object3DEventMap> | null = null;

    private material: THREE.ShaderMaterial | null = null;

    /**
     * Crea una nueva instancia de Node
     * 
     * @param id - Identificador único del nodo
     */
    constructor(id: string) {
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
     * Busca un objeto por nombre dentro del grupo del nodo
     */
    getObjectByName(name: string): THREE.Object3D | null {
        if (!name?.trim()) {
            throw new Error('El nombre del objeto no puede estar vacío');
        }

        if (!this.group) {
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
    }

    getMaterial(): THREE.ShaderMaterial | null {
        return this.material;
    }

    setMaterial(material: THREE.ShaderMaterial): void {
        this.material = material;
    }

    /**
    * Actualiza las animaciones del Nodo (llamado desde el loop)
    */
    updateAnimation(deltaTime: number): void {
        if (this.material?.uniforms?.uTime) {
            this.material.uniforms.uTime.value += deltaTime;
        }
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


}