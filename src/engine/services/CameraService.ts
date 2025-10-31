import * as THREE from "three";
import CameraControls from "camera-controls";
import type { CameraControlsEventMap } from "camera-controls/dist/types";

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
 * Servicio para gestión de controles de cámara 3D con transiciones suaves
 * 
 * Proporciona una interfaz unificada para controlar la cámara en escenas 3D,
 * incluyendo posicionamiento, rotación, zoom y restricciones de movimiento.
 * Utiliza la librería camera-controls para funcionalidad avanzada.
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
     * @param delta - Tiempo transcurrido desde el último frame en segundos
     * @returns Verdadero si la cámara necesita renderizado, falso en caso contrario
     */
    update(delta: number): boolean {
        return this.controls.update(delta);
    }

    /**
     * Establece la posición y objetivo de la cámara
     * 
     * @param pos - Posición de la cámara en coordenadas 3D
     * @param target - Objetivo al que mira la cámara en coordenadas 3D
     * @param smooth - Si la transición debe ser suave (por defecto: true)
     */
    setLookAt(pos: THREE.Vector3, target: THREE.Vector3, smooth = true): void {
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

    /**
     * Resetea la cámara a su estado inicial
     * 
     * @param smooth - Si la transición debe ser suave (por defecto: true)
     */
    reset(smooth = true): void {
        this.controls.reset(smooth);
    }

    /**
     * Establece la configuración de la cámara con valores por defecto
     * 
     * @param config - Configuración de la cámara a aplicar
     */
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
    }): void {
        console.log("[CameraService]: Configurando cámara con nueva configuración");
        this.applyConfig(config);
        this.defaultConfig = config;
    }

    /**
     * Resetea la cámara a la configuración por defecto
     */
    resetToDefault(): void {
        this.applyConfig(this.defaultConfig);
    }

    /**
     * Obtiene la configuración por defecto de la cámara
     * 
     * @returns Configuración por defecto actual
     */
    getDefaultConfig(): CameraConfig {
        return this.defaultConfig;
    }

    /**
     * Aplica una configuración específica a los controles de cámara
     * 
     * @param config - Configuración a aplicar
     */
    applyConfig(config: CameraConfig): void {
        // Aplicar distancias mínima y máxima
        if (config.minDistance !== undefined && config.maxDistance !== undefined) {
            this.setMinMaxDistance(config.minDistance, config.maxDistance);
        }

        // Aplicar posición y objetivo
        if (config.position && config.target) {
            this.setLookAt(config.position, config.target, true);
        }

        // Aplicar tiempo de suavizado
        if (config.smoothTime !== undefined) {
            this.setSmoothTime(config.smoothTime);
        }

        // Aplicar ángulos polares
        if (config.maxPolarAngle !== undefined) {
            this.setMaxPolarAngle(config.maxPolarAngle);
        }

        if (config.minPolarAngle !== undefined) {
            this.setMinPolarAngle(config.minPolarAngle);
        }

        // Aplicar ángulos azimutales
        if (config.maxAzimuthAngle !== undefined) {
            this.setAzimuthMaxAngle(config.maxAzimuthAngle);
        }

        if (config.minAzimuthAngle !== undefined) {
            this.setAzimuthMinAngle(config.minAzimuthAngle);
        }

        // Aplicar límites de frontera
        if (config.boundaryEnclosesCamera !== undefined) {
            this.setBoundaryEnclosesCamera(config.boundaryEnclosesCamera);
        }

        // Aplicar habilitación de paneo
        if (config.enablePan !== undefined) {
            this.setEnablePan(config.enablePan);
        }
    }

    /**
     * Resetea la cámara a su posición inicial configurada
     * 
     * @param smooth - Si la transición debe ser suave (por defecto: true)
     */
    resetInitialPosition(smooth = true): void {
        if (this.defaultConfig.position && this.defaultConfig.target) {
            this.setLookAt(this.defaultConfig.position, this.defaultConfig.target, smooth);
        }
    }

    /**
     * Establece las distancias mínima y máxima de la cámara
     * 
     * @param min - Distancia mínima
     * @param max - Distancia máxima
     */
    setMinMaxDistance(min: number, max: number): void {
        this.controls.minDistance = min;
        this.controls.maxDistance = max;
    }

    /**
     * Mueve la cámara a una posición específica
     * 
     * @param x - Coordenada X
     * @param y - Coordenada Y
     * @param z - Coordenada Z
     * @param smooth - Si el movimiento debe ser suave (por defecto: true)
     */
    moveTo(x: number, y: number, z: number, smooth = true): void {
        this.controls.setPosition(x, y, z, smooth);
    }

    /**
     * Establece el tiempo de suavizado para las transiciones
     * 
     * @param time - Tiempo de suavizado en segundos
     */
    setSmoothTime(time: number): void {
        this.controls.smoothTime = time;
    }

    /**
     * Establece el ángulo polar máximo
     * 
     * @param angle - Ángulo máximo en radianes
     */
    setMaxPolarAngle(angle: number): void {
        this.controls.maxPolarAngle = angle;
    }

    /**
     * Establece el ángulo polar mínimo
     * 
     * @param angle - Ángulo mínimo en radianes
     */
    setMinPolarAngle(angle: number): void {
        this.controls.minPolarAngle = angle;
    }

    /**
     * Establece el ángulo azimutal máximo
     * 
     * @param angle - Ángulo máximo en radianes
     */
    setAzimuthMaxAngle(angle: number): void {
        this.controls.maxAzimuthAngle = angle;
    }

    /**
     * Establece el ángulo azimutal mínimo
     * 
     * @param angle - Ángulo mínimo en radianes
     */
    setAzimuthMinAngle(angle: number): void {
        this.controls.minAzimuthAngle = angle;
    }

    /**
     * Hace zoom a una distancia específica
     * 
     * @param distance - Distancia objetivo
     * @param smooth - Si el zoom debe ser suave (por defecto: true)
     */
    zoomTo(distance: number, smooth = true): void {
        this.controls.zoomTo(distance, smooth);
    }

    /**
     * Establece el tiempo de suavizado durante el arrastre
     * 
     * @param time - Tiempo de suavizado en segundos
     */
    setDraggingSmoothTime(time: number): void {
        this.controls.draggingSmoothTime = time;
    }

    /**
     * Establece la fricción en los límites de la cámara
     * 
     * @param friction - Factor de fricción
     */
    setBoundaryFriction(friction: number): void {
        this.controls.boundaryFriction = friction;
    }

    /**
     * Establece el factor de amortiguamiento
     * 
     * @param factor - Factor de amortiguamiento
     */
    setDampingFactor(factor: number): void {
        this.controls.dampingFactor = factor;
    }

    /**
     * Configura si los límites encierran la cámara
     * 
     * @param value - Si los límites deben encerrar la cámara
     */
    setBoundaryEnclosesCamera(value: boolean): void {
        this.controls.boundaryEnclosesCamera = value;
    }

    /**
     * Habilita o deshabilita el paneo con el botón derecho del ratón
     * 
     * @param value - Si el paneo debe estar habilitado
     */
    setEnablePan(value: boolean): void {
        this.controls.mouseButtons.right = value ? CameraControls.ACTION.TRUCK : CameraControls.ACTION.NONE;
    }

    /**
     * Habilita o deshabilita el zoom con la rueda del ratón
     * 
     * @param value - Si el zoom debe estar habilitado
     */
    setEnableZoom(value: boolean): void {
        this.controls.mouseButtons.wheel = value ? CameraControls.ACTION.DOLLY : CameraControls.ACTION.NONE;
    }

    /**
     * Habilita o deshabilita la rotación con el botón izquierdo del ratón
     * 
     * @param value - Si la rotación debe estar habilitada
     */
    setEnableRotate(value: boolean): void {
        this.controls.mouseButtons.left = value ? CameraControls.ACTION.ROTATE : CameraControls.ACTION.NONE;
    }

    /**
     * Agrega un listener para eventos de los controles de cámara
     * 
     * @param type - Tipo de evento a escuchar
     * @param listener - Función callback para manejar el evento
     */
    addEventListener(type: keyof CameraControlsEventMap, listener: (_event: any) => void): void {
        this.controls.addEventListener(type, listener);
    }

    /**
     * Remueve un listener de eventos de los controles de cámara
     * 
     * @param type - Tipo de evento
     * @param listener - Función callback a remover
     */
    removeEventListener(type: keyof CameraControlsEventMap, listener: (_event: any) => void): void {
        this.controls.removeEventListener(type, listener);
    }

    /**
     * Establece el umbral de reposo para detectar cuando la cámara está quieta
     * 
     * @param threshold - Umbral de reposo
     */
    setRestThreshold(threshold: number): void {
        this.controls.restThreshold = threshold;
    }

    /**
     * Obtiene la posición actual de la cámara
     * 
     * @returns Posición actual de la cámara
     */
    getPosition(): THREE.Vector3 {
        return this.controls.camera.position.clone();
    }

    /**
     * Obtiene el objetivo actual de la cámara
     * 
     * @returns Objetivo actual de la cámara
     */
    getTarget(): THREE.Vector3 {
        return this.controls.getTarget(new THREE.Vector3());
    }

    /**
     * Obtiene la distancia actual de la cámara al objetivo
     * 
     * @returns Distancia actual
     */
    getDistance(): number {
        return this.controls.distance;
    }
}
