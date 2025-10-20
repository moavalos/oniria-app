import type { AnimationAction } from "@engine/config/room.type";
import { BaseSystem } from "@engine/core/src/BaseSystem";
import type { Injectable } from "@engine/core/src/Injectable";
import type { EngineCore } from "@/engine/core/src/EngineCore";
import { AnimationService } from "@engine/services/AnimationService";

export type AnimationConfig = {
    animations?: Record<string, AnimationAction>;
    autoPlay?: boolean;
    playOnMount?: boolean;
};

/**
 * Sistema de animaciones que extiende BaseSystem.
 * Gestiona la reproducción automática y manual de animaciones en objetos de la escena.
 */
export class AnimationSystem extends BaseSystem implements Injectable {
    name = "AnimationSystem";

    private animationService!: AnimationService;

    private animatables: Record<string, AnimationAction> = {};

    // Callbacks configurables
    private onAnimationStart?: (_targetName: string, _animationType: string) => void;

    private onAnimationComplete?: (_targetName: string, _animationType: string) => void;

    private onAnimationUpdate?: (_targetName: string, _progress: number) => void;

    // Configuración
    private enableAnimations: boolean = true;

    private autoConfigureForRoom: boolean = true;

    constructor(private _config: AnimationConfig = {}) {
        super();
    }

    async init(core: EngineCore): Promise<void> {
        // Obtener AnimationService del core
        this.animationService = core.getService(AnimationService);

        if (!this.animationService) {
            console.error("[AnimationSystem] AnimationService no disponible");
            return;
        }

        // Configurar callbacks iniciales
        this.setupAnimationCallbacks();

        // Cargar animatables iniciales
        await this.loadAnimatables(core);

        console.log("[AnimationSystem] ✅ Sistema inicializado");
    }

    update(): void {
        // El AnimationService maneja sus propias actualizaciones
        // Aquí podríamos agregar lógica adicional si es necesario
    }

    dispose(): void {
        // Limpiar callbacks
        if (this.animationService) {
            this.animationService.setOnAnimationStart(undefined);
            this.animationService.setOnAnimationComplete(undefined);
            this.animationService.setOnAnimationUpdate(undefined);
            this.animationService.stopAll();
        }

        // Limpiar estado interno
        this.animatables = {};
    }

    /**
     * Configura los callbacks del AnimationService
     */
    private setupAnimationCallbacks(): void {
        if (!this.animationService) return;

        this.animationService.setOnAnimationStart(this.onAnimationStart);
        this.animationService.setOnAnimationComplete(this.onAnimationComplete);
        this.animationService.setOnAnimationUpdate(this.onAnimationUpdate);
    }

    /**
     * Carga los objetos animatables desde la room o configuración
     */
    private async loadAnimatables(_core: EngineCore): Promise<void> {
        let newAnimatables: Record<string, AnimationAction> = {};

        // TODO: Implementar cuando activeRoom esté disponible
        if (this.autoConfigureForRoom && _core.getCurrentRoom()) {
            const roomAnimatables = await _core.getCurrentRoom()?.getAnimatableObjects();
            newAnimatables = { ...roomAnimatables };
        }

        // Agregar/sobrescribir con animaciones de configuración
        if (this._config.animations) {
            newAnimatables = { ...newAnimatables, ...this._config.animations };
        }

        this.animatables = newAnimatables;

        // Ejecutar animaciones automáticas si está configurado
        this.executeAutoAnimations();
    }

    /**
     * Ejecuta animaciones automáticas si está habilitado
     */
    private executeAutoAnimations(): void {
        if (!this.enableAnimations || !this.animationService) return;

        const shouldAutoPlay =
            this._config.autoPlay !== false &&
            this._config.playOnMount !== false;

        if (shouldAutoPlay && Object.keys(this.animatables).length > 0) {
            Object.values(this.animatables).forEach((animationConfig) => {
                this.animationService.play(animationConfig);
            });
        }
    }

    /**
     * Configura los callbacks de eventos de animación
     */
    setCallbacks(
        onStart?: (_targetName: string, _animationType: string) => void,
        onComplete?: (_targetName: string, _animationType: string) => void,
        onUpdate?: (_targetName: string, _progress: number) => void
    ): void {
        this.onAnimationStart = onStart;
        this.onAnimationComplete = onComplete;
        this.onAnimationUpdate = onUpdate;

        // Reconfigurar en el servicio
        this.setupAnimationCallbacks();
    }

    /**
     * Habilita o deshabilita las animaciones
     */
    setAnimationsEnabled(enabled: boolean): void {
        this.enableAnimations = enabled;

        if (!enabled && this.animationService) {
            this.animationService.stopAll();
        }
    }

    /**
     * Establece si debe auto-configurar para la room
     */
    setAutoConfigureForRoom(enabled: boolean): void {
        this.autoConfigureForRoom = enabled;
    }

    /**
     * Obtiene las animaciones disponibles
     */
    getAnimatables(): Record<string, AnimationAction> {
        return { ...this.animatables };
    }

    /**
     * Reproduce una animación específica
     */
    playAnimation(name: string): void {
        const animation = this.animatables[name];
        if (animation && this.animationService) {
            this.animationService.play(animation);
        }
    }

    /**
     * Detiene todas las animaciones
     */
    stopAllAnimations(): void {
        if (this.animationService) {
            this.animationService.stopAll();
        }
    }
}