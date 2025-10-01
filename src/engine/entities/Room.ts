import * as THREE from 'three';
import { type AnimationAction, type ObjectEventArray, type RoomConfig } from '../config/room.type';
import { Skin } from './Skin';
import { loadRoomConfig } from '../utils/ConfigLoader';





export class Room {

    private config?: RoomConfig;
    private scene: THREE.Group<THREE.Object3DEventMap> | null = null;
    private oT: THREE.Texture | null = null;
    private eT: THREE.Texture | null = null;
    private portal: THREE.Object3D | undefined = undefined;


    constructor(public id: string,
        public meshUrl: string | null,
        public skin: Skin
    ) {
        loadRoomConfig(id).then(config => {
            this.config = config;
        });
    }

    applySkin(skin: Skin) {
        this.skin = skin;
    }

    addScene(scene: THREE.Group<THREE.Object3DEventMap>) {
        this.scene = scene;
        this.portal = scene.getObjectByName("portal");
    }

    setSkin(skin: Skin) {
        this.skin = skin;
    }

    setTextures({ objectTexture, environmentTexture }: { objectTexture: THREE.Texture, environmentTexture: THREE.Texture }) {
        this.oT = objectTexture;
        this.eT = environmentTexture;
    }

    getObjectTexture() {
        return this.oT;
    }

    getEnvironmentTexture() {
        return this.eT;
    }

    getScene() {
        return this.scene;
    }

    getPortal() {
        return this.portal;
    }

    getConfig(): RoomConfig | undefined {
        return this.config;
    }

    getObjectByName(name: string): THREE.Object3D | null {
        if (!this.scene) return null;
        return this.scene.getObjectByName(name) || null;
    }

    getLookAtableObjects(): Record<string, THREE.Vector3> {
        if (!this.scene) return {};
        if (!this.config) throw new Error("Config not loaded yet");
        const lookAtables: Record<string, THREE.Vector3> = {};

        for (const [name, obj] of Object.entries(this.config.objects)) {
            if (obj.lookAtOffset) {
                const object3D = this.scene.getObjectByName(name);
                if (object3D) {
                    const worldPos = new THREE.Vector3();
                    object3D.getWorldPosition(worldPos);
                    const offset = new THREE.Vector3(...obj.lookAtOffset);
                    lookAtables[name] = worldPos.add(offset);
                }
            }
        }

        return lookAtables;
    }

    getAnimatableObjects(): Record<string, AnimationAction> {
        if (!this.config) throw new Error("Config not loaded yet");
        const animatables: Record<string, AnimationAction> = {};

        for (const [name, obj] of Object.entries(this.config.objects)) {
            if (obj.animation) {
                animatables[name] = obj.animation;
            }
        }

        return animatables;
    }

    getInteractableObjects(): Record<string, ObjectEventArray> {
        if (!this.scene) return {};
        if (!this.config) throw new Error("Config not loaded yet");
        const interactables: Record<string, ObjectEventArray> = {};

        for (const [name, obj] of Object.entries(this.config.objects)) {
            if (obj.interceptable && obj.event) {
                interactables[name] = Array.isArray(obj.event) ? obj.event : [obj.event];
            }
        }

        return this.mapHandlerToChild(this.scene!, interactables);

    }

    mapHandlerToChild(scene: THREE.Group<THREE.Object3DEventMap>, handlers: Record<string, ObjectEventArray>) {
        const mapped: Record<string, ObjectEventArray> = {};

        Object.entries(handlers).forEach(([name, event]) => {
            if (name.includes("_handler")) {
                const handler = scene.getObjectByName(name);
                const child = handler?.children[0]; // el primer mesh hijo
                if (child) {
                    mapped[child.name] = event;
                }
            } else {
                mapped[name] = event;
            }
        });

        return mapped;
    }

}