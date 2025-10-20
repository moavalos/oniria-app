import * as THREE from "three";
import { EventEmitter } from "@engine/utils/EventEmitter";
import type { Room } from "@/engine/entities";
import type { ISystem } from "./ISystem";
import { ServiceRegistry } from "./ServiceRegistry";
import { AssetManager, CameraService, MaterialService, AnimationService, InteractionService } from "@/engine/services";
import { EngineState } from "../types/engine.types";
import { ConfigManager } from "@/engine/utils/ConfigManager";
import { RoomManager } from "@/engine/services/room/RoomManager";
import { PortalManager } from "@/engine/services/portal/PortalManager";
import { NodeManager } from "@/engine/services/room/NodeManager";




export class EngineCore extends EventEmitter {
    private registry = new ServiceRegistry();

    private systems: ISystem[] = [];

    private _gl: THREE.WebGLRenderer | null = null;

    private _scene: THREE.Scene | null = null;

    private _camera: THREE.Camera | null = null;

    private state: EngineState = EngineState.DISPOSED;


    roomId: string | null = null;

    skinId: string | null = null;

    currentRoom: Room | null = null;

    currentNode: any | null = null;

    constructor() {
        super();
    }

    init(gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
        this.setState(EngineState.INITIALIZING);
        this._gl = gl;
        this._scene = scene;
        this._camera = camera;
        this.initializeService();
        this.setState(EngineState.READY);
    }



    initializeService() {
        // Registrar servicios por defecto
        this.registry.registerService(AssetManager, new AssetManager(this._gl!));
        this.registry.registerService(MaterialService, new MaterialService());
        this.registry.registerService(CameraService, new CameraService(this._camera as THREE.PerspectiveCamera, this._gl!.domElement));
        this.registry.registerService(AnimationService, new AnimationService(this._scene));
        this.registry.registerService(InteractionService, new InteractionService(this));

        // Crear RoomManager y configurar listeners
        this.registry.registerService(RoomManager, new RoomManager(this, new ConfigManager()));

        // Crear PortalManager
        const portalManager = new PortalManager(this);
        this.registry.registerService(PortalManager, portalManager);
        // Crear NodeManager
        const nodeManager = new NodeManager(this);
        this.registry.registerService(NodeManager, nodeManager);
        // Configurar listeners para eventos del RoomManager
        this.setupRoomEventListeners();

    }

    /**
     * Configura los listeners para eventos del RoomManager
     */
    private setupRoomEventListeners() {

        this.on("room:loading", (_data: unknown) => this.onRoomLoading(_data as { room: any, skin?: any }));
        this.on("room:ready", (_data: unknown) => this.onRoomReady(_data as { room: Room }));
        this.on("room:error", (_data: unknown) => this.onRoomError(_data as { error: any, room: any, skin?: any }));
        this.on("room:unloading", (_data: unknown) => this.onRoomUnloading(_data as { room: Room }));
        this.on("skin:change:start", (_data: unknown) => this.onSkinChangeStart(_data as { skin: any, room: Room }));
        this.on("skin:change:complete", (_data: unknown) => this.onSkinChangeComplete(_data as { skin: any, room: Room }));
        this.on("skin:change:error", (_data: unknown) => this.onSkinChangeError(_data as { skin: any, error: any, room: Room }));

        // Listener para eventos de nodos
        this.on("node:created", (_data: unknown) => this.onNodeCreated(_data as { newNode: any }));
    }




    /**
     * Maneja el evento de inicio de carga de room
     */
    private onRoomLoading(data: { room: any, skin?: any }) {
        console.log("[EngineCore] Iniciando carga de room:", data.room.id);
        this.setState(EngineState.LOADING_ASSETS);
        this.roomId = data.room.id;
        this.skinId = data.skin?.id || null;
    }

    /**
     * Maneja el evento de room lista
     */
    private onRoomReady(data: { room: Room, skin?: any }) {
        console.log("[EngineCore] Room lista:", data.room);
        this.currentRoom = data.room;
        this.setState(EngineState.READY);
    }

    /**
     * Maneja el evento de error en carga de room
     */
    private onRoomError(data: { error: any, room: any, skin?: any }) {
        console.error("[EngineCore] Error cargando room:", data.error);
        this.setState(EngineState.READY); // Volver a ready después del error
    }

    /**
     * Maneja el evento de descarga de room
     */
    private onRoomUnloading(data: { room: Room }) {
        console.log("[EngineCore] Descargando room:", data.room);
        this.currentRoom = null;
    }

    /**
     * Maneja el evento de inicio de cambio de skin
     */
    private onSkinChangeStart(data: { skin: any, room: Room }) {
        console.log("[EngineCore] Iniciando cambio de skin:", data.skin.id);
        this.setState(EngineState.LOADING_ASSETS);
    }

    /**
     * Maneja el evento de cambio de skin completado
     */
    private onSkinChangeComplete(data: { skin: any, room: Room }) {
        console.log("[EngineCore] Cambio de skin completado:", data.skin.id);
        this.skinId = data.skin.id;
        this.setState(EngineState.READY);
    }

    /**
     * Maneja el evento de error en cambio de skin
     */
    private onSkinChangeError(data: { skin: any, error: any, room: Room }) {
        console.error("[EngineCore] Error cambiando skin:", data.error);
        this.setState(EngineState.READY); // Volver a ready después del error
    }

    /**
     * Maneja el evento de creación de nodo
     */
    private onNodeCreated(data: { newNode: any }) {
        console.log("[EngineCore] Nodo creado:", data.newNode);
        this.currentNode = data.newNode;

        // Emitir evento de nodo listo para callbacks externos
        this.emit("node:ready", { node: data.newNode });
    }

    getService<T>(service: new (..._args: any[]) => T): T {
        return this.registry.getService(service);
    }

    getCurrentRoom(): Room | null {
        return this.currentRoom;
    }

    getCurrentNode(): any | null {
        return this.currentNode;
    }

    /**
     * Getter para compatibilidad con InteractionSystem
     */
    get activeNode(): any | null {
        console.log("[EngineCore] 🔍 getter activeNode accedido, currentNode:", !!this.currentNode);
        return this.currentNode;
    }

    /** Loop principal */
    update(dt: number) {
        for (const sys of this.systems) sys.update(dt);

        // Actualizar PortalManager si está disponible
        const portalManager = this.getService(PortalManager);
        if (portalManager && portalManager.update) {
            portalManager.update(dt);
        }

        // Actualizar NodeManager si está disponible
        const nodeManager = this.getService(NodeManager);
        if (nodeManager && nodeManager.update) {
            nodeManager.update(dt);
        }
    }



    setRoom(roomId: string, skinId?: string) {
        console.log("[EngineCore] Solicitando cambio de room:", roomId, skinId);

        // Solo emitir evento - RoomScene es responsable de la carga
        this.emit("room:change:requested", { roomId, skinId });
    }



    /** Registra un sistema */
    addSystem(system: ISystem) {
        this.systems.push(system);
        system.init(this);
    }

    getSystem(systemClass: new (..._args: any[]) => ISystem): ISystem | null {
        for (const sys of this.systems) {
            if (sys instanceof systemClass) {
                return sys;
            }
        }
        return null;
    }

    private setState(state: EngineState) {
        this.state = state;
        this.emit("engine:state", state);
    }

    /**
     * Obtiene el estado actual del engine
     */
    getState(): EngineState {
        return this.state;
    }

    /**
     * Obtiene la escena de Three.js
     */
    getScene(): THREE.Scene | null {
        return this._scene;
    }

    /**
     * Obtiene la cámara de Three.js
     */
    getCamera(): THREE.Camera | null {
        return this._camera;
    }

    getGl(): THREE.WebGLRenderer | null {
        return this._gl;
    }




    dispose() {
        for (const sys of this.systems) sys.dispose();
        this.systems = [];
        this.registry.dispose();
    }
}