import type { EngineCore } from "./EngineCore";
import { AnimationService } from "@engine/services/AnimationService";
import { CameraSystem } from "@engine/systems/CameraSystem";
import { NodeManager } from "@/engine/services/managers/NodeManager";

/**
 * Interfaz para solicitudes de sala pendientes cuando el core no está disponible
 */
interface PendingRoomRequest {
    roomId: string;
    skinId?: string;
}

/**
 * API pública del motor 3D que expone métodos de alto nivel para controlar
 * salas, nodos, cámara y animaciones. Actúa como fachada sobre EngineCore
 * proporcionando una interfaz simplificada y estable para aplicaciones.
 */
export class EngineAPI {
    private _core: EngineCore | null = null;

    private _pendingRoomRequest: PendingRoomRequest | null = null;

    /**
     * Vincula el core del motor a esta API. Se ejecuta automáticamente
     * cuando el motor se inicializa.
     * 
     * @param core - Instancia del núcleo del motor
     */
    attachCore(core: EngineCore) {
        console.log("[EngineAPI]: Core vinculado, verificando solicitudes pendientes");
        this._core = core;

        if (this._pendingRoomRequest) {
            console.log("[EngineAPI]: Procesando solicitud pendiente de sala:", this._pendingRoomRequest);
            const { roomId, skinId } = this._pendingRoomRequest;
            this._pendingRoomRequest = null;
            this.setRoom(roomId, skinId);
        }
    }

    /**
     * Establece la sala activa del motor 3D. Si el core no está disponible,
     * guarda la solicitud para ejecutarla cuando esté listo.
     * 
     * @param roomId - Identificador de la sala a cargar
     * @param skinId - Identificador opcional del skin a aplicar
     */
    setRoom(roomId: string, skinId?: string) {
        console.log("[EngineAPI]: Configurando sala:", roomId, "con skin:", skinId);

        if (this._core) {
            this._core.setRoom(roomId, skinId);
        } else {
            console.log("[EngineAPI]: Core no disponible, guardando solicitud pendiente");
            this._pendingRoomRequest = { roomId, skinId };
        }
    }

    /**
     * Cambia la skin de la sala actual sin recargar toda la escena.
     * 
     * @param skinId - Identificador del skin a aplicar
     */
    setSkin(skinId: string) {
        console.log("[EngineAPI] setSkin llamado:", skinId, "core:", !!this._core);

        if (!this._core) {
            console.warn("[EngineAPI]: Core no disponible para setSkin");
            return;
        }

        this._core.emit("engine:setSkin", { skin: { id: skinId } });
    }

    /**
     * Mueve la cámara para enfocar un objeto específico por nombre.
     * 
     * @param target - Nombre del objeto a enfocar
     */
    async lookAt(target: string) {
        if (!this._core) {
            console.warn("[EngineAPI]: Core no disponible para lookAt");
            return;
        }

        const cameraSystem = this._core.getSystem(CameraSystem);
        if (!cameraSystem) {
            console.warn("[EngineAPI]: CameraSystem no disponible");
            return;
        }

        await (cameraSystem as CameraSystem).lookAt(target);
    }

    /**
     * Obtiene la sala actualmente cargada en el motor.
     * 
     * @returns Sala actual o null si no hay ninguna cargada
     */
    getRoom() {
        if (!this._core) {
            console.warn("[EngineAPI]: Core no disponible para getRoom");
            return null;
        }

        return this._core.getCurrentRoom();
    }

    /**
     * API de control de nodos. Proporciona métodos para controlar
     * las animaciones y estados del nodo activo.
     */
    node = {
        /**
         * Ejecuta animación idle en el nodo activo.
         */
        idle: () => {
            if (!this._core) return;

            const nodeManager = this._core.getService(NodeManager);
            if (nodeManager) {
                (nodeManager as NodeManager).setNodeIdle();
            }
        },

        /**
         * Ejecuta animación rest en el nodo activo.
         */
        rest: () => {
            if (!this._core) return;

            const nodeManager = this._core.getService(NodeManager);
            if (nodeManager) {
                (nodeManager as NodeManager).setNodeRest();
            }
        },

        /**
         * Ejecuta animación next en el nodo activo.
         */
        next: () => {
            if (!this._core) return;

            const nodeManager = this._core.getService(NodeManager);
            if (nodeManager) {
                (nodeManager as NodeManager).setNodeNext();
            }
        },

        /**
         * Ejecuta animación prev en el nodo activo.
         */
        prev: () => {
            if (!this._core) return;

            const nodeManager = this._core.getService(NodeManager);
            if (nodeManager) {
                (nodeManager as NodeManager).setNodePrev();
            }
        },

        /**
         * Ejecuta animación ping en el nodo activo - efecto visual de interacción.
         */
        ping: () => {
            if (!this._core) return;

            const nodeManager = this._core.getService(NodeManager);
            if (nodeManager) {
                (nodeManager as NodeManager).ping();
            }
        },

        /**
         * Ejecuta un callback cuando el nodo esté listo para interacciones.
         * Si el nodo ya existe, ejecuta el callback inmediatamente.
         * Si no, se suscribe al evento 'node:ready' y lo ejecuta cuando esté disponible.
         * 
         * @param callback - Función a ejecutar cuando el nodo esté listo,
         *                   recibe un objeto controlador con métodos del nodo
         */
        onReady: (callback: (_nodeController: {
            idle: () => void,
            rest: () => void,
            next: () => void,
            prev: () => void,
            ping: () => void
        }) => void) => {
            if (!this._core) return;

            const createNodeController = () => ({
                idle: () => {
                    const nodeManager = this._core?.getService(NodeManager);
                    if (nodeManager) {
                        (nodeManager as NodeManager).setNodeIdle();
                    }
                },
                rest: () => {
                    const nodeManager = this._core?.getService(NodeManager);
                    if (nodeManager) {
                        (nodeManager as NodeManager).setNodeRest();
                    }
                },
                next: () => {
                    const nodeManager = this._core?.getService(NodeManager);
                    if (nodeManager) {
                        (nodeManager as NodeManager).setNodeNext();
                    }
                },
                prev: () => {
                    const nodeManager = this._core?.getService(NodeManager);
                    if (nodeManager) {
                        (nodeManager as NodeManager).setNodePrev();
                    }
                },
                ping: () => {
                    const nodeManager = this._core?.getService(NodeManager);
                    if (nodeManager) {
                        (nodeManager as NodeManager).ping();
                    }
                }
            });

            const currentNode = this._core.getCurrentNode();
            if (currentNode) {
                callback(createNodeController());
                return;
            }

            let callbackExecuted = false;
            const onNodeReady = () => {
                if (callbackExecuted) return;
                callbackExecuted = true;
                callback(createNodeController());
            };

            this._core.on("node:ready", onNodeReady);
        }
    };

    /**
     * API de control de cámara. Proporciona métodos para controlar
     * la posición y enfoque de la cámara del motor 3D.
     */
    camera = {
        /**
         * Transiciona la cámara para ver los nodos de la sala activa.
         */
        viewNodes: () => {
            if (!this._core) return;

            const cameraSystem = this._core.getSystem(CameraSystem);
            if (cameraSystem) {
                (cameraSystem as CameraSystem).viewNodes();
            }
        },

        /**
         * Resetea la cámara a su posición inicial.
         */
        viewReset: () => {
            if (!this._core) return;

            const cameraSystem = this._core.getSystem(CameraSystem);
            if (cameraSystem) {
                (cameraSystem as CameraSystem).viewReset();
            }
        }
    };

    /**
     * Obtiene el servicio de animación completo para control avanzado.
     * 
     * @returns Instancia de AnimationService o null si no está disponible
     */
    get animation(): AnimationService | null {
        if (!this._core) return null;

        const animationService = this._core.getService(AnimationService);
        return animationService ? animationService as AnimationService : null;
    }
} 