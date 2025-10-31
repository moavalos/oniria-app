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
 * Animación rest para el nodo - regresa suavemente a su posición original guardada
 */
export const nodeRestAnimation: AnimationHandler = (target, config) => {
    const {
        duration = 1.2,
        ease = "power2.out"
    } = config.params;

    const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });

    // Usar la posición original guardada si existe, sino usar x: 0 como fallback
    const originalPosition = (target as any).originalPosition;
    const targetX = originalPosition ? originalPosition.x : 0;

    // Animar desde la posición actual hacia la posición original guardada
    tl.to(target.position, {
        x: targetX,
        duration,
        ease,
    });

    return tl;
};

/**
 * Animación next para el nodo - transición al siguiente
 */
export const nodeNextAnimation: AnimationHandler = (target, config) => {
    const {
        offsetX = 0.3,
        duration = 1.0,
        ease = "power2.out"
    } = config.params;

    const currentX = target.position.x;
    const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });

    tl.to(target.position, {
        x: currentX + offsetX,
        duration,
        ease,
    });

    return tl;
};

/**
 * Animación prev para el nodo - transición al anterior
 */
export const nodePrevAnimation: AnimationHandler = (target, config) => {
    const {
        offsetX = -0.3,
        duration = 1.0,
        ease = "power2.out"
    } = config.params;

    const currentX = target.position.x;
    const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });

    tl.to(target.position, {
        x: currentX + offsetX,
        duration,
        ease,
    });

    return tl;
};

/**
 * Animación ping para el nodo - efecto visual de click con escala y fresnel
 */
export const nodePingAnimation: AnimationHandler = (target, config) => {
    const {
        scaleFactor = 0.95,
        scaleDownDuration = 0.1,
        scaleUpDuration = 0.6,
        fresnelBright = 1.4,
        fresnelDuration = 0.7,
        ease = "elastic.out(1., 0.25)"
    } = config.params;

    const currentScale = target.scale;
    const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });

    // Buscar el material del nodo para animar el uniform
    const mesh = target.children[0]?.children[0] as THREE.Mesh;
    const material = mesh?.material as THREE.ShaderMaterial;
    const originalFresnelWidth = material?.uniforms?.uFresnelBrightWidth?.value || 0.7;

    // Animación de escala: achicarse y volver con efecto elástico
    tl.to(target.scale, {
        x: currentScale.x * scaleFactor,
        y: currentScale.y * scaleFactor,
        z: currentScale.z * scaleFactor,
        duration: scaleDownDuration,
        ease: "power2.in"
    })
        .to(target.scale, {
            x: currentScale.x,
            y: currentScale.y,
            z: currentScale.z,
            duration: scaleUpDuration,
            ease: ease
        });

    // Animar el uniform uFresnelBrightWidth en paralelo si existe
    if (material?.uniforms?.uFresnelBrightWidth) {
        tl.to(material.uniforms.uFresnelBrightWidth, {
            value: fresnelBright,
            duration: scaleDownDuration,
            ease: "power2.in"
        }, "<")
            .to(material.uniforms.uFresnelBrightWidth, {
                value: originalFresnelWidth,
                duration: fresnelDuration,
                ease: "power2.out"
            }, "<0.1");
    }

    return tl;
};

/**
 * Animación para mostrar modal con escala y fade in
 */
export const modalShowAnimation: AnimationHandler = (target, config) => {
    const { duration = 0.3, ease = "power2.out" } = config.params;

    const tl = gsap.timeline();

    tl.to(target, {
        scale: 1,
        duration,
        ease,
        transformOrigin: "left center"
    });

    return tl;
};

/**
 * Animación para ocultar modal con escala hacia centro-izquierdo
 */
export const modalHideAnimation: AnimationHandler = (target, config) => {
    const { duration = 0.25, ease = "power2.in" } = config.params;

    const tl = gsap.timeline();

    tl.to(target, {
        scale: 0,
        duration,
        ease,
        transformOrigin: "left center"
    });

    return tl;
};

/**
 * Animación de entrada para elementos del modal (fade + slide)
 */
export const modalElementEnterAnimation: AnimationHandler = (target, config) => {
    const {
        duration = 0.2,
        ease = "power2.out"
    } = config.params;

    const tl = gsap.timeline();

    tl.to(target, {
        opacity: 1,
        y: 0,
        duration,
        ease
    });

    return tl;
};

/**
 * Animación idle para el nodo - movimiento sutil hacia la izquierda y se queda ahí
 */
export const nodeIdleAnimation: AnimationHandler = (target, config) => {
    const {
        offsetX = -0.5, // Movimiento más pronunciado hacia la izquierda
        duration = 1.2,
        ease = "power2.out"
    } = config.params;

    // Guardar la posición original antes de mover (para que rest pueda usarla)
    if (!(target as any).originalPosition) {
        (target as any).originalPosition = {
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
        };
    }

    const originalX = target.position.x;
    const tl = gsap.timeline({ repeat: config.loop ? -1 : 0 });

    // Solo moverse hacia la izquierda y quedarse ahí
    tl.to(target.position, {
        x: originalX + offsetX,
        duration,
        ease,
    });

    return tl;
};

/**
 * Metadatos de las animaciones por defecto
 */
export const defaultAnimationsMetadata: Record<string, AnimationMetadata> = {
    pendulum: {
        name: "pendulum",
        description: "Animación de péndulo con rotación en un eje específico",
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
        description: "Animación de rotación continua en un eje específico",
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
    },
    modalShow: {
        name: "modalShow",
        description: "Animación para mostrar modal con escala desde centro-izquierdo",
        defaultParams: {
            duration: 0.3,
            ease: "power2.out"
        },
        requiredParams: []
    },
    modalHide: {
        name: "modalHide",
        description: "Animación para ocultar modal con escala hacia centro-izquierdo",
        defaultParams: {
            duration: 0.25,
            ease: "power2.in"
        },
        requiredParams: []
    },
    modalElementEnter: {
        name: "modalElementEnter",
        description: "Animación de entrada para elementos del modal (fade + slide)",
        defaultParams: {
            duration: 0.2,
            ease: "power2.out"
        },
        requiredParams: []
    },
    nodeIdle: {
        name: "nodeIdle",
        description: "Animación idle para el nodo - movimiento sutil hacia la izquierda",
        defaultParams: {
            offsetX: -0.2,
            duration: 1.5,
            ease: "power2.inOut"
        },
        requiredParams: []
    },
    nodeRest: {
        name: "nodeRest",
        description: "Animación rest para el nodo - regresa a su posición original",
        defaultParams: {
            duration: 1.5,
            ease: "power2.inOut"
        },
        requiredParams: []
    },
    nodeNext: {
        name: "nodeNext",
        description: "Animación next para el nodo - transición al siguiente",
        defaultParams: {
            offsetX: 0.3,
            duration: 1.0,
            ease: "power2.out"
        },
        requiredParams: []
    },
    nodePrev: {
        name: "nodePrev",
        description: "Animación prev para el nodo - transición al anterior",
        defaultParams: {
            offsetX: -0.3,
            duration: 1.0,
            ease: "power2.out"
        },
        requiredParams: []
    },
    nodePing: {
        name: "nodePing",
        description: "Animación ping para el nodo - efecto visual de click con escala y fresnel",
        defaultParams: {
            scaleFactor: 0.95,
            scaleDownDuration: 0.1,
            scaleUpDuration: 0.6,
            fresnelBright: 1.4,
            fresnelDuration: 0.7,
            ease: "elastic.out(1., 0.25)"
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
    rotateTo: rotateToAnimation,
    modalShow: modalShowAnimation,
    modalHide: modalHideAnimation,
    modalElementEnter: modalElementEnterAnimation,
    nodeIdle: nodeIdleAnimation,
    nodeRest: nodeRestAnimation,
    nodeNext: nodeNextAnimation,
    nodePrev: nodePrevAnimation,
    nodePing: nodePingAnimation
};
