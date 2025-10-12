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
import HeaderContainer from "@/shared/components/users/HeaderContainer";
import useDreams from "@/app/features/dreams/hooks/useDreams";
import UnifiedSidePanel from "./components/Panel";

export default function Home() {
  //const { t } = useTranslation();
  const { fetchDreams } = useDreams();

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

  const handleInterpretar = async (dream: string) => {
    const response = await fetchDreams(dream);

    console.log("dreams:", response);
    //navegar a otra pagina con el resultado
    //navigate("/interpretacion");
  };
  const canvasBg =
    typeof window !== "undefined"
      ? (getComputedStyle(document.documentElement)
        .getPropertyValue("--canvas-bg")
        .trim() || "#000000")
      : "#000000";

  return (
    <div
      className="min-h-screen w-full text-[var(--color-text-primary)] overflow-hidden"
      style={{ background: "var(--app-bg)" }}
    >
      {/* fondo de estrellas */}
      <Starfield />

      {/* top bar */}
      <HeaderContainer />

      {/* layout principal */}
      <main className="relative z-0 mx-auto grid max-w-[1980px] grid-cols-12 gap-6 px-4 py-6 lg:py-5">
        <UnifiedSidePanel
          variant="home"
          onNuevaFrase={() => engine.node?.next()}
          onInterpretar={handleInterpretar}
        />

        {/* Canvas 3d */}
        <Card
          className="col-span-12 sm:col-span-9 rounded-2xl border backdrop-blur-md p-5 md:p-4 overflow-hidden relative"
        >
          <LoaderSystem />

          {roomId && skinId && (
            <Engine.Canvas engineSettings={{ backgroundColor: canvasBg }}>
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
