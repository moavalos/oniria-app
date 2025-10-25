import * as THREE from "three";
import { AssetManager } from "../assets/AssetManager";
import { Room } from "@engine/entities/Room";
import { Skin } from "@engine/entities/Skin";
import { EngineCore } from "@engine/core";
import { useEngineStore } from "@engine/core/store/engineStore";
import { ConfigManager } from "@engine/utils/ConfigManager";
import { MaterialService } from "../MaterialService";
import type { Injectable } from "@engine/core/src/Injectable";
import type { LoadingCallbacks } from "../assets/types";

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

/**
 * Gestor para la carga, gestión y control del ciclo de vida de la Room 3D
 * 
 * Proporciona funcionalidad completa para cargar Rooms con sus texturas (skins),
 * gestionar la transición entre Rooms, aplicar materiales y mantener el estado
 * de carga. Integra servicios de assets, materiales y configuración para
 * ofrecer una experiencia de carga optimizada y con retroalimentación visual.
 */
export class RoomManager implements Injectable {


  private assetManager: AssetManager | null = null;

  private currentRoom: Room | null = null;

  private currentSkin: string | null = null;

  private loading = false;

  /**
   * Crea una nueva instancia del gestor de Room
   * 
   * @param _core - Instancia del núcleo del motor
   * @param _configManager - Gestor de configuración
   */
  constructor(private _core: EngineCore, private _configManager: ConfigManager) {
    this.init();
  }

  /**
   * Inicializa los servicios y configuraciones necesarios
   */
  init(): void {
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

  /**
   * Prepara la lista de assets necesarios para una sala
   * 
   * @param roomId - ID de la sala a cargar
   * @param skinId - ID opcional de la skin a aplicar
   * @returns Array de assets a cargar con sus tipos
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
   * 
   * @param assets - Array de assets para inicializar en el store
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

  /**
   * Valida si se puede proceder con la operación de carga
   * 
   * @throws Error si ya hay una carga en progreso
   */
  private validateLoadOperation(): void {
    if (this.loading) {
      throw new Error("Ya se está cargando una sala");
    }
  }

  /**
   * Limpia la sala actual antes de cargar una nueva
   */
  private cleanupCurrentRoom(): void {
    if (this.currentRoom) {
      // Emitir evento de descarga
      this._core.emit("room:unloading", { room: this.currentRoom });
      this.currentRoom.dispose();
    }
  }

  /**
   * Actualiza el estado interno con la nueva sala
   * 
   * @param newRoom - Nueva instancia de sala
   * @param skinId - ID opcional de la skin aplicada
   */
  private updateRoomState(newRoom: Room, skinId?: string): void {
    this.currentRoom = newRoom;
    this.currentSkin = skinId ?? null;
  }

  /**
   * Carga una habitación completa con su skin
   * 
   * @param options - Opciones de carga que incluyen room y skin opcional
   * @returns Promesa que resuelve con la instancia de Room cargada
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
      if (!assets) throw new Error("No se pudieron cargar los assets de la sala");

      // Obtener recursos cargados
      const gltf = assets[`models/rooms/${room.id}/room.gltf`];

      // Limpiar sala anterior
      this.cleanupCurrentRoom();

      // Crear nueva sala
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
          console.log("[RoomManager]: Texturas aplicadas a sala:", newRoom.get_Id());
        }
      }

      // Aplicar materiales
      const materialService = this._core.getService(MaterialService);
      await materialService.applyMaterialsToRoom(newRoom);

      // Aplicar video al screen del monitor
      const monitor = newRoom.getObjectByName("monitor") as THREE.Object3D;
      if (monitor) {
        const screen = monitor.getObjectByName("screen") as THREE.Mesh;
        materialService.applyVideoTexture(
          screen,
          '/screen/screen_oniria.mp4',
          {
            muted: true,
            loop: true,
            autoplay: true,
            repeat: { x: 1, y: -1 }, // Solo invertir en Y (vertical)
            offset: { x: 0, y: 1 }   // Ajustar offset en Y
          }
        );
      }

      // Actualizar estado
      this.updateRoomState(newRoom, skin?.id);

      // Emitir evento de sala lista
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
   * Cambia la skin de la sala actual
   * 
   * @param skin - Información de la nueva skin a aplicar
   */
  async changeSkin(skin: SkinInfo): Promise<void> {
    if (!this.currentRoom) {
      console.warn("[RoomManager]: No hay sala activa para cambiar skin");
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

      // Aplicar la skin a la sala actual
      const texture = assets[`skins/${skin.id}/object.ktx2`];
      this.currentRoom.applySkin(texture);
      this.currentSkin = skin.id;

      // Emitir evento de cambio completado
      this._core.emit("skin:change:complete", {
        skin,
        room: this.currentRoom,
      });

    } catch (error) {
      console.warn(`[RoomManager]: Error al cambiar skin: ${skin.id}`, error);
      // Emitir evento de error en cambio de skin
      this._core.emit("skin:change:error", { skin, error, room: this.currentRoom });
    }
  }

  /**
   * Obtiene la sala actualmente cargada
   * 
   * @returns La sala actual o null si no hay ninguna
   */
  getCurrentRoom(): Room | null {
    return this.currentRoom;
  }

  /**
   * Obtiene la skin actualmente aplicada
   * 
   * @returns El ID de la skin actual o null si no hay ninguna
   */
  getCurrentSkin(): string | null {
    return this.currentSkin;
  }

  /**
   * Verifica si hay una operación de carga en progreso
   * 
   * @returns Verdadero si se está cargando una sala
   */
  isLoading(): boolean {
    return this.loading;
  }
}
