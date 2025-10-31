import * as THREE from "three";

import type { AnimationAction } from "@engine/config/room.type";
import { AnimationRepository } from "./animation";

type AnimationCallback = (_targetName: string, _animationType: string) => void;
type AnimationUpdateCallback = (_targetName: string, _progress: number) => void;

/**
 * Servicio para gestión de animaciones GSAP en objetos 3D
 * 
 * Proporciona una interfaz completa para ejecutar, controlar y gestionar
 * animaciones de objetos en escenas Three.js utilizando la librería GSAP.
 * Incluye soporte para callbacks, control de reproducción y animaciones personalizadas.
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
            return;
        }
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
    play(config: AnimationAction): void {
        if (!this.scene) {
            return;
        }

        const target = this.scene.getObjectByName(config.target);

        if (target === undefined) {
            return;
        }

        // Detener animación previa en ese target
        this.stop(config.target);

        const handler = this.animationRepository.getAnimation(config.type);

        if (!handler) {
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

    /**
     * Detiene la animación de un target específico
     * 
     * @param targetName - Nombre del objeto cuya animación se debe detener
     */
    stop(targetName: string): void {
        const tl = this.animations[targetName];
        if (tl) {
            tl.kill();
            delete this.animations[targetName];
        }
    }

    /**
     * Detiene todas las animaciones activas
     */
    stopAll(): void {
        Object.values(this.animations).forEach((tl) => tl.kill());
        this.animations = {};
    }

    /**
     * Establece el callback que se ejecuta al iniciar una animación
     * 
     * @param callback - Función callback a ejecutar
     */
    setOnAnimationStart(callback?: AnimationCallback): void {
        this.onAnimationStart = callback;
    }

    /**
     * Establece el callback que se ejecuta al completar una animación
     * 
     * @param callback - Función callback a ejecutar
     */
    setOnAnimationComplete(callback?: AnimationCallback): void {
        this.onAnimationComplete = callback;
    }

    /**
     * Establece el callback que se ejecuta durante la actualización de una animación
     * 
     * @param callback - Función callback a ejecutar
     */
    setOnAnimationUpdate(callback?: AnimationUpdateCallback): void {
        this.onAnimationUpdate = callback;
    }

    /**
     * Obtiene la lista de animaciones activas
     * 
     * @returns Array con los nombres de los objetos que tienen animaciones activas
     */
    getActiveAnimations(): string[] {
        return Object.keys(this.animations);
    }

    /**
     * Verifica si un objeto específico está siendo animado
     * 
     * @param targetName - Nombre del objeto a verificar
     * @returns Verdadero si el objeto está siendo animado
     */
    isAnimating(targetName: string): boolean {
        return targetName in this.animations;
    }

    /**
     * Obtiene el progreso de una animación específica
     * 
     * @param targetName - Nombre del objeto cuyo progreso se quiere obtener
     * @returns Progreso de la animación (0-1)
     */
    getAnimationProgress(targetName: string): number {
        const tl = this.animations[targetName];
        return tl ? tl.progress() : 0;
    }

    /**
     * Pausa la animación de un objeto específico
     * 
     * @param targetName - Nombre del objeto cuya animación pausar
     */
    pauseAnimation(targetName: string): void {
        const tl = this.animations[targetName];
        if (tl) tl.pause();
    }

    /**
     * Reanuda la animación de un objeto específico
     * 
     * @param targetName - Nombre del objeto cuya animación reanudar
     */
    resumeAnimation(targetName: string): void {
        const tl = this.animations[targetName];
        if (tl) tl.resume();
    }

    /**
     * Pausa todas las animaciones activas
     */
    pauseAll(): void {
        Object.values(this.animations).forEach((tl) => tl.pause());
    }

    /**
     * Reanuda todas las animaciones pausadas
     */
    resumeAll(): void {
        Object.values(this.animations).forEach((tl) => tl.resume());
    }

    /**
     * Obtiene las animaciones disponibles en el repositorio
     * 
     * @returns Array con los nombres de las animaciones disponibles
     */
    getAvailableAnimations(): string[] {
        return this.animationRepository.getAvailableAnimations();
    }

    /**
     * Registra una nueva animación personalizada
     * 
     * @param name - Nombre de la animación a registrar
     * @param handler - Función que maneja la animación
     */
    registerCustomAnimation(name: string, handler: (_target: THREE.Object3D, _config: AnimationAction) => any): void {
        this.animationRepository.registerAnimation(name, handler);
    }

    /**
     * Rota un objeto a una rotación específica
     * 
     * @param targetName - Nombre del objeto a rotar
     * @param rotation - Valores de rotación objetivo (en radianes)
     * @param duration - Duración de la animación en segundos (por defecto: 1)
     * @returns Timeline de GSAP o null si no se puede crear
     */
    rotateObjectTo(targetName: string, rotation: { x?: number; y?: number; z?: number }, duration: number = 1): any {
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
     * 
     * @param targetName - Nombre del objeto a mover
     * @param position - Valores de posición objetivo
     * @param duration - Duración de la animación en segundos (por defecto: 1)
     * @returns Timeline de GSAP o null si no se puede crear
     */
    moveObjectTo(targetName: string, position: { x?: number; y?: number; z?: number }, duration: number = 1): any {
        if (!this.scene) return null;

        const target = this.scene.getObjectByName(targetName);
        if (!target) return null;

        this.stop(targetName);

        const timeline = this.animationRepository.createPositionAnimation(target, position, duration);
        this.animations[targetName] = timeline;

        return timeline;
    }

    /**
     * Escala un objeto a un tamaño específico
     * 
     * @param targetName - Nombre del objeto a escalar
     * @param scale - Valores de escala objetivo
     * @param duration - Duración de la animación en segundos (por defecto: 1)
     * @returns Timeline de GSAP o null si no se puede crear
     */
    scaleObject(targetName: string, scale: { x?: number; y?: number; z?: number } | number, duration: number = 1): any {
        if (!this.scene) return null;

        const target = this.scene.getObjectByName(targetName);
        if (!target) return null;

        this.stop(targetName);

        const timeline = this.animationRepository.createScaleAnimation(target, scale, duration);
        this.animations[targetName] = timeline;

        return timeline;
    }
}