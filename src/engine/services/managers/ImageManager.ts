import * as THREE from "three";
import { EngineCore } from "@engine/core";
import { MaterialService } from "../MaterialService";

/**
 * Gestor para mostrar una imagen con efecto de reveal usando shader
 * 
 * Crea un plano delante de la nebula con un shader animado que revela
 * la imagen con un efecto de noise perlin radial.
 */
export class ImageManager {
    private materialService: MaterialService | null = null;

    private imagePlane: THREE.Mesh | null = null;

    private core: EngineCore;

    private imageTexture: THREE.Texture | null = null;

    private textureLoader: THREE.TextureLoader;

    private isAnimating: boolean = false;

    /**
     * Crea una nueva instancia del gestor de imagen
     * 
     * @param core - Instancia del núcleo del motor para acceso a servicios
     */
    constructor(core: EngineCore) {
        this.core = core;
        this.textureLoader = new THREE.TextureLoader();
        this.init();
    }

    /**
     * Inicializa los servicios necesarios del motor
     */
    init(): void {
        this.materialService = this.core.getService(MaterialService);
        console.log("[ImageManager]: Servicios inicializados");
    }

    /**
     * Crea un plano con la imagen y el shader de reveal
     * 
     * @param imageUrl - URL de la imagen a mostrar (puede ser externa)
     * @returns Promise que resuelve con el mesh del plano
     */
    async createImagePlane(imageUrl: string): Promise<THREE.Mesh> {
        // Cargar la textura de la imagen
        this.imageTexture = await this.loadTexture(imageUrl);

        // Crear geometría de plano
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Crear mesh con material básico temporal
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
        mesh.name = "imagePlane";

        // Posicionar delante de la nebula (z: -4.5 está delante de z: -5)
        mesh.position.z = -4.5;

        this.imagePlane = mesh;

        // Aplicar el shader de reveal
        this.applyImageRevealMaterial(mesh);

        // Iniciar animación de reveal
        this.startRevealAnimation();

        // Emitir evento de imagen lista
        this.core.emit('image:ready', { image: mesh });

        return mesh;
    }

    /**
     * Carga una textura desde una URL (puede ser externa)
     * 
     * @param url - URL de la imagen
     * @returns Promise que resuelve con la textura cargada
     */
    private loadTexture(url: string): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                (texture) => {
                    // Configurar textura
                    texture.wrapS = THREE.ClampToEdgeWrapping;
                    texture.wrapT = THREE.ClampToEdgeWrapping;
                    texture.minFilter = THREE.LinearFilter;
                    console.log("[ImageManager]: Textura cargada:", url);
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error("[ImageManager]: Error al cargar textura:", error);
                    reject(error);
                }
            );
        });
    }

    /**
     * Aplica el material con shader de reveal al mesh
     * 
     * @param mesh - Mesh al que aplicar el material
     */
    applyImageRevealMaterial(mesh: THREE.Mesh): void {
        if (!this.materialService) {
            console.warn("[ImageManager]: MaterialService no disponible");
            return;
        }

        if (!this.imageTexture) {
            console.warn("[ImageManager]: No hay textura de imagen cargada");
            return;
        }

        this.materialService.applyImageRevealMaterial(
            mesh,
            this.getUniformsForImageReveal()
        );
    }

    /**
     * Inicia la animación de reveal
     */
    private startRevealAnimation(): void {
        this.isAnimating = true;
        this.core.emit('image:reveal-start', {});
    }

    /**
     * Obtiene el plano de imagen actual
     * 
     * @returns El mesh del plano o null si no existe
     */
    getImagePlane(): THREE.Mesh | null {
        return this.imagePlane;
    }

    /**
     * Verifica si la imagen está lista (creada)
     * 
     * @returns true si la imagen existe, false si no
     */
    isImageReady(): boolean {
        return this.imagePlane !== null;
    }

    /**
     * Verifica si la animación está en progreso
     * 
     * @returns true si está animando, false si no
     */
    isRevealing(): boolean {
        return this.isAnimating;
    }

    /**
     * Actualiza el plano de imagen en cada frame
     * 
     * @param deltaTime - Tiempo transcurrido desde el último frame
     */
    update(deltaTime: number): void {
        if (!this.imagePlane || !this.imagePlane.material) return;

        const material = this.imagePlane.material as THREE.ShaderMaterial;

        // Actualizar uniforms animados
        if (material.uniforms.uTime) {
            material.uniforms.uTime.value += deltaTime;
        }

        // Animar el progreso del reveal
        if (this.isAnimating && material.uniforms.uProgress) {
            // Incrementar progreso suavemente (tarda ~3 segundos)
            const progressSpeed = 0.35; // Velocidad del reveal
            material.uniforms.uProgress.value += deltaTime * progressSpeed;

            // Detener animación cuando llegue a 1.0
            if (material.uniforms.uProgress.value >= 1.0) {
                material.uniforms.uProgress.value = 1.0;
                this.isAnimating = false;
                this.core.emit('image:reveal-complete', {});
            }
        }
    }

    /**
     * Destruye el plano de imagen y limpia recursos
     */
    destroyImage(): void {
        if (this.imagePlane) {
            // Limpiar geometría
            this.imagePlane.geometry.dispose();

            // Limpiar material
            if (this.imagePlane.material) {
                const material = this.imagePlane.material as THREE.ShaderMaterial;
                material.dispose();
            }

            this.imagePlane = null;
            console.log("[ImageManager]: Imagen destruida");

            // Emitir evento de imagen destruida
            this.core.emit('image:destroyed', {});
        }

        // Limpiar textura
        if (this.imageTexture) {
            this.imageTexture.dispose();
            this.imageTexture = null;
        }

        this.isAnimating = false;
    }

    /**
     * Obtiene los uniforms configurados para el shader de reveal
     * 
     * @returns Objeto con todos los uniforms necesarios para el shader
     */
    getUniformsForImageReveal(): Record<string, any> {
        return {
            uTexture: { value: this.imageTexture },
            uTime: { value: 0 },
            uProgress: { value: 0.0 }, // 0.0 = oculta, 1.0 = completamente visible
        };
    }

    /**
     * Reinicia la animación de reveal
     */
    resetReveal(): void {
        if (!this.imagePlane || !this.imagePlane.material) return;

        const material = this.imagePlane.material as THREE.ShaderMaterial;

        if (material.uniforms.uProgress) {
            material.uniforms.uProgress.value = 0.0;
            this.startRevealAnimation();
        }
    }

    /**
     * Limpia recursos
     */
    dispose(): void {
        this.destroyImage();
        this.materialService = null;
    }
}
