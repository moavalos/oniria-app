import { useEngineStore } from "@/engine";
import { useEngineAPI } from "@/engine/core/context/EngineApiProvider";
import { useEffect } from "react";
import DreamForm from "./DreamForm";
import DreamManager from "./DreamManager";

export default function DreamSystem() {
  const {
    dreamForm,
    dream,
    openDreamForm,
    closeDreamForm,
    setDream,
    setDreamSystemActive,
  } = useEngineStore();
  const engine = useEngineAPI();

  useEffect(() => {
    engine.nebula.onReady((_nebula) => {
      openDreamForm("create");
      // Deshabilitar interacciones cuando se abre el formulario
      engine.interactions.setEnabled(false);
    });
  }, [engine, openDreamForm]);

  const handleCloseDreamForm = () => {
    closeDreamForm();
    setDreamSystemActive(false);
    engine.camera.viewReset();
    // Habilitar interacciones cuando se cierra el formulario
    engine.interactions.setEnabled(true);
  };

  const handleCloseDreamManager = () => {
    // Limpiar el dream del store
    setDream(null);
    // Habilitar interacciones
    //engine.interactions.setEnabled(true);
    //setDreamSystemActive(false);
    //engine.camera.viewReset();
  };

  const handleSaveDream = () => {
    console.log("[DreamSystem] Saving dream:", dream);
    // TODO: Implementar lógica de guardado en Supabase
    // Por ahora solo logeamos
  };

  const handleReinterpretDream = () => {
    console.log("[DreamSystem] Reinterpreting dream");
    // Limpiar el dream actual y abrir el formulario de nuevo
    setDream(null);
    openDreamForm("create");
  };

  return (
    <>
      {/* Mostrar DreamForm si el formulario está abierto */}
      {dreamForm.isOpen && (
        <DreamForm
          onClose={handleCloseDreamForm}
          type={dreamForm.type}
          data={dreamForm.data}
        />
      )}

      {/* Mostrar DreamManager si hay un dream guardado */}
      {dream && (
        <DreamManager
          onClose={handleCloseDreamManager}
          onSave={handleSaveDream}
          onReinterpret={handleReinterpretDream}
        />
      )}
    </>
  );
}
