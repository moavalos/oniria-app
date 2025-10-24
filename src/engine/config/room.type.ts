import * as THREE from "three";
/**
 * Tipos de configuración para salas y objetos del motor 3D.
 */

// Tipos de animación soportados
export type AnimationType = "pendulum" | "rotate" | "rotateTo" | string;

// Configuración de una Acción de animación
export interface AnimationAction {
    target: string; // nombre del objeto en el GLTF
    type: AnimationType;
    params: Record<string, any>;
    loop?: boolean;
    autoPlay?: boolean;
    on?: "hoverEnter" | "hoverLeave" | "click"; // evento que dispara la animación
}

export type FunctionAction = {
    on: "hoverEnter" | "hoverLeave" | "click";
    function: string; // nombre de la función a ejecutar
};

// Tipos de eventos que se pueden disparar
export type ObjectEvent =
    | { type: "animation"; action: AnimationAction[] }// dispara otra animación
    | { type: "function"; action: FunctionAction[] } // ejecuta callback registrada

export type ObjectEventArray = ObjectEvent[];

// Configuración de un objeto en la room
export interface RoomObjectConfig {
    color?: string;
    animation?: AnimationAction;
    interceptable?: boolean;
    event?: ObjectEvent;
    lookAtOffset?: [number, number, number]; // offset para la cámara al hacer lookAt
    resalted?: boolean; // si el objeto debe tener highlight al hacer hover
    colorResalted?: string; // color del highlight (hex string)
}

export type LookatableObject = {
    target: THREE.Vector3;
    position: THREE.Vector3;
}

// Configuración completa de una room
export interface RoomConfig {
    objects: Record<string, RoomObjectConfig>;
}