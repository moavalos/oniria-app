import gsap from "gsap";
import * as THREE from "three";
import type { AnimationAction } from "../config/room.type";

type AnimationHandler = (
    target: THREE.Object3D,
    config: AnimationAction
) => gsap.core.Timeline | void;

type AnimationCallback = (targetName: string, animationType: string) => void;
type AnimationUpdateCallback = (targetName: string, progress: number) => void;

export class AnimationService {
    private animations: Record<string, gsap.core.Timeline> = {};
    private onAnimationStart?: AnimationCallback;
    private onAnimationComplete?: AnimationCallback;
    private onAnimationUpdate?: AnimationUpdateCallback;

    //Animaciones disponibles
    private handlers: Record<string, AnimationHandler> = {
        pendulum: (target, config) => {
            const {
                axis: axisArr = [0, 1, 0],
                angle = 30,
                D_right = 0.8,
                D_left = 0.8,
                T_rest = 1.5,
                ease = "sine.inOut",
            } = config.params;

            const qBase = target.quaternion.clone();
            const axis = new THREE.Vector3(...axisArr)
                .applyQuaternion(qBase)
                .normalize();

            const qTmp = new THREE.Quaternion();
            const proxy = { theta: 0 };

            const applyRotation = () => {
                qTmp.setFromAxisAngle(axis, proxy.theta);
                target.quaternion.copy(qBase).multiply(qTmp);
            };

            const A = THREE.MathUtils.degToRad(angle);
            const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });

            tl.to(proxy, {
                theta: +A,
                duration: D_right,
                ease,
                onUpdate: applyRotation,
            })
                .to(proxy, {
                    theta: -A,
                    duration: D_left,
                    ease,
                    onUpdate: applyRotation,
                })
                .to(proxy, {
                    theta: 0,
                    duration: D_right,
                    ease,
                    onUpdate: applyRotation,
                })
                .to({}, { duration: T_rest });

            return tl;
        },
        //rotate: 
        rotate: (target, config) => {
            const {
                axis: axisArr = [0, 1, 0],
                to = 360,
                duration = 5,
                ease = "none",
            } = config.params;

            console.log("rotate", target.name, config.params);

            const qBase = target.quaternion.clone();
            const axis = new THREE.Vector3(...axisArr)
                .applyQuaternion(qBase)
                .normalize();

            const qTmp = new THREE.Quaternion();
            const proxy = { theta: 0 };

            const applyRotation = () => {
                qTmp.setFromAxisAngle(axis, proxy.theta);
                target.quaternion.copy(qBase).multiply(qTmp);
            };

            const A = THREE.MathUtils.degToRad(to);
            const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });


            tl.to(proxy, {
                theta: A,
                duration,
                ease,
                onUpdate: applyRotation,
            });

            return tl;
        }, rotateTo: (target, config) => {
            const {
                axis: axisArr = [0, 1, 0],
                to = 360,
                duration = 5,
                ease = "none",
            } = config.params;
            const maxAngle = THREE.MathUtils.degToRad(to);

            const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });
            tl.to(target.rotation, {
                y: maxAngle * Number(axisArr[1]),
                x: maxAngle * Number(axisArr[0]),
                z: maxAngle * Number(axisArr[2]),
                duration: duration ?? 0.8,
                ease: ease,
            });
            return tl;
        },

    };

    constructor(private scene: THREE.Group<THREE.Object3DEventMap> | null) {
        console.log("AnimationService: escena inicializada");
        if (!scene) {
            console.warn("AnimationService: scene no está inicializada");
            return;
        }
    }

    /** Ejecutar una animación */
    play(config: AnimationAction) {
        if (!this.scene) {
            console.warn("AnimationService: scene no está inicializada");
            return;
        }

        const target = this.scene.getObjectByName(config.target);

        if (!target) {
            console.warn(`No se encontró target para animación: ${config.target}`);
            return;
        }

        // detener animación previa en ese target
        this.stop(config.target);

        const handler = this.handlers[config.type];

        if (!handler) {
            console.warn(`No existe handler para animación: ${config.type}`);
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

}