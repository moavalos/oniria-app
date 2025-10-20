import * as THREE from "three";
import { BaseSystem } from "@engine/core/src/BaseSystem";
import type { Injectable } from "@engine/core/src/Injectable";
import { CameraService, type CameraConfig } from "@engine/services/CameraService";
import { EngineCore } from "@engine/core/src/EngineCore.class";

/**
 * Sistema de cámara del motor 3D.
 * Gestiona la configuración y controles de la cámara para la exploración de la escena.
 */
export class CameraSystem extends BaseSystem implements Injectable {
    name = "CameraSystem";

    private cameraService: CameraService | null = null;

    private config: CameraConfig | null = null;

    constructor(config?: CameraConfig) {
        super();
        this.config = config || null;
    }

    init(core: EngineCore): void {
        super.init(core);

        // Obtener CameraService del core
        this.cameraService = core.getService(CameraService);

        if (!this.cameraService) {
            console.error("[CameraSystem] :CameraService no disponible");
            return;
        }


        this.applyCameraConfig(this.config!);


        // Configurar listeners del CameraService
        this.setupCameraListeners();

        console.log("[CameraSystem] :Inicializado con CameraService");
    }

    async lookAt(target: string) {
        if (!this.cameraService) return;
        const lookatables = await this.core.currentRoom?.getLookAtableObjectByName(target);
        if (lookatables) {
            this.cameraService.setLookAt(
                lookatables.position,
                lookatables.target,
                true
            );
        }
    }

    /**
     * Transiciona la cámara para ver los nodos de la sala activa
     * (Movido desde useTransitions)
     */
    viewNodes(): void {
        if (!this.cameraService) {
            console.warn("[CameraSystem] CameraService no disponible para viewNodes");
            return;
        }

        const activeRoom = this.core.getCurrentRoom();
        if (!activeRoom) {
            console.warn("[CameraSystem] No hay sala activa para viewNodes");
            return;
        }

        const target = activeRoom.getPortal()?.position;
        if (!target) {
            console.warn("[CameraSystem] Portal no encontrado en sala activa");
            return;
        }


        this.cameraService.setRestThreshold(0.8);
        this.cameraService.setLookAt(
            new THREE.Vector3(target.x, target.y, target.z),
            new THREE.Vector3(target.x, target.y, target.z - 0.5),
            true
        );

        console.log("[CameraSystem] 🎯 viewNodes ejecutado - transicionando a portal");
    }

    /**
     * Resetea la cámara a su posición inicial
     * (Movido desde useTransitions)
     */
    viewReset(): void {
        if (!this.cameraService) {
            console.warn("[CameraSystem] CameraService no disponible para viewReset");
            return;
        }

        this.cameraService.resetInitialPosition();
        console.log("[CameraSystem] 🔄 viewReset ejecutado - cámara reseteada");
    }



    update(dt: number): void {
        // Actualizar CameraService para que funcionen los controles
        if (this.cameraService) {
            this.cameraService.update(dt);
        }
    }

    /**
     * Aplica una nueva configuración a la cámara
     */
    applyCameraConfig(config: CameraConfig): void {
        if (!this.cameraService) {
            console.warn("[CameraSystem] CameraService no disponible para aplicar config");
            return;
        }

        this.config = config;


        // Usar el método setConfig del CameraService directamente
        this.cameraService.setConfig(config);
    }

    /**
     * Habilita o deshabilita los controles de cámara
     */
    setControlsEnabled(enabled: boolean): void {
        if (!this.cameraService) {
            console.warn("[CameraSystem] CameraService no disponible para controlar enabled");
            return;
        }

        if (enabled) {
            // Habilitar controles básicos
            this.cameraService.setEnablePan(false); // Mantener pan deshabilitado por defecto
            this.cameraService.setEnableZoom(true);
            // TODO: Habilitar rotación (orbit) cuando sea necesario
        } else {
            // Deshabilitar todos los controles
            this.cameraService.setEnablePan(false);
            this.cameraService.setEnableZoom(false);
            // TODO: Deshabilitar rotación (orbit) cuando sea necesario
        }

        console.log(`[CameraSystem] ${enabled ? "🎮 Controles habilitados" : "🚫 Controles deshabilitados"}`);
    }

    /**
     * Configura si se debe auto-configurar para la sala activa
     */
    setAutoConfigureForRoom(enabled: boolean): void {
        console.log(`[CameraSystem] ${enabled ? "🏠 Auto-configuración para sala habilitada" : "🏠 Auto-configuración para sala deshabilitada"}`);
    }

    /**
     * Obtiene la configuración actual de la cámara
     */
    getCurrentConfig(): CameraConfig | null {
        return this.config;
    }

    /**
     * Obtiene la posición actual de la cámara
     */
    getPosition(): THREE.Vector3 | null {
        return this.cameraService?.getPosition() || null;
    }

    /**
     * Obtiene el target actual de la cámara
     */
    getTarget(): THREE.Vector3 | null {
        return this.cameraService?.getTarget() || null;
    }

    getService(): CameraService | null {
        return this.cameraService;
    }

    /**
     * Configura listeners para eventos del CameraService
     */
    private setupCameraListeners(): void {
        if (!this.cameraService) return;

        this.cameraService.addEventListener("controlstart", () => {
            console.log("[CameraSystem] 🎬 Movimiento de cámara iniciado");
        });

        this.cameraService.addEventListener("controlend", () => {
            console.log("[CameraSystem] 🛑 Movimiento de cámara finalizado");
            this.core.emit("camera:controlend", {
                position: this.cameraService?.getPosition(),
                target: this.cameraService?.getTarget(),
            });
        });

        this.cameraService.addEventListener("rest", () => {
            this.checkCameraInPortal();
        });


    }

    checkCameraInPortal = () => {
        if (!this.cameraService) return;
        const cameraPos = this.cameraService.getPosition();
        const portalPos = new THREE.Vector3();
        this.core.getCurrentRoom()?.getPortal()?.getWorldPosition(portalPos);
        const distance = cameraPos.distanceTo(portalPos);
        const threshold = 1.5; // distancia umbral para considerar que la cámara está "dentro" del portal

        // Ajustar controles de cámara según proximidad al portal
        // para no permitir zoom o paneo cuando estamos dentro del portal
        // y aumentar la sensacion de gravedad al estar dentro del portal
        if (distance < threshold) {
            this.cameraService.setDraggingSmoothTime(1);
            this.cameraService.setMaxPolarAngle(1.63);
            this.cameraService.setMinPolarAngle(1.5);
            this.cameraService.setAzimuthMaxAngle(0.1);
            this.cameraService.setAzimuthMinAngle(-0.1);
            this.cameraService.setEnableZoom(false);
            this.cameraService.setEnablePan(false);
            this.core.emit("camera:inside-portal", { distance });
        } else {
            this.cameraService.setDraggingSmoothTime(0.1);
            const defaultConfig = this.cameraService.getDefaultConfig();
            if (defaultConfig) {
                this.cameraService.setMaxPolarAngle(defaultConfig.maxPolarAngle!);
                this.cameraService.setMinPolarAngle(defaultConfig.minPolarAngle!);
                this.cameraService.setAzimuthMaxAngle(defaultConfig.maxAzimuthAngle!);
                this.cameraService.setAzimuthMinAngle(defaultConfig.minAzimuthAngle!);
                this.cameraService.setEnableZoom(true);
                this.cameraService.setEnablePan(!!defaultConfig.enablePan);
            }
            this.core.emit("camera:outside-portal", { distance });

        }
    }

    dispose(): void {
        // Cleanup de listeners si es necesario
        if (this.cameraService) {
            // El CameraService maneja su propio cleanup
            console.log("[CameraSystem] 🧹 Limpiando CameraService");
            this.cameraService.removeEventListener("controlstart", () => { });
            this.cameraService.removeEventListener("controlend", () => { });
            this.cameraService.removeEventListener("rest", () => { });
        }

        super.dispose();
    }
}

// Export por defecto para compatibilidad
export default CameraSystem;