import HudMenu from "@/app/shared/components/menu/CardMenu";
import menuFactory from "../menuFactory";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { useEngineStore } from "@/engine";

export interface MenuPortalProps {
  data?: Record<string, any>;
  onClose: () => void;
  isClosing?: boolean;
}

export default function MenuPortal({
  onClose,
  isClosing = false,
}: MenuPortalProps) {
  const menu = menuFactory.portal;
  const engine = useEngineAPI();
  const { closeMenu } = useEngineStore();

  // Handler único que procesa el click de cada item
  const handleItemClick = (itemIndex: number) => {
    switch (itemIndex) {
      case 0:
        engine.camera.viewNodes();
        closeMenu();
        // Lógica de teletransporte al Lobby
        break;
      case 1:
        // Lógica de teletransporte a la Sala de Juegos
        break;
      default:
        console.warn(
          `[MenuPortal] Opción desconocida seleccionada: ${itemIndex}`
        );
    }
  };

  return (
    <HudMenu.Root
      className="flex items-start h-fit gap-3"
      isClosing={isClosing}
    >
      <HudMenu.Container className="w-96 max-w-full flex flex-col gap-4 mt-20 ml-20">
        <HudMenu.Header>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold font-orbitron text-primary drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              EL PORTAL
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
              onClick={() => handleItemClick(index)}
            />
          ))}
        </HudMenu.Body>
        <HudMenu.Footer>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Cerrar
          </button>
        </HudMenu.Footer>
      </HudMenu.Container>
      <HudMenu.Description className="text-sm max-w-sm mt-20">
        {menu?.description}
      </HudMenu.Description>
    </HudMenu.Root>
  );
}
