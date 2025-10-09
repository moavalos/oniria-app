import * as THREE from "three";
import type { Room } from "@engine/entities/Room";
import portalVertexShader from "@engine/shaders/portal/vertexShader.glsl";
import portalFragmentShader from "@engine/shaders/portal/fragmentShader.glsl";
import blobFragmentShader from "@engine/shaders/nodes/blob/fragmentShader.glsl";
import maskFragmentShader from "@engine/shaders/nodes/blob/fragmentShaderMask.glsl";
import blobVertexShader from "@engine/shaders/nodes/blob/vertexShader.glsl";
export class MaterialService {
    private scene: THREE.Scene | THREE.Group = null as any;
    private materialMap: Record<string, THREE.Material> = {};

    constructor() { }

    /** Aplica materiales básicos con texturas - versión con carga bajo demanda */
    async applyMaterialsToRoom(room: Room) {
        const colorMaterials = new Map<string, THREE.MeshBasicMaterial>();
        this.scene = room.getScene()!;

        // función para obtener o crear materiales de color
        // y almacenarlos en un mapa para reutilización
        const getColorMaterial = (hex: string) => {
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

        // Cargar objetos coloreables bajo demanda
        try {
            const colorableObjects = await room.getColorableObjects();

            for (const [name, color] of Object.entries(colorableObjects)) {
                if (color) {
                    this.materialMap[name] = getColorMaterial(color);
                }
            }
        } catch (error) {
            console.warn('Failed to load colorable objects for materials:', error);
        }

        this.applyToScene();
    }

    /** Aplica materiales cuando ya tienes los objetos coloreables cargados */
    applyMaterialsWithColorables(room: Room, colorableObjects: Record<string, string>) {
        const colorMaterials = new Map<string, THREE.MeshBasicMaterial>();
        this.scene = room.getScene()!;

        // función para obtener o crear materiales de color
        const getColorMaterial = (hex: string) => {
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

    applyMaterialsToPortal(portal: THREE.Object3D | undefined, uniforms = {}) {
        if (!portal) return;

        console.log("🔧 MaterialService - Applying portal material:", {
            hasPortal: !!portal,
            hasVertexShader: !!portalVertexShader,
            hasFragmentShader: !!portalFragmentShader,
            vertexShaderLength: portalVertexShader?.length,
            fragmentShaderLength: portalFragmentShader?.length,
            uniformsKeys: Object.keys(uniforms)
        });

        (portal as THREE.Mesh).material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            transparent: true,
            depthWrite: true,
            colorWrite: true,
            side: THREE.DoubleSide,
        });

        console.log("🔧 MaterialService - Portal material applied successfully");
    }

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

        // Para el material mask, usar valores fijos como estaba originalmente
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
    }    /** Limpia todos los materiales cuando se cambia de habitación */
    clearMaterials() {
        // Disponer de materiales personalizados para liberar memoria
        Object.values(this.materialMap).forEach(material => {
            if (material && typeof material.dispose === 'function') {
                material.dispose();
            }
        });

        this.materialMap = {};
        this.scene = null as any;
    }

    /** Obtiene un material específico por nombre */
    getMaterial(name: string): THREE.Material | undefined {
        return this.materialMap[name];
    }

    /** Verifica si tiene materiales cargados */
    hasMaterials(): boolean {
        return Object.keys(this.materialMap).length > 0;
    }

    /** Recorre la escena y asigna materiales */
    private applyToScene() {
        this.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                // console.log(mesh)
                if (mesh.name === "portal") return; // skip portal

                if (this.materialMap[mesh.name]) {
                    mesh.material = this.materialMap[mesh.name];
                } else if (this.materialMap.objects) {
                    // fallback a material por defecto
                    mesh.material = this.materialMap.objects;
                }
                return;
            }

            // handlers
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
