// loaders/TextureLoaderService.ts
import * as THREE from "three";
import { type IAssetLoader } from "@engine/services/assets/types";

export class TextureLoaderService implements IAssetLoader {
    readonly type = "texture";

    private loader = new THREE.TextureLoader();

    load(url: string, onProgress: (_p: number) => void): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (tex) => resolve(tex),
                (evt) => {
                    if (evt.lengthComputable) onProgress((evt.loaded / evt.total) * 100);
                },
                (err) => reject(err)
            );
        });
    }

    dispose() {
        this.loader = null as any;
    }
}
