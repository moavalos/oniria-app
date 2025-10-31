// loaders/GltfLoaderService.ts
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { type IAssetLoader } from "@engine/services/assets/types";

export class GltfLoaderService implements IAssetLoader {
    readonly type = "gltf";

    private loader: GLTFLoader;

    constructor() {
        const draco = new DRACOLoader();
        draco.setDecoderPath("./draco/");
        draco.preload();

        this.loader = new GLTFLoader();
        this.loader.setDRACOLoader(draco);
    }

    async load(url: string, onProgress: (_p: number) => void): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("[GltfLoaderService] Cargando:", url);

            this.loader.load(
                url,
                (data) => {
                    console.log("[GltfLoaderService] Carga exitosa:", url);
                    resolve(data);
                },
                (evt) => {
                    if (evt.lengthComputable) {
                        const progress = (evt.loaded / evt.total) * 100;
                        onProgress(progress);
                    }
                },
                (err) => {
                    console.error("[GltfLoaderService] Error cargando:", url, err);
                    // Mejorar el mensaje de error para casos comunes
                    const errorMessage = err instanceof Error ? err.message : String(err);
                    if (errorMessage?.includes('<!doctype') || errorMessage?.includes('not valid JSON')) {
                        reject(new Error(`Archivo GLTF no encontrado: ${url}. Verifica que el archivo exista en public/${url}`));
                    } else {
                        reject(err);
                    }
                }
            );
        });
    }

    dispose() {
        this.loader = null as any;
    }
}
