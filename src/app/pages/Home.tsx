import { RoomScene, Engine, useEngine } from "@/engine";
import { useEngineStore } from "@/engine/store/engineStore";
import { useEffect } from "react";

export default function Home() {
  const { setRoomId, setSkinId, roomId, skinId } = useEngineStore();
  const { roomId: engineRoomId, activeRoom } = useEngine();

  console.log({ engineRoomId, activeRoom });

  useEffect(() => {
    // Supongamos que el backend devuelve esto:
    console.log("Home render");
    const backendSettings = { roomId: "oniria", skinId: "oniria" };
    setRoomId(backendSettings.roomId);
    setSkinId(backendSettings.skinId);
  }, []);
  return (
    <div className="p-5 h-full w-full rounded-3xl bg-gradient-to-b from-black/80 via-black/30 to-black/80">
      {roomId && skinId && (
        <Engine engineSettings={{ backgroundColor: "#000000" }}>
          <RoomScene />
        </Engine>
      )}
    </div>
  );
}
