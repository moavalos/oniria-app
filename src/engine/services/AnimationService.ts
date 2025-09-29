import * as THREE from "three";

export type AnimationConfig = {
    target: string; // nombre del handler
    type: "float" | "rotate" | "pulse"; // extensible
    params: Record<string, any>;
};

export class AnimationService {
    private animation: AnimationConfig | null = null;

    constructor(public scene: THREE.Group | THREE.Scene) {
        this.scene = scene;
    }

    update(deltaTime: number) {
        // Lógica de actualización de animaciones basada en deltaTime y settings
    }

    // Aquí puedes agregar métodos y propiedades relacionados con la animación
}
