import * as THREE from "three";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { type IAssetLoader } from "@engine/services/assets/types";

export class Ktx2LoaderService implements IAssetLoader {
    readonly type = "ktx2";

    private loader: KTX2Loader;

    constructor(renderer: THREE.WebGLRenderer) {
        this.loader = new KTX2Loader();
        this.loader.setTranscoderPath("./basis/");
        this.loader.detectSupport(renderer);
    }

    load(url: string, onProgress: (_p: number) => void) {
        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (tex) => resolve(tex),
                (evt) => {
                    if (evt.lengthComputable) onProgress((evt.loaded / evt.total) * 100);
                },
                reject
            );
        });
    }

    dispose() {
        this.loader.dispose();
    }
}
