import { useEngineStore } from "@/engine/core";
import DreamCardModal from "./components/DreamCardModal";
import { useCallback } from "react";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";

interface HudSystemProps {}

export default function HudSystem({}: HudSystemProps) {
  // Acceder al dream directamente desde el store
  const { dream } = useEngineStore();
  const engine = useEngineAPI();

  // Función para cerrar el modal
  const handleDreamModalClose = useCallback(() => {
    // Opcionalmente limpiar el dream del store
    // setDream(null);
    console.log("closed");
    engine.node?.rest?.();
  }, [engine]);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-50 p-4 ${
        dream ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay de fondo cuando el modal está visible */}
      {dream && (
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
          onClick={handleDreamModalClose}
        />
      )}

      <DreamCardModal
        visibility={!!dream}
        title={dream?.title || "Tu sueño"}
        text={dream?.interpretation || "Descripción del sueño..."}
        typingSpeed={80}
        onClose={handleDreamModalClose}
        onSave={() => console.log("Guardar sueño")}
        onReinterpret={() => console.log("Reinterpretar")}
      />
    </div>
  );
}
