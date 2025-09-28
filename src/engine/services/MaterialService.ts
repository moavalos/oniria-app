import * as THREE from "three";
import type { RoomSettings } from "@engine/config/roomSettings.type";

export class MaterialService {
    private materialMap: Record<string, THREE.Material>;

    constructor(oTex: THREE.Texture, eTex: THREE.Texture, settings?: RoomSettings) {
        this.materialMap = {
            objects: new THREE.MeshBasicMaterial({ map: oTex }),
            walls: new THREE.MeshBasicMaterial({ map: eTex }),
            light: new THREE.MeshBasicMaterial({
                color: settings?.lighting.color || 0xffffff,
            }),
            emissive: new THREE.MeshBasicMaterial({
                color: settings?.emissive?.color || 0xffffff,
            }),
        };
    }

    /** Aplica los materiales configurados al scene */
    applyToScene(scene: THREE.Group | THREE.Scene) {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;

                for (const key in this.materialMap) {
                    if (mesh.name.toLowerCase().includes(key.toLowerCase())) {
                        mesh.material = this.materialMap[key];
                    }
                }
            }

            if ((child as THREE.Object3D).isObject3D && child.name.includes("handler")) {
                const handlerMesh = child.children[0] as THREE.Mesh;
                handlerMesh.material = this.materialMap["objects"] ?? handlerMesh.material;
            }
        });
    }

    /** Devuelve un material en caso de que quieras reutilizarlo */
    getMaterial(name: string): THREE.Material | undefined {
        return this.materialMap[name];
    }

    /** Limpia memoria cuando ya no se usa */
    dispose() {
        Object.values(this.materialMap).forEach((mat) => mat.dispose());
    }
}
