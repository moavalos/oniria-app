import { useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useLoaderActions } from "./useProgress";

export interface LoadingItem {
  url: string;
  type: 'gltf' | 'texture' | 'ktx2' | 'audio' | 'binary';
  loaded: boolean;
  progress: number;
  error?: string;
}

export interface UseLoaderResult {
  loadAssets: (urls: { url: string; type: LoadingItem['type'] }[]) => Promise<{ [key: string]: any }>;
  resetLoader: () => void;
}

export function useThreeLoader(renderer?: THREE.WebGLRenderer): UseLoaderResult {
  const {
    startLoading,
    finishLoading,
    setItems,
    updateItem,
    addError,
    resetLoading
  } = useLoaderActions();    const loadersRef = useRef<{
        gltf: GLTFLoader;
        texture: THREE.TextureLoader;
        ktx2: KTX2Loader;
        audio: THREE.AudioLoader;
        file: THREE.FileLoader;
    } | null>(null);

    // Verificar archivos del transcoder
    const checkTranscoderFiles = useCallback(async () => {
        const files = ['/basis/basis_transcoder.js', '/basis/basis_transcoder.wasm'];
        for (const file of files) {
            try {
                const response = await fetch(file, { method: 'HEAD' });
                if (!response.ok) {
                    console.warn(`⚠️ Archivo del transcoder no encontrado: ${file}`);
                    return false;
                }
            } catch (err) {
                console.warn(`⚠️ Error verificando archivo del transcoder ${file}:`, err);
                return false;
            }
        }
        console.log("✅ Archivos del transcoder KTX2 verificados");
        return true;
    }, []);  // Inicializar loaders
    const initLoaders = useCallback(() => {
        if (loadersRef.current) return loadersRef.current;

        const manager = new THREE.LoadingManager();

        const gltfLoader = new GLTFLoader(manager);
        const textureLoader = new THREE.TextureLoader(manager);
        const ktx2Loader = new KTX2Loader(manager);
        const audioLoader = new THREE.AudioLoader(manager);
        const fileLoader = new THREE.FileLoader(manager);

        // Configurar DRACO para GLTF
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./draco/');
        gltfLoader.setDRACOLoader(dracoLoader);

        // Configurar KTX2 - CRÍTICO: debe estar configurado antes de usar
        ktx2Loader.setTranscoderPath('./basis/');

        // Verificar archivos del transcoder en desarrollo
        if (process.env.NODE_ENV === 'development') {
            checkTranscoderFiles().catch(err =>
                console.warn("⚠️ Verificación de archivos del transcoder falló:", err)
            );
        }

        // Detectar soporte solo si hay renderer
        if (renderer) {
            console.log("🔧 Configurando KTX2Loader con renderer:", {
                renderer: renderer.constructor.name,
                capabilities: renderer.capabilities?.getMaxAnisotropy?.() || 'N/A'
            });

            try {
                ktx2Loader.detectSupport(renderer);
                console.log("✅ KTX2Loader.detectSupport() ejecutado exitosamente");
            } catch (err) {
                console.error("❌ Error en KTX2Loader.detectSupport():", err);
            }
        } else {
            console.warn("⚠️ KTX2Loader: No renderer disponible, algunas texturas KTX2 pueden fallar");
        }

        loadersRef.current = {
            gltf: gltfLoader,
            texture: textureLoader,
            ktx2: ktx2Loader,
            audio: audioLoader,
            file: fileLoader
        };

        console.log("✅ Loaders inicializados:", {
            hasRenderer: !!renderer,
            ktx2Configured: !!renderer
        });

        return loadersRef.current;
    }, [renderer, checkTranscoderFiles]);     const resetLoader = useCallback(() => {
        resetLoading();
    }, [resetLoading]);

    const loadAssets = useCallback(async (assets: { url: string; type: LoadingItem['type'] }[]): Promise<{ [key: string]: any }> => {
        if (assets.length === 0) return {};

        startLoading();

        // Inicializar items en el store
        const initialItems: LoadingItem[] = assets.map(asset => ({
            url: asset.url,
            type: asset.type,
            loaded: false,
            progress: 0
        }));
        setItems(initialItems);

        const loaders = initLoaders();
        const results: { [key: string]: any } = {};

        try {
            console.log("🚀 Iniciando carga de", assets.length, "assets");

            const loadPromises = assets.map(async (asset, index) => {
                try {
                    let loader: any;

                    switch (asset.type) {
                        case 'gltf':
                            loader = loaders.gltf;
                            break;
                        case 'texture':
                            loader = loaders.texture;
                            break;
                        case 'ktx2':
                            loader = loaders.ktx2;
                            // Validación crítica para KTX2
                            if (!renderer) {
                                throw new Error("KTX2Loader requiere un renderer. Asegúrate de pasar el renderer al hook useThreeLoader.");
                            }

                            // Verificar que el KTX2Loader esté correctamente configurado
                            if (!loader._transcoderBinary) {
                                console.warn("⚠️ KTX2Loader: Transcoder binary no detectado, reintentando detectSupport");
                                try {
                                    loader.detectSupport(renderer);
                                } catch (detectErr) {
                                    console.error("❌ Error reintentando detectSupport:", detectErr);
                                }
                            }

                            console.log("🔧 Usando KTX2Loader para:", asset.url, {
                                hasTranscoder: !!loader._transcoderBinary,
                                transcoderPath: loader._transcoderPath
                            });
                            break;
                        case 'audio':
                            loader = loaders.audio;
                            break;
                        case 'binary':
                            loader = loaders.file;
                            break;
                        default:
                            throw new Error(`Tipo de asset no soportado: ${asset.type}`);
                    }                    // Cargar con progreso individual
                    const result = await new Promise((resolve, reject) => {
                        loader.load(
                            asset.url,
                            // onLoad
                            (data: any) => {
                                console.log(`✅ Asset cargado: ${asset.url}`);

                                // Actualizar item individual
                                updateItem(index, { loaded: true, progress: 100 });

                                resolve(data);
                            },
                            // onProgress
                            (progressEvent: ProgressEvent) => {
                                const itemProgress = progressEvent.lengthComputable
                                    ? (progressEvent.loaded / progressEvent.total) * 100
                                    : 0;

                                // Actualizar progreso individual
                                updateItem(index, { progress: itemProgress });
                            },
                            // onError
                            (err: any) => {
                                console.error(`❌ Error cargando ${asset.url}:`, err);

                                // Actualizar item con error
                                updateItem(index, { error: err.message || 'Error desconocido' });
                                addError(err.message || 'Error desconocido');

                                reject(err);
                            }
                        );
                    });

                    const fileName = asset.url.split('/').pop()?.split('.')[0] || asset.url;
                    results[fileName] = result;

                    return result;
                } catch (err: any) {
                    console.error(`❌ Error en asset ${asset.url}:`, err);
                    throw err;
                }
            });

            // Esperar a que todos los assets se carguen
            await Promise.all(loadPromises);

            console.log("✅ Todos los assets cargados exitosamente");
            finishLoading();

            return results;

        } catch (err: any) {
            console.error("❌ Error durante la carga:", err);
            addError(err.message || 'Error desconocido durante la carga');
            finishLoading();
            throw err;
        }
    }, [initLoaders, startLoading, finishLoading, setItems, updateItem, addError]);

    return {
        loadAssets,
        resetLoader
    };
}