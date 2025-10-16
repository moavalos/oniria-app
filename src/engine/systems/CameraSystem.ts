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
            console.error("[CameraSystem] CameraService no disponible");
            return;
        }


        this.applyCameraConfig(this.config!);


        // Configurar listeners del CameraService
        this.setupCameraListeners();

        console.log("[CameraSystem] ✅ Inicializado con CameraService");
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

        // Log detallado de la configuración que se va a aplicar
        console.log("[CameraSystem] 🎥 Aplicando configuración:", {
            position: config.position,
            target: config.target,
            minDistance: config.minDistance,
            maxDistance: config.maxDistance,
        });

        // Usar el método setConfig del CameraService directamente
        this.cameraService.setConfig(config);

        // Verificar que se aplicó correctamente
        console.log("[CameraSystem] 📊 Posición actual después de aplicar config:",
            this.cameraService.getPosition());
        console.log("[CameraSystem] � Target actual después de aplicar config:",
            this.cameraService.getTarget());

        console.log("[CameraSystem] ✅ Configuración aplicada completamente");
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

    /**
     * Configura listeners para eventos del CameraService
     */
    private setupCameraListeners(): void {
        if (!this.cameraService) return;

        // Configurar listeners cuando estén disponibles en CameraService
        // TODO: implementar eventos del CameraService

        console.log("[CameraSystem] 📡 Listeners del CameraService configurados");
    }

    dispose(): void {
        // Cleanup de listeners si es necesario
        if (this.cameraService) {
            // El CameraService maneja su propio cleanup
        }

        super.dispose();
    }
}

// Export por defecto para compatibilidad
export default CameraSystem;