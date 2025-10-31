import * as THREE from 'three';

import { Portal } from '@engine/entities/Portal';
import { MaterialService } from '../MaterialService';
import { EventEmitter } from '@engine/utils/EventEmitter';
import { EngineCore, useEngineStore } from '@engine/core';
import { PortalholeRenderer } from '../renderers/PortalholeRenderer';
import { NebulaRenderer } from '../renderers/NebulaRenderer';


// Eventos que emite el PortalManager
interface PortalManagerEventMap {
    'portal:created': { portal: Portal };
    'portal:material:applied': { portal: Portal };
    'portal:animation:started': { portal: Portal };
    'portal:animation:stopped': { portal: Portal };
    'portal:disposed': { portalId: string };
}

/**
 * Gestor para la creación, gestión y control de portales de navegación
 * 
 * Proporciona funcionalidad completa para manejar el ciclo de vida de portales,
 * incluyendo creación, aplicación de materiales con shaders personalizados,
 * control de animaciones y gestión de eventos. Extiende EventEmitter para
 * comunicación basada en eventos con otros componentes del sistema.
 */
export class PortalManager extends EventEmitter<PortalManagerEventMap> {


    private currentPortal: Portal | null = null;

    private store = useEngineStore.getState();

    private materialService: MaterialService | null = null;

    private portalholeRenderer: PortalholeRenderer | null = null;

    private nebulaRenderer: NebulaRenderer | null = null;

    private core: EngineCore;

    /**
     * Crea una nueva instancia del gestor de portales
     * 
     * @param core - Instancia del núcleo del motor para acceso a servicios
     */
    constructor(core: EngineCore) {
        super();
        this.core = core;
        this.init();
    }

    /**
     * Inicializa los servicios necesarios del motor
     */
    init(): void {
        this.materialService = this.core.getService(MaterialService);
        this.portalholeRenderer = this.core.getService(PortalholeRenderer);
        this.nebulaRenderer = this.core.getService(NebulaRenderer);
    }

    /**
     * Crea un portal a partir de un Object3D
     * 
     * @param object3D - Objeto 3D base para el portal
     * @returns La instancia de Portal creada
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

    startTravel() {
        console.log(this.portalholeRenderer, this.currentPortal)
        if (!this.portalholeRenderer || !this.currentPortal || !this.nebulaRenderer) return;
        this.nebulaRenderer.setInitialPosition(this.currentPortal.getPosition());
        this.portalholeRenderer.setPosition(this.currentPortal.getPosition());

        this.nebulaRenderer.start();
        this.portalholeRenderer.start();

    }

    stopTravel() {
        if (!this.portalholeRenderer || !this.currentPortal || !this.nebulaRenderer) return;
        this.portalholeRenderer.stop();
        this.nebulaRenderer.stop();
    }

    /**
     * Aplica materiales con shaders al portal actual
     * 
     * @param uniforms - Uniforms para el shader del portal
     */
    applyMaterialsToPortal(uniforms: Record<string, any>): void {
        if (!this.currentPortal) return;
        if (!this.materialService) return;

        try {
            this.materialService.applyMaterialsToPortal(
                this.currentPortal.getObject3D(),
                uniforms
            );

            // Obtener el material del mesh "inside" (el que realmente tiene el material aplicado)
            const object3D = this.currentPortal.getObject3D();
            const insideMesh = object3D?.getObjectByName("inside") as THREE.Mesh;

            if (insideMesh && insideMesh.material instanceof THREE.ShaderMaterial) {
                this.currentPortal.setMaterial(insideMesh.material);
            }

            this.emit('portal:material:applied', { portal: this.currentPortal });

        } catch (error) {
            console.error('[PortalManager]: Error aplicando materiales:', error);
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
     * Actualiza las animaciones del portal en cada frame
     * 
     * @param delta - Tiempo transcurrido desde el último frame
     */
    update(delta: number): void {
        if (this.currentPortal && this.currentPortal.isAnimating()) {
            this.currentPortal.updateAnimation(delta);
        }

        // Sincronizar uniforms del portal con el store
        this.syncPortalUniforms();

        if (this.portalholeRenderer) {
            this.portalholeRenderer.update();
        }
        if (this.nebulaRenderer) {
            this.nebulaRenderer.update();
        }
    }

    /**
     * Sincroniza los uniforms del shader del portal con los valores del store
     * Esto permite que los cambios del debug panel se reflejen en tiempo real
     */
    private syncPortalUniforms(): void {
        if (!this.currentPortal) return;

        const material = this.currentPortal.getMaterial();
        if (!material || !material.uniforms) return;

        // Obtener valores actuales del store
        const storeUniforms = useEngineStore.getState().portalUniforms;

        // Sincronizar cada uniform con el store
        if (material.uniforms.uPortalAlpha) {
            material.uniforms.uPortalAlpha.value = storeUniforms.uPortalAlpha;
        }
        if (material.uniforms.uDensity) {
            material.uniforms.uDensity.value = storeUniforms.uDensity;
        }
        if (material.uniforms.uRadius) {
            material.uniforms.uRadius.value = storeUniforms.uRadius;
        }
        if (material.uniforms.uAngle) {
            material.uniforms.uAngle.value = storeUniforms.uAngle;
        }
        if (material.uniforms.uHue) {
            material.uniforms.uHue.value = storeUniforms.uHue;
        }
        if (material.uniforms.uSaturation) {
            material.uniforms.uSaturation.value = storeUniforms.uSaturation;
        }
        if (material.uniforms.uRadiusFactor) {
            material.uniforms.uRadiusFactor.value = storeUniforms.uRadiusFactor;
        }
        if (material.uniforms.uGainOffset) {
            material.uniforms.uGainOffset.value = storeUniforms.uGainOffset;
        }
        if (material.uniforms.uGainScale) {
            material.uniforms.uGainScale.value = storeUniforms.uGainScale;
        }
    }

    /**
     * Obtiene el portal actualmente activo
     * 
     * @returns El portal actual o null si no hay ninguno
     */
    getCurrentPortal(): Portal | null {
        return this.currentPortal;
    }

    /**
     * Configura listeners para eventos del portal
     * 
     * @param portal - Portal al que agregar los listeners
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
     * Libera el portal actual y limpia recursos
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

        console.log(`[PortalManager]: Portal destruido:`, portalId);
    }

    /**
     * Obtiene los uniforms configurados para el portal actual
     * 
     * @returns Objeto con uniforms para el shader del portal o null si no hay portal
     */
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
        };
    }

    /**
     * Limpia todos los recursos del manager
     */
    dispose(): void {
        this.disposeCurrentPortal();
        this.removeAllListeners();

        console.log('[PortalManager]: Recursos liberados');
    }
}