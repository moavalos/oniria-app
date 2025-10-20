import {
  Engine,
  RoomScene,
  LoaderSystem,
  DebugSystem,
  useEngineStore,
} from "@/engine";

import Starfield from "../../../shared/components/Starfield";
import Card from "@/shared/components/Card";
import { useEffect } from "react";
import HeaderContainer from "@/shared/components/users/HeaderContainer";
import useDreams from "@/app/features/dreams/hooks/useDreams";
import UnifiedSidePanel from "./components/Panel";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { Systems } from "@/engine/components";
import HudSystem from "@/engine/systems/hud/HudSystem";
import type { Dream } from "@/engine/core/store/engineStore";

export default function Home() {
  //const { t } = useTranslation();
  const { fetchDreams } = useDreams();
  const { setDream } = useEngineStore();

  const engine = useEngineAPI();
  //algo asi seria la respuesta del backend
  //y se lo pasariamos al engine
  //para setear la room y skin
  //por ahora hardcodeado
  const backendSettings = { roomId: "oniria", skinId: "oniria" };
  const { roomId, skinId } = backendSettings;

  useEffect(() => {
    console.log("[Home] Calling engine.setRoom:", roomId, skinId);
    engine.setRoom(roomId, skinId);
  }, []);

  const handleBackHome = () => {
    setDream(null);
    engine.camera.viewReset();
    console.log("Back to home - TODO: implementar navegación");
  };

  const handleInterpretar = async (dream: string) => {
    await engine.camera.viewNodes();
    const response = await fetchDreams(dream);
    if (!response) return;
    engine.node?.onReady((nodeController) => {
      setDream(response as Dream);
      nodeController.idle();
    });

    //navegar a otra pagina con el resultado
    //navigate("/interpretacion");
  };
  const canvasBg =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement)
          .getPropertyValue("--canvas-bg")
          .trim() || "#000000"
      : "#000000";

  return (
    <div
      className="w-full h-dvh text-[var(--color-text-primary)] overflow-hidden flex flex-col"
      style={{ background: "var(--app-bg)" }}
    >
      {/* fondo de estrellas */}
      <Starfield />

      {/* top bar */}
      <HeaderContainer />

      {/* layout principal - ocupa el resto del espacio disponible */}
      <main className="container relative z-0 mx-auto grid grid-cols-12 gap-4 flex-1 min-h-0 pb-4">
        <UnifiedSidePanel
          variant="home"
          onBackToHome={handleBackHome}
          onNuevaFrase={() =>
            console.log("Nueva frase - TODO: implementar navegación")
          }
          onInterpretar={handleInterpretar}
          onPersonalizar={() =>
            console.log("Personalizar - TODO: implementar reset")
          }
          scrollable
        />

        {/* Canvas 3d */}
        <Card.Container className="col-span-12 sm:col-span-9 rounded-2xl border backdrop-blur-md p-5 md:p-4 overflow-hidden relative">
          <HudSystem />
          <LoaderSystem />

          {roomId && skinId && (
            <Engine.Canvas
              engineSettings={{
                backgroundColor: canvasBg,
                cameraPosition: [-5, 4, 4],
              }}
            >
              <Engine.Core>
                <DebugSystem enabled={true} />
                <Systems.Interaction />
                <Systems.Animation
                  config={{
                    autoPlay: true,
                    playOnMount: true,
                  }}
                  enableAnimations={true}
                  autoConfigureForRoom={true}
                />
                <Systems.Camera config={{}} />
                <RoomScene />
              </Engine.Core>
            </Engine.Canvas>
          )}
        </Card.Container>
      </main>
    </div>
  );
}
