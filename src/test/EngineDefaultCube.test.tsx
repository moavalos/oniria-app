import Engine from "@/engine/Engine";

/**
 * Componente de prueba para verificar que el cubo por defecto aparece
 * cuando el motor se monta sin ningún sistema ni escena
 */
export function EngineDefaultCubeTest() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Engine.Canvas engineSettings={{ backgroundColor: "#1a1a1a" }}>
        <Engine.Core>
          {/* Sin contenido - debería mostrar el cubo violeta girando */}
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}

export default EngineDefaultCubeTest;
