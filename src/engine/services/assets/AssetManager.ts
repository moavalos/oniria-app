import * as THREE from "three";
import { AudioLoaderService, GltfLoaderService, Ktx2LoaderService, TextureLoaderService } from "./loaders";
import type { IAssetLoader, AssetType, LoadingItem, LoadingCallbacks } from "./types";


export class AssetManager {
    private loaders = new Map<AssetType, IAssetLoader>();

    private callbacks: LoadingCallbacks = {};

    constructor(renderer?: THREE.WebGLRenderer) {
        this.registerLoader(new GltfLoaderService());
        this.registerLoader(new TextureLoaderService());
        this.registerLoader(new AudioLoaderService());
        if (renderer) this.registerLoader(new Ktx2LoaderService(renderer));
    }

    setCallbacks(callbacks: LoadingCallbacks) {
        this.callbacks = callbacks;
    }

    registerLoader(loader: IAssetLoader) {
        this.loaders.set(loader.type, loader);
    }

    async loadAssets(urls: { url: string; type: AssetType }[]) {
        const results: Record<string, any> = {};
        const items: LoadingItem[] = urls.map(u => ({
            url: u.url,
            type: u.type,
            progress: 0,
            loaded: false
        }));

        this.callbacks.onStart?.();

        const promises = urls.map(async (u, i) => {
            const loader = this.loaders.get(u.type);
            if (!loader) throw new Error(`No loader for ${u.type}`);
            const asset = await loader.load(u.url, (p) => {
                items[i].progress = p;
                this.callbacks.onItemProgress?.(items[i]);
                const global = items.reduce((a, b) => a + b.progress, 0) / items.length;
                this.callbacks.onProgress?.(global);
            });
            items[i].loaded = true;
            results[u.url] = asset;
            return asset;
        });

        await Promise.all(promises);
        this.callbacks.onComplete?.();
        return results;
    }

    dispose() {
        for (const loader of this.loaders.values()) loader.dispose?.();
        this.loaders.clear();
    }
}
