import HudMenu from "@/app/shared/components/menu/CardMenu";
import type { MenuProps } from "../../hud/types/menu.types";
import type { IconName } from "@/assets/icons/iconsStore";

export interface MenuConfig {
  title: string;
  description: string;
  items: Array<{
    label: string;
    description: string;
    icon?: IconName;
  }>;
}

export interface BaseMenuProps extends MenuProps {
  menu: MenuConfig;
  onItemClick: (_itemIndex: number) => void;
}

/**
 * Componente base para menús del HUD.
 * Proporciona la estructura y estilos comunes para todos los menús.
 *
 * @param menu - Configuración del menú (título, descripción, items)
 * @param onItemClick - Handler para clicks en items del menú
 * @param onClose - Handler para cerrar el menú
 * @param isClosing - Estado de animación de cierre
 */
export default function BaseMenu({
  menu,
  onItemClick,
  onClose,
  isClosing = false,
}: BaseMenuProps) {
  return (
    <HudMenu.Root
      className="flex items-start h-fit gap-3"
      isClosing={isClosing}
    >
      <HudMenu.Container className="w-96 max-w-full flex flex-col gap-4 mt-20 ml-20">
        <HudMenu.Header>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold font-orbitron text-primary drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              {menu.title}
            </h2>
            <HudMenu.CloseButton onClick={onClose} />
          </div>
        </HudMenu.Header>
        <HudMenu.Body>
          {menu.items.map((item, index) => (
            <HudMenu.Item
              key={index}
              label={item.label}
              description={item.description}
              icon={item.icon}
              onClick={() => onItemClick(index)}
            />
          ))}
        </HudMenu.Body>
        <HudMenu.Footer></HudMenu.Footer>
      </HudMenu.Container>
      <HudMenu.Description className="text-sm max-w-sm mt-20">
        {menu?.description}
      </HudMenu.Description>
    </HudMenu.Root>
  );
}
