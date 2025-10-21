import { useEngineStore } from "@/engine";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { useEffect } from "react";
import DreamForm from "./DreamForm";

export default function DreamSystem() {
  const { dreamForm, openDreamForm, closeDreamForm, setDreamSystemActive } =
    useEngineStore();
  const engine = useEngineAPI();

  useEffect(() => {
    engine.nebula.onReady((_nebula) => {
      openDreamForm("create");
      // Deshabilitar interacciones cuando se abre el formulario
      engine.interactions.setEnabled(false);
    });
  }, [engine, openDreamForm]);

  const handleCloseMenu = () => {
    closeDreamForm();
    // Habilitar interacciones cuando se cierra el formulario
    engine.interactions.setEnabled(true);
    setDreamSystemActive(false);
    engine.camera.viewReset();
  };

  // Solo renderizar si el formulario está abierto
  if (!dreamForm.isOpen) {
    return null;
  }

  return (
    <DreamForm
      onInterpret={() => {}}
      onClose={handleCloseMenu}
      type={dreamForm.type}
      data={dreamForm.data}
    />
  );
}
