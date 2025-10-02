import {
  Engine,
  useEngine,
  RoomScene,
  LoaderSystem,
  CameraSystem,
  AnimationSystem,
  InteractionSystem,
} from "@/engine";

import { useEffect } from "react";

export default function Home() {
  const engine = useEngine();
  //algo asi seria la respuesta del backend
  //y se lo pasariamos al engine
  //para setear la room y skin
  //por ahora hardcodeado
  const backendSettings = { roomId: "oniria", skinId: "oniria" };
  const { roomId, skinId } = backendSettings;

  useEffect(() => {
    engine.setRoom(roomId, skinId);
  }, []);

  return (
    <div className="p-5 h-full w-full rounded-3xl bg-gradient-to-b from-black/80 via-black/30 to-black/80">
      {roomId && skinId && (
        <>
          <LoaderSystem />
          <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
            <Engine.Core>
              <InteractionSystem autoConfigureForRoom={true} />
              <AnimationSystem />
              <CameraSystem />
              <RoomScene />
            </Engine.Core>
          </Engine.Canvas>
        </>
      )}
    </div>
  );
}
