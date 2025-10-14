import * as THREE from "three";
import { EventEmitter } from "@engine/utils/EventEmitter";
import type { Room } from "@/engine/entities";
import type { ISystem } from "./ISystems";

type Constructor<T = any> = abstract new (..._args: any[]) => T;

export class EngineCore extends EventEmitter {
    private services = new Map<Constructor, any>();

    private systems: ISystem[] = [];

    private gl: THREE.WebGLRenderer | null = null;

    private scene: THREE.Scene | null = null;

    private camera: THREE.Camera | null = null;

    roomId: string | null = null;

    skinId: string | null = null;

    currentRoom: Room | null = null;

    constructor() {
        super();
    }

    initContext(_gl: THREE.WebGLRenderer, _scene: THREE.Scene, _camera: THREE.Camera) {
        // Lógica de inicialización del contexto del núcleo del motor
        this.gl = _gl;
        this.scene = _scene;
        this.camera = _camera;
        console.log("Context initialized", this.gl, this.scene, this.camera);
    }

    /** Loop principal */
    update(dt: number) {
        for (const sys of this.systems) sys.update(dt);
    }

    /** Obtiene un servicio compartido, o lo crea si no existe */
    getService<T>(ctor: new () => T): T {
        if (this.services.has(ctor)) {
            return this.services.get(ctor) as T;
        }

        const instance = new ctor();
        this.services.set(ctor, instance);
        return instance;
    }

    /** Registra manualmente una instancia (si necesitás hacerlo tú) */
    registerService<T>(ctor: new () => T, instance: T): T {
        if (!this.services.has(ctor)) {
            this.services.set(ctor, instance);
        }
        return this.services.get(ctor) as T;
    }

    hasService<T>(ctor: new () => T): boolean {
        return this.services.has(ctor);
    }

    setRoom(roomId: string, skinId?: string) {
        this.roomId = roomId;
        this.skinId = skinId || null;
        this.emit("room:changed", { roomId, skinId });
    }

    /** Registra un sistema */
    addSystem(system: ISystem) {
        this.systems.push(system);
        system.init(this);
    }


    dispose() {
        for (const sys of this.systems) sys.dispose();
        this.systems = [];
        this.services.clear();
    }
}