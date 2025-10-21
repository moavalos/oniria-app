import HudMenu from "@/app/shared/components/menu/CardMenu";

export interface MenuPortalProps {
  data?: Record<string, any>;
  onClose: () => void;
}

export default function MenuPortal({ data, onClose }: MenuPortalProps) {
  return (
    <HudMenu.Container>
      <HudMenu.Header>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold">P{data?.objectName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </HudMenu.Header>
      <HudMenu.Body>
        <p>Menú del Portal</p>
        {data && (
          <pre className="mt-4 text-xs text-gray-400">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
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
  );
}
