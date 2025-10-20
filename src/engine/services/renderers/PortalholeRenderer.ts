import * as THREE from "three";

interface WormholeConfig {
    normal?: number;
    slow?: number;
    scale?: number;
    speed?: number;
    upRatio?: number;
    upScale?: number;
    downRatio?: number;
    downScale?: number;
}

/**
 * Clase para crear efectos de túnel/agujero de gusano para transiciones dimensionales
 * 
 * Proporciona un efecto visual de túnel cilíndrico con animación de texturas
 * y efectos de escala para simular viajes entre dimensiones o portales.
 * Incluye controles de activación, desactivación y sincronización con cámara.
 */
export class PortalholeRenderer {
    private group: THREE.Object3D | null = null;

    private texture: THREE.Texture | null = null;

    private ready: boolean = false;

    private hyper: boolean = false;

    private scene: THREE.Scene | null = null;

    private camera: THREE.Camera | null = null;

    private startPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    private config: Required<WormholeConfig> = {
        normal: 0.0005,
        slow: 0.0005,
        scale: 1,
        speed: 10,
        upRatio: 1.06,
        upScale: 1.06,
        downRatio: 1.85,
        downScale: 1.85,
    };

    private fading: boolean = false;

    private originalOpacity: number = 1.0;

    private fadeSpeed: number = 0.09;

    /**
     * Crea una nueva instancia del efecto Portalhole
     * 
     * @param scene - Escena de Three.js donde agregar el efecto
     * @param camera - Cámara para sincronizar posición y rotación
     * @param config - Configuración opcional para los parámetros del efecto
     */
    constructor(scene: THREE.Scene, camera: THREE.Camera, config?: Partial<WormholeConfig>) {
        this.scene = scene;
        this.camera = camera;

        if (config) {
            this.config = { ...this.config, ...config };
        }

        console.log("[Portalhole]: Instancia creada");
    }

    /**
     * Inicializa el efecto con una textura específica
     * 
     * @param texture - Textura a utilizar para el efecto de túnel
     */
    init(texture: THREE.Texture): void {
        this.createWormhole(texture);

        this.ready = true;

        console.log("[Portalhole]: Efecto inicializado");
    }

    setPosition(position: THREE.Vector3): void {
        this.startPosition.copy(position);
        if (this.group) {
            this.group.position.copy(position);
        }
    }

    /**
     * Actualiza el efecto en cada frame
     * 
     * @param _deltaTime - Tiempo transcurrido desde el último frame (no utilizado actualmente)
     */
    update(): void {
        if (!this.ready || !this.group || !this.texture || !this.camera) return;

        // Manejar fadeOut
        if (this.fading) {
            this.group.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    const material = child.material as THREE.MeshLambertMaterial;
                    if (material.opacity > 0) {
                        material.opacity -= this.fadeSpeed;
                        if (material.opacity <= 0) {
                            material.opacity = 0;
                            this.completeFadeOut();
                        }
                    }
                }
            });
            return; // No continuar con la animación normal durante el fade
        }

        if (this.hyper) {
            // Acelerar durante el hiper-viaje
            this.config.slow = (this.config.slow >= this.config.speed)
                ? this.config.speed
                : this.config.slow * this.config.upRatio;

            this.config.scale = (this.config.scale <= 0.1)
                ? 0.1
                : this.config.scale / this.config.upScale;

            // Animar textura
            this.texture.offset.y -= this.config.normal * this.config.slow;
            this.texture.needsUpdate = true;

            // Aplicar escala
            this.group.scale.set(this.config.scale, this.config.scale, 1);

            // Sincronizar con cámara
            this.syncWithCamera();

            // Rotación adicional
            this.group.rotation.z -= 0.008;
            return;
        }

        // Desacelerar cuando no está en hiper-viaje
        this.config.slow = (this.config.slow <= 1)
            ? 1
            : this.config.slow / this.config.downRatio;

        this.config.scale = (this.config.scale >= 1)
            ? 1
            : this.config.scale * this.config.downScale;
    }

    /**
     * Crea la geometría y materiales del wormhole
     * 
     * @param texture - Textura para el efecto
     */
    private createWormhole(texture: THREE.Texture): void {
        this.group = new THREE.Object3D();

        if (this.camera) {
            this.group.position.z = this.camera.position.z;
        }

        this.texture = texture;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.wrapS = THREE.RepeatWrapping;

        // Crear geometría del cilindro
        const geometry = new THREE.CylinderGeometry(100, 0, 300, 40, 40, true);
        const material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            opacity: 1,
            map: this.texture,
            blending: THREE.NormalBlending,
            side: THREE.BackSide,
            transparent: true,
            depthTest: true,
        });

        // Crear luz de color aleatorio
        const color = new THREE.Color();
        color.setHSL(.9, 1, 0.6);

        const light = new THREE.PointLight(color, 20, 100);
        light.position.set(this.startPosition.x, this.startPosition.y, this.startPosition.z);

        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(this.startPosition.x, this.startPosition.y, this.startPosition.z);
        cylinder.rotation.x = Math.PI / 2;

        this.group.add(cylinder);
        this.group.add(light);

        console.log("[Portalhole]: Geometría del túnel creada");
    }

    /**
     * Sincroniza la posición y rotación del túnel con la cámara
     */
    private syncWithCamera(): void {
        if (!this.group || !this.camera) return;

        this.group.rotation.x = this.camera.rotation.x;
        this.group.rotation.y = this.camera.rotation.y;
        this.group.rotation.z = this.camera.rotation.z;

        this.group.position.x = this.camera.position.x;
        this.group.position.y = this.camera.position.y;
        this.group.position.z = this.camera.position.z;
    }

    /**
     * Inicia el efecto de hiper-viaje
     */
    start(): void {
        if (!this.scene || !this.group) {
            console.warn("[Portalhole]: No se puede iniciar, faltan referencias");
            return;
        }

        // Restaurar opacidad original si venimos de un fade
        this.fading = false;
        this.group.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                const material = child.material as THREE.MeshLambertMaterial;
                material.opacity = this.originalOpacity;
            }
        });

        this.scene.add(this.group);
        this.hyper = true;
        console.log("[Portalhole]: Hiper-viaje iniciado");
    }

    /**
     * Completa el efecto de fadeOut removiendo el objeto de la escena
     */
    private completeFadeOut(): void {
        if (!this.scene || !this.group) return;

        this.fading = false;
        this.hyper = false;
        this.scene.remove(this.group);
        console.log("[Portalhole]: FadeOut completado, túnel removido");
    }

    /**
     * Detiene el efecto de hiper-viaje con fadeOut animation
     */
    stop(): void {
        if (!this.scene || !this.group) {
            console.warn("[Portalhole]: No se puede detener, faltan referencias");
            return;
        }

        console.log("[Portalhole]: Iniciando fadeOut del túnel...");

        // Iniciar el proceso de fadeOut en lugar de remover inmediatamente
        this.fading = true;
    }

    /**
     * Verifica si el efecto está activo
     * 
     * @returns Verdadero si el hiper-viaje está activo
     */
    isActive(): boolean {
        return this.hyper;
    }

    /**
     * Verifica si el efecto está listo para usar
     * 
     * @returns Verdadero si está inicializado y listo
     */
    isReady(): boolean {
        return this.ready;
    }

    /**
     * Limpia recursos y remueve el efecto de la escena
     */
    dispose(): void {
        if (this.hyper) {
            this.stop();
        }

        if (this.group) {
            this.group.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(material => material.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });
        }

        this.group = null;
        this.texture = null;
        this.scene = null;
        this.camera = null;
        this.ready = false;

        console.log("[Portalhole]: Recursos liberados");
    }
}
