import gsap from "gsap";
import * as THREE from "three";
import {
    defaultAnimations,
    defaultAnimationsMetadata
} from "./defaultAnimations";
import type {
    AnimationHandler,
    IAnimationRepository,
    CustomAnimationConfig,
    AnimationMetadata
} from "./types";

/**
 * Repositorio de animaciones que encapsula GSAP
 * Permite registrar, obtener y crear animaciones personalizadas de forma desacoplada
 */
export class AnimationRepository implements IAnimationRepository {
    private animations: Map<string, AnimationHandler> = new Map();

    private metadata: Map<string, AnimationMetadata> = new Map();

    constructor() {
        // Registrar animaciones por defecto
        this.registerDefaultAnimations();
    }

    /**
     * Registra una nueva animación en el repositorio
     */
    registerAnimation(name: string, handler: AnimationHandler, metadata?: AnimationMetadata): void {
        this.animations.set(name, handler);
        if (metadata) {
            this.metadata.set(name, metadata);
        }
    }

    /**
     * Obtiene un handler de animación por nombre
     */
    getAnimation(name: string): AnimationHandler | undefined {
        return this.animations.get(name);
    }

    /**
     * Obtiene todos los nombres de animaciones disponibles
     */
    getAvailableAnimations(): string[] {
        return Array.from(this.animations.keys());
    }

    /**
     * Verifica si existe una animación con el nombre dado
     */
    hasAnimation(name: string): boolean {
        return this.animations.has(name);
    }

    /**
     * Crea un timeline personalizado para animaciones manuales
     */
    createCustomTimeline(config: Partial<CustomAnimationConfig> = {}): gsap.core.Timeline {
        const {
            duration = 1,
            ease = "power2.inOut",
            repeat = 0,
            yoyo = false,
            delay = 0,
            onComplete,
            onUpdate,
            onStart
        } = config;

        const timeline = gsap.timeline({
            defaults: { duration, ease },
            repeat,
            yoyo,
            delay,
            onComplete,
            onUpdate,
            onStart
        });

        return timeline;
    }

    /**
     * Crea un timeline con configuración específica para un objeto 3D
     */
    createTimelineForObject(
        target: THREE.Object3D,
        config: Partial<CustomAnimationConfig> = {}
    ): gsap.core.Timeline {
        const timeline = this.createCustomTimeline(config);

        // Agregar referencia al target para futuras operaciones
        (timeline as any)._target = target;

        return timeline;
    }

    /**
     * Helper para crear animaciones de rotación personalizadas
     */
    createRotationAnimation(
        target: THREE.Object3D,
        rotation: { x?: number; y?: number; z?: number },
        duration: number = 1,
        config: Partial<CustomAnimationConfig> = {}
    ): gsap.core.Timeline {
        const timeline = this.createTimelineForObject(target, config);

        timeline.to(target.rotation, {
            ...rotation,
            duration,
            ease: config.ease || "power2.inOut"
        });

        return timeline;
    }

    /**
     * Helper para crear animaciones de posición personalizadas
     */
    createPositionAnimation(
        target: THREE.Object3D,
        position: { x?: number; y?: number; z?: number },
        duration: number = 1,
        config: Partial<CustomAnimationConfig> = {}
    ): gsap.core.Timeline {
        const timeline = this.createTimelineForObject(target, config);

        timeline.to(target.position, {
            ...position,
            duration,
            ease: config.ease || "power2.inOut"
        });

        return timeline;
    }

    /**
     * Helper para crear animaciones de escala personalizadas
     */
    createScaleAnimation(
        target: THREE.Object3D,
        scale: { x?: number; y?: number; z?: number } | number,
        duration: number = 1,
        config: Partial<CustomAnimationConfig> = {}
    ): gsap.core.Timeline {
        const timeline = this.createTimelineForObject(target, config);

        const scaleValue = typeof scale === "number" ? { x: scale, y: scale, z: scale } : scale;

        timeline.to(target.scale, {
            ...scaleValue,
            duration,
            ease: config.ease || "power2.inOut"
        });

        return timeline;
    }

    /**
     * Elimina una animación del repositorio
     */
    removeAnimation(name: string): boolean {
        const removed = this.animations.delete(name);
        this.metadata.delete(name);
        return removed;
    }

    /**
     * Limpia todas las animaciones registradas
     */
    clearAnimations(): void {
        this.animations.clear();
        this.metadata.clear();
    }

    /**
     * Obtiene metadatos de una animación
     */
    getAnimationMetadata(name: string): AnimationMetadata | undefined {
        return this.metadata.get(name);
    }

    /**
     * Registra las animaciones por defecto del sistema
     */
    private registerDefaultAnimations(): void {
        // Registrar cada animación con sus metadatos
        Object.entries(defaultAnimations).forEach(([name, handler]) => {
            this.registerAnimation(
                name,
                handler as AnimationHandler,
                defaultAnimationsMetadata[name]
            );
        });
    }

    /**
     * Obtiene el motor GSAP para operaciones avanzadas
     */
    getGSAP(): typeof gsap {
        return gsap;
    }
}