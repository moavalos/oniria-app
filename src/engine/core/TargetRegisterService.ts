import * as THREE from "three";

export class TargetRegisterService {
    private targets = new Map<string, THREE.Object3D>();

    register(name: string, obj: THREE.Object3D) {
        this.targets.set(name, obj);
    }

    registerScene(root: THREE.Scene | THREE.Group) {
        root.traverse((child) => {
            // convención: registramos solo si tiene nombre no vacío
            if (child.name) {
                this.register(child.name, child);
            }
        });
    }

    unregisterScene(root: THREE.Scene | THREE.Group) {
        root.traverse((child) => {
            if (child.name) {
                this.unregister(child.name);
            }
        });
    }

    unregister(name: string) {
        this.targets.delete(name);
    }

    getObject(name: string): THREE.Object3D | undefined {
        return this.targets.get(name);
    }

    getPosition(name: string): THREE.Vector3 | null {
        const obj = this.targets.get(name);
        return obj ? obj.getWorldPosition(new THREE.Vector3()) : null;
    }

    getDirection(name: string): THREE.Vector3 | null {
        const obj = this.targets.get(name);
        return obj ? obj.getWorldDirection(new THREE.Vector3()) : null;
    }

    listTargets(): string[] {
        return [...this.targets.keys()];
    }
}
