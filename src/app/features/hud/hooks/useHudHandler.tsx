import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { useEngineStore } from "@/engine/core/store/engineStore";
import { useCallback } from "react";

export default function useHudHandler() {
  const engine = useEngineAPI();
  const { setActiveMenu } = useEngineStore();

  const objectClickHandler = useCallback(
    (event: any) => {
      const { target } = event;
      console.log(`[HudHandler] Object clicked: ${target}`);

      // Hacer zoom al objeto
      engine.lookAt(target);

      // Abrir el menú correspondiente según el objeto
      if (target === "portal") {
        setActiveMenu("portal", {
          objectName: target,
        });
      }
      // Agrega más casos aquí para otros objetos
    },
    [engine, setActiveMenu]
  );

  const objectEnterHandler = useCallback((_event: any) => {
    //TODO: Manejar la entrada del objeto HUD aca
  }, []);

  const objectLeaveHandler = useCallback((_event: any) => {
    //TODO: Manejar la salida del objeto HUD aca
  }, []);

  return {
    objectClickHandler,
    objectEnterHandler,
    objectLeaveHandler,
  };
}
