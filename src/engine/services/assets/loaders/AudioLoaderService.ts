import { AudioLoader } from "three";
import { type IAssetLoader } from "@engine/services/assets/types";

export class AudioLoaderService implements IAssetLoader {
    readonly type = "audio";

    private loader = new AudioLoader();

    load(url: string, onProgress: (p: number) => void) {
        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (buffer) => resolve(buffer),
                (evt) => {
                    if (evt.lengthComputable) onProgress((evt.loaded / evt.total) * 100);
                },
                reject
            );
        });
    }

    dispose() {
        this.loader = null as any;
    }
}
