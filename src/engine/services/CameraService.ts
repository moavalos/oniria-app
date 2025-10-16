import CameraControls from "camera-controls";
import type { CameraControlsEventMap } from "camera-controls/dist/types";
import * as THREE from "three";

export type CameraConfig = {
    minDistance?: number;
    maxDistance?: number;
    position?: THREE.Vector3;
    target?: THREE.Vector3;
    smoothTime?: number;
    maxPolarAngle?: number;
    minPolarAngle?: number;
    maxAzimuthAngle?: number;
    minAzimuthAngle?: number;
    enablePan?: boolean;
    boundaryEnclosesCamera?: boolean;
};

/**
 * Servicio para gestionar controles de cámara y transiciones suaves
 */
export class CameraService {
    private static installed = false;

    private defaultConfig: CameraConfig = {};

    private controls: CameraControls;

    /**
     * Crea una nueva instancia del servicio de cámara
     * 
     * @param camera - Cámara de Three.js a controlar
     * @param domElement - Elemento DOM para capturar eventos de entrada
     */
    constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
        if (!CameraService.installed) {
            CameraControls.install({ THREE });
            CameraService.installed = true;
        }
        this.controls = new CameraControls(camera, domElement);
    }

    /**
     * Actualiza los controles de cámara en cada frame
     * 
     * @param delta - Tiempo transcurrido desde el último frame
     */
    update(delta: number) {
        this.controls.update(delta);
    }

    /**
     * Establece la posición y objetivo de la cámara
     * 
     * @param pos - Posición de la cámara
     * @param target - Objetivo al que mira la cámara
     * @param smooth - Si la transición debe ser suave
     */
    setLookAt(pos: THREE.Vector3, target: THREE.Vector3, smooth = true) {
        this.controls.setLookAt(
            pos.x,
            pos.y,
            pos.z,
            target.x,
            target.y,
            target.z,
            smooth
        );
    }

    reset(smooth = true) {
        this.controls.reset(smooth);
    }

    setConfig(config: CameraConfig = {
        minDistance: 3,
        maxDistance: 6,
        position: new THREE.Vector3(-3.5, 3, 6),
        target: new THREE.Vector3(0, 1.8, 0),
        smoothTime: 0.5,
        maxPolarAngle: Math.PI / 2,
        minPolarAngle: Math.PI / 3,
        maxAzimuthAngle: 0,
        minAzimuthAngle: -Math.PI / 2.5,
        boundaryEnclosesCamera: true,
        enablePan: false,
    }) {
        console.log("[CameraService] 🔧 setConfig llamado con:", config);
        this.applyConfig(config);
        this.defaultConfig = config;

        // Verificar que se aplicó correctamente
        console.log("[CameraService] 📊 Posición actual después de setConfig:", this.getPosition());
        console.log("[CameraService] 🎯 Target actual después de setConfig:", this.getTarget());
    }

    resetToDefault() {
        this.applyConfig(this.defaultConfig);
    }

    getDefaultConfig() {
        return this.defaultConfig;
    }

    applyConfig(config: CameraConfig) {
        console.log("[CameraService] 🔧 applyConfig llamado con:", config);

        // Aplicar configuraciones solo si están definidas
        if (config.minDistance !== undefined && config.maxDistance !== undefined) {
            this.setMinMaxDistance(config.minDistance, config.maxDistance);
        }

        if (config.position && config.target) {
            console.log("[CameraService] 📍 Aplicando posición:", config.position, "y target:", config.target);
            this.setLookAt(config.position, config.target, true);
        }

        if (config.smoothTime !== undefined) {
            this.setSmoothTime(config.smoothTime);
        }

        if (config.maxPolarAngle !== undefined) {
            this.setMaxPolarAngle(config.maxPolarAngle);
        }

        if (config.minPolarAngle !== undefined) {
            this.setMinPolarAngle(config.minPolarAngle);
        }

        if (config.maxAzimuthAngle !== undefined) {
            this.setAzimuthMaxAngle(config.maxAzimuthAngle);
        }

        if (config.minAzimuthAngle !== undefined) {
            this.setAzimuthMinAngle(config.minAzimuthAngle);
        }

        if (config.boundaryEnclosesCamera !== undefined) {
            this.setBoundaryEnclosesCamera(config.boundaryEnclosesCamera);
        }

        if (config.enablePan !== undefined) {
            this.setEnablePan(config.enablePan);
        }

        console.log("[CameraService] ✅ applyConfig completado");
    }

    resetInitialPosition(smooth = true) {
        if (this.defaultConfig.position && this.defaultConfig.target) {
            this.setLookAt(this.defaultConfig.position, this.defaultConfig.target, smooth);
        }
    }

    setMinMaxDistance(min: number, max: number) {
        this.controls.minDistance = min;
        this.controls.maxDistance = max;
    }

    moveTo(x: number, y: number, z: number, smooth = true) {
        this.controls.setPosition(x, y, z, smooth);
    }

    setSmoothTime(time: number) {
        this.controls.smoothTime = time;
    }

    setMaxPolarAngle(angle: number) {
        this.controls.maxPolarAngle = angle;
    }

    setMinPolarAngle(angle: number) {
        this.controls.minPolarAngle = angle;
    }

    setAzimuthMaxAngle(angle: number) {
        this.controls.maxAzimuthAngle = angle;
    }

    setAzimuthMinAngle(angle: number) {
        this.controls.minAzimuthAngle = angle;
    }

    zoomTo(distance: number, smooth = true) {
        this.controls.zoomTo(distance, smooth);
    }

    setDraggingSmoothTime(time: number) {
        this.controls.draggingSmoothTime = time;
    }

    setBoundaryFriction(friction: number) {
        this.controls.boundaryFriction = friction;
    }

    setDampingFactor(factor: number) {
        this.controls.dampingFactor = factor;
    }

    setBoundaryEnclosesCamera(value: boolean) {
        this.controls.boundaryEnclosesCamera = value;
    }

    setEnablePan(value: boolean) {
        this.controls.mouseButtons.right = value ? CameraControls.ACTION.TRUCK : CameraControls.ACTION.NONE;
    }

    setEnableZoom(value: boolean) {
        this.controls.mouseButtons.wheel = value ? CameraControls.ACTION.DOLLY : CameraControls.ACTION.NONE;
    }

    addEventListener(type: keyof CameraControlsEventMap, listener: (_event: any) => void) {
        this.controls.addEventListener(type, listener);
    }

    removeEventListener(type: keyof CameraControlsEventMap, listener: (_event: any) => void) {
        this.controls.removeEventListener(type, listener);
    }

    setRestThreshold(threshold: number) {
        this.controls.restThreshold = threshold;
    }

    // Métodos para obtener información actual de la cámara
    getPosition(): THREE.Vector3 {
        return this.controls.camera.position.clone();
    }

    getTarget(): THREE.Vector3 {
        return this.controls.getTarget(new THREE.Vector3());
    }

    getDistance(): number {
        return this.controls.distance;
    }




}
