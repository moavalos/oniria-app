import * as THREE from "three";
import { AudioLoaderService, GltfLoaderService, Ktx2LoaderService, TextureLoaderService } from "./loaders";
import type { IAssetLoader, AssetType, LoadingItem, LoadingCallbacks } from "./types";


export class AssetManager {
    private loaders = new Map<AssetType, IAssetLoader>();

    private callbacks: LoadingCallbacks = {};

    private textureCache = new Map<string, THREE.Texture>();

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
            // Verificar cache para texturas KTX2
            if (u.type === 'ktx2' && this.textureCache.has(u.url)) {
                console.log(`[AssetManager]: Usando textura ${u.url} desde cache`);
                items[i].progress = 100;
                items[i].loaded = true;
                results[u.url] = this.textureCache.get(u.url);
                this.callbacks.onItemProgress?.(items[i]);
                return results[u.url];
            }

            const loader = this.loaders.get(u.type);
            if (!loader) throw new Error(`No hay loader para ${u.type}`);
            const asset = await loader.load(u.url, (p) => {
                items[i].progress = p;
                this.callbacks.onItemProgress?.(items[i]);
                const global = items.reduce((a, b) => a + b.progress, 0) / items.length;
                this.callbacks.onProgress?.(global);
            });
            items[i].loaded = true;
            results[u.url] = asset;

            // Cachear texturas KTX2
            if (u.type === 'ktx2') {
                this.textureCache.set(u.url, asset);
                console.log(`[AssetManager]: Textura ${u.url} almacenada en cache`);
            }

            return asset;
        });

        await Promise.all(promises);
        this.callbacks.onComplete?.();
        return results;
    }

    /**
     * Precarga un conjunto de texturas y las almacena en cache para acceso rápido
     * @param textureUrls - Array con las URLs de las texturas a precargar
     * @returns Promise que se resuelve cuando todas las texturas están cargadas
     */
    public async preloadTextures(textureUrls: string[]): Promise<void> {
        console.log(`[AssetManager]: Precargando ${textureUrls.length} texturas`);

        const textureLoader = this.loaders.get('texture') as TextureLoaderService;
        if (!textureLoader) {
            throw new Error('[AssetManager]: TextureLoader no disponible');
        }

        const loadPromises = textureUrls.map(async (url) => {
            if (this.textureCache.has(url)) {
                console.log(`[AssetManager]: Textura ${url} ya está en cache`);
                return;
            }

            try {
                const texture = await textureLoader.load(url, () => { });
                this.textureCache.set(url, texture);
                console.log(`[AssetManager]: Textura ${url} precargada`);
            } catch (error) {
                console.error(`[AssetManager]: Error precargando textura ${url}:`, error);
                throw error;
            }
        });

        await Promise.all(loadPromises);
        console.log(`[AssetManager]: Precarga completa de ${textureUrls.length} texturas`);
    }

    /**
     * Precarga las texturas KTX2 de una skin en segundo plano
     * @param skinId - ID de la skin a precargar
     * @returns Promise que se resuelve cuando la precarga está completa
     */
    public async preloadSkin(skinId: string): Promise<void> {
        console.log(`[AssetManager]: Precargando skin: ${skinId}`);

        const ktx2Loader = this.loaders.get('ktx2') as Ktx2LoaderService;
        if (!ktx2Loader) {
            console.warn('[AssetManager]: Ktx2Loader no disponible, saltando precarga');
            return;
        }

        const skinAssets = [
            `skins/${skinId}/object.ktx2`,
            `skins/${skinId}/wall.ktx2`
        ];

        const loadPromises = skinAssets.map(async (url) => {
            if (this.textureCache.has(url)) {
                console.log(`[AssetManager]: Skin texture ${url} ya está en cache`);
                return;
            }

            try {
                const texture = await ktx2Loader.load(url, () => { }) as THREE.Texture;
                this.textureCache.set(url, texture);
                console.log(`[AssetManager]: Skin texture ${url} precargada`);
            } catch (error) {
                console.error(`[AssetManager]: Error precargando skin texture ${url}:`, error);
                // No lanzar error, solo advertir - el preload es opcional
            }
        });

        await Promise.all(loadPromises);
        console.log(`[AssetManager]: Precarga completa de skin: ${skinId}`);
    }

    /**
     * Obtiene una textura del cache
     * @param url - URL de la textura
     * @returns La textura si está en cache, undefined si no
     */
    public getTexture(url: string): THREE.Texture | undefined {
        return this.textureCache.get(url);
    }

    /**
     * Verifica si una textura está en cache
     * @param url - URL de la textura
     * @returns true si la textura está en cache
     */
    public hasTextureInCache(url: string): boolean {
        return this.textureCache.has(url);
    }

    /**
     * Obtiene estadísticas del cache de texturas
     * @returns Objeto con información del estado del cache
     */
    public getTextureStats(): { cached: number; urls: string[] } {
        return {
            cached: this.textureCache.size,
            urls: Array.from(this.textureCache.keys())
        };
    }

    dispose() {
        // Limpiar cache de texturas
        for (const texture of this.textureCache.values()) {
            texture.dispose();
        }
        this.textureCache.clear();

        // Limpiar loaders
        for (const loader of this.loaders.values()) loader.dispose?.();
        this.loaders.clear();

        console.log('[AssetManager]: Recursos liberados');
    }
}
