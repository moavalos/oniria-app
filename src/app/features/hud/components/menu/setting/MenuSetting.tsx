import HudMenu from "@/app/shared/components/menu/CardMenu";
import menuFactory from "../menuFactory";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { useEngineStore } from "@/engine";
import type { MenuProps } from "../../../types/menu.types";

export default function MenuSetting({ onClose, isClosing = false }: MenuProps) {
  const menu = menuFactory.monitor;
  const engine = useEngineAPI();
  const { closeMenu } = useEngineStore();

  // Handler único que procesa el click de cada item
  const handleItemClick = (itemIndex: number) => {
    switch (itemIndex) {
      case 0:
        engine.interactions.setEnabled(false);
        //action
        closeMenu();

        break;
      case 1:
        engine.interactions.setEnabled(false);
        //action
        closeMenu();
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
              onClick={() => handleItemClick(index)}
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
