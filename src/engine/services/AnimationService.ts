import * as THREE from "three";

import type { AnimationAction } from "../config/room.type";
import { AnimationRepository } from "./animation";

type AnimationCallback = (_targetName: string, _animationType: string) => void;
type AnimationUpdateCallback = (_targetName: string, _progress: number) => void;

/**
 * Servicio para gestionar animaciones GSAP en objetos 3D
 */
export class AnimationService {
    private animations: Record<string, any> = {};

    private animationRepository: AnimationRepository;

    private onAnimationStart?: AnimationCallback;

    private onAnimationComplete?: AnimationCallback;

    private onAnimationUpdate?: AnimationUpdateCallback;

    /**
     * Crea una nueva instancia del servicio de animaciones
     * 
     * @param scene - Escena de Three.js donde se encuentran los objetos a animar
     */
    constructor(private scene: THREE.Group<THREE.Object3DEventMap> | THREE.Scene | null) {
        this.animationRepository = new AnimationRepository();

        if (!scene) {
            console.warn("[AnimationService] ⚠️ Escena no está inicializada");
            return;
        }

        console.log("[AnimationService] ✅ Inicializado con escena:", scene);
    }

    /**
     * Obtiene el repositorio de animaciones para operaciones avanzadas
     * 
     * @returns Instancia del repositorio de animaciones
     */
    getAnimationRepository(): AnimationRepository {
        return this.animationRepository;
    }

    /**
     * Crea un timeline personalizado para animaciones manuales
     * 
     * @returns Timeline de GSAP
     */
    createCustomTimeline(): any {
        return this.animationRepository.createCustomTimeline();
    }

    /**
     * Crea un timeline personalizado para un objeto específico
     * 
     * @param target - Objeto 3D para el cual crear el timeline
     * @returns Timeline de GSAP configurado para el objeto
     */
    createTimelineForObject(target: THREE.Object3D): any {
        return this.animationRepository.createTimelineForObject(target);
    }

    /**
     * Ejecuta una animación basada en configuración
     * 
     * @param config - Configuración de la animación a ejecutar
     */
    play(config: AnimationAction) {
        console.log("[AnimationService] 🎬 Intentando reproducir animación:", config);

        if (!this.scene) {
            console.warn("[AnimationService] ⚠️ Scene no está inicializada");
            return;
        }

        const target = this.scene.getObjectByName(config.target);

        if (target === undefined) {
            console.warn(`[AnimationService] ⚠️ No se encontró target para animación: ${config.target}`);
            console.log("[AnimationService] 📋 Objetos disponibles en la escena:", this.scene.children.map(c => c.name).filter(Boolean));
            return;
        }

        console.log("[AnimationService] ✅ Target encontrado:", target.name);

        // detener animación previa en ese target
        this.stop(config.target);

        const handler = this.animationRepository.getAnimation(config.type);

        if (!handler) {
            console.warn(`No existe animación: ${config.type}. Disponibles: ${this.animationRepository.getAvailableAnimations().join(', ')}`);
            return;
        }

        const tl = handler(target, config);
        if (tl) {
            // Configurar callbacks de la timeline
            tl.eventCallback("onStart", () => {
                this.onAnimationStart?.(config.target, config.type);
            });

            tl.eventCallback("onComplete", () => {
                this.onAnimationComplete?.(config.target, config.type);
            });

            tl.eventCallback("onUpdate", () => {
                const progress = tl.progress();
                this.onAnimationUpdate?.(config.target, progress);
            });

            this.animations[config.target] = tl;
        }
    }

    /** Detener animación en un target */
    stop(targetName: string) {
        const tl = this.animations[targetName];
        if (tl) {
            tl.kill();
            delete this.animations[targetName];
        }
    }

    /** Detener todas las animaciones */
    stopAll() {
        Object.values(this.animations).forEach((tl) => tl.kill());
        this.animations = {};
    }

    // Métodos para configurar callbacks
    setOnAnimationStart(callback?: AnimationCallback) {
        this.onAnimationStart = callback;
    }

    setOnAnimationComplete(callback?: AnimationCallback) {
        this.onAnimationComplete = callback;
    }

    setOnAnimationUpdate(callback?: AnimationUpdateCallback) {
        this.onAnimationUpdate = callback;
    }

    // Métodos para obtener información de animaciones
    getActiveAnimations(): string[] {
        return Object.keys(this.animations);
    }

    isAnimating(targetName: string): boolean {
        return targetName in this.animations;
    }

    getAnimationProgress(targetName: string): number {
        const tl = this.animations[targetName];
        return tl ? tl.progress() : 0;
    }

    pauseAnimation(targetName: string) {
        const tl = this.animations[targetName];
        if (tl) tl.pause();
    }

    resumeAnimation(targetName: string) {
        const tl = this.animations[targetName];
        if (tl) tl.resume();
    }

    pauseAll() {
        Object.values(this.animations).forEach((tl) => tl.pause());
    }

    resumeAll() {
        Object.values(this.animations).forEach((tl) => tl.resume());
    }

    /**
     * Obtiene las animaciones disponibles en el repositorio
     */
    getAvailableAnimations(): string[] {
        return this.animationRepository.getAvailableAnimations();
    }

    /**
     * Registra una nueva animación personalizada
     */
    registerCustomAnimation(name: string, handler: (_target: THREE.Object3D, _config: AnimationAction) => any): void {
        this.animationRepository.registerAnimation(name, handler);
    }

    /**
     * Helpers para crear animaciones rápidas sin configuración compleja
     */

    /**
     * Rota un objeto a una posición específica
     */
    rotateObjectTo(targetName: string, rotation: { x?: number; y?: number; z?: number }, duration: number = 1): any { // Timeline de GSAP
        if (!this.scene) return null;

        const target = this.scene.getObjectByName(targetName);
        if (!target) return null;

        this.stop(targetName);

        const timeline = this.animationRepository.createRotationAnimation(target, rotation, duration);
        this.animations[targetName] = timeline;

        return timeline;
    }

    /**
     * Mueve un objeto a una posición específica
     */
    moveObjectTo(targetName: string, position: { x?: number; y?: number; z?: number }, duration: number = 1): any { // Timeline de GSAP
        if (!this.scene) return null;

        const target = this.scene.getObjectByName(targetName);
        if (!target) return null;

        this.stop(targetName);

        const timeline = this.animationRepository.createPositionAnimation(target, position, duration);
        this.animations[targetName] = timeline;

        return timeline;
    }

    /**
     * Escala un objeto
     */
    scaleObject(targetName: string, scale: { x?: number; y?: number; z?: number } | number, duration: number = 1): any { // Timeline de GSAP
        if (!this.scene) return null;

        const target = this.scene.getObjectByName(targetName);
        if (!target) return null;

        this.stop(targetName);

        const timeline = this.animationRepository.createScaleAnimation(target, scale, duration);
        this.animations[targetName] = timeline;

        return timeline;
    }

}