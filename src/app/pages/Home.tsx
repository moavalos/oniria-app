import { type UserSettings } from "../../engine/types/engine.types";
import { Room } from "@/engine/entities/Room";
import { Skin } from "../../engine/entities/Skin";
import Engine from "@/engine/Engine";

export default function Home() {
  const skin = new Skin("33b", "default", "object_bake.ktx2", "wall_bake.ktx2");
  const room = new Room("1a", "default", "room.gltf", skin);

  const userSettings: UserSettings = {
    activeRoom: room,
    activeSkin: skin,
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <Engine
        userSettings={userSettings}
        engineSettings={{ backgroundColor: "#000000" }}
      />
    </div>
  );
}
