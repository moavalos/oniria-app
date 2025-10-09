import {
  Engine,
  useEngine,
  RoomScene,
  LoaderSystem,
  CameraSystem,
  AnimationSystem,
  InteractionSystem,
  DebugSystem,
} from "@/engine";

import { useEffect } from "react";

export default function HomeOld() {
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

  const hoverHandler = (args: any) => {
    console.log("hovered", args.objectName || args);
  };

  return (
    <>
      <LoaderSystem />

      <div className="p-5 h-full w-full rounded-3xl bg-gradient-to-b from-black/80 via-black/30 to-black/80">
        {roomId && skinId && (
          <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
            <Engine.Core>
              <DebugSystem enabled={true} />
              <InteractionSystem onObjectHoverEnter={hoverHandler} />
              <AnimationSystem />
              <CameraSystem />
              <RoomScene />
            </Engine.Core>
          </Engine.Canvas>
        )}
      </div>
    </>
  );
}
