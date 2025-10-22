import {
  Engine,
  RoomScene,
  DebugSystem,
  Systems,
  LoaderSystem,
  useEngineStore,
} from "@/engine";
import { useEffect } from "react";
//import useDreams from "@/app/features/dreams/hooks/useDreams";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
//import type { Dream } from "@/engine/core/store/engineStore";
import HudSystem from "@/app/features/hud/components/Hudsystem";
import UserActions from "@/app/features/hud/components/header/UserActions";
import HeaderLogo from "@/app/features/hud/components/header/HeaderLogo";
import BadgeCard from "@/app/features/hud/components/badges/BadgeCard";
import useHudHandler from "@/app/features/hud/hooks/useHudHandler";
import MenuSystem from "@/app/features/hud/components/MenuSystem";
import DreamSystem from "@/app/features/hud/components/dreams/DreamSystem";

export default function MainLayout() {
  //const { t } = useTranslation();
  // const { fetchDreams } = useDreams();
  const { isDreamSystemActive } = useEngineStore();
  const handler = useHudHandler();

  const engine = useEngineAPI();

  const backendSettings = { roomId: "oniria", skinId: "oniria" };
  const { roomId, skinId } = backendSettings;

  useEffect(() => {
    console.log("[Home] Calling engine.setRoom:", roomId, skinId);
    engine.setRoom(roomId, skinId);
  }, []);

  // const handleInterpretar = async (dream: string) => {
  //   await engine.camera.viewNodes();
  //   const response = await fetchDreams(dream);
  //   if (!response) return;
  //   engine.node?.onReady((nodeController) => {
  //     setDream(response as Dream);
  //     nodeController.idle();
  //   });

  //navegar a otra pagina con el resultado
  //navigate("/interpretacion");
  //};

  return (
    <main className="relative w-full h-dvh ">
      <HudSystem.Container>
        <HudSystem.TopBar>
          <HeaderLogo text={"oniria"} />
          <UserActions />
        </HudSystem.TopBar>
        <HudSystem.Body footerHeight="h-24">
          <MenuSystem />
          {isDreamSystemActive && <DreamSystem />}
        </HudSystem.Body>
        {/* Footer reservado para futuras cards o controles */}
        <HudSystem.Footer height="h-24" className="pointer-events-none">
          {/* Aquí puedes agregar cards adicionales en el futuro */}
        </HudSystem.Footer>
      </HudSystem.Container>
      <LoaderSystem />

      {roomId && skinId && (
        <Engine.Canvas
          engineSettings={{
            backgroundColor: "#000000",
            cameraPosition: [-5, 4, 4],
          }}
        >
          <Engine.Core>
            <DebugSystem enabled={true} />
            <Systems.Interaction
              config={{
                callbacks: {
                  objects: {
                    onClick: handler.objectClickHandler,
                    onHover: handler.objectEnterHandler,
                    onHoverLeave: handler.objectLeaveHandler,
                  },
                },
              }}
            />
            <Systems.Badges badgeComponent={BadgeCard} />
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
