import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { useEngineStore } from "@/engine/core/store/engineStore";
import { useCallback } from "react";
import { menuRegistry } from "../../menuSystem/menuRegistry";

export default function useHudHandler() {
  const engine = useEngineAPI();
  const { setActiveMenu } = useEngineStore();

  /**
   * Verifica si existe un menú para el objeto target y lo abre
   * Solo hace lookAt si existe un menú asociado
   */
  const handleMenuForObject = useCallback(
    (target: string) => {
      // Verificar si existe un menú para este objeto en el menuRegistry
      const menuName = target as keyof typeof menuRegistry;

      if (menuRegistry[menuName]) {
        // Solo hacer lookAt si existe un menú
        engine.lookAt(target);

        // Abrir el menú correspondiente
        setActiveMenu(menuName, {
          objectName: target,
        });

        return true;
      }

      return false;
    },
    [engine, setActiveMenu]
  );

  const objectClickHandler = useCallback(
    (event: any) => {
      const { target } = event;
      console.log(`[HudHandler] Object clicked: ${target}`);

      // Manejar el menú para este objeto
      const hasMenu = handleMenuForObject(target);

      if (!hasMenu) {
        console.log(`[HudHandler] No menu found for object: ${target}`);
      }
    },
    [handleMenuForObject]
  );

  const objectEnterHandler = useCallback(() => {
    document.body.style.cursor = "pointer";
  }, []);

  const objectLeaveHandler = useCallback(() => {
    document.body.style.cursor = "default";
  }, []);

  const closeDreamForm = useCallback(() => {
    setActiveMenu(null);
  }, [setActiveMenu]);

  return {
    objectClickHandler,
    objectEnterHandler,
    objectLeaveHandler,
    closeDreamForm,
  };
}
