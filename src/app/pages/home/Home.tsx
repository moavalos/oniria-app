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

import Starfield from "../../../shared/components/Starfield";
import Card from "@/shared/components/Card";
import { useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import HeaderContainer from "@/shared/components/header/HeaderContainer";

export default function Home() {
  //const { t } = useTranslation();
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
    <div className="min-h-screen w-full bg-[radial-gradient(60%_80%_at_50%_0%,#1b0f2a_0%,#0b0810_55%,#06050b_100%)] text-white overflow-hidden">
      {/* fondo de estrellas */}
      <Starfield />

      {/* top bar */}
      < HeaderContainer />

      {/* layout principal */}
      <main className=" relative z-0 mx-auto grid max-w-[1980px] grid-cols-12 gap-6 px-4 py-6  lg:py-5 ">
        <LeftPanel onNuevaFrase={() => engine.node?.next()} />

        {/* Canvas 3d*/}
        <Card className="col-span-12  sm:col-span-9 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-4 overflow-hidden relative">
          <LoaderSystem />

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
        </Card>
      </main>
    </div>
  );
}
