import * as THREE from 'three';

import { EventEmitter } from '../utils/EventEmitter';

/**
 * Eventos que puede emitir el Portal
 */
interface PortalEventMap extends Record<string, unknown> {
    'portal:material:applied': { portal: Portal };
    'portal:animation:started': { portal: Portal };
    'portal:animation:stopped': { portal: Portal };
}

/**
 * Entidad Portal que representa un portal de navegación 3D en la escena.
 * Los portales permiten la transición entre diferentes salas del motor 3D,
 * gestionando geometría, posición, materiales shader y animaciones.
 */
export class Portal extends EventEmitter<PortalEventMap> {
    public readonly id: string;

    private object3D: THREE.Object3D;

    private material: THREE.ShaderMaterial | null = null;

    private animating: boolean = false;

    /**
     * Crea una nueva instancia de Portal.
     * 
     * @param object3D - Objeto 3D que representa físicamente el portal
     * @throws Error si el objeto 3D es nulo
     */
    constructor(object3D: THREE.Object3D) {
        super();

        if (!object3D) {
            throw new Error('El objeto 3D del portal es requerido');
        }

        this.object3D = object3D;
        this.id = object3D.name || `portal_${object3D.uuid}`;

        console.log(`[Portal]: Portal ${this.id} inicializado correctamente`);
    }

    /**
     * Obtiene la posición del portal en coordenadas del mundo.
     * 
     * @returns Posición mundial del portal
     */
    getWorldPosition(): THREE.Vector3 {
        const worldPosition = new THREE.Vector3();
        this.object3D.getWorldPosition(worldPosition);
        return worldPosition;
    }

    /**
     * Obtiene la posición local del portal.
     * 
     * @returns Copia de la posición local del portal
     */
    getPosition(): THREE.Vector3 {
        return this.object3D.position.clone();
    }

    /**
     * Obtiene el objeto 3D que representa físicamente el portal.
     * 
     * @returns Objeto 3D del portal
     */
    getObject3D(): THREE.Object3D {
        return this.object3D;
    }

    /**
     * Aplica un material shader al portal para efectos visuales.
     * 
     * @param material - Material shader a aplicar
     */
    setMaterial(material: THREE.ShaderMaterial): void {
        if (this.object3D instanceof THREE.Mesh) {
            this.material = material;
            this.object3D.material = material;
            this.emit('portal:material:applied', { portal: this });
        }
    }

    /**
     * Obtiene el material shader actual del portal.
     * 
     * @returns Material shader o null si no está establecido
     */
    getMaterial(): THREE.ShaderMaterial | null {
        return this.material;
    }

    /**
     * Actualiza las animaciones del portal, específicamente el tiempo uniforme.
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
     * Inicia la animación del portal si no está ya animando.
     */
    startAnimation(): void {
        if (!this.animating) {
            this.animating = true;
            this.emit('portal:animation:started', { portal: this });
        }
    }

    /**
     * Detiene la animación del portal si está animando.
     */
    stopAnimation(): void {
        if (this.animating) {
            this.animating = false;
            this.emit('portal:animation:stopped', { portal: this });
        }
    }

    /**
     * Verifica si el portal está actualmente animando.
     * 
     * @returns true si está animando, false en caso contrario
     */
    isAnimating(): boolean {
        return this.animating;
    }

    /**
     * Obtiene información de debug del portal para herramientas de desarrollo.
     * 
     * @returns Objeto con información detallada del portal
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
     * Libera todos los recursos del portal incluyendo material y listeners.
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