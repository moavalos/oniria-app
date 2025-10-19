// engine/services/RoomManager.ts
import { AssetManager } from "../assets/AssetManager";
import { Room } from "../../entities/Room";
import { Skin } from "../../entities/Skin";
import { EngineCore } from "@/engine/core/";
import { useEngineStore } from "@/engine/core/store/engineStore";
import type { Injectable } from "../../core/src/Injectable";
import type { LoadingCallbacks } from "../assets/types";
import { ConfigManager } from '../../utils/ConfigManager';
import { MaterialService } from "../MaterialService";

// Tipos de eventos que emite el RoomManager
// interface RoomManagerEvents {
//   "room:loading": { room: RoomInfo, skin?: SkinInfo };
//   "room:ready": { room: Room, skin?: SkinInfo };
//   "room:error": { error: any, room: RoomInfo, skin?: SkinInfo };
//   "room:unloading": { room: Room };
//   "skin:change:start": { skin: SkinInfo, room: Room };
//   "skin:change:complete": { skin: SkinInfo, room: Room };
//   "skin:change:error": { skin: SkinInfo, error: any, room: Room };
// }

export interface RoomInfo {
  id: string;
}

export interface SkinInfo {
  id: string;
}

export interface RoomLoadOptions {
  room: RoomInfo;
  skin?: SkinInfo;
}

export class RoomManager implements Injectable {


  private assetManager: AssetManager | null = null;

  private currentRoom: Room | null = null;

  private currentSkin: string | null = null;

  private loading = false;

  constructor(private _core: EngineCore, private _configManager: ConfigManager) {
    this.init();
  }

  init() {
    this.assetManager = this._core.getService(AssetManager);
    this.setupProgressCallbacks();
    this.setupEventListeners();
  }

  // ===========================================
  // SETUP METHODS - Responsabilidad única: configuración
  // ===========================================

  /**
   * Configura los callbacks de progreso del AssetManager con el store
   */
  private setupProgressCallbacks(): void {
    if (!this.assetManager) return;

    const callbacks: LoadingCallbacks = {
      onStart: () => {
        const store = useEngineStore.getState();
        store.startLoading();
      },
      onProgress: (progress: number) => {
        const store = useEngineStore.getState();
        store.setProgress(progress);
      },
      onItemProgress: (item) => {
        const store = useEngineStore.getState();
        const currentItems = store.items;
        const existingIndex = currentItems.findIndex(i => i.url === item.url);

        if (existingIndex >= 0) {
          store.updateItem(existingIndex, item);
        }
      },
      onComplete: () => {
        const store = useEngineStore.getState();
        store.finishLoading();
      },
      onError: (error: string) => {
        const store = useEngineStore.getState();
        store.addError(error);
      }
    };

    this.assetManager.setCallbacks(callbacks);
  }

  /**
   * Configura los listeners de eventos del core
   */
  private setupEventListeners(): void {
    // Escuchar eventos globales del Core para operaciones específicas
    this._core.on("engine:setSkin", async (data: any) => {
      const { skin } = data;
      await this.changeSkin(skin);
    });
  }

  // ===========================================
  // ASSET PREPARATION METHODS - Responsabilidad única: preparación de assets
  // ===========================================

  /**
   * Prepara la lista de assets necesarios para una room
   */
  private prepareRoomAssets(roomId: string, skinId?: string): Array<{ url: string, type: "gltf" | "ktx2" }> {
    const assets: Array<{ url: string, type: "gltf" | "ktx2" }> = [
      { url: `models/rooms/${roomId}/room.gltf`, type: "gltf" }
    ];

    if (skinId) {
      assets.push(
        { url: `skins/${skinId}/object.ktx2`, type: "ktx2" },
        { url: `skins/${skinId}/wall.ktx2`, type: "ktx2" }
      );
    }

    return assets;
  }

  /**
   * Inicializa los items de loading en el store
   */
  private initializeLoadingItems(assets: Array<{ url: string, type: "gltf" | "ktx2" }>): void {
    const store = useEngineStore.getState();
    const loadingItems = assets.map(asset => ({
      url: asset.url,
      type: asset.type,
      progress: 0,
      loaded: false
    }));
    store.setItems(loadingItems);
  }

  // ===========================================
  // ROOM LIFECYCLE METHODS - Responsabilidad única: gestión del ciclo de vida
  // ===========================================

  /**
   * Valida si se puede proceder con la carga
   */
  private validateLoadOperation(): void {
    if (this.loading) {
      throw new Error("Ya se está cargando una room");
    }
  }

  /**
   * Limpia la room actual antes de cargar una nueva
   */
  private cleanupCurrentRoom(): void {
    if (this.currentRoom) {
      // Emitir evento de descarga
      this._core.emit("room:unloading", { room: this.currentRoom });
      this.currentRoom.dispose();
    }
  }

  /**
   * Actualiza el estado interno con la nueva room
   */
  private updateRoomState(newRoom: Room, skinId?: string): void {
    this.currentRoom = newRoom;
    this.currentSkin = skinId ?? null;
  }

  /**
   * Carga una habitación completa con su skin
   */
  async loadRoom({ room, skin }: RoomLoadOptions): Promise<Room> {
    try {
      // Validar y preparar
      this.validateLoadOperation();
      this.loading = true;

      // Emitir evento de inicio de carga
      this._core.emit("room:loading", { room, skin });

      // Preparar assets y inicializar store
      const assetsToLoad = this.prepareRoomAssets(room.id, skin?.id);
      this.initializeLoadingItems(assetsToLoad);

      // Cargar assets
      const assets = await this.assetManager?.loadAssets(assetsToLoad);
      if (!assets) throw new Error("No se pudieron cargar los assets de la room");

      // Obtener recursos cargados
      const gltf = assets[`models/rooms/${room.id}/room.gltf`];

      // Limpiar room anterior
      this.cleanupCurrentRoom();

      // Crear nueva room
      const skinInstance = skin ? new Skin(skin.id) : new Skin('default');
      const newRoom = new Room(room.id, skinInstance, gltf.scene, this._configManager);

      // Aplicar texturas si están disponibles
      if (skin) {
        const objectTexture = assets[`skins/${skin.id}/object.ktx2`];
        const environmentTexture = assets[`skins/${skin.id}/wall.ktx2`];

        if (objectTexture && environmentTexture) {
          newRoom.setTextures({
            objectTexture,
            environmentTexture,
          });
          console.log("🎨 RoomManager - Texturas aplicadas a room:", newRoom.get_Id());
        }
      }

      //aplicamos materiales
      const materialService = this._core.getService(MaterialService);
      await materialService.applyMaterialsToRoom(newRoom);


      // Actualizar estado
      this.updateRoomState(newRoom, skin?.id);

      // Emitir evento de room lista (completamente materializada)

      this._core.emit("room:ready", { room: newRoom });
      return newRoom;

    } catch (error) {
      // Emitir evento de error
      this._core.emit("room:error", { error, room, skin });
      throw error;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Cambia la skin de la room actual
   */
  async changeSkin(skin: SkinInfo): Promise<void> {
    if (!this.currentRoom) {
      console.warn("[RoomManager] No hay room activa para cambiar skin.");
      return;
    }

    try {
      // Emitir evento de inicio de cambio de skin
      this._core.emit("skin:change:start", { skin, room: this.currentRoom });

      // Preparar solo los assets de skin
      const skinAssets = [
        { url: `skins/${skin.id}/object.ktx2`, type: "ktx2" as const },
        { url: `skins/${skin.id}/wall.ktx2`, type: "ktx2" as const }
      ];

      // Inicializar loading items para el cambio de skin
      this.initializeLoadingItems(skinAssets);

      // Cargar assets de skin
      const assets = await this.assetManager?.loadAssets(skinAssets);

      if (!assets) {
        throw new Error(`No se pudieron cargar los assets de la skin: ${skin.id}`);
      }

      // Aplicar la skin a la room actual
      const texture = assets[`skins/${skin.id}/object.ktx2`];
      this.currentRoom.applySkin(texture);
      this.currentSkin = skin.id;

      // Emitir evento de cambio completado
      this._core.emit("skin:change:complete", {
        skin,
        room: this.currentRoom,
      });

    } catch (error) {
      console.warn(`[RoomManager] Error al cambiar skin: ${skin.id}`, error);
      // Emitir evento de error en cambio de skin
      this._core.emit("skin:change:error", { skin, error, room: this.currentRoom });
    }
  }

  // ===========================================
  // PUBLIC GETTERS - Responsabilidad única: acceso a estado
  // ===========================================

  getCurrentRoom(): Room | null {
    return this.currentRoom;
  }

  getCurrentSkin(): string | null {
    return this.currentSkin;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
