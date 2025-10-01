import * as THREE from "three";
import type { Room } from "../entities/Room";
import type { ObjectEvent } from "../config/room.type";
import { EventEmitter } from "../utils/EventEmitter";


export class InteractionService extends EventEmitter {
    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();
    private prevHovered = new Set<string>();
    private interactableCache: Record<string, ObjectEvent> = {};


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


    };

    private onClick = () => {
        if (!this.prevHovered.size) return;
        const name = Array.from(this.prevHovered)[0];
        this.handleEvent("click", this.interactableCache?.[name]);
    };

    update(room: Room, interactableObjects?: Record<string, ObjectEvent>) {
        const scene = room.getScene();
        if (!scene) return;
        if (interactableObjects) {
            this.interactableCache = interactableObjects; // guardar copia fresca
        }
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(scene.children, true);

        // nombres actuales intersectados
        const current = new Set(
            intersects
                .map(i => i.object.name)
                .filter(name => interactableObjects && name in interactableObjects)
        );

        // detectar nuevos (enter)
        current.forEach(name => {
            if (!this.prevHovered.has(name)) {
                this.handleEvent("hoverEnter", interactableObjects![name]);
                console.log("enter", name);
            }
        });

        // detectar salidos (leave)
        this.prevHovered.forEach(name => {
            if (!current.has(name)) {
                this.handleEvent("hoverLeave", interactableObjects![name]);
                console.log("leave", name);
            }
        });

        // actualizar
        this.prevHovered = current;
    }

    private handleEvent(phase: "hoverEnter" | "hoverLeave" | "click", event: ObjectEvent) {
        if (!event) return;
        this.trigger(phase, [event]);

    }


}
