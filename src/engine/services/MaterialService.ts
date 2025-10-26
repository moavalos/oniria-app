import * as THREE from "three";

import type { Room } from "@engine/entities/Room";
import portalVertexShader from "@engine/shaders/portal/vertexShader.glsl";
import portalFragmentShader from "@engine/shaders/portal/fragmentShader.glsl";
import blobFragmentShader from "@engine/shaders/nodes/blob/fragmentShader.glsl";
import maskFragmentShader from "@engine/shaders/nodes/blob/fragmentShaderMask.glsl";
import blobVertexShader from "@engine/shaders/nodes/blob/vertexShader.glsl";
import nebulaFragmentShader from "@engine/shaders/nebula/fragmenShader.glsl";
import nebulaVertexShader from "@engine/shaders/nebula/vertexShader.glsl";
import imageRevealFragmentShader from "@engine/shaders/imageReveral/fragmentShader.glsl";
import imageRevealVertexShader from "@engine/shaders/imageReveral/vertexShader.glsl";

/**
 * Servicio para gestión de materiales y texturas en el motor 3D
 * 
 * Proporciona funcionalidad completa para crear, aplicar y gestionar materiales
 * en objetos 3D, incluyendo materiales básicos, con texturas y shaders personalizados.
 * Maneja la aplicación de materiales a rooms, portales y nodos con optimización
 * de memoria y reutilización de recursos.
 */
export class MaterialService {
    private scene: THREE.Scene | THREE.Group = null as any;

    private materialMap: Record<string, THREE.Material> = {};

    constructor() { }

    /**
     * Aplica materiales básicos con texturas usando carga bajo demanda
     * 
     * @param room - La sala a la que aplicar los materiales
     */
    async applyMaterialsToRoom(room: Room): Promise<void> {
        console.log("[MaterialService] Iniciando applyMaterialsToRoom");
        const colorMaterials = new Map<string, THREE.MeshBasicMaterial>();
        this.scene = room.get_Scene()!;
        console.log("[MaterialService] Scene obtenida:", this.scene ? "OK" : "NULL");

        // Función para obtener o crear materiales de color
        // y almacenarlos en un mapa para reutilización
        const getColorMaterial = (hex: string): THREE.MeshBasicMaterial => {
            if (!colorMaterials.has(hex)) {
                colorMaterials.set(
                    hex,
                    new THREE.MeshBasicMaterial({ color: new THREE.Color(hex) })
                );
            }
            return colorMaterials.get(hex)!;
        };

        console.log("[MaterialService] Creando materialMap con texturas");
        this.materialMap = {
            objects: new THREE.MeshBasicMaterial({ map: room.getObjectTexture() }),
            walls: new THREE.MeshBasicMaterial({ map: room.getEnvironmentTexture() }),
        };
        console.log("[MaterialService] MaterialMap creado");

        // Cargar objetos coloreables bajo demanda
        try {
            console.log("[MaterialService] Obteniendo colorableObjects");
            const colorableObjects = await room.getColorableObjects();
            console.log("[MaterialService] ColorableObjects obtenidos:", Object.keys(colorableObjects).length);

            for (const [name, color] of Object.entries(colorableObjects)) {
                if (color) {
                    this.materialMap[name] = getColorMaterial(color);
                }
            }
            console.log("[MaterialService] Materiales de colores aplicados");
        } catch (error) {
            console.warn("[MaterialService]: Error al cargar objetos coloreables para materiales:", error);
        }

        console.log("[MaterialService] Llamando applyToScene");
        this.applyToScene();
        console.log("[MaterialService] applyMaterialsToRoom completado");
    }

    /**
     * Aplica materiales cuando ya tienes los objetos coloreables cargados
     * 
     * @param room - La sala a la que aplicar los materiales
     * @param colorableObjects - Objetos coloreables ya cargados
     */
    applyMaterialsWithColorables(room: Room, colorableObjects: Record<string, string>): void {
        const colorMaterials = new Map<string, THREE.MeshBasicMaterial>();
        this.scene = room.get_Scene()!;

        // Función para obtener o crear materiales de color
        const getColorMaterial = (hex: string): THREE.MeshBasicMaterial => {
            if (!colorMaterials.has(hex)) {
                colorMaterials.set(
                    hex,
                    new THREE.MeshBasicMaterial({ color: new THREE.Color(hex) })
                );
            }
            return colorMaterials.get(hex)!;
        };

        this.materialMap = {
            objects: new THREE.MeshBasicMaterial({ map: room.getObjectTexture() }),
            walls: new THREE.MeshBasicMaterial({ map: room.getEnvironmentTexture() }),
        };

        // Aplicar materiales de objetos coloreables
        for (const [name, color] of Object.entries(colorableObjects)) {
            if (color) {
                this.materialMap[name] = getColorMaterial(color);
            }
        }

        this.applyToScene();
    }

    /**
     * Aplica material con shaders personalizados al portal
     * 
     * @param portal - El objeto 3D del portal
     * @param uniforms - Uniformes para el shader (por defecto: objeto vacío)
     */
    applyMaterialsToPortal(portal: THREE.Object3D | undefined, uniforms = {}): void {
        if (!portal) return;

        const mesh = (portal as THREE.Mesh).getObjectByName("inside") as THREE.Mesh;

        if (!mesh) return;

        mesh.material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            transparent: true,
            depthWrite: true,
            colorWrite: true,
            side: THREE.DoubleSide,
        });
    }

    /**
     * Aplica materiales con shaders personalizados a los nodos
     * 
     * @param node - El grupo de nodos
     * @param uniforms - Uniformes para el shader (por defecto: objeto vacío)
     * @returns El material principal creado o null si no se puede aplicar
     */
    applyMaterialsToNodes(node: THREE.Group<THREE.Object3DEventMap> | undefined, uniforms: Record<string, any> = {}): THREE.ShaderMaterial | null {
        if (!node) return null;

        const mat = new THREE.ShaderMaterial({
            uniforms,
            fragmentShader: blobFragmentShader,
            vertexShader: blobVertexShader,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        // Para el material mask, usar valores específicos de uniforms
        const matMask = new THREE.ShaderMaterial({
            fragmentShader: maskFragmentShader,
            vertexShader: blobVertexShader,
            uniforms: {
                uMaskRadius: { value: uniforms.uMaskRadius }, // controla el tamaño del círculo visible
                uMaskEdgeSmooth: { value: uniforms.uMaskEdgeSmooth }, // suaviza el borde del fade
            },
        });

        node.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;

                if (mesh.name.includes("mask")) {
                    mesh.material = matMask;
                } else {
                    mesh.material = mat;
                }
            }
        });

        // Devolver el material principal para que NodeRenderer pueda mantener referencia
        return mat;
    }

    /**
     * Aplica el material con shader de nebula a un mesh
     * 
     * @param mesh - El mesh al que aplicar el shader de nebula
     * @param uniforms - Uniformes para el shader (por defecto: objeto vacío)
     * @returns El material creado o null si no se puede aplicar
     */
    applyNebulaMaterial(mesh: THREE.Mesh | undefined, uniforms: Record<string, any> = {}): THREE.ShaderMaterial | null {
        if (!mesh) return null;

        const material = new THREE.ShaderMaterial({
            uniforms,
            fragmentShader: nebulaFragmentShader,
            vertexShader: nebulaVertexShader,
            transparent: false,
            depthTest: true,
            depthWrite: true,
            side: THREE.DoubleSide,
        });

        mesh.material = material;

        return material;
    }

    /**
     * Aplica el material con shader de image reveal a un mesh
     * 
     * @param mesh - El mesh al que aplicar el shader de reveal
     * @param uniforms - Uniformes para el shader (por defecto: objeto vacío)
     * @returns El material creado o null si no se puede aplicar
     */
    applyImageRevealMaterial(mesh: THREE.Mesh | undefined, uniforms: Record<string, any> = {}): THREE.ShaderMaterial | null {
        if (!mesh) return null;

        const material = new THREE.ShaderMaterial({
            uniforms,
            fragmentShader: imageRevealFragmentShader,
            vertexShader: imageRevealVertexShader,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            side: THREE.DoubleSide,
        });

        mesh.material = material;

        return material;
    }

    /**
     * Aplica una VideoTexture a un mesh
     * 
     * @param mesh - El mesh al que aplicar el video (por ejemplo, monitor.screen)
     * @param videoUrl - URL del video a reproducir (soporta mp4, webm, ogg)
     * @param options - Opciones de configuración del video
     * @returns El elemento de video y el material creado
     */
    applyVideoTexture(
        mesh: THREE.Mesh | undefined,
        videoUrl: string,
        options: {
            muted?: boolean;
            loop?: boolean;
            controls?: boolean;
            autoplay?: boolean;
            playsInline?: boolean;
            // Opciones de textura
            repeat?: { x: number; y: number };
            offset?: { x: number; y: number };
            center?: { x: number; y: number };
            rotation?: number;
        } = {}
    ): { videoElement: HTMLVideoElement; material: THREE.MeshBasicMaterial } | null {
        if (!mesh) {
            console.warn("[MaterialService] No se puede aplicar video: mesh no proporcionado");
            return null;
        }

        if (!videoUrl) {
            console.error("[MaterialService] No se puede aplicar video: URL no proporcionada");
            return null;
        }

        // Crear elemento de video
        const videoElement = document.createElement('video');
        videoElement.muted = options.muted ?? true;
        videoElement.loop = options.loop ?? true;
        videoElement.controls = options.controls ?? false;
        videoElement.playsInline = options.playsInline ?? true;
        videoElement.autoplay = options.autoplay ?? true;
        videoElement.crossOrigin = 'anonymous';
        videoElement.src = videoUrl;

        // Aplicar material negro por defecto (fallback)
        const fallbackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        mesh.material = fallbackMaterial;

        // Agregar listeners
        videoElement.addEventListener('loadeddata', () => {

            // Solo crear la textura de video si se carga correctamente
            const videoTexture = new THREE.VideoTexture(videoElement);
            videoTexture.colorSpace = THREE.SRGBColorSpace;
            videoTexture.minFilter = THREE.LinearFilter;
            videoTexture.magFilter = THREE.LinearFilter;
            videoTexture.format = THREE.RGBAFormat;

            // Ajustar wrapping para que se repita o recorte según necesites
            videoTexture.wrapS = THREE.ClampToEdgeWrapping;
            videoTexture.wrapT = THREE.ClampToEdgeWrapping;

            // Aplicar transformaciones de textura si se proporcionaron
            if (options.repeat) {
                videoTexture.repeat.set(options.repeat.x, options.repeat.y);
            }
            if (options.offset) {
                videoTexture.offset.set(options.offset.x, options.offset.y);
            }
            if (options.center) {
                videoTexture.center.set(options.center.x, options.center.y);
            }
            if (options.rotation !== undefined) {
                videoTexture.rotation = options.rotation;
            }

            const videoMaterial = new THREE.MeshBasicMaterial({
                map: videoTexture,
                side: THREE.DoubleSide
            });

            mesh.material = videoMaterial;
            mesh.material.needsUpdate = true;

            // Guardar referencias
            (mesh as any).userData._videoElement = videoElement;
            (mesh as any).userData._videoTexture = videoTexture;
        });

        videoElement.addEventListener('error', () => {
            console.warn("[MaterialService] No se pudo cargar el video, usando material negro:", videoUrl);
        });

        // Cargar e iniciar reproducción del video
        videoElement.load();
        videoElement.play().catch(() => {
            console.warn("[MaterialService] No se pudo reproducir el video automáticamente:", videoUrl);
        });

        return {
            videoElement,
            material: fallbackMaterial
        };
    }

    /**
     * Remueve la VideoTexture de un mesh y limpia recursos
     * 
     * @param mesh - El mesh del cual remover el video
     */
    removeVideoTexture(mesh: THREE.Mesh | undefined): void {
        if (!mesh) return;

        const videoElement = (mesh as any).userData?._videoElement as HTMLVideoElement;
        const videoTexture = (mesh as any).userData?._videoTexture as THREE.VideoTexture;

        // Pausar y limpiar video
        if (videoElement) {
            videoElement.pause();
            videoElement.src = '';
            videoElement.load();
            delete (mesh as any).userData._videoElement;
        }

        // Disponer de la textura
        if (videoTexture) {
            videoTexture.dispose();
            delete (mesh as any).userData._videoTexture;
        }

        // Disponer del material si es necesario
        if (mesh.material && (mesh.material as THREE.Material).dispose) {
            (mesh.material as THREE.Material).dispose();
        }
    }

    /**
     * Limpia todos los materiales cuando se cambia de habitación
     * 
     * Libera la memoria ocupada por los materiales y resetea el mapa interno
     */
    clearMaterials(): void {
        // Disponer de materiales personalizados para liberar memoria
        Object.values(this.materialMap).forEach(material => {
            if (material && typeof material.dispose === 'function') {
                material.dispose();
            }
        });

        this.materialMap = {};
        this.scene = null as any;
    }

    /**
     * Obtiene un material específico por nombre
     * 
     * @param name - Nombre del material
     * @returns El material encontrado o undefined si no existe
     */
    getMaterial(name: string): THREE.Material | undefined {
        return this.materialMap[name];
    }

    /**
     * Verifica si el servicio tiene materiales cargados
     * 
     * @returns Verdadero si hay materiales cargados
     */
    hasMaterials(): boolean {
        return Object.keys(this.materialMap).length > 0;
    }

    /**
     * Recorre la escena y asigna materiales a los objetos apropiados
     */
    private applyToScene(): void {
        this.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;

                // Saltar portales y screens ya que tienen material personalizado
                if (mesh.name === "portal" || mesh.name === "screen") return;

                //DOOR
                if (mesh.name === "door") {
                    mesh.material = this.materialMap.walls;
                    return;
                }

                if (this.materialMap[mesh.name]) {
                    mesh.material = this.materialMap[mesh.name];
                }


                else if (this.materialMap.objects) {
                    // Fallback a material por defecto

                    mesh.material = this.materialMap.objects;
                }
                return;
            }

            // Manejar objetos de tipo handler
            if (child.name.includes("handler")) {
                child.children.forEach((sub) => {
                    if ((sub as THREE.Mesh).isMesh) {
                        const subMesh = sub as THREE.Mesh;
                        if (this.materialMap[subMesh.name]) {
                            subMesh.material = this.materialMap[subMesh.name];
                        } else if (this.materialMap.objects) {
                            subMesh.material = this.materialMap.objects;
                        }
                    }
                });
            }


        });
    }
}
