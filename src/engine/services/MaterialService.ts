import * as THREE from "three";
import type { Room } from "../entities/Room";
import portalVertexShader from "@engine/shaders/portal/vertexShader.glsl";
import portalFragmentShader from "@engine/shaders/portal/fragmentShader.glsl";


export class MaterialService {
    private scene: THREE.Scene | THREE.Group = null as any;
    private materialMap: Record<string, THREE.Material> = {};


    constructor() {
    }

    /** Aplica materiales básicos con texturas */
    async applyMaterialsToRoom(room: Room) {
        const colorMaterials = new Map<string, THREE.MeshBasicMaterial>();
        this.scene = room.getScene()!;

        // función para obtener o crear materiales de color
        // y almacenarlos en un mapa para reutilización
        const getColorMaterial = (hex: string) => {
            if (!colorMaterials.has(hex)) {
                colorMaterials.set(hex, new THREE.MeshBasicMaterial({ color: new THREE.Color(hex) }));
            }
            return colorMaterials.get(hex)!;
        };

        this.materialMap = {
            objects: new THREE.MeshBasicMaterial({ map: room.getObjectTexture() }),
            walls: new THREE.MeshBasicMaterial({ map: room.getEnvironmentTexture() }),
        };

        const roomConfig = await room.getConfig();

        if (roomConfig.objects) {
            for (const [name, { color }] of Object.entries(roomConfig.objects || {})) {
                if (color) this.materialMap[name] = getColorMaterial(color);
            }
            //console.log(this.materialMap);
        }

        this.applyToScene();
    }

    applyMaterialsToPortal(portal: THREE.Object3D | undefined, uniforms = {}) {
        if (!portal) return;
        (portal as THREE.Mesh).material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            side: THREE.DoubleSide,
            transparent: false,
            depthWrite: false,
        });
        console.log("Portal material applied", (portal as THREE.Mesh).material);

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