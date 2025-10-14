// engine/services/RoomManager.ts
import { AssetManager } from "./AssetManager";
import { Room } from "../entities/Room";
import { EngineCore, EventEmitter, Skin } from "@/engine/core/";
import type { Injectable } from "../core/src/Injectable";

export interface RoomInfo {
  id: string;
  name?: string;
  path: string;
}

export interface SkinInfo {
  id: string;
  path: string;
}

export interface RoomLoadOptions {
  room: RoomInfo;
  skin?: SkinInfo;
}

export class RoomManager extends EventEmitter implements Injectable {
  private core: EngineCore | null = null;

  private assetManager: AssetManager | null = null;

  private currentRoom: Room | null = null;

  private currentSkin: Skin | null = null;

  private loading = false;

  init(core: EngineCore) {
    this.core = core;
    this.assetManager = core.getService(AssetManager);

    // 🎧 Escuchar eventos globales del Core
    this.core.on("engine:setRoom", async ({ room, skin }) => {
      await this.loadRoom({ room, skin });
    });

    this.core.on("engine:setSkin", async ({ skin }) => {
      await this.changeSkin(skin);
    });
  }

  /**
   * Carga una habitación completa con su skin
   */
  async loadRoom({ room, skin }: RoomLoadOptions): Promise<Room> {
    if (this.loading) return Promise.reject("Ya se está cargando una room");

    this.loading = true;
    this.core?.emit("room:loading", { room });

    try {
      const assets = await this.assetManager?.loadAssets([
        { url: `models/${room.id}.gltf`, type: "gltf" },
        { url: `skins/${skin?.id}_object.ktx2`, type: "ktx2" },
        { url: `skins/${skin?.id}_wall.ktx2`, type: "ktx2" },
      ]);

      if (!assets) throw new Error("No se pudieron cargar los assets de la room");

      const gltf = assets[room.id];
      const texture = skin ? assets[skin.id] : null;

      // Crear entidad Room y aplicar skin
      const newRoom = new Room(room.id,);
      if (texture) newRoom.applySkin(texture);

      // Descargar la room anterior si existía
      if (this.currentRoom) {
        this.core?.emit("room:unloading", { room: this.currentRoom });
        this.currentRoom.dispose();
      }

      this.currentRoom = newRoom;
      this.currentSkin = skin?.id ?? null;

      this.core?.emit("room:ready", { room: newRoom });
      this.loading = false;

      return newRoom;
    } catch (error) {
      this.core?.emit("room:error", { error });
      this.loading = false;
      throw error;
    }
  }

  /**
   * Cambia la skin de la room actual
   */
  async changeSkin(skin: SkinInfo) {
    if (!this.currentRoom) {
      console.warn("[RoomManager] No hay room activa para cambiar skin.");
      return;
    }

    this.core?.emit("skin:change:start", { skin });

    const assets = await this.assetManager?.loadAssets([
      { url: `${skin.path}/${skin.id}.ktx2`, type: "ktx2" },
    ]);

    if (!assets || !assets[skin.id]) {
      console.warn(`[RoomManager] No se pudo cargar la skin: ${skin.id}`);
      this.core?.emit("skin:change:error", { skin });
      return;
    }

    const texture = assets[skin.id];
    this.currentRoom.applySkin(texture);
    this.currentSkin = skin.id;

    this.core?.emit("skin:change:complete", {
      skinId: skin.id,
      room: this.currentRoom,
    });
  }

  getCurrentRoom() {
    return this.currentRoom;
  }

  getCurrentSkin() {
    return this.currentSkin;
  }
}
