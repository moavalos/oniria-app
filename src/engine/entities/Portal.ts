import * as THREE from 'three';
import { EventEmitter } from '../utils/EventEmitter';

// Eventos que puede emitir Portal
interface PortalEventMap extends Record<string, unknown> {
    'portal:material:applied': { portal: Portal };
    'portal:animation:started': { portal: Portal };
    'portal:animation:stopped': { portal: Portal };
}

/**
 * Entidad Portal que representa un portal 3D en la escena
 * Maneja la geometría, posición, materiales y animaciones del portal
 */
export class Portal extends EventEmitter<PortalEventMap> {
    public readonly id: string;

    private object3D: THREE.Object3D;

    private material: THREE.ShaderMaterial | null = null;

    private animating: boolean = false;

    constructor(object3D: THREE.Object3D) {
        super();

        if (!object3D) {
            throw new Error('Portal object3D is required');
        }

        this.object3D = object3D;
        this.id = object3D.name || `portal_${object3D.uuid}`;

        console.log(`🚪 Portal[${this.id}] - Constructor called`, {
            uuid: object3D.uuid,
            position: object3D.position,
            name: object3D.name
        });
    }

    /**
     * Obtiene la posición del portal en el mundo
     */
    getWorldPosition(): THREE.Vector3 {
        const worldPosition = new THREE.Vector3();
        this.object3D.getWorldPosition(worldPosition);
        return worldPosition;
    }

    /**
     * Obtiene la posición local del portal
     */
    getPosition(): THREE.Vector3 {
        return this.object3D.position.clone();
    }

    /**
     * Obtiene el objeto 3D del portal
     */
    getObject3D(): THREE.Object3D {
        return this.object3D;
    }

    /**
     * Aplica un material shader al portal
     */
    setMaterial(material: THREE.ShaderMaterial): void {
        if (this.object3D instanceof THREE.Mesh) {
            this.material = material;
            this.object3D.material = material;

            this.emit('portal:material:applied', { portal: this });

        }
    }

    /**
     * Obtiene el material actual del portal
     */
    getMaterial(): THREE.ShaderMaterial | null {
        return this.material;
    }

    /**
     * Actualiza las animaciones del portal (llamado desde el loop)
     */
    updateAnimation(deltaTime: number): void {
        if (this.material?.uniforms?.uTime) {
            this.material.uniforms.uTime.value += deltaTime;
        }
    }

    /**
     * Inicia la animación del portal
     */
    startAnimation(): void {
        if (!this.animating) {
            this.animating = true;
            this.emit('portal:animation:started', { portal: this });
        }
    }

    /**
     * Detiene la animación del portal
     */
    stopAnimation(): void {
        if (this.animating) {
            this.animating = false;
            this.emit('portal:animation:stopped', { portal: this });
        }
    }

    /**
     * Verifica si el portal está animando
     */
    isAnimating(): boolean {
        return this.animating;
    }

    /**
     * Obtiene información de debug del portal
     */
    getDebugInfo(): Record<string, any> {
        return {
            id: this.id,
            uuid: this.object3D.uuid,
            position: this.getPosition(),
            worldPosition: this.getWorldPosition(),
            hasMaterial: !!this.material,
            isAnimating: this.animating,
            objectType: this.object3D.type
        };
    }

    /**
     * Limpia los recursos del portal
     */
    dispose(): void {
        if (this.material) {
            this.material.dispose();
            this.material = null;
        }

        this.animating = false;
        this.removeAllListeners();
    }
}