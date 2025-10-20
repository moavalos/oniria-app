import { InteractionSystem } from "./InteractionSystem";
import { OutlineManager, OutlineState } from "@engine/services/managers/OutlineManager";
import type { EngineCore } from "@engine/core/src/EngineCore";
import type { ObjectInteractionCallbacks, NodeInteractionCallbacks } from "./InteractionSystem";

/**
 * Configuración para outlines automáticos
 */
export interface AutoOutlineConfig {
    /** Habilitar outlines automáticos en hover de objetos */
    enableObjectHover?: boolean;
    /** Habilitar outlines automáticos en hover de nodos */
    enableNodeHover?: boolean;
    /** Color para hover de objetos */
    objectHoverColor?: string | number;
    /** Color para hover de nodos */
    nodeHoverColor?: string | number;
    /** Grosor del outline para objetos */
    objectThickness?: number;
    /** Grosor del outline para nodos */
    nodeThickness?: number;
}

/**
 * Sistema de interacción extendido con soporte automático de outlines
 * 
 * Extiende el InteractionSystem base agregando funcionalidad automática
 * de outlines en hover para objetos y nodos.
 */
export class OutlineSystem extends InteractionSystem {
    private outlineManager: OutlineManager;

    private autoOutlineConfig: AutoOutlineConfig;

    private _core: EngineCore;

    constructor(core: EngineCore, autoOutlineConfig: AutoOutlineConfig = {}) {
        super(); // Llamar al constructor base sin parámetros
        this._core = core;

        this.outlineManager = new OutlineManager(this._core);
        this.autoOutlineConfig = {
            enableObjectHover: true,
            enableNodeHover: true,
            objectHoverColor: "#00ff88",
            nodeHoverColor: "#ff6b00",
            objectThickness: 0.03,
            nodeThickness: 0.05,
            ...autoOutlineConfig
        };

        console.log("[OutlineInteractionSystem]: Inicializado con outlines automáticos");
    }

    /**
     * Inicialización del sistema - configurar outlines después del init base
     */
    async init(core: EngineCore): Promise<void> {
        // Llamar al init del sistema base
        await super.init(core);

        // Configurar los outlines automáticos ahora que el sistema está inicializado
        this.setupAutoOutlines();
    }

    /**
     * Obtiene el gestor de outlines
     */
    getOutlineManager(): OutlineManager {
        return this.outlineManager;
    }

    /**
     * Configura los outlines automáticos
     */
    private setupAutoOutlines(): void {
        const originalCallbacks = this.getCallbacks();

        // Crear callbacks extendidos para objetos
        const extendedObjectCallbacks: ObjectInteractionCallbacks = {
            ...originalCallbacks?.objects,

            onHover: (args) => {
                console.log("[OutlineSystem]: Object hover detectado:", args.target);

                // Ejecutar callback original si existe
                originalCallbacks?.objects?.onHover?.(args);

                // Aplicar outline automático si está habilitado
                if (this.autoOutlineConfig.enableObjectHover) {
                    console.log("[OutlineSystem]: Aplicando outline a objeto:", args.target);
                    const scene = this._core.getScene();
                    const object = scene?.getObjectByName(args.target);

                    if (object) {
                        console.log("[OutlineSystem]: Objeto encontrado, agregando outline");
                        this.outlineManager.addOutline(object, OutlineState.HOVER, {
                            color: this.autoOutlineConfig.objectHoverColor,
                            thickness: this.autoOutlineConfig.objectThickness
                        });
                    } else {
                        console.warn("[OutlineSystem]: Objeto no encontrado en la escena:", args.target);
                    }
                } else {
                    console.log("[OutlineSystem]: Object hover deshabilitado");
                }
            },

            onHoverLeave: (args) => {
                // Ejecutar callback original si existe
                originalCallbacks?.objects?.onHoverLeave?.(args);

                // Remover outline automático si está habilitado
                if (this.autoOutlineConfig.enableObjectHover) {
                    const scene = this._core.getScene();
                    const object = scene?.getObjectByName(args.target);

                    if (object) {
                        this.outlineManager.removeOutline(object);
                    }
                }
            },

            onClick: originalCallbacks?.objects?.onClick
        };

        // Crear callbacks extendidos para nodos
        const extendedNodeCallbacks: NodeInteractionCallbacks = {
            ...originalCallbacks?.nodes,

            onHover: (args) => {
                // Ejecutar callback original si existe
                originalCallbacks?.nodes?.onHover?.(args);

                // Aplicar outline automático si está habilitado
                if (this.autoOutlineConfig.enableNodeHover) {
                    const group = args.target.getGroup();
                    if (group) {
                        this.outlineManager.addOutline(group, OutlineState.HOVER, {
                            color: this.autoOutlineConfig.nodeHoverColor,
                            thickness: this.autoOutlineConfig.nodeThickness
                        });
                    }
                }
            },

            onHoverLeave: (args) => {
                // Ejecutar callback original si existe
                originalCallbacks?.nodes?.onHoverLeave?.(args);

                // Remover outline automático si está habilitado
                if (this.autoOutlineConfig.enableNodeHover) {
                    const group = args.target.getGroup();
                    if (group) {
                        this.outlineManager.removeOutline(group);
                    }
                }
            },

            onClick: originalCallbacks?.nodes?.onClick,
            onMove: originalCallbacks?.nodes?.onMove
        };

        // Establecer los callbacks extendidos
        this.setCallbacks({
            objects: extendedObjectCallbacks,
            nodes: extendedNodeCallbacks,
            navigation: originalCallbacks?.navigation
        });
    }

    /**
     * Actualiza la configuración de outlines automáticos
     */
    updateAutoOutlineConfig(newConfig: Partial<AutoOutlineConfig>): void {
        this.autoOutlineConfig = { ...this.autoOutlineConfig, ...newConfig };

        // Reconfigular los callbacks con la nueva configuración
        this.setupAutoOutlines();
    }

    /**
     * Habilita o deshabilita outlines automáticos para objetos
     */
    setObjectHoverOutlines(enabled: boolean): void {
        this.updateAutoOutlineConfig({ enableObjectHover: enabled });
    }

    /**
     * Habilita o deshabilita outlines automáticos para nodos
     */
    setNodeHoverOutlines(enabled: boolean): void {
        this.updateAutoOutlineConfig({ enableNodeHover: enabled });
    }

    /**
     * Establece el color de hover para objetos
     */
    setObjectHoverColor(color: string | number): void {
        this.updateAutoOutlineConfig({ objectHoverColor: color });
    }

    /**
     * Establece el color de hover para nodos
     */
    setNodeHoverColor(color: string | number): void {
        this.updateAutoOutlineConfig({ nodeHoverColor: color });
    }

    /**
     * Limpieza al destruir el sistema
     */
    dispose(): void {
        this.outlineManager.clearAllOutlines();
        super.dispose();
        console.log("[OutlineInteractionSystem]: Destruido");
    }
}