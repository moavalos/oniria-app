import { Portal } from '../../entities/Portal';
import { MaterialService } from '../MaterialService';
import { EventEmitter } from '../../utils/EventEmitter';
import * as THREE from 'three';

// Eventos que emite el PortalManager
interface PortalManagerEvents {
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
export class PortalManager extends EventEmitter<PortalManagerEvents> {
    private currentPortal: Portal | null = null;

    private materialService: MaterialService;

    constructor(materialService: MaterialService) {
        super();
        this.materialService = materialService;

        console.log('🚪 PortalManager - Initialized');
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

        // Configurar listeners del portal
        this.setupPortalListeners(portal);

        this.emit('portal:created', { portal });

        console.log(`🚪 PortalManager - Portal creado:`, portal.id);
        return portal;
    }

    /**
     * Aplica materiales al portal actual
     */
    async applyMaterialsToPortal(uniforms: Record<string, any>): Promise<void> {
        if (!this.currentPortal) {
            console.warn('⚠️ PortalManager - No hay portal para aplicar materiales');
            return;
        }

        try {
            await this.materialService.applyMaterialsToPortal(
                this.currentPortal.getObject3D(),
                uniforms
            );

            // Obtener el material aplicado y configurarlo en el portal
            const object3D = this.currentPortal.getObject3D();
            if (object3D instanceof THREE.Mesh && object3D.material instanceof THREE.ShaderMaterial) {
                this.currentPortal.setMaterial(object3D.material);
            }

            this.emit('portal:material:applied', { portal: this.currentPortal });

            console.log(`🎨 PortalManager - Materiales aplicados al portal:`, this.currentPortal.id);
        } catch (error) {
            console.error('❌ PortalManager - Error aplicando materiales:', error);
            throw error;
        }
    }

    /**
     * Inicia la animación del portal actual
     */
    startPortalAnimation(): void {
        if (!this.currentPortal) {
            console.warn('⚠️ PortalManager - No hay portal para animar');
            return;
        }

        if (this.currentPortal.isAnimating()) {
            console.log('ℹ️ PortalManager - Portal ya está animando');
            return;
        }

        // Marcar portal como animando
        this.currentPortal.startAnimation();

        this.emit('portal:animation:started', { portal: this.currentPortal });

        console.log(`▶️ PortalManager - Animación iniciada para portal:`, this.currentPortal.id);
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

        console.log(`⏹️ PortalManager - Animación detenida para portal:`, this.currentPortal.id);
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

    /**
     * Limpia todos los recursos del manager
     */
    dispose(): void {
        this.disposeCurrentPortal();
        this.removeAllListeners();

        console.log('🗑️ PortalManager - Disposed');
    }
}