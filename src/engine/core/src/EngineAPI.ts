import * as THREE from "three";
import type { EngineCore } from "./EngineCore";
import { CameraSystem } from "@engine/systems/CameraSystem";
import { InteractionSystem } from "@engine/systems/InteractionSystem";
import { NodeManager } from "@/engine/services/managers/NodeManager";
import { NebulaManager } from "@/engine/services/managers/NebulaManager";
import { AnimationService } from "@engine/services/AnimationService";

interface PendingRoomRequest {
    roomId: string;
    skinId?: string;
}

export class EngineAPI {
    private _core: EngineCore | null = null;

    private _pendingRoomRequest: PendingRoomRequest | null = null;

    attachCore(core: EngineCore) {
        console.log("[EngineAPI] Core attached, checking pending requests");
        this._core = core;

        // Procesar solicitud pendiente si existe
        if (this._pendingRoomRequest) {
            console.log("[EngineAPI] Procesando solicitud pendiente:", this._pendingRoomRequest);
            const { roomId, skinId } = this._pendingRoomRequest;
            this._pendingRoomRequest = null;
            this.setRoom(roomId, skinId);
        }
    }

    setRoom(roomId: string, skinId?: string) {
        console.log("[EngineAPI] setRoom llamado:", roomId, skinId, "core:", !!this._core);

        if (this._core) {
            // Core disponible, ejecutar inmediatamente
            this._core.setRoom(roomId, skinId);
        } else {
            // Core no disponible, guardar para más tarde
            console.log("[EngineAPI] Core no disponible, guardando solicitud pendiente");
            this._pendingRoomRequest = { roomId, skinId };
        }
    }

    /**
     * Mueve la cámara para mirar a un objeto específico por nombre
     * 
     * @param target - Nombre del objeto a mirar
     */
    async lookAt(target: string) {
        console.log("[EngineAPI] lookAt llamado:", target, "core:", !!this._core);

        if (!this._core) {
            console.warn("[EngineAPI] Core no disponible para lookAt");
            return;
        }

        const cameraSystem = this._core.getSystem(CameraSystem);
        if (!cameraSystem) {
            console.warn("[EngineAPI] CameraSystem no disponible");
            return;
        }

        await (cameraSystem as CameraSystem).lookAt(target);
    }

    /**
     * Obtiene la room actual
     * 
     * @returns Room actual o null si no hay ninguna cargada
     */
    getRoom() {
        if (!this._core) {
            console.warn("[EngineAPI] Core no disponible para getRoom");
            return null;
        }

        return this._core.getCurrentRoom();
    }

    /**
     * API de control de nodos
     */
    node = {
        /**
         * Ejecuta animación idle en el nodo activo
         */
        idle: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para node.idle");
                return;
            }

            const nodeManager = this._core.getService(NodeManager);
            if (!nodeManager) {
                console.warn("[EngineAPI] NodeManager no disponible");
                return;
            }

            (nodeManager as NodeManager).setNodeIdle();
        },

        /**
         * Ejecuta animación rest en el nodo activo
         */
        rest: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para node.rest");
                return;
            }

            const nodeManager = this._core.getService(NodeManager);
            if (!nodeManager) {
                console.warn("[EngineAPI] NodeManager no disponible");
                return;
            }

            (nodeManager as NodeManager).setNodeRest();
        },

        /**
         * Ejecuta animación next en el nodo activo
         */
        next: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para node.next");
                return;
            }

            const nodeManager = this._core.getService(NodeManager);
            if (!nodeManager) {
                console.warn("[EngineAPI] NodeManager no disponible");
                return;
            }

            (nodeManager as NodeManager).setNodeNext();
        },

        /**
         * Ejecuta animación prev en el nodo activo  
         */
        prev: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para node.prev");
                return;
            }

            const nodeManager = this._core.getService(NodeManager);
            if (!nodeManager) {
                console.warn("[EngineAPI] NodeManager no disponible");
                return;
            }

            (nodeManager as NodeManager).setNodePrev();
        },

        /**
         * Ejecuta animación ping en el nodo activo - efecto visual de click
         */
        ping: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para node.ping");
                return;
            }

            const nodeManager = this._core.getService(NodeManager);
            if (!nodeManager) {
                console.warn("[EngineAPI] NodeManager no disponible");
                return;
            }

            (nodeManager as NodeManager).ping();
        },

        /**
         * Ejecuta un callback cuando el nodo esté listo.
         * Si el nodo ya existe, ejecuta el callback inmediatamente.
         * Si no, se suscribe al evento 'node:ready' y ejecuta el callback cuando se emita.
         * 
         * @param callback - Función a ejecutar cuando el nodo esté listo, recibe un objeto con métodos de control del nodo
         */
        onReady: (callback: (_nodeController: { idle: () => void, rest: () => void, next: () => void, prev: () => void, ping: () => void }) => void) => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para node.onReady");
                return;
            }

            // Crear el objeto controlador del nodo que se enviará al callback
            const createNodeController = () => ({
                idle: () => {
                    console.log("[EngineAPI] nodeController.idle() llamado");
                    const nodeManager = this._core?.getService(NodeManager);
                    if (nodeManager) {
                        (nodeManager as NodeManager).setNodeIdle();
                    } else {
                        console.warn("[EngineAPI] NodeManager no disponible para idle()");
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

            // Verificar si ya hay un nodo disponible
            const currentNode = this._core.getCurrentNode();
            if (currentNode) {
                console.log("[EngineAPI] Nodo ya disponible, ejecutando callback inmediatamente");
                callback(createNodeController());
                return;
            }

            // Si no hay nodo, suscribirse al evento node:ready
            console.log("[EngineAPI] Nodo no disponible, suscribiéndose a evento node:ready");
            let callbackExecuted = false;

            const onNodeReady = () => {
                // Evitar múltiples ejecuciones del callback
                if (callbackExecuted) return;
                callbackExecuted = true;

                console.log("[EngineAPI] Evento node:ready recibido, ejecutando callback");
                callback(createNodeController());
            };

            this._core.on("node:ready", onNodeReady);
        }
    };

    /**
     * API de control de nebula
     */
    nebula = {
        /**
         * Ejecuta un callback cuando la nebula esté lista.
         * Si la nebula ya existe, ejecuta el callback inmediatamente.
         * Si no, se suscribe al evento 'nebula:ready' y ejecuta el callback cuando se emita.
         * 
         * @param callback - Función a ejecutar cuando la nebula esté lista, recibe la mesh de la nebula
         */
        onReady: (callback: (_nebula: THREE.Mesh) => void) => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para nebula.onReady");
                return;
            }

            const nebulaManager = this._core.getService(NebulaManager);
            if (!nebulaManager) {
                console.warn("[EngineAPI] NebulaManager no disponible");
                return;
            }

            // Verificar si ya hay una nebula disponible
            if ((nebulaManager as NebulaManager).isNebulaReady()) {
                const nebula = (nebulaManager as NebulaManager).getNebula();
                if (nebula) {
                    console.log("[EngineAPI] Nebula ya disponible, ejecutando callback inmediatamente");
                    callback(nebula);
                    return;
                }
            }

            // Si no hay nebula, suscribirse al evento nebula:ready
            console.log("[EngineAPI] Nebula no disponible, suscribiéndose a evento nebula:ready");
            let callbackExecuted = false;

            const onNebulaReady = ({ nebula }: { nebula: THREE.Mesh }) => {
                // Evitar múltiples ejecuciones del callback
                if (callbackExecuted) return;
                callbackExecuted = true;

                console.log("[EngineAPI] Evento nebula:ready recibido, ejecutando callback");
                callback(nebula);
            };

            this._core.on("nebula:ready", onNebulaReady);
        },

        /**
         * Obtiene la mesh de la nebula si está disponible
         * 
         * @returns Mesh de la nebula o null si no está creada
         */
        get: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para nebula.get");
                return null;
            }

            const nebulaManager = this._core.getService(NebulaManager);
            if (!nebulaManager) {
                console.warn("[EngineAPI] NebulaManager no disponible");
                return null;
            }

            return (nebulaManager as NebulaManager).getNebula();
        },

        /**
         * Verifica si la nebula está lista
         * 
         * @returns true si la nebula está creada, false si no
         */
        isReady: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para nebula.isReady");
                return false;
            }

            const nebulaManager = this._core.getService(NebulaManager);
            if (!nebulaManager) {
                console.warn("[EngineAPI] NebulaManager no disponible");
                return false;
            }

            return (nebulaManager as NebulaManager).isNebulaReady();
        }
    };

    /**
     * API de control de cámara
     */
    camera = {
        /**
         * Transiciona la cámara para ver los nodos de la sala activa
         */
        viewNodes: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para camera.viewNodes");
                return;
            }

            const cameraSystem = this._core.getSystem(CameraSystem);
            if (!cameraSystem) {
                console.warn("[EngineAPI] CameraSystem no disponible");
                return;
            }

            (cameraSystem as CameraSystem).viewNodes();
        },

        /**
         * Transiciona la cámara para ver los nodos de la sala activa
         */
        viewTravel: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para camera.viewTravel");
                return;
            }

            const cameraSystem = this._core.getSystem(CameraSystem);
            if (!cameraSystem) {
                console.warn("[EngineAPI] CameraSystem no disponible");
                return;
            }

            (cameraSystem as CameraSystem).startTravel();
        },

        /**
         * Resetea la cámara a su posición inicial
         */
        viewReset: () => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para camera.viewReset");
                return;
            }

            const cameraSystem = this._core.getSystem(CameraSystem);
            if (!cameraSystem) {
                console.warn("[EngineAPI] CameraSystem no disponible");
                return;
            }

            (cameraSystem as CameraSystem).viewReset();
        }
    };

    /**
     * Obtiene el servicio de animación completo
     * 
     * @returns AnimationService o null si no está disponible
     */
    get animation(): AnimationService {
        return this._core?.getService(AnimationService) as AnimationService;
    }

    /**
     * Namespace for interaction control
     */
    public readonly interactions = {
        /**
         * Enable or disable interactions with 3D objects
         * @param enabled - Whether interactions should be enabled
         */
        setEnabled: (enabled: boolean): void => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para interactions.setEnabled");
                return;
            }

            const interactionSystem = this._core.getSystem(InteractionSystem);
            if (!interactionSystem) {
                console.warn("[EngineAPI] InteractionSystem no disponible");
                return;
            }

            (interactionSystem as InteractionSystem).setInteractionsEnabled(enabled);
        },

        /**
         * Check if interactions are currently enabled
         * @returns Whether interactions are enabled
         */
        isEnabled: (): boolean => {
            if (!this._core) {
                console.warn("[EngineAPI] Core no disponible para interactions.isEnabled");
                return false;
            }

            const interactionSystem = this._core.getSystem(InteractionSystem);
            if (!interactionSystem) {
                console.warn("[EngineAPI] InteractionSystem no disponible");
                return false;
            }

            return (interactionSystem as InteractionSystem).isInteractionsEnabled();
        },
    };
} 