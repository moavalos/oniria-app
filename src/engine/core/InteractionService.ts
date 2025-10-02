import * as THREE from "three";
import type { Room } from "../entities/Room";
import type { ObjectEvent, ObjectEventArray } from "../config/room.type";
import { EventEmitter } from "../utils/EventEmitter";

type InteractionCallback = (objectName: string, event: ObjectEvent) => void;
type StateChangeCallback = (hoveredObjects: string[]) => void;

export class InteractionService extends EventEmitter {
    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();
    private prevHovered = new Set<string>();
    private interactableCache: Record<string, ObjectEventArray> = {};
    private raycastingEnabled = true;
    private raycastingLayers: number[] = [];
    private debugMode = false;

    // Callbacks configurables
    private onHoverEnter?: InteractionCallback;
    private onHoverLeave?: InteractionCallback;
    private onClickCallback?: InteractionCallback;
    private onStateChange?: StateChangeCallback;


    constructor(
        private camera: THREE.Camera,
        private domElement: HTMLElement,

    ) {
        super();
        this.domElement.addEventListener("mousemove", this.onMouseMove);
        this.domElement.addEventListener("click", this.onClick);
        console.log("nueva instancia de InteractionService");
    }

    dispose() {
        this.domElement.removeEventListener("mousemove", this.onMouseMove);
        this.domElement.removeEventListener("click", this.onClick);
    }

    private onMouseMove = (event: MouseEvent) => {
        const rect = this.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Log temporal para debug
        if (Math.random() < 0.001) { // Solo log 0.1% de las veces para no spam
            console.log("🖱️ [InteractionService] Mouse:", this.mouse.x.toFixed(2), this.mouse.y.toFixed(2));
        }
    };

    private onClick = () => {
        if (!this.prevHovered.size) return;
        const name = Array.from(this.prevHovered)[0];
        const events = this.interactableCache?.[name];
        if (events) {
            const event = Array.isArray(events) ? events[0] : events;
            this.handleEvent("click", name, event);
        }
    };

    update(room: Room, interactableObjects?: Record<string, ObjectEventArray>) {
        if (!this.raycastingEnabled) {
            console.log("🚫 [InteractionService] Raycasting disabled");
            return;
        }

        const scene = room.getScene();
        if (!scene) {
            console.log("🚫 [InteractionService] No scene available");
            return;
        }

        if (interactableObjects) {
            this.interactableCache = interactableObjects; // guardar copia fresca
            console.log("🔄 [InteractionService] Updated interactable cache:", Object.keys(this.interactableCache));
        }

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Filtrar por layers si están configurados
        let objectsToCheck = scene.children;
        if (this.raycastingLayers.length > 0) {
            objectsToCheck = scene.children.filter(obj =>
                this.raycastingLayers.some(layer => {
                    const testLayers = new THREE.Layers();
                    testLayers.set(layer);
                    return obj.layers.test(testLayers);
                })
            );
        }

        const intersects = this.raycaster.intersectObjects(objectsToCheck, true);

        // Debug: log intersects occasionally
        if (intersects.length > 0 && Math.random() < 0.1) {
            console.log("🎯 [InteractionService] Ray intersects:", intersects.map(i => i.object.name));
        }

        // nombres actuales intersectados
        const current = new Set(
            intersects
                .map(i => i.object.name)
                .filter(name => this.interactableCache && name in this.interactableCache)
        );

        // Debug: log current interactables
        if (current.size > 0 || this.prevHovered.size > 0) {
            console.log("🔍 [InteractionService] Current intersected interactables:", Array.from(current));
        }

        // detectar nuevos (enter)
        current.forEach(name => {
            if (!this.prevHovered.has(name)) {
                const events = this.interactableCache[name];
                const event = Array.isArray(events) ? events[0] : events;
                this.handleEvent("hoverEnter", name, event);
                if (this.debugMode) console.log("enter", name);
            }
        });

        // detectar salidos (leave)
        this.prevHovered.forEach(name => {
            if (!current.has(name)) {
                const events = this.interactableCache[name];
                const event = Array.isArray(events) ? events[0] : events;
                this.handleEvent("hoverLeave", name, event);
                if (this.debugMode) console.log("leave", name);
            }
        });

        // actualizar
        const prevSize = this.prevHovered.size;
        this.prevHovered = current;

        // Notificar cambio de estado si hay diferencias
        if (prevSize !== current.size || this.onStateChange) {
            this.onStateChange?.(Array.from(current));
        }
    }

    private handleEvent(phase: "hoverEnter" | "hoverLeave" | "click", objectName: string, event: ObjectEvent) {
        if (!event) return;

        // Ejecutar callback configurado
        switch (phase) {
            case "hoverEnter":
                this.onHoverEnter?.(objectName, event);

                break;
            case "hoverLeave":
                this.onHoverLeave?.(objectName, event);
                break;
            case "click":
                this.onClickCallback?.(objectName, event);
                break;
        }

        // Ejecutar evento legacy del EventEmitter
        this.trigger(phase, [event]);
    }

    // Métodos para configurar callbacks
    setOnHoverEnter(callback?: InteractionCallback) {
        console.log("Setting onHoverEnter callback:", callback);
        this.onHoverEnter = callback;
    }

    setOnHoverLeave(callback?: InteractionCallback) {
        this.onHoverLeave = callback;
    }

    setOnClick(callback?: InteractionCallback) {
        this.onClickCallback = callback;
    }

    setOnStateChange(callback?: StateChangeCallback) {
        this.onStateChange = callback;
    }

    // Métodos de configuración
    setRaycastingEnabled(enabled: boolean) {
        this.raycastingEnabled = enabled;
    }

    setRaycastingLayers(layers: number[]) {
        this.raycastingLayers = layers;
    }

    setDebugMode(enabled: boolean) {
        this.debugMode = enabled;
    }

    // Métodos de estado
    getHoveredObjects(): string[] {
        return Array.from(this.prevHovered);
    }

    isObjectHovered(objectName: string): boolean {
        return this.prevHovered.has(objectName);
    }

    getInteractableObjects(): Record<string, ObjectEventArray> {
        return { ...this.interactableCache };
    }

    updateInteractables(interactables: Record<string, ObjectEventArray>) {
        this.interactableCache = interactables;
    }

    clearHovered() {
        this.prevHovered.clear();
    }


}
