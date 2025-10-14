import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Representa un elemento en proceso de carga
 */
export interface LoadingItem {
    url: string;
    type: 'gltf' | 'texture' | 'ktx2' | 'audio' | 'binary';
    loaded: boolean;
    progress: number;
    error?: string;
}

/**
 * Interfaz para callbacks de progreso
 */
export interface LoadingCallbacks {
    onStart?: () => void;
    onProgress?: (_globalProgress: number) => void;
    onItemProgress?: (_index: number, _item: LoadingItem) => void;
    onComplete?: () => void;
    onError?: (_error: string) => void;
}

/**
 * Gestiona la carga de assets 3D con soporte para múltiples formatos
 * 
 * Soporta carga de:
 * - Modelos GLTF/GLB con compresión DRACO
 * - Texturas KTX2 con compresión Basis Universal
 * - Texturas estándar (JPG, PNG, etc.)
 * - Audio
 * - Archivos binarios
 */
export class AssetManager {
    private loaders: {
        gltf: GLTFLoader;
        texture: THREE.TextureLoader;
        ktx2: KTX2Loader;
        audio: THREE.AudioLoader;
        file: THREE.FileLoader;
    } | null = null;

    private renderer?: THREE.WebGLRenderer;

    private callbacks: LoadingCallbacks = {};

    private loadingItems: LoadingItem[] = [];

    private assetProgressTracker = new Map<number, { loaded: number; total: number }>();

    /**
     * Constructor del AssetManager
     * 
     * @param renderer - Renderer de Three.js opcional para configurar loaders avanzados
     */
    constructor(renderer?: THREE.WebGLRenderer) {
        this.renderer = renderer;
    }

    /**
     * Configura los callbacks para eventos de carga
     * 
     * @param callbacks - Objeto con funciones callback para diferentes eventos
     */
    public setCallbacks(callbacks: LoadingCallbacks): void {
        this.callbacks = { ...callbacks };
    }

    /**
     * Verifica la disponibilidad de archivos del transcoder Basis Universal
     * 
     * @returns Promise que resuelve cuando los archivos están disponibles
     */
    private async checkTranscoderFiles(): Promise<void> {
        const files = ['./basis/basis_transcoder.js', './basis/basis_transcoder.wasm'];

        for (const file of files) {
            try {
                const response = await fetch(file);
                if (!response.ok) {
                    throw new Error(`Archivo ${file} no encontrado`);
                }
            } catch (error) {
                throw new Error(`Error verificando transcoder: ${error}`);
            }
        }
    }

    /**
     * Inicializa todos los loaders necesarios
     * 
     * @returns Objeto con todos los loaders configurados
     */
    private initializeLoaders(): NonNullable<typeof this.loaders> {
        if (this.loaders) {
            return this.loaders;
        }

        // Configurar GLTF Loader con soporte DRACO
        const gltfLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./draco/');
        dracoLoader.preload();
        gltfLoader.setDRACOLoader(dracoLoader);

        // Configurar Texture Loader
        const textureLoader = new THREE.TextureLoader();

        // Configurar KTX2 Loader
        const ktx2Loader = new KTX2Loader();
        ktx2Loader.setTranscoderPath('./basis/');

        if (this.renderer) {
            try {
                ktx2Loader.detectSupport(this.renderer);
            } catch (error) {
                console.warn("Error detectando soporte KTX2:", error);
            }
        }

        // Configurar Audio Loader
        const audioLoader = new THREE.AudioLoader();

        // Configurar File Loader
        const fileLoader = new THREE.FileLoader();

        this.loaders = {
            gltf: gltfLoader,
            texture: textureLoader,
            ktx2: ktx2Loader,
            audio: audioLoader,
            file: fileLoader
        };

        return this.loaders;
    }

    /**
     * Actualiza el progreso global basado en el progreso de cada asset
     */
    private updateGlobalProgress(): void {
        let totalLoaded = 0;
        let totalSize = 0;

        this.assetProgressTracker.forEach(({ loaded, total }) => {
            totalLoaded += loaded;
            totalSize += total;
        });

        const globalProgress = totalSize > 0 ? (totalLoaded / totalSize) * 100 : 0;
        this.callbacks.onProgress?.(globalProgress);
    }

    /**
     * Actualiza el estado de un item específico
     * 
     * @param index - Índice del item en el array de loading items
     * @param updates - Actualizaciones parciales para el item
     */
    private updateItem(index: number, updates: Partial<LoadingItem>): void {
        if (this.loadingItems[index]) {
            this.loadingItems[index] = { ...this.loadingItems[index], ...updates };
            this.callbacks.onItemProgress?.(index, this.loadingItems[index]);
        }
    }

    /**
     * Obtiene el loader apropiado para un tipo de asset
     * 
     * @param type - Tipo de asset a cargar
     * @returns Loader configurado para el tipo especificado
     */
    private getLoaderForType(type: LoadingItem['type']): THREE.Loader {
        const loaders = this.initializeLoaders();

        switch (type) {
            case 'gltf':
                return loaders.gltf;
            case 'texture':
                return loaders.texture;
            case 'ktx2':
                return loaders.ktx2;
            case 'audio':
                return loaders.audio;
            case 'binary':
                return loaders.file;
            default:
                throw new Error(`Tipo de asset no soportado: ${type}`);
        }
    }

    /**
     * Carga un asset individual
     * 
     * @param url - URL del asset a cargar
     * @param type - Tipo de asset
     * @param index - Índice del asset en la lista de carga
     * @returns Promise que resuelve con el asset cargado
     */
    private loadSingleAsset(url: string, type: LoadingItem['type'], index: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const loader = this.getLoaderForType(type);

            loader.load(
                url,
                // onLoad
                (data: any) => {
                    const currentProgress = this.assetProgressTracker.get(index);
                    if (currentProgress) {
                        this.assetProgressTracker.set(index, {
                            loaded: currentProgress.total,
                            total: currentProgress.total
                        });
                    }

                    this.updateItem(index, { loaded: true, progress: 100 });
                    this.updateGlobalProgress();
                    resolve(data);
                },
                // onProgress
                (progressEvent: ProgressEvent) => {
                    if (progressEvent.lengthComputable) {
                        this.assetProgressTracker.set(index, {
                            loaded: progressEvent.loaded,
                            total: progressEvent.total
                        });

                        const itemProgress = (progressEvent.loaded / progressEvent.total) * 100;
                        this.updateItem(index, { progress: itemProgress });
                        this.updateGlobalProgress();
                    }
                },
                // onError
                (error: any) => {
                    const errorMessage = error.message || 'Error desconocido';
                    this.updateItem(index, { error: errorMessage });
                    this.callbacks.onError?.(errorMessage);
                    reject(error);
                }
            );
        });
    }

    /**
     * Carga múltiples assets de forma asíncrona
     * 
     * @param urls - Array de objetos con url y tipo de cada asset
     * @returns Promise que resuelve con un objeto mapeando nombres de archivo a assets cargados
     */
    public async loadAssets(urls: { url: string; type: LoadingItem['type'] }[]): Promise<{ [key: string]: any }> {
        if (urls.length === 0) {
            return {};
        }

        try {
            // Verificar archivos del transcoder para KTX2
            const hasKtx2 = urls.some(item => item.type === 'ktx2');
            if (hasKtx2) {
                await this.checkTranscoderFiles();
            }

            this.callbacks.onStart?.();

            // Inicializar items de carga
            this.loadingItems = urls.map(({ url, type }) => ({
                url,
                type,
                loaded: false,
                progress: 0
            }));

            this.assetProgressTracker.clear();

            // Inicializar tracker de progreso para cada asset
            urls.forEach((_, index) => {
                this.assetProgressTracker.set(index, { loaded: 0, total: 1 });
            });

            const results: { [key: string]: any } = {};

            // Crear promesas de carga para todos los assets
            const loadPromises = urls.map(async ({ url, type }, index) => {
                try {
                    const result = await this.loadSingleAsset(url, type, index);
                    const fileName = url.split('/').pop()?.split('.')[0] || url;
                    results[fileName] = result;
                    return result;
                } catch (error) {
                    throw new Error(`Error cargando ${url}: ${error}`);
                }
            });

            // Esperar a que todos los assets se carguen
            await Promise.all(loadPromises);

            this.callbacks.onComplete?.();
            return results;

        } catch (error) {
            const errorMessage = `Error al cargar assets: ${error}`;
            this.callbacks.onError?.(errorMessage);
            throw error;
        }
    }

    /**
     * Resetea el estado del manager de assets
     */
    public reset(): void {
        this.loadingItems = [];
        this.assetProgressTracker.clear();
    }

    /**
     * Libera recursos y limpia referencias
     */
    public dispose(): void {
        if (this.loaders) {
            // Limpiar loaders si tienen métodos de disposición
            this.loaders.ktx2.dispose?.();
        }

        this.loaders = null;
        this.loadingItems = [];
        this.assetProgressTracker.clear();
        this.callbacks = {};
    }

    /**
     * Obtiene el estado actual de carga
     * 
     * @returns Array con el estado de todos los items en carga
     */
    public getLoadingState(): LoadingItem[] {
        return [...this.loadingItems];
    }
}