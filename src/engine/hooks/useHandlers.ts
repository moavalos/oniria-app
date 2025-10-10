import * as THREE from "three";
import { useCallback } from "react";

import { useEngineCore } from "@engine/core";
import type { AnimationAction, FunctionAction, ObjectEvent, ObjectEventArray } from "../config/room.type";
import type { EventArgs } from "../services";
import { Node } from "../entities/Node";

/**
 * Hook que proporciona handlers tipados para eventos del motor
 * 
 * @returns Objeto con métodos para manejar diferentes tipos de eventos
 * 
 * @example
 * const { handleObjectEvent } = useHandlers();
 * handleObjectEvent('click', objectId, eventData);
 */
export function useHandlers() {
    const services = useEngineCore();
    const animationService = services.getAnimationService();


    // Callbacks para eventos de interacción en Room
    const onObjectsEnter = useCallback((event: EventArgs<string, ObjectEventArray>) => {
        event.data.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((animation: AnimationAction) => {
                    if (animation.on === "hoverEnter") {
                        document.body.style.cursor = "grab";
                        animationService?.stop(animation.target);
                        animationService?.play(animation);
                    }
                });
            }
        });
    }, [animationService]);

    const onObjectsLeave = useCallback((event: EventArgs<string, ObjectEventArray>) => {
        event.data.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((action: AnimationAction) => {
                    if (action.on === "hoverLeave") {
                        document.body.style.cursor = "default";
                        animationService?.stop(action.target);
                        animationService?.play(action);
                    }
                });
            }
        });
    }, [animationService]);

    const onObjectsClick = useCallback((event: EventArgs<string, ObjectEventArray>) => {
        event.data.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((action: AnimationAction) => {
                    if (action.on === "click") {
                        document.body.style.cursor = "pointer";
                        animationService?.stop(action.target);
                        animationService?.play(action);
                        document.body.style.cursor = "default";
                    }
                });
            }

            if (element.type === "function") {
                element.action.forEach((action: FunctionAction) => {
                    if (action.on === "click") {
                        // Ejecutar función
                    }
                });
            }
        });
    }, [animationService]);

    const onNodeClick = useCallback((event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => {
        const group = event.target.getGroup();
        if (!group) {
            console.warn("No se pudo obtener el grupo del nodo");
            return;
        }

        // Buscar el material del nodo para animar el uniform
        const mesh = group.children[0]?.children[0] as THREE.Mesh;
        const material = mesh?.material as THREE.ShaderMaterial;

        if (!material || !material.uniforms?.uFresnelBrightWidth) {
            console.warn("No se pudo encontrar el material o el uniform uFresnelBrightWidth");
        }

        const currentScale = group.scale; // Asumir escala uniforme
        const originalFresnelWidth = material?.uniforms?.uFresnelBrightWidth?.value || 0.7;

        // Crear y ejecutar la animación: achicarse y volver con efecto elástico
        const timeline = animationService?.createCustomTimeline();
        timeline
            ?.to(group.scale, {
                x: currentScale.x * 0.95,
                y: currentScale.y * 0.95,
                z: currentScale.z * 0.95,
                duration: 0.1,
                ease: "power2.in"
            })
            .to(group.scale, {
                x: currentScale.x,
                y: currentScale.y,
                z: currentScale.z,
                duration: 0.6,
                ease: "elastic.out(1., 0.25)"
            }); // Secuencial: empieza cuando termina la anterior

        // Animar el uniform uFresnelBrightWidth en paralelo
        if (material?.uniforms?.uFresnelBrightWidth) {
            timeline
                ?.to(material.uniforms.uFresnelBrightWidth, {
                    value: 1.4,
                    duration: 0.1,
                    ease: "power2.in"
                }, "<") // Sincronizar con la compresión
                .to(material.uniforms.uFresnelBrightWidth, {
                    value: originalFresnelWidth,
                    duration: 0.7,
                    ease: "power2.out"
                }, "<0.1"); // Iniciar cuando termina la compresión
        }

        // Ejecutar la animación
        timeline?.play();
    }, [animationService]);

    /**
     * Handler para cuando el cursor entra en un nodo
     * @param _event - Evento con datos del nodo y posición
     */
    const onNodeEnter = useCallback((_event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => {
        console.log("Node entered:", _event.target.id);
    }, []);

    /**
     * Handler para cuando el cursor sale de un nodo
     * @param _event - Evento con datos del nodo y posición
     */
    const onNodeLeave = useCallback((_event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => {
        console.log("Node left:", _event.target.id);
    }, []);

    return { onObjectsEnter, onObjectsLeave, onObjectsClick, onNodeClick, onNodeEnter, onNodeLeave };
}
