import * as THREE from "three";
import type { RoomSettings } from "../types";


export class MaterialService {
    private scene: THREE.Scene | THREE.Group;
    private materialMap: Record<string, THREE.Material> = {};

    constructor(scene: THREE.Scene | THREE.Group) {
        this.scene = scene;
    }

    /** Aplica materiales básicos con texturas */
    applyMaterials(oTex: THREE.Texture, eTex: THREE.Texture, settings?: RoomSettings) {
        const colorMaterials = new Map<string, THREE.MeshBasicMaterial>();

        // función para obtener o crear materiales de color
        // y almacenarlos en un mapa para reutilización
        const getColorMaterial = (hex: string) => {
            if (!colorMaterials.has(hex)) {
                colorMaterials.set(hex, new THREE.MeshBasicMaterial({ color: new THREE.Color(hex) }));
            }
            return colorMaterials.get(hex)!;
        };

        this.materialMap = {
            objects: new THREE.MeshBasicMaterial({ map: oTex }),
            walls: new THREE.MeshBasicMaterial({ map: eTex }),
        };

        if (settings?.light) {
            for (const [name, { color }] of Object.entries(settings.light)) {
                this.materialMap[name] = getColorMaterial(color);
            }
        }



        this.applyToScene();
    }



    /** Recorre la escena y asigna materiales */
    private applyToScene() {
        this.scene.traverse((child) => {

            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
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