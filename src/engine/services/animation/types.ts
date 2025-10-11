import * as THREE from "three";
import type { AnimationAction } from "../../config/room.type";

/**
 * Handler para una animación específica
 */
export type AnimationHandler = (
    _target: THREE.Object3D,
    _config: AnimationAction
) => any; // Timeline de GSAP

/**
 * Configuración para crear una animación personalizada
 */
export interface CustomAnimationConfig {
    target: THREE.Object3D;
    duration?: number;
    ease?: string;
    repeat?: number;
    yoyo?: boolean;
    delay?: number;
    onComplete?: () => void;
    onUpdate?: () => void;
    onStart?: () => void;
}

/**
 * Interfaz para el repositorio de animaciones
 */
export interface IAnimationRepository {
    /**
     * Registra una nueva animación en el repositorio
     */
    registerAnimation(_name: string, _handler: AnimationHandler): void;

    /**
     * Obtiene un handler de animación por nombre
     */
    getAnimation(_name: string): AnimationHandler | undefined;

    /**
     * Obtiene todos los nombres de animaciones disponibles
     */
    getAvailableAnimations(): string[];

    /**
     * Verifica si existe una animación con el nombre dado
     */
    hasAnimation(_name: string): boolean;

    /**
     * Crea un timeline personalizado para animaciones manuales
     */
    createCustomTimeline(_config?: Partial<CustomAnimationConfig>): any; // Timeline de GSAP

    /**
     * Elimina una animación del repositorio
     */
    removeAnimation(_name: string): boolean;

    /**
     * Limpia todas las animaciones registradas
     */
    clearAnimations(): void;
}

/**
 * Configuración para animaciones parametrizadas
 */
export interface AnimationParams {
    [key: string]: any;
}

/**
 * Metadatos de una animación
 */
export interface AnimationMetadata {
    name: string;
    description?: string;
    defaultParams?: AnimationParams;
    requiredParams?: string[];
}