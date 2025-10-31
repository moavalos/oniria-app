import * as THREE from 'three';

/**
 * Entidad que representa un nodo 3D interactivo con un grupo de objetos Three.js.
 * Los nodos son elementos navegables que pueden contener geometría, materiales
 * y lógica de animación específica.
 */
export class Node {
    public readonly id: string;

    private group: THREE.Group<THREE.Object3DEventMap> | null = null;

    private material: THREE.ShaderMaterial | null = null;

    /**
     * Crea una nueva instancia de Node.
     * 
     * @param id - Identificador único del nodo
     * @throws Error si el ID está vacío
     */
    constructor(id: string) {
        if (!id?.trim()) {
            throw new Error('El ID del nodo no puede estar vacío');
        }

        this.id = id;
    }

    /**
     * Establece el grupo Three.js para este nodo.
     * 
     * @param group - Grupo de Three.js a asociar con el nodo
     * @throws Error si el grupo es nulo
     */
    setGroup(group: THREE.Group<THREE.Object3DEventMap>): void {
        if (!group) {
            throw new Error('El grupo no puede ser nulo');
        }
        this.group = group;
    }

    /**
     * Obtiene el grupo Three.js asociado a este nodo.
     * 
     * @returns Grupo asociado al nodo o null si no existe
     */
    getGroup(): THREE.Group<THREE.Object3DEventMap> | null {
        return this.group;
    }

    /**
     * Busca un objeto por nombre dentro del grupo del nodo.
     * 
     * @param name - Nombre del objeto a buscar
     * @returns Objeto encontrado o null si no existe
     * @throws Error si el nombre está vacío
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
     * Obtiene todos los objetos hijos del grupo del nodo.
     * 
     * @returns Array de objetos hijos o array vacío si no hay grupo
     */
    getChildren(): THREE.Object3D[] {
        if (!this.group) {
            return [];
        }
        return this.group.children;
    }

    /**
     * Verifica si el nodo tiene un grupo válido asignado.
     * 
     * @returns true si tiene grupo, false en caso contrario
     */
    hasGroup(): boolean {
        return this.group !== null;
    }

    /**
     * Limpia la referencia del grupo, desvinculando el nodo.
     */
    clearGroup(): void {
        this.group = null;
    }

    /**
     * Agrega un objeto al grupo del nodo.
     * 
     * @param object - Objeto Three.js a agregar
     * @throws Error si el objeto es nulo o no hay grupo establecido
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

    /**
     * Obtiene el material shader asociado al nodo.
     * 
     * @returns Material shader o null si no está establecido
     */
    getMaterial(): THREE.ShaderMaterial | null {
        return this.material;
    }

    /**
     * Establece el material shader para el nodo.
     * 
     * @param material - Material shader a establecer
     */
    setMaterial(material: THREE.ShaderMaterial): void {
        this.material = material;
    }

    /**
     * Actualiza las animaciones del nodo, específicamente el tiempo uniforme.
     * Debe ser llamado desde el loop principal de animación.
     * 
     * @param deltaTime - Tiempo transcurrido desde la última actualización
     */
    updateAnimation(deltaTime: number): void {
        if (this.material?.uniforms?.uTime) {
            this.material.uniforms.uTime.value += deltaTime;
        }
    }

    /**
     * Remueve un objeto del grupo del nodo.
     * 
     * @param object - Objeto Three.js a remover
     * @throws Error si el objeto es nulo
     */
    removeObject(object: THREE.Object3D): void {
        if (!object) {
            throw new Error('El objeto no puede ser nulo');
        }

        if (!this.group) {
            console.warn(`[Node]: Nodo ${this.id} no tiene grupo establecido, no se puede remover el objeto`);
            return;
        }

        this.group.remove(object);
    }

    /**
     * Obtiene la posición del grupo del nodo.
     * 
     * @returns Copia de la posición o null si no hay grupo
     */
    getPosition(): THREE.Vector3 | null {
        if (!this.group) {
            return null;
        }
        return this.group.position.clone();
    }

    /**
     * Obtiene la rotación del grupo del nodo.
     * 
     * @returns Copia de la rotación o null si no hay grupo
     */
    getRotation(): THREE.Euler | null {
        if (!this.group) {
            return null;
        }
        return this.group.rotation.clone();
    }

    /**
     * Obtiene la escala del grupo del nodo.
     * 
     * @returns Copia de la escala o null si no hay grupo
     */
    getScale(): THREE.Vector3 | null {
        if (!this.group) {
            return null;
        }
        return this.group.scale.clone();
    }

    /**
     * Establece la visibilidad del grupo del nodo.
     * 
     * @param visible - Si el nodo debe ser visible
     */
    setVisible(visible: boolean): void {
        if (!this.group) {
            console.warn(`[Node]: Nodo ${this.id} no tiene grupo establecido, no se puede establecer la visibilidad`);
            return;
        }
        this.group.visible = visible;
    }

    /**
     * Obtiene la visibilidad del grupo del nodo.
     * 
     * @returns true si es visible, false en caso contrario
     */
    isVisible(): boolean {
        if (!this.group) {
            return false;
        }
        return this.group.visible;
    }
}