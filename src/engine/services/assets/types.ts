// types.ts
export type AssetType = 'gltf' | 'texture' | 'ktx2' | 'audio' | 'binary';

export interface LoadingItem {
    url: string;
    type: AssetType;
    progress: number;
    loaded: boolean;
    error?: string;
}

export interface LoadingCallbacks {
    onStart?: () => void;
    onProgress?: (_progress: number) => void;
    onItemProgress?: (_item: LoadingItem) => void;
    onComplete?: () => void;
    onError?: (_error: string) => void;
}

export interface IAssetLoader {
    readonly type: AssetType;
    load(
        _url: string,
        _onProgress: (_progress: number) => void
    ): Promise<any>;
    dispose?(): void;
}
