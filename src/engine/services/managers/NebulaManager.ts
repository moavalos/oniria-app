import * as THREE from "three";
import { EngineCore } from "@engine/core";
import { MaterialService } from "../MaterialService";
import { AssetManager } from '../assets/AssetManager';


/**
 * Gestor simple para crear un plano con shader de nebula como fondo
 * 
 * A diferencia de NodeManager, este gestor es mucho más simple ya que
 * la nebula no es una entidad interactiva, solo un plano de fondo
 * con un shader procedural.
 */
export class NebulaManager {

    private materialService: MaterialService | null = null;

    private assetManager: AssetManager | null = null;

    private nebulaPlane: THREE.Mesh | null = null;

    private core: EngineCore;

    private mouse: THREE.Vector2 = new THREE.Vector2(0, 0);

    private domElement: HTMLElement | null = null;

    /**
     * Crea una nueva instancia del gestor de nebula
     * 
     * @param core - Instancia del núcleo del motor para acceso a servicios
     * @param domElement - Elemento del canvas para el listener del mouse
     */
    constructor(core: EngineCore, domElement: HTMLElement) {
        this.core = core;
        this.domElement = domElement;
        this.init();
    }

    /**
     * Inicializa los servicios necesarios del motor
     */
    init(): void {
        this.materialService = this.core.getService(MaterialService);
        this.assetManager = this.core.getService(AssetManager);

        // Inicializar el listener del mouse
        this.setupMouseListener();

        console.log("[NebulaManager]: Servicios inicializados");
    }

    /**
     * Configura el listener para capturar el movimiento del mouse
     * En ShaderToy, el mouse es simplemente la posición actual normalizada
     */
    private setupMouseListener(): void {
        if (!this.domElement) {
            console.warn("[NebulaManager]: No se puede configurar el listener del mouse sin domElement");
            return;
        }

        const onMouseMove = (event: MouseEvent) => {
            // Normalizar coordenadas del mouse a rango [0, 1] como en ShaderToy
            const rect = this.domElement!.getBoundingClientRect();
            this.mouse.x = (event.clientX - rect.left) / rect.width;
            this.mouse.y = 1.0 - (event.clientY - rect.top) / rect.height; // Invertir Y para coincidir con ShaderToy
        };

        this.domElement.addEventListener('mousemove', onMouseMove);

        console.log("[NebulaManager]: Listener de mouse configurado");
    }

    /**
     * Crea un nuevo plano con el shader de nebula
     * 
     * @returns El mesh del plano de nebula
     */
    createNebula(): THREE.Mesh {
        // Crear geometría de plano grande para cubrir el fondo
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Crear mesh con material básico temporal
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
        mesh.name = "nebulaPlane";
        //mesh.rotation.y = -Math.PI / 2; // Rotar para que quede horizontal

        this.nebulaPlane = mesh;

        // Aplicar el shader de nebula al mesh
        this.applyNebulaMaterial(mesh);

        // Emitir evento de nebula lista
        this.core.emit('nebula:ready', { nebula: mesh });

        return mesh;
    }

    /**
     * Obtiene el plano de nebula actual
     * 
     * @returns El mesh del plano o null si no existe
     */
    getNebula(): THREE.Mesh | null {
        return this.nebulaPlane;
    }

    /**
     * Verifica si la nebula está lista (creada)
     * 
     * @returns true si la nebula existe, false si no
     */
    isNebulaReady(): boolean {
        return this.nebulaPlane !== null;
    }

    /**
     * Aplica el material con shader de nebula al mesh
     * 
     * @param mesh - Mesh al que aplicar el material
     */
    applyNebulaMaterial(mesh: THREE.Mesh): void {
        if (!this.materialService) {
            console.warn("[NebulaManager]: MaterialService no disponible");
            return;
        }

        this.materialService.applyNebulaMaterial(mesh, this.getUniformsForNebula());
    }

    /**
     * Actualiza el plano de nebula en cada frame
     * 
     * @param deltaTime - Tiempo transcurrido desde el último frame
     */
    update(deltaTime: number): void {
        if (!this.nebulaPlane || !this.nebulaPlane.material) return;

        const material = this.nebulaPlane.material as THREE.ShaderMaterial;

        // Actualizar uniforms animados
        if (material.uniforms.uTime) {
            material.uniforms.uTime.value += deltaTime;
        }

        // Actualizar coordenadas del mouse
        if (material.uniforms.uMouse) {
            material.uniforms.uMouse.value.copy(this.mouse);
        }
    }

    /**
     * Destruye el plano de nebula y limpia recursos
     */
    destroyNebula(): void {
        if (this.nebulaPlane) {
            // Limpiar geometría
            this.nebulaPlane.geometry.dispose();

            // Limpiar material
            if (this.nebulaPlane.material) {
                const material = this.nebulaPlane.material as THREE.ShaderMaterial;
                material.dispose();
            }

            this.nebulaPlane = null;
            console.log("[NebulaManager]: Nebula destruida");

            // Emitir evento de nebula destruida
            this.core.emit('nebula:destroyed', {});
        }
    }

    /**
     * Obtiene los uniforms configurados para el shader de nebula
     * 
     * @returns Objeto con todos los uniforms necesarios para el shader
     */
    getUniformsForNebula(): Record<string, any> {
        if (!this.assetManager) {
            console.warn("[NebulaManager]: AssetManager no disponible");
            return {};
        }
        const noiseGrainTexture = this.assetManager.getTexture('/textures/noise_grain.png');
        const noiseSmallTexture = this.assetManager.getTexture('/textures/noise_small.png');

        if (noiseGrainTexture) {
            noiseGrainTexture.wrapS = THREE.RepeatWrapping;
            noiseGrainTexture.wrapT = THREE.RepeatWrapping;
        }

        if (noiseSmallTexture) {
            noiseSmallTexture.wrapS = THREE.RepeatWrapping;
            noiseSmallTexture.wrapT = THREE.RepeatWrapping;
        }
        return {
            uTime: { value: 0 },
            uResolution: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            uMouse: {
                value: new THREE.Vector2(0, 0),
            },
            uTexture0: { value: noiseSmallTexture }, // Textura 0 - la asignaremos después si es necesaria
            uTexture1: { value: null }, // Textura 1 - keyboard (puede ser null)
            uTexture2: { value: noiseGrainTexture }, // Textura 2 - la asignaremos después si es necesaria
        };
    }

    /**
     * Limpia recursos
     */
    dispose(): void {
        this.destroyNebula();
        this.materialService = null;
    }
}
