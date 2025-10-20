import type { ObjectEventArray, AnimationAction, FunctionAction, ObjectEvent } from "@engine/config/room.type";
import { BaseSystem } from "@engine/core/src/BaseSystem";
import type { Injectable } from "@engine/core/src/Injectable";
import type { EngineCore } from "@engine/core/src/EngineCore.class";
import { InteractionService } from "@/engine/services/InteractionService.old";
import { AnimationService } from "@engine/services/AnimationService";
import { NodeManager } from "@engine/services/room/NodeManager";
import { Node } from "@engine/entities/Node";
import * as THREE from "three";
import type { Room } from "../entities";

// Tipos para EventArgs
interface EventArgs<T = any, D = any> {
  target: T;
  data: D;
}

// Interfaces para callbacks organizados por categoría  
export interface ObjectInteractionCallbacks {
  onHover?: (_args: EventArgs<string, ObjectEventArray>) => void;
  onHoverLeave?: (_args: EventArgs<string, ObjectEventArray>) => void;
  onClick?: (_args: EventArgs<string, ObjectEventArray>) => void;
}

export interface NodeInteractionCallbacks {
  onHover?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
  onHoverLeave?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
  onClick?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
  onMove?: (_args: EventArgs<Node, { distance: number; position: THREE.Vector3 }>) => void;
}

export interface NavigationCallbacks {
  onNext?: () => void;
  onPrevious?: () => void;
}

export interface InteractionCallbacks {
  objects?: ObjectInteractionCallbacks;
  nodes?: NodeInteractionCallbacks;
  navigation?: NavigationCallbacks;
}

export interface InteractionConfig {
  enableInteractions?: boolean;
  interactionRadius?: number;
  raycastThreshold?: number;
  callbacks?: InteractionCallbacks;
}

// Alias para compatibilidad con componentes React
export type InteractionSystemProps = InteractionConfig;

/**
 * Sistema de interacciones que extiende BaseSystem.
 * Contiene toda la lógica de handlers y permite inyección de callbacks limpia.
 */
export class InteractionSystem extends BaseSystem implements Injectable {
  name = "InteractionSystem";

  private interactionService!: InteractionService;

  private animationService!: AnimationService;

  private _interceptableObjects: Record<string, any> = {};

  // Estado para controlar navegación
  private _isNavigationAnimating: boolean = false;

  // Room actual (se actualiza mediante eventos)
  private _currentRoom: Room | null = null;

  // Callbacks del usuario
  private _userCallbacks: InteractionCallbacks = {};

  // Configuración
  private _enableInteractions: boolean = true;

  private _interactionRadius: number = 1.0;

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
    this.interactionService = core.getService(InteractionService);
    this.animationService = core.getService(AnimationService);

    if (!this.interactionService) {
      console.error("[InteractionSystem] InteractionService no disponible");
      return;
    }

    if (!this.animationService) {
      console.error("[InteractionSystem] AnimationService no disponible");
      return;
    }

    // Suscribirse a eventos del core para cambios de room
    this.subscribeToRoomEvents();

    // Configurar handlers internos del sistema
    this.setupInternalHandlers();

    // Cargar interceptables de la room inicial si existe
    const initialRoom = this.core.getCurrentRoom();
    if (initialRoom) {
      this._currentRoom = initialRoom;
      await this.loadInterceptablesFromRoom(initialRoom);
    }

    console.log("[InteractionSystem] ✅ Sistema inicializado");
  }

  update(deltaTime: number): void {
    if (!this._enableInteractions || !this.interactionService) return;

    // Usar deltaTime para evitar warning de lint
    void deltaTime;

    // Solo ejecutar raycast si tenemos room y objetos interceptables
    if (this._currentRoom && Object.keys(this._interceptableObjects).length > 0) {
      // Actualizar el InteractionService con raycast en cada frame
      this.interactionService.update(this._currentRoom, {
        interceptableObjects: this._interceptableObjects
      });
    }
  }

  /**
   * Suscribe a los eventos de cambio de room del core
   */
  private subscribeToRoomEvents(): void {
    if (!this.core) return;

    // Suscribirse a cambios de room
    this.core.on('room:change', this.onRoomChange.bind(this));
    this.core.on('room:ready', this.onRoomReady.bind(this));
  }

  /**
   * Desuscribe de los eventos de room del core
   */
  private unsubscribeFromRoomEvents(): void {
    if (!this.core) return;

    this.core.off('room:change');
    this.core.off('room:ready');
  }

  /**
   * Maneja el evento de cambio de room
   */
  private onRoomChange(newRoom: Room): void {
    // Actualizar referencia a la room actual
    this._currentRoom = newRoom;

    // Limpiar interceptables de la room anterior
    this._interceptableObjects = {};
  }

  /**
   * Maneja el evento de room lista
   */
  private onRoomReady(room: Room): void {
    // Actualizar referencia a la room actual
    this._currentRoom = room;

    // Cargar interceptables de la nueva room
    this.loadInterceptablesFromRoom(room);
  }

  /**
   * Carga los objetos interceptables desde la room activa
   */
  private async loadInterceptablesFromRoom(room: Room): Promise<void> {
    try {
      // Obtener objetos interceptables de la room
      const interceptables = await room.getInteractableObjects();

      // Actualizar estado interno
      this._interceptableObjects = interceptables;

      // Configurar interceptables usando el método update del InteractionService
      this.interactionService.update(room, { interceptableObjects: interceptables });

    } catch (error) {
      console.error("[InteractionSystem] Error cargando interceptables:", error);
      // En caso de error, limpiar estado
      this._interceptableObjects = {};
    }
  }

  dispose(): void {
    // Limpiar callbacks directos
    if (this.interactionService) {
      this.interactionService.setOnObjectEnter(undefined);
      this.interactionService.setOnObjectLeave(undefined);
      this.interactionService.setOnObjectClick(undefined);
      this.interactionService.setOnNodeEnter(undefined);
      this.interactionService.setOnNodeLeave(undefined);
      this.interactionService.setOnNodeClick(undefined);

      // Desuscribirse de eventos del EventEmitter
      this.unsubscribeFromInteractionEvents();
    }

    // Desuscribirse de eventos de room del core
    this.unsubscribeFromRoomEvents();

    // Limpiar estado interno
    this._interceptableObjects = {};
    this._currentRoom = null;
    this._userCallbacks = {};

    console.log("[InteractionSystem] ✅ Disposed");
  }

  /**
   * Desuscribe el sistema de los eventos del InteractionService
   */
  private unsubscribeFromInteractionEvents(): void {
    if (!this.interactionService) return;

    // Desuscribirse de todos los eventos
    this.core.off('objectEnter');
    this.core.off('objectLeave');
    this.core.off('objectClick');
    this.core.off('nodeEnter');
    this.core.off('nodeLeave');
    this.core.off('nodeClick');
    this.core.off('nodeMove');
  }

  /**
 * Configura los handlers internos del sistema
 */
  private setupInternalHandlers(): void {
    if (!this.interactionService) return;

    // Configurar handlers para objetos usando callbacks directos
    this.interactionService.setOnObjectEnter(this.handleObjectEnter.bind(this));
    this.interactionService.setOnObjectLeave(this.handleObjectLeave.bind(this));
    this.interactionService.setOnObjectClick(this.handleObjectClick.bind(this));

    // Configurar handlers para nodos usando callbacks directos
    this.interactionService.setOnNodeEnter(this.handleNodeEnter.bind(this));
    this.interactionService.setOnNodeLeave(this.handleNodeLeave.bind(this));
    this.interactionService.setOnNodeClick(this.handleNodeClick.bind(this));

    // Suscribirse a eventos del EventEmitter para mayor flexibilidad
    this.subscribeToInteractionEvents();
  }

  /**
   * Suscribe el sistema a los eventos del InteractionService usando EventEmitter
   */
  private subscribeToInteractionEvents(): void {
    if (!this.interactionService) return;

    // Eventos de objetos
    this.core.on('objectEnter', this.onObjectEnterEvent.bind(this));
    this.core.on('objectLeave', this.onObjectLeaveEvent.bind(this));
    this.core.on('objectClick', this.onObjectClickEvent.bind(this));

    // Eventos de nodos
    this.core.on('nodeEnter', this.onNodeEnterEvent.bind(this));
    this.core.on('nodeLeave', this.onNodeLeaveEvent.bind(this));
    this.core.on('nodeClick', this.onNodeClickEvent.bind(this));
    this.core.on('nodeMove', this.onNodeMoveEvent.bind(this));

  }

  // --- Event Handlers para EventEmitter --- //

  /**
   * Handler para evento objectEnter del EventEmitter
   */
  private onObjectEnterEvent(_event: EventArgs<string, ObjectEventArray>): void {
    // Se puede agregar lógica adicional aquí si es necesario
    // Los callbacks del usuario ya se ejecutan en handleObjectEnter
    void _event;
  }

  /**
   * Handler para evento objectLeave del EventEmitter
   */
  private onObjectLeaveEvent(event: EventArgs<string, ObjectEventArray>): void {
    this._userCallbacks.objects?.onHoverLeave?.(event);
  }

  /**
   * Handler para evento objectClick del EventEmitter
   */
  private onObjectClickEvent(event: EventArgs<string, ObjectEventArray>): void {
    this._userCallbacks.objects?.onClick?.(event);
  }

  /**
   * Handler para evento nodeEnter del EventEmitter
   */
  private onNodeEnterEvent(event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>): void {
    this._userCallbacks.nodes?.onHover?.(event);
  }

  /**
   * Handler para evento nodeLeave del EventEmitter
   */
  private onNodeLeaveEvent(event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>): void {
    this._userCallbacks.nodes?.onHoverLeave?.(event);
  }

  /**
   * Handler para evento nodeClick del EventEmitter
   */
  private onNodeClickEvent(event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>): void {
    this._userCallbacks.nodes?.onClick?.(event);
  }

  /**
   * Handler para evento nodeMove del EventEmitter
   */
  private onNodeMoveEvent(event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>): void {
    this._userCallbacks.nodes?.onMove?.(event);
  }

  /**
   * Handler interno para cuando se entra en hover sobre un objeto
   */
  private handleObjectEnter(event: EventArgs<string, ObjectEventArray>): void {

    // Lógica interna del sistema
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

    // Ejecutar callback del usuario si existe
    this._userCallbacks.objects?.onHover?.(event);
  }

  /**
   * Handler interno para cuando se sale del hover sobre un objeto
   */
  private handleObjectLeave(event: EventArgs<string, ObjectEventArray>): void {
    // Lógica interna del sistema
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

    // Ejecutar callback del usuario si existe
    this._userCallbacks.objects?.onHoverLeave?.(event);
  }

  /**
   * Handler interno para cuando se hace click en un objeto
   */
  private handleObjectClick(event: EventArgs<string, ObjectEventArray>): void {
    // Lógica interna del sistema
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

    // Ejecutar callback del usuario si existe
    this._userCallbacks.objects?.onClick?.(event);
  }

  /**
   * Handler interno para cuando se entra en hover sobre un nodo
   */
  private handleNodeEnter(event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>): void {
    // Ejecutar callback del usuario si existe
    this._userCallbacks.nodes?.onHover?.(event);
  }

  /**
   * Handler interno para cuando se sale del hover sobre un nodo
   */
  private handleNodeLeave(event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>): void {
    // Ejecutar callback del usuario si existe
    this._userCallbacks.nodes?.onHoverLeave?.(event);
  }

  /**
   * Handler interno para cuando se hace click en un nodo
   */
  private handleNodeClick(event: EventArgs<Node, { distance: number; position: THREE.Vector3 }>): void {
    console.log("[InteractionSystem] Click en nodo detectado");

    // Obtener el NodeManager del core y ejecutar ping
    const nodeManager = this.core.getService(NodeManager);
    if (nodeManager) {
      console.log("[InteractionSystem] Ejecutando ping en el nodo");
      (nodeManager as NodeManager).ping();
    } else {
      console.warn("[InteractionSystem] NodeManager no disponible en el core");
    }

    // Ejecutar callback del usuario si existe
    this._userCallbacks.nodes?.onClick?.(event);
  }

  /**
   * Handler para navegación al siguiente nodo
   */
  public handleNextNode(): void {
    // Prevenir múltiples animaciones simultáneas
    if (this._isNavigationAnimating) return;

    // TODO: Implementar cuando activeNode esté disponible
    // const activeNode = core.activeNode;
    // const group = activeNode?.getGroup();

    // if (!group || !this.animationService) {
    //   return;
    // }

    // Ejecutar callback del usuario si existe
    this._userCallbacks.navigation?.onNext?.();
  }

  /**
   * Handler para navegación al nodo anterior
   */
  public handlePreviousNode(): void {
    // Prevenir múltiples animaciones simultáneas
    if (this._isNavigationAnimating) return;

    // TODO: Implementar cuando activeNode esté disponible

    // Ejecutar callback del usuario si existe
    this._userCallbacks.navigation?.onPrevious?.();
  }

  // API Pública para configuración

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
  public getInterceptableObjects(): Record<string, any> {
    return { ...this._interceptableObjects };
  }

  /**
   * Obtiene el radio de interacción actual
   */
  public getInteractionRadius(): number {
    return this._interactionRadius;
  }
}