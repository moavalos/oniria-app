import {
  Engine,
  RoomScene,
  LoaderSystem,
  DebugSystem,
  useEngineStore,
  Systems,
} from "@/engine";
import { useEffect } from "react";
import useDreams from "@/app/features/dreams/hooks/useDreams";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import type { Dream } from "@/engine/core/store/engineStore";
import HudSystem from "@/app/features/hud/components/Hudsystem";
import UserActions from "@/app/features/users/actions/UserActions";
import HeaderLogo from "@/app/shared/components/users/HeaderLogo";

export default function MainLayout() {
  //const { t } = useTranslation();
  const { fetchDreams } = useDreams();
  const { setDream } = useEngineStore();

  const engine = useEngineAPI();

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
    <main className="relative w-full h-dvh ">
      <HudSystem.Container>
        <HudSystem.TopBar>
          <HeaderLogo text={"oniria"} />
          <UserActions />
        </HudSystem.TopBar>
      </HudSystem.Container>
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
    </main>
  );
}
