import {
  Engine,
  RoomScene,
  DebugSystem,
  Systems,
  LoaderSystem,
  useEngineStore,
} from "@/engine";
import { useEffect, useRef } from "react";
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
import { useUserSettings } from "@/app/features/userSettings";

export default function MainLayout() {
  //const { t } = useTranslation();
  // const { fetchDreams } = useDreams();
  const { isDreamSystemActive } = useEngineStore();
  const handler = useHudHandler();
  const engine = useEngineAPI();

  // Obtener configuración del usuario con tema aplicado
  const { roomId, skinId, loading } = useUserSettings();

  // Ref para saber si ya se cargó la sala inicial
  const initialRoomLoaded = useRef(false);

  useEffect(() => {
    if (!roomId || !skinId || loading) return;

    // Primer render: cargar sala completa
    if (!initialRoomLoaded.current) {
      console.log("[MainLayout] Carga inicial - setRoom:", roomId, skinId);
      engine.setRoom(roomId, skinId);
      initialRoomLoaded.current = true;
    }
    // Renders subsecuentes: solo cambiar skin
    else {
      console.log("[MainLayout] Cambio de tema - setSkin:", skinId);
      engine.setSkin(skinId);
    }
  }, [roomId, skinId, loading, engine]);

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
            <DebugSystem enabled={false} />
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
