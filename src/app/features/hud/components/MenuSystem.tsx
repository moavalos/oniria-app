import { useEngineStore } from "@/engine/core/store/engineStore";
import MenuPortal from "./menu/portal/MenuPortal";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";

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

  // Si no hay menú activo, no renderizar nada
  if (!activeMenu) {
    return null;
  }

  const handleCloseMenu = () => {
    engine.camera.viewReset();
    onClose?.();
    closeMenu();
  };

  // Obtener el componente del menú desde el registro
  const MenuComponent = menuRegistry[activeMenu as MenuName];

  // Si el menú no existe en el registro, mostrar advertencia
  if (!MenuComponent) {
    console.warn(`Menu "${activeMenu}" no está registrado.`);
    return null;
  }

  // Renderizar el menú con los datos opcionales
  return <MenuComponent data={menuData} onClose={handleCloseMenu} />;
}
