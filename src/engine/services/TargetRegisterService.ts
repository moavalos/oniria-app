import * as THREE from "three";

/**
 * Servicio para registro y gestión de objetivos/targets en la escena 3D.
 * Permite registrar, localizar y obtener información de objetos específicos.
 */
export class TargetRegisterService {
    private targets = new Map<string, THREE.Object3D>();

    /**
     * Registra un objeto 3D con un nombre específico.
     * @param name - Nombre identificador del objeto
     * @param obj - Objeto 3D a registrar
     */
    register(name: string, obj: THREE.Object3D) {
        this.targets.set(name, obj);
    }

    /**
     * Registra automáticamente todos los objetos con nombre en una escena.
     * @param root - Escena o grupo raíz para recorrer
     */
    registerScene(root: THREE.Scene | THREE.Group) {
        root.traverse((child) => {
            // convención: registramos solo si tiene nombre no vacío
            if (child.name) {
                this.register(child.name, child);
            }
        });
    }

    /**
     * Desregistra todos los objetos de una escena.
     * @param root - Escena o grupo raíz para recorrer
     */
    unregisterScene(root: THREE.Scene | THREE.Group) {
        root.traverse((child) => {
            if (child.name) {
                this.unregister(child.name);
            }
        });
    }

    /**
     * Desregistra un objeto específico.
     * @param name - Nombre del objeto a desregistrar
     */
    unregister(name: string) {
        this.targets.delete(name);
    }

    /**
     * Obtiene un objeto registrado por su nombre.
     * @param name - Nombre del objeto
     * @returns El objeto 3D o undefined si no existe
     */
    getObject(name: string): THREE.Object3D | undefined {
        return this.targets.get(name);
    }

    /**
     * Obtiene la posición mundial de un objeto registrado.
     * @param name - Nombre del objeto
     * @returns La posición mundial o null si no existe
     */
    getPosition(name: string): THREE.Vector3 | null {
        const obj = this.targets.get(name);
        return obj ? obj.getWorldPosition(new THREE.Vector3()) : null;
    }

    /**
     * Obtiene la dirección mundial de un objeto registrado.
     * @param name - Nombre del objeto
     * @returns La dirección mundial o null si no existe
     */
    getDirection(name: string): THREE.Vector3 | null {
        const obj = this.targets.get(name);
        return obj ? obj.getWorldDirection(new THREE.Vector3()) : null;
    }

    /**
     * Lista todos los nombres de objetivos registrados.
     * @returns Array con los nombres de todos los targets
     */
    listTargets(): string[] {
        return [...this.targets.keys()];
    }
}
