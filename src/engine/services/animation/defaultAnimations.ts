import gsap from "gsap";
import * as THREE from "three";
import type { AnimationHandler, AnimationMetadata } from "./types";

/**
 * Animación de péndulo con rotación en un eje específico
 */
export const pendulumAnimation: AnimationHandler = (target, config) => {
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
};

/**
 * Animación de rotación continua en un eje específico
 */
export const rotateAnimation: AnimationHandler = (target, config) => {
    const {
        axis: axisArr = [0, 1, 0],
        to = 360,
        duration = 5,
        ease = "none",
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

    const A = THREE.MathUtils.degToRad(to);
    const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });

    tl.to(proxy, {
        theta: A,
        duration,
        ease,
        onUpdate: applyRotation,
    });

    return tl;
};

/**
 * Animación de rotación directa usando las propiedades de rotación del objeto
 */
export const rotateToAnimation: AnimationHandler = (target, config) => {
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
};

/**
 * Metadatos de las animaciones por defecto
 */
export const defaultAnimationsMetadata: Record<string, AnimationMetadata> = {
    pendulum: {
        name: "pendulum",
        description: "Animación de péndulo con movimiento oscilatorio en un eje específico",
        defaultParams: {
            axis: [0, 1, 0],
            angle: 30,
            D_right: 0.8,
            D_left: 0.8,
            T_rest: 1.5,
            ease: "sine.inOut"
        },
        requiredParams: []
    },
    rotate: {
        name: "rotate",
        description: "Rotación continua usando quaterniones en un eje específico",
        defaultParams: {
            axis: [0, 1, 0],
            to: 360,
            duration: 5,
            ease: "none"
        },
        requiredParams: []
    },
    rotateTo: {
        name: "rotateTo",
        description: "Rotación directa usando las propiedades de rotación del objeto",
        defaultParams: {
            axis: [0, 1, 0],
            to: 360,
            duration: 5,
            ease: "none"
        },
        requiredParams: []
    }
};

/**
 * Mapa de todas las animaciones por defecto
 */
export const defaultAnimations: Record<string, AnimationHandler> = {
    pendulum: pendulumAnimation,
    rotate: rotateAnimation,
    rotateTo: rotateToAnimation
};