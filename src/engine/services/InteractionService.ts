import * as THREE from "three";
import { Room } from "@engine/entities/Room";
import { Node } from "@engine/entities/Node";
import type { ObjectEventArray } from "../config/room.type";

/**
 * Frame de interacción con información completa
 */
export interface InteractionFrame {
    /** Coordenadas del pointer */
    pointer: THREE.Vector2;
    /** Todas las intersecciones detectadas */
    intersections: THREE.Intersection[];
    /** Objeto más cercano interceptado */
    hovered?: THREE.Object3D;
    /** Si está siendo clickeado (pointer down + hover) */
    clicked: boolean;
    /** Si el pointer está presionado */
    pointerDown: boolean;
    /** Si el pointer acaba de ser presionado */
    pointerUp: boolean;
}

/**
 * Resultado específico para interacciones con Room
 */
export interface RoomInteractionResult extends InteractionFrame {
    /** Objetos interceptables detectados por nombre */
    interceptedObjects: string[];
    /** Datos de eventos para cada objeto interceptado */
    objectEvents: Record<string, ObjectEventArray>;
}

/**
 * Resultado específico para interacciones con Node
 */
export interface NodeInteractionResult extends InteractionFrame {
    /** Si hay intersección con el nodo */
    hasIntersection: boolean;
    /** Distancia al centro del nodo */
    distance: number;
    /** Si está dentro del radio de interacción */
    withinRadius: boolean;
    /** Punto de intersección */
    intersectionPoint: THREE.Vector3 | null;
}

/**
 * Servicio puro de detección de interacciones mediante raycasting.
 * 
 * Principios aplicados:
 * - Single Responsibility: Solo detecta interacciones
 * - No side effects: No emite eventos ni ejecuta callbacks
 * - Pure functions: Solo retorna información
 * - Immutable results: Devuelve resultados inmutables
 */
export class InteractionService {
    private raycaster = new THREE.Raycaster();

    private pointer = new THREE.Vector2();

    private isDown = false;

    private isUp = false;

    private camera: THREE.Camera;

    private domElement: HTMLElement;

    constructor(camera: THREE.Camera, domElement: HTMLElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.addListeners();
    }

    private addListeners() {
        this.domElement.addEventListener("pointermove", e => this.onPointerMove(e));
        this.domElement.addEventListener("pointerdown", () => {
            this.isDown = true;
            this.isUp = false;
        });
        this.domElement.addEventListener("pointerup", () => {
            this.isDown = false;
            this.isUp = true;
        });
    }

    private onPointerMove(e: PointerEvent) {
        const rect = this.domElement.getBoundingClientRect();
        this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    /**
     * Devuelve un snapshot con toda la información relevante de interacción
     */
    public compute(interactables: THREE.Object3D[]): InteractionFrame {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersections = this.raycaster.intersectObjects(interactables, true);
        const hovered = intersections[0]?.object;

        const frame: InteractionFrame = {
            pointer: this.pointer.clone(),
            intersections,
            hovered,
            clicked: this.isDown && this.isUp,
            pointerDown: this.isDown,
            pointerUp: this.isUp,
        };

        // limpiar flags one-shot
        this.isUp = false;

        return frame;
    }

    /**
     * Análisis específico para interacciones con Room
     */
    public computeRoomInteraction(
        room: Room,
        interceptableObjects: Record<string, ObjectEventArray>
    ): RoomInteractionResult {
        // Buscar objetos interceptables en la room
        const roomScene = room.get_Scene();
        if (!roomScene) {
            return {
                ...this.getEmptyFrame(),
                interceptedObjects: [],
                objectEvents: {}
            };
        }

        const roomObjects = Object.keys(interceptableObjects).map(name =>
            roomScene.getObjectByName(name)
        ).filter(Boolean) as THREE.Object3D[];

        const frame = this.compute(roomObjects);
        const interceptedObjects: string[] = [];
        const objectEvents: Record<string, ObjectEventArray> = {};

        // Identificar objetos interceptados
        frame.intersections.forEach(intersection => {
            const objectName = intersection.object.name;
            if (interceptableObjects[objectName]) {
                interceptedObjects.push(objectName);
                objectEvents[objectName] = interceptableObjects[objectName];
            }
        });

        return {
            ...frame,
            interceptedObjects,
            objectEvents
        };
    }

    /**
     * Análisis específico para interacciones con Node
     */
    public computeNodeInteraction(node: Node, radius: number): NodeInteractionResult {
        // Obtener el grupo del nodo
        const nodeGroup = node.getGroup();
        if (!nodeGroup) {
            return {
                ...this.getEmptyFrame(),
                hasIntersection: false,
                distance: Infinity,
                withinRadius: false,
                intersectionPoint: null
            };
        }

        const frame = this.compute([nodeGroup]);



        // Calcular distancia real al centro del nodo
        const nodePosition = new THREE.Vector3();
        nodeGroup.getWorldPosition(nodePosition);

        // Proyectar la posición del nodo a screen space para calcular distancia 2D
        const projectedPosition = nodePosition.clone().project(this.camera);
        const screenDistance = this.pointer.distanceTo(new THREE.Vector2(projectedPosition.x, projectedPosition.y));

        const withinRadius = screenDistance <= radius;
        const hasIntersection = frame.intersections.length > 0;
        const intersectionPoint = frame.intersections[0]?.point || null;

        return {
            ...frame,
            hasIntersection,
            distance: screenDistance,
            withinRadius,
            intersectionPoint: intersectionPoint ? intersectionPoint.clone() : null
        };
    }

    /**
     * Devuelve un frame vacío para casos donde no hay datos
     */
    private getEmptyFrame(): InteractionFrame {
        return {
            pointer: this.pointer.clone(),
            intersections: [],
            hovered: undefined,
            clicked: false,
            pointerDown: this.isDown,
            pointerUp: this.isUp,
        };
    }

    public dispose() {
        this.domElement.removeEventListener("pointermove", this.onPointerMove);
        this.domElement.removeEventListener("pointerdown", () => { });
        this.domElement.removeEventListener("pointerup", () => { });
    }
}