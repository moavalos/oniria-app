import * as THREE from "three";

import { Room } from "@engine/entities/Room";
import { Node } from "@engine/entities/Node";
import type { ObjectEventArray } from "@engine/config/room.type";

/**
 * Frame de interacción con información completa del estado actual
 */
export interface InteractionFrame {
    /** Coordenadas del pointer en espacio normalizado (-1 a 1) */
    pointer: THREE.Vector2;
    /** Todas las intersecciones detectadas por el raycaster */
    intersections: THREE.Intersection[];
    /** Objeto más cercano interceptado */
    hovered?: THREE.Object3D;
    /** Si está siendo clickeado (pointer down + hover) */
    clicked: boolean;
    /** Si el pointer está presionado */
    pointerDown: boolean;
    /** Si el pointer acaba de ser soltado */
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
    /** Distancia al centro del nodo en espacio de pantalla */
    distance: number;
    /** Si está dentro del radio de interacción */
    withinRadius: boolean;
    /** Punto de intersección en espacio 3D */
    intersectionPoint: THREE.Vector3 | null;
}

/**
 * Servicio puro de detección de interacciones mediante raycasting
 * 
 * Proporciona funcionalidad de raycasting para detectar interacciones del usuario
 * con objetos 3D. Implementa principios de programación funcional:
 * - Responsabilidad única: Solo detecta interacciones
 * - Sin efectos secundarios: No emite eventos ni ejecuta callbacks
 * - Funciones puras: Solo retorna información calculada
 * - Resultados inmutables: Devuelve copias de los datos
 */
export class InteractionService {
    private raycaster = new THREE.Raycaster();

    private pointer = new THREE.Vector2();

    private isDown = false;

    private isUp = false;

    private camera: THREE.Camera;

    private domElement: HTMLElement;

    /**
     * Crea una nueva instancia del servicio de interacciones
     * 
     * @param camera - Cámara para el raycasting
     * @param domElement - Elemento DOM para capturar eventos de pointer
     */
    constructor(camera: THREE.Camera, domElement: HTMLElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.addListeners();
    }

    /**
     * Agrega los listeners de eventos de pointer al elemento DOM
     */
    private addListeners(): void {
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

    /**
     * Maneja el movimiento del pointer y actualiza las coordenadas normalizadas
     * 
     * @param e - Evento de pointer
     */
    private onPointerMove(e: PointerEvent): void {
        const rect = this.domElement.getBoundingClientRect();
        this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    /**
     * Calcula y devuelve un snapshot con toda la información de interacción
     * 
     * @param interactables - Array de objetos 3D con los que se puede interactuar
     * @returns Frame completo con información de interacción
     */
    public compute(interactables: THREE.Object3D[]): InteractionFrame {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersections = this.raycaster.intersectObjects(interactables, true);
        const hovered = intersections[0]?.object;

        const frame: InteractionFrame = {
            pointer: this.pointer.clone(),
            intersections,
            hovered,
            clicked: this.isUp, // Un click es cuando se acaba de soltar el pointer
            pointerDown: this.isDown,
            pointerUp: this.isUp,
        };

        return frame;
    }

    /**
     * Análisis específico para interacciones con Room
     * 
     * @param room - Instancia de Room para analizar
     * @param interceptableObjects - Mapa de objetos interceptables y sus eventos
     * @returns Resultado de interacción específico para Room
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
     * 
     * @param node - Instancia de Node para analizar
     * @param radius - Radio de interacción en espacio de pantalla
     * @returns Resultado de interacción específico para Node
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
     * Devuelve un frame vacío para casos donde no hay datos disponibles
     * 
     * @returns Frame de interacción vacío
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

    /**
     * Resetea los flags one-shot al final del frame
     * 
     * Debe ser llamado por el sistema después de procesar todas las interacciones
     * para limpiar estados temporales como 'pointerUp'
     */
    public resetFrame(): void {
        this.isUp = false;
    }

    /**
     * Limpia recursos y remueve listeners de eventos
     */
    public dispose(): void {
        this.domElement.removeEventListener("pointermove", this.onPointerMove);
        this.domElement.removeEventListener("pointerdown", () => { });
        this.domElement.removeEventListener("pointerup", () => { });
    }
}