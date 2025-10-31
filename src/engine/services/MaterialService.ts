import * as THREE from "three";

import type { Room } from "@engine/entities/Room";
import type { AnimationService } from "./AnimationService";
import portalVertexShader from "@engine/shaders/portal/vertexShader.glsl";
import portalFragmentShader from "@engine/shaders/portal/fragmentShader.glsl";
import blobFragmentShader from "@engine/shaders/nodes/blob/fragmentShader.glsl";
import maskFragmentShader from "@engine/shaders/nodes/blob/fragmentShaderMask.glsl";
import blobVertexShader from "@engine/shaders/nodes/blob/vertexShader.glsl";
import nebulaFragmentShader from "@engine/shaders/nebula/fragmenShader.glsl";
import nebulaVertexShader from "@engine/shaders/nebula/vertexShader.glsl";
import imageRevealFragmentShader from "@engine/shaders/imageReveral/fragmentShader.glsl";
import imageRevealVertexShader from "@engine/shaders/imageReveral/vertexShader.glsl";
import roomFragmentShader from "@engine/shaders/room/fragmentShader.glsl";
import roomVertexShader from "@engine/shaders/room/vertexShader.glsl";

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

    // Referencias a los materiales con shader para poder animar el fade
    private objectsMaterial: THREE.ShaderMaterial | null = null;

    private wallsMaterial: THREE.ShaderMaterial | null = null;

    // Guardar los colores actuales para hacer fade
    private currentColors: Record<string, string> = {};

    // Referencia al servicio de animaciones
    private animationService: AnimationService | null = null;

    constructor() { }

    /**
     * Establece el servicio de animaciones para usar en las transiciones
     */
    setAnimationService(animationService: AnimationService): void {
        this.animationService = animationService;
    }

    /**
     * Aplica materiales básicos con texturas usando carga bajo demanda
     * 
     * @param room - La sala a la que aplicar los materiales
     * @param withFade - Si debe aplicar animación de fade entre texturas (default: false)
     * @param theme - Tema a aplicar para los colores ('light' | 'dark')
     */
    async applyMaterialsToRoom(room: Room, withFade: boolean = false, theme: 'light' | 'dark' = 'light'): Promise<void> {
        const colorMaterials = new Map<string, THREE.MeshBasicMaterial>();
        this.scene = room.get_Scene()!;

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

        // Obtener texturas actuales
        const currentObjectTexture = room.getObjectTexture();
        const currentWallTexture = room.getEnvironmentTexture();

        if (withFade) {
            console.log("[MaterialService]: Aplicando materiales con fade, tema:", theme);

            // Si ya existen los materiales con shader, hacer fade
            if (this.objectsMaterial && this.wallsMaterial) {
                // Intercambiar texturas: la actual va a B, la nueva a A
                this.objectsMaterial.uniforms.uTextureB.value = this.objectsMaterial.uniforms.uTextureA.value;
                this.objectsMaterial.uniforms.uTextureA.value = currentObjectTexture;
                this.objectsMaterial.uniforms.uMixFactor.value = 1.0; // Empezar mostrando B

                this.wallsMaterial.uniforms.uTextureB.value = this.wallsMaterial.uniforms.uTextureA.value;
                this.wallsMaterial.uniforms.uTextureA.value = currentWallTexture;
                this.wallsMaterial.uniforms.uMixFactor.value = 1.0; // Empezar mostrando B

                // Animar de 1.0 (textureB) a 0.0 (textureA)
                const uniforms = { mixFactor: 1.0 };

                if (this.animationService) {
                    const timeline = this.animationService.createCustomTimeline();
                    timeline.to(uniforms, {
                        mixFactor: 0.0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            if (this.objectsMaterial) {
                                this.objectsMaterial.uniforms.uMixFactor.value = uniforms.mixFactor;
                            }
                            if (this.wallsMaterial) {
                                this.wallsMaterial.uniforms.uMixFactor.value = uniforms.mixFactor;
                            }
                        },
                        onComplete: () => {
                            console.log("[MaterialService]: Fade completado");
                        }
                    });
                } else {
                    console.warn("[MaterialService]: AnimationService no disponible, aplicando sin fade");
                }
            } else {
                // Primera vez, crear materiales directamente sin fade
                this.objectsMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTextureA: { value: currentObjectTexture },
                        uTextureB: { value: currentObjectTexture }, // Misma textura
                        uMixFactor: { value: 0.0 }
                    },
                    vertexShader: roomVertexShader,
                    fragmentShader: roomFragmentShader,
                });
                this.objectsMaterial.toneMapped = false;

                this.wallsMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTextureA: { value: currentWallTexture },
                        uTextureB: { value: currentWallTexture }, // Misma textura
                        uMixFactor: { value: 0.0 }
                    },
                    vertexShader: roomVertexShader,
                    fragmentShader: roomFragmentShader,
                });
                this.wallsMaterial.toneMapped = false;
            }
        } else {
            console.log("[MaterialService]: Aplicando materiales sin fade");

            // Crear o actualizar materiales sin animación
            this.objectsMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTextureA: { value: currentObjectTexture },
                    uTextureB: { value: currentObjectTexture },
                    uMixFactor: { value: 0.0 }
                },
                vertexShader: roomVertexShader,
                fragmentShader: roomFragmentShader,
            });
            this.objectsMaterial.toneMapped = false;

            this.wallsMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTextureA: { value: currentWallTexture },
                    uTextureB: { value: currentWallTexture },
                    uMixFactor: { value: 0.0 }
                },
                vertexShader: roomVertexShader,
                fragmentShader: roomFragmentShader,
            });
            this.wallsMaterial.toneMapped = false;
        }

        this.materialMap = {
            objects: this.objectsMaterial,
            walls: this.wallsMaterial,
        };

        // Cargar objetos coloreables bajo demanda con el tema correcto
        try {
            const colorableObjects = await room.getColorableObjects(theme);

            if (withFade && Object.keys(this.currentColors).length > 0) {
                // Hay colores previos, animar el cambio
                for (const [name, newColor] of Object.entries(colorableObjects)) {
                    if (!newColor) continue;

                    const oldColor = this.currentColors[name];

                    if (oldColor && oldColor !== newColor) {
                        // Existe color anterior diferente, verificar si ya tenemos material
                        let material = this.materialMap[name] as THREE.MeshBasicMaterial;

                        if (!material) {
                            // Crear material si no existe
                            material = getColorMaterial(oldColor);
                            this.materialMap[name] = material;
                        }

                        // Animar de color antiguo a nuevo
                        const oldColorObj = new THREE.Color(oldColor);
                        const newColorObj = new THREE.Color(newColor);

                        if (this.animationService) {
                            const timeline = this.animationService.createCustomTimeline();
                            timeline.to(oldColorObj, {
                                r: newColorObj.r,
                                g: newColorObj.g,
                                b: newColorObj.b,
                                duration: 0.8,
                                ease: "power2.inOut",
                                onUpdate: () => {
                                    material.color.copy(oldColorObj);
                                }
                            });
                        } else {
                            // Sin AnimationService, aplicar directamente
                            material.color.copy(newColorObj);
                        }
                    } else if (!oldColor) {
                        // No hay color anterior, crear material nuevo
                        this.materialMap[name] = getColorMaterial(newColor);
                    }
                    // Si oldColor === newColor, no hacer nada
                }
            } else {
                // Sin fade o primera vez, aplicar colores directamente
                console.log("[MaterialService]: Aplicando colores sin fade");
                for (const [name, color] of Object.entries(colorableObjects)) {
                    if (color) {
                        this.materialMap[name] = getColorMaterial(color);
                    }
                }
            }

            // Guardar los colores actuales para el próximo fade
            this.currentColors = { ...colorableObjects };

        } catch (error) {
            console.warn("[MaterialService]: Error al cargar objetos coloreables para materiales:", error);
        }

        this.applyToScene();
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

                // Saltar portales, screens y cualquier hijo del portal (como "inside")
                if (mesh.name === "portal" || mesh.name === "screen") return;

                // Verificar si es hijo del portal
                let parent = mesh.parent;
                while (parent) {
                    if (parent.name === "portal") return; // Es hijo del portal, saltar
                    parent = parent.parent;
                }

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
