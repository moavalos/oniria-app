import { Portal } from '../../entities/Portal';
import { MaterialService } from '../MaterialService';
import { EventEmitter } from '../../utils/EventEmitter';
import * as THREE from 'three';
import { CameraService } from '../CameraService';
import { EngineCore, useEngineStore } from '@/engine/core';

// Eventos que emite el PortalManager
interface PortalManagerEventMap {
    'portal:created': { portal: Portal };
    'portal:material:applied': { portal: Portal };
    'portal:animation:started': { portal: Portal };
    'portal:animation:stopped': { portal: Portal };
    'portal:disposed': { portalId: string };
}

/**
 * Gestor de portales - maneja la creación, materiales y animaciones de portales
 * Responsabilidad única: gestión completa del ciclo de vida de portales
 */
export class PortalManager extends EventEmitter<PortalManagerEventMap> {
    private currentPortal: Portal | null = null;

    private store = useEngineStore.getState();

    private materialService: MaterialService | null = null;

    private cameraService: CameraService | null = null;

    private core: EngineCore;

    constructor(core: EngineCore) {
        super();
        this.core = core;
        this.init()
    }

    init() {
        this.materialService = this.core.getService(MaterialService);
        this.cameraService = this.core.getService(CameraService);
    }

    /**
     * Crea un portal a partir de un Object3D
     */
    createPortal(object3D: THREE.Object3D): Portal {
        // Limpiar portal anterior si existe
        if (this.currentPortal) {
            this.disposeCurrentPortal();
        }

        // Crear nuevo portal
        const portal = new Portal(object3D);
        this.currentPortal = portal;
        this.applyMaterialsToPortal(this.getUniformsForCurrentPortal()!);

        // Configurar listeners del portal
        this.setupPortalListeners(portal);

        this.emit('portal:created', { portal });

        return portal;
    }

    /**
     * Aplica materiales al portal actual
     */
    applyMaterialsToPortal(uniforms: Record<string, any>) {
        if (!this.currentPortal) return;
        if (!this.materialService) return;

        try {
            this.materialService.applyMaterialsToPortal(
                this.currentPortal.getObject3D(),
                uniforms
            );

            // Obtener el material aplicado y configurarlo en el portal
            const object3D = this.currentPortal.getObject3D();
            if (object3D instanceof THREE.Mesh && object3D.material instanceof THREE.ShaderMaterial) {
                this.currentPortal.setMaterial(object3D.material);
            }

            this.emit('portal:material:applied', { portal: this.currentPortal });

        } catch (error) {
            console.error('[PortalManager]:Error aplicando materiales:', error);
            throw error;
        }
    }

    /**
     * Inicia la animación del portal actual
     */
    startPortalAnimation(): void {
        if (!this.currentPortal) return;
        if (this.currentPortal.isAnimating()) return;

        // Marcar portal como animando
        this.currentPortal.startAnimation();

        this.emit('portal:animation:started', { portal: this.currentPortal });
    }

    /**
     * Detiene la animación del portal actual
     */
    stopPortalAnimation(): void {
        if (!this.currentPortal || !this.currentPortal.isAnimating()) {
            return;
        }

        // Marcar portal como no animando
        this.currentPortal.stopAnimation();

        this.emit('portal:animation:stopped', { portal: this.currentPortal });

    }

    /**
     * Método update llamado desde el core - actualiza animaciones de portales
     */
    update(delta: number): void {
        if (this.currentPortal && this.currentPortal.isAnimating()) {
            this.currentPortal.updateAnimation(delta);
        }
    }

    /**
     * Obtiene el portal actual
     */
    getCurrentPortal(): Portal | null {
        return this.currentPortal;
    }

    /**
     * Configura listeners para eventos del portal
     */
    private setupPortalListeners(portal: Portal): void {
        portal.on('material:applied', () => {
            this.emit('portal:material:applied', { portal });
        });

        portal.on('animation:started', () => {
            this.emit('portal:animation:started', { portal });
        });

        portal.on('animation:stopped', () => {
            this.emit('portal:animation:stopped', { portal });
        });
    }

    /**
     * Libera el portal actual
     */
    private disposeCurrentPortal(): void {
        if (!this.currentPortal) return;

        const portalId = this.currentPortal.id;

        // Detener animación si está corriendo
        this.stopPortalAnimation();

        // Limpiar portal
        this.currentPortal.dispose();
        this.currentPortal = null;

        this.emit('portal:disposed', { portalId });

        console.log(`🗑️ PortalManager - Portal disposed:`, portalId);
    }

    getUniformsForCurrentPortal(): Record<string, any> | null {
        // Configuración de uniforms del Portal usando el store
        return {
            uTime: { value: 0 },
            uPortalAlpha: { value: this.store.portalUniforms.uPortalAlpha },
            uDensity: { value: this.store.portalUniforms.uDensity },
            uRadius: { value: this.store.portalUniforms.uRadius },
            uAngle: { value: this.store.portalUniforms.uAngle },
            uHue: { value: this.store.portalUniforms.uHue },
            uSaturation: { value: this.store.portalUniforms.uSaturation },
            uRadiusFactor: { value: this.store.portalUniforms.uRadiusFactor },
            uGainOffset: { value: this.store.portalUniforms.uGainOffset },
            uGainScale: { value: this.store.portalUniforms.uGainScale },
        }
    }



    /**
     * Limpia todos los recursos del manager
     */
    dispose(): void {
        this.disposeCurrentPortal();
        this.removeAllListeners();

        console.log('🗑️ PortalManager - Disposed');
    }
}