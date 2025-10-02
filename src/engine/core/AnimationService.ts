import gsap from "gsap";
import * as THREE from "three";
import type { AnimationAction } from "../config/room.type";



type AnimationHandler = (
    target: THREE.Object3D,
    config: AnimationAction
) => gsap.core.Timeline | void;

export class AnimationService {
    private animations: Record<string, gsap.core.Timeline> = {};

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
        if (tl) this.animations[config.target] = tl;
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

}