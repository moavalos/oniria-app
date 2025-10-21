import { useEngineStore } from "@/engine/core/store/engineStore";
import MenuPortal from "./menu/portal/MenuPortal";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { useState, useEffect } from "react";

/**
 * Registro de menús disponibles
 * Mapea el nombre del menú al componente correspondiente
 */
const menuRegistry = {
  portal: MenuPortal,
  // settings: MenuSettings,
  // history: MenuHistory,
  // Agrega más menús aquí...
} as const;

export type MenuName = keyof typeof menuRegistry;

/**
 * Sistema de menús dinámicos
 * Renderiza el menú activo basándose en el estado del store
 *
 * @example
 * // En MainLayout.tsx
 * <HudSystem.Body>
 *   <MenuSystem />
 * </HudSystem.Body>
 *
 * // Para abrir un menú desde useHudHandler o cualquier lugar
 * const { setActiveMenu } = useEngineStore();
 * setActiveMenu("portal", { someData: "value" });
 *
 * // Para cerrar el menú
 * const { closeMenu } = useEngineStore();
 * closeMenu();
 */

export interface MenuSystemProps {
  onClose?: () => void;
}

export default function MenuSystem({ onClose }: MenuSystemProps) {
  const { activeMenu, menuData, closeMenu } = useEngineStore();
  const engine = useEngineAPI();
  const [isClosing, setIsClosing] = useState(false);
  const [displayMenu, setDisplayMenu] = useState<string | null>(null);

  // Manejar cambios en activeMenu
  useEffect(() => {
    if (activeMenu) {
      setDisplayMenu(activeMenu);
      setIsClosing(false);
    } else if (displayMenu) {
      // Iniciar animación de cierre
      setIsClosing(true);
      // Esperar a que termine la animación antes de desmontar
      const timer = setTimeout(() => {
        setDisplayMenu(null);
        setIsClosing(false);
      }, 300); // Duración de la animación de fade-out
      return () => clearTimeout(timer);
    }
  }, [activeMenu, displayMenu]);

  const handleCloseMenu = () => {
    engine.camera.viewReset();
    onClose?.();
    closeMenu();
  };

  // Si no hay menú para mostrar, no renderizar nada
  if (!displayMenu) {
    return null;
  }

  // Obtener el componente del menú desde el registro
  const MenuComponent = menuRegistry[displayMenu as MenuName];

  // Si el menú no existe en el registro, mostrar advertencia
  if (!MenuComponent) {
    console.warn(`Menu "${activeMenu}" no está registrado.`);
    return null;
  }

  // Renderizar el menú con los datos opcionales y el estado de cierre
  return (
    <MenuComponent
      data={menuData}
      onClose={handleCloseMenu}
      isClosing={isClosing}
    />
  );
}
