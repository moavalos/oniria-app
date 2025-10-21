import * as THREE from "three";

import { BaseSystem } from "@engine/core/src/BaseSystem";
import { InteractionService, type RoomInteractionResult, type NodeInteractionResult } from "@engine/services/InteractionService";
import { AnimationService } from "@engine/services/AnimationService";
import { NodeManager } from "@/engine/services/managers/NodeManager";

import type { ObjectEventArray, AnimationAction, FunctionAction, ObjectEvent } from "@engine/config/room.type";
import type { Injectable } from "@engine/core/src/Injectable";
import type { EngineCore } from "@engine/core/src/EngineCore";
import { HighlightService } from "@engine/services";
import type { Node, Room } from "../entities";

/**
 * Tipos para argumentos de eventos - compatibilidad con sistema anterior
 */
interface EventArgs<T = any, D = any> {
    target: T;
    data: D;
}

/**
 * Callbacks para interacciones con objetos de la sala
 */
export interface ObjectInteractionCallbacks {
    onHover?: (_args: EventArgs<string, ObjectEventArray>) => void;
    onHoverLeave?: (_args: EventArgs<string, ObjectEventArray>) => void;
    onClick?: (_args: EventArgs<string, ObjectEventArray>) => void;
}

/**
 * Callbacks para interacciones con nodos
 */
export interface NodeInteractionCallbacks {
    onHover?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
    onHoverLeave?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
    onClick?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
    onMove?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
}

/**
 * Callbacks para navegación
 */
export interface NavigationCallbacks {
    onNext?: () => void;
    onPrevious?: () => void;
}

/**
 * Configuración completa de callbacks de interacción
 */
export interface InteractionCallbacks {
    objects?: ObjectInteractionCallbacks;
    nodes?: NodeInteractionCallbacks;
    navigation?: NavigationCallbacks;
}

/**
 * Configuración del sistema de interacciones
 */
export interface InteractionConfig {
    enableInteractions?: boolean;
    interactionRadius?: number;
    raycastThreshold?: number;
    callbacks?: InteractionCallbacks;
}

// Alias para compatibilidad con componentes React
export type InteractionSystemProps = InteractionConfig;

/**
 * Sistema de interacciones que coordina las interacciones del usuario con objetos
 * y nodos en la escena 3D. Utiliza InteractionService para detectar interacciones
 * y emite eventos para que otros sistemas reaccionen apropiadamente.
 * 
 * Responsabilidades:
 * - Detectar interacciones con objetos de la sala y nodos
 * - Emitir eventos de interacción a través del núcleo del motor
 * - Coordinar animaciones de retroalimentación visual
 * - Gestionar callbacks de usuario configurables
 */
export class InteractionSystem extends BaseSystem implements Injectable {
    name = "InteractionSystem";

    private interactionService!: InteractionService;

    private animationService!: AnimationService;

    // Room actual y configuración
    private _currentRoom: Room | null = null;

    private _interceptableObjects: Record<string, ObjectEventArray> = {};

    private _currentNode: Node | null = null;

    // Configuración del sistema
    private _enableInteractions: boolean = true;

    private _interactionRadius: number = 1.0;

    private _userCallbacks: InteractionCallbacks = {};

    // Highlight overlay service
    private highlightService!: HighlightService;

    // Estado anterior para detectar cambios
    private _previousRoomState: {
        hoveredObjects: Set<string>;
    } = {
            hoveredObjects: new Set()
        };

    private _previousNodeState: {
        hoveredNode: Node | null;
        isWithinRadius: boolean;
    } = {
            hoveredNode: null,
            isWithinRadius: false
        };

    constructor(config: InteractionConfig = {}) {
        super();

        // Aplicar configuración
        this._enableInteractions = config.enableInteractions ?? true;
        this._interactionRadius = config.interactionRadius ?? 1.0;
        this._userCallbacks = config.callbacks ?? {};
    }

    async init(core: EngineCore): Promise<void> {
        // Asignar referencia al core
        this.core = core;

        // Obtener servicios del core
        this.animationService = core.getService(AnimationService);

        if (!this.animationService) {
            console.error("[InteractionSystem] AnimationService no disponible");
            return;
        }

        this.interactionService = this.core.getService(InteractionService);
        this.highlightService = this.core.getService(HighlightService);

        // Suscribirse a eventos del core para cambios de room y node
        this.subscribeToEvents();

        // Cargar estado inicial si existe
        const initialRoom = core.getCurrentRoom();
        if (initialRoom) {
            this._currentRoom = initialRoom;
            await this.loadInterceptablesFromRoom(initialRoom);
        }

        // Obtener nodo actual si existe
        const nodeManager = core.getService(NodeManager);
        if (nodeManager) {
            this._currentNode = nodeManager.getCurrentNode();
            if (!this._currentNode) {
                this.core.on("node:ready", () => {
                    this._currentNode = nodeManager.getCurrentNode();
                });
            }
        }

        console.log("[InteractionSystem]: Sistema inicializado correctamente");
    }

    update(deltaTime: number): void {
        if (!this._enableInteractions || !this.interactionService) return;

        // Usar deltaTime para evitar warning de lint
        void deltaTime;

        // Actualizar interacciones con Room
        this.updateRoomInteractions();

        // Actualizar interacciones con Nodo
        this.updateNodeInteractions();

        // Resetear flags one-shot al final del frame
        this.interactionService.resetFrame();

        // Actualizar efecto highlight (animación de tiempo del shader)
        if (this.highlightService) {
            this.highlightService.update(deltaTime);
        }
    }

    /**
     * Actualiza las interacciones con objetos de la Room
     */
    private updateRoomInteractions(): void {
        if (!this._currentRoom || Object.keys(this._interceptableObjects).length === 0) {
            return;
        }

        // Obtener estado actual desde el InteractionService
        const roomResult = this.interactionService.computeRoomInteraction(
            this._currentRoom,
            this._interceptableObjects
        );

        // Procesar cambios de estado
        this.processRoomStateChanges(roomResult);
    }

    /**
     * Actualiza las interacciones con Nodo
     */
    private updateNodeInteractions(): void {

        if (!this._currentNode) return;


        // Obtener estado actual desde el InteractionService
        const nodeResult = this.interactionService.computeNodeInteraction(
            this._currentNode,
            this._interactionRadius
        );

        // Procesar cambios de estado
        this.processNodeStateChanges(nodeResult);
    }

    /**
     * Procesa cambios en el estado de Room y emite eventos
     */
    private processRoomStateChanges(result: RoomInteractionResult): void {
        // Sólo considerar el primer interceptable (más cercano)
        const first = result.interceptedObjects[0];
        const currentHovered = new Set<string>(first ? [first] : []);
        const previousHovered = this._previousRoomState.hoveredObjects;

        // Detectar objetos que salieron del hover
        for (const objectName of previousHovered) {
            if (!currentHovered.has(objectName)) {
                this.emitObjectLeave(objectName, this._interceptableObjects[objectName]);
            }
        }

        // Detectar objetos que entraron al hover
        if (first && !previousHovered.has(first)) {
            this.emitObjectEnter(first, this._interceptableObjects[first]);
        }

        // Detectar clicks en objetos
        if (result.clicked && first) {
            this.emitObjectClick(first, this._interceptableObjects[first]);
        }

        // Actualizar estado anterior
        this._previousRoomState.hoveredObjects = currentHovered;
    }

    /**
     * Procesa cambios en el estado de Nodo y emite eventos
     */
    private processNodeStateChanges(result: NodeInteractionResult): void {
        const currentWithinRadius = result.withinRadius;
        const currentNode = result.withinRadius ? this._currentNode : null;
        const previousWithinRadius = this._previousNodeState.isWithinRadius;
        const previousNode = this._previousNodeState.hoveredNode;

        // Detectar entrada al radio del nodo
        if (currentWithinRadius && !previousWithinRadius && currentNode) {
            this.emitNodeEnter(currentNode, result.distance, result.intersectionPoint || new THREE.Vector3());
        }

        // Detectar salida del radio del nodo
        if (!currentWithinRadius && previousWithinRadius && previousNode) {
            this.emitNodeLeave(previousNode, result.distance, result.intersectionPoint || new THREE.Vector3());
        }

        // Detectar click en nodo
        if (result.clicked && result.withinRadius && currentNode) {
            this.emitNodeClick(currentNode, result.distance, result.intersectionPoint || new THREE.Vector3());
        }

        // Emitir movimiento si sigue dentro del radio
        if (currentWithinRadius && previousWithinRadius && currentNode) {
            this.emitNodeMove(currentNode, result.distance, result.intersectionPoint || new THREE.Vector3());
        }

        // Actualizar estado anterior
        this._previousNodeState.isWithinRadius = currentWithinRadius;
        this._previousNodeState.hoveredNode = currentNode;
    }

    // === EVENTOS EMITIDOS AL CORE === //

    /**
     * Emite evento de entrada a objeto
     */
    private emitObjectEnter(objectName: string, events: ObjectEventArray): void {
        const eventArgs: EventArgs<string, ObjectEventArray> = {
            target: objectName,
            data: events
        };

        // Emitir al core para que otros sistemas escuchen
        this.core.emit('object:Enter', eventArgs);
        document.body.style.cursor = "pointer";

        // Ejecutar lógica interna (animaciones directas por compatibilidad)
        this.handleObjectEnterInternal(eventArgs);

        // Activar highlight shader overlay en el objeto hovered
        if (this._currentRoom) {
            const obj = this._currentRoom.getObjectByName(objectName);
            if (obj) {
                // Sólo aplicable a Mesh
                if ((obj as any).isMesh) {
                    this.highlightService?.add(obj as unknown as THREE.Mesh);
                } else {
                    // Si el interceptable apunta a un Group, buscar primer Mesh hijo
                    let meshChild: THREE.Mesh | null = null;
                    obj.traverse((child) => {
                        if (!meshChild && (child as any).isMesh) meshChild = child as THREE.Mesh;
                    });
                    if (meshChild) this.highlightService?.add(meshChild);
                }
            }
        }

        // Ejecutar callback del usuario si existe
        this._userCallbacks.objects?.onHover?.(eventArgs);
    }

    /**
     * Emite evento de salida de objeto
     */
    private emitObjectLeave(objectName: string, events: ObjectEventArray): void {
        const eventArgs: EventArgs<string, ObjectEventArray> = {
            target: objectName,
            data: events
        };

        this.core.emit('object:Leave', eventArgs);
        document.body.style.cursor = "default";
        this.handleObjectLeaveInternal(eventArgs);

        // Desactivar highlight shader overlay del objeto
        if (this._currentRoom) {
            const obj = this._currentRoom.getObjectByName(objectName);
            if (obj) {
                if ((obj as any).isMesh) {
                    this.highlightService?.remove(obj as unknown as THREE.Mesh);
                } else {
                    let meshChild: THREE.Mesh | null = null;
                    obj.traverse((child) => {
                        if (!meshChild && (child as any).isMesh) meshChild = child as THREE.Mesh;
                    });
                    if (meshChild) this.highlightService?.remove(meshChild);
                }
            }
        }
        this._userCallbacks.objects?.onHoverLeave?.(eventArgs);
    }

    /**
     * Emite evento de click en objeto
     */
    private emitObjectClick(objectName: string, events: ObjectEventArray): void {
        const eventArgs: EventArgs<string, ObjectEventArray> = {
            target: objectName,
            data: events
        };

        this.core.emit('object:Click', eventArgs);
        this.handleObjectClickInternal(eventArgs);
        this._userCallbacks.objects?.onClick?.(eventArgs);
    }

    /**
     * Emite evento de entrada a nodo
     */
    private emitNodeEnter(node: Node, distance: number, position: THREE.Vector3): void {
        const eventArgs: EventArgs<Node, { distance: number; position: THREE.Vector3 }> = {
            target: node,
            data: { distance, position }
        };

        this.core.emit('nodeEnter', eventArgs);
        this._userCallbacks.nodes?.onHover?.(eventArgs);
    }

    /**
     * Emite evento de salida de nodo
     */
    private emitNodeLeave(node: Node, distance: number, position: THREE.Vector3): void {
        const eventArgs: EventArgs<Node, { distance: number; position: THREE.Vector3 }> = {
            target: node,
            data: { distance, position }
        };

        this.core.emit('nodeLeave', eventArgs);
        this._userCallbacks.nodes?.onHoverLeave?.(eventArgs);
    }

    /**
     * Emite evento de click en nodo
     */
    private emitNodeClick(node: Node, distance: number, position: THREE.Vector3): void {
        // Click en nodo detectado - ejecutar callback si existe

        const eventArgs: EventArgs<Node, { distance: number; position: THREE.Vector3 }> = {
            target: node,
            data: { distance, position }
        };

        this.core.emit('nodeClick', eventArgs);

        // Lógica interna específica para nodos (ping)
        const nodeManager = this.core.getService(NodeManager);
        if (nodeManager) {
            // Ejecutar ping en el nodo
            (nodeManager as NodeManager).ping();
        } else {
            console.warn("[InteractionSystem] NodeManager no disponible en el core");
        }

        this._userCallbacks.nodes?.onClick?.(eventArgs);
    }

    /**
     * Emite evento de movimiento en nodo
     */
    private emitNodeMove(node: Node, distance: number, position: THREE.Vector3): void {
        const eventArgs: EventArgs<Node, { distance: number; position: THREE.Vector3 }> = {
            target: node,
            data: { distance, position }
        };

        this.core.emit('nodeMove', eventArgs);
        this._userCallbacks.nodes?.onMove?.(eventArgs);
    }

    // === HANDLERS INTERNOS PARA COMPATIBILIDAD === //

    /**
     * Maneja lógica interna de entrada a objeto (animaciones directas)
     */
    private handleObjectEnterInternal(event: EventArgs<string, ObjectEventArray>): void {
        event.data.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((animation: AnimationAction) => {
                    if (animation.on === "hoverEnter") {
                        document.body.style.cursor = "grab";
                        this.animationService?.stop(animation.target);
                        this.animationService?.play(animation);
                    }
                });
            }
        });
    }

    /**
     * Maneja lógica interna de salida de objeto (animaciones directas)
     */
    private handleObjectLeaveInternal(event: EventArgs<string, ObjectEventArray>): void {
        event.data.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((action: AnimationAction) => {
                    if (action.on === "hoverLeave") {
                        document.body.style.cursor = "default";
                        this.animationService?.stop(action.target);
                        this.animationService?.play(action);
                    }
                });
            }
        });
    }

    /**
     * Maneja lógica interna de click en objeto (animaciones directas)
     */
    private handleObjectClickInternal(event: EventArgs<string, ObjectEventArray>): void {
        event.data.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((action: AnimationAction) => {
                    if (action.on === "click") {
                        document.body.style.cursor = "pointer";
                        this.animationService?.stop(action.target);
                        this.animationService?.play(action);
                        document.body.style.cursor = "default";
                    }
                });
            }

            if (element.type === "function") {
                element.action.forEach((action: FunctionAction) => {
                    if (action.on === "click") {
                        // TODO: Ejecutar función personalizada
                    }
                });
            }
        });
    }

    // === GESTIÓN DE EVENTOS DEL CORE === //

    /**
     * Suscribe a eventos del core para cambios de room y node
     */
    private subscribeToEvents(): void {
        if (!this.core) return;

        // Eventos de room
        this.core.on('room:change', this.onRoomChange.bind(this));
        this.core.on('room:ready', this.onRoomReady.bind(this));

        // Eventos de node
        this.core.on('node:change', this.onNodeChange.bind(this));
    }

    /**
     * Desuscribe de eventos del core
     */
    private unsubscribeFromEvents(): void {
        if (!this.core) return;

        this.core.off('room:change');
        this.core.off('room:ready');
        this.core.off('node:change');
    }

    /**
     * Maneja el cambio de room
     */
    private onRoomChange(newRoom: Room): void {
        // Limpiar estado anterior
        this._currentRoom = newRoom;
        this._interceptableObjects = {};
        this._previousRoomState.hoveredObjects.clear();
    }

    /**
     * Maneja cuando la room está lista
     */
    private onRoomReady(room: Room): void {
        this._currentRoom = room;
        this.loadInterceptablesFromRoom(room);
    }

    /**
     * Maneja el cambio de nodo
     */
    private onNodeChange(newNode: Node): void {
        // Limpiar estado anterior
        this._currentNode = newNode;
        this._previousNodeState.hoveredNode = null;
        this._previousNodeState.isWithinRadius = false;
    }

    /**
     * Carga objetos interceptables desde la room
     */
    private async loadInterceptablesFromRoom(room: Room): Promise<void> {
        try {
            const interceptables = await room.getInteractableObjects();
            this._interceptableObjects = interceptables;
        } catch (error) {
            console.error("[InteractionSystem] Error cargando interceptables:", error);
            this._interceptableObjects = {};
        }
    }

    // === API PÚBLICA === //

    /**
     * Actualiza los callbacks del usuario
     */
    setCallbacks(callbacks: InteractionCallbacks): void {
        this._userCallbacks = { ...this._userCallbacks, ...callbacks };
    }

    /**
     * Habilita o deshabilita las interacciones
     */
    setInteractionsEnabled(enabled: boolean): void {
        this._enableInteractions = enabled;
    }

    /**
     * Establece el radio de interacción para nodos
     */
    setInteractionRadius(radius: number): void {
        this._interactionRadius = radius;
    }

    /**
     * Obtiene el estado de las interacciones
     */
    isInteractionsEnabled(): boolean {
        return this._enableInteractions;
    }

    /**
     * Obtiene los callbacks actuales
     */
    public getCallbacks(): InteractionCallbacks {
        return { ...this._userCallbacks };
    }

    /**
     * Obtiene los objetos interceptables cargados actualmente
     */
    public getInterceptableObjects(): Record<string, ObjectEventArray> {
        return { ...this._interceptableObjects };
    }

    /**
     * Obtiene el radio de interacción actual
     */
    public getInteractionRadius(): number {
        return this._interactionRadius;
    }

    dispose(): void {
        // Limpiar InteractionService
        if (this.interactionService) {
            this.interactionService.dispose();
        }

        // Desuscribirse de eventos del core
        this.unsubscribeFromEvents();

        // Limpiar estado interno
        this._interceptableObjects = {};
        this._currentRoom = null;
        this._currentNode = null;
        this._userCallbacks = {};
        this._previousRoomState.hoveredObjects.clear();
        this._previousNodeState.hoveredNode = null;
        this._previousNodeState.isWithinRadius = false;

        console.log("[InteractionSystem]: Recursos liberados");
    }

    // === NAVEGACIÓN === //

    /**
     * Handler para navegación al siguiente nodo
     */
    public handleNextNode(): void {
        this.core.emit('navigation:next', {});
        this._userCallbacks.navigation?.onNext?.();
    }

    /**
     * Handler para navegación al nodo anterior
     */
    public handlePreviousNode(): void {
        this.core.emit('navigation:previous', {});
        this._userCallbacks.navigation?.onPrevious?.();
    }
}