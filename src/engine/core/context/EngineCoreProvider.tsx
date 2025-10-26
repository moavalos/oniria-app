import { useMemo, type PropsWithChildren, Children, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { DefaultEngineIndicator } from "@engine/core/components/DefaultEngineIndicator";
import { EngineCore } from "@engine/core";
import { useEngineAPI } from "../context/EngineApiProvider";
import { EngineCoreContext } from "./EngineCoreContext";

type EngineCoreProps = PropsWithChildren;

/**
 * Proveedor del núcleo del motor 3D que gestiona el ciclo de vida completo
 * del motor, incluyendo inicialización, actualización y renderizado.
 *
 * Responsabilidades:
 * - Inicializar el núcleo del motor con contexto de Three.js
 * - Vincular la API pública al núcleo
 * - Ejecutar el loop principal de actualización
 * - Mostrar indicador por defecto cuando no hay contenido
 *
 * @param children - Sistemas y componentes del motor a renderizar
 * @returns Proveedor de contexto con el núcleo del motor
 */
export function EngineCoreProvider({ children }: EngineCoreProps) {
  const core = useMemo(() => new EngineCore(), []);
  const api = useEngineAPI();
  const { gl, scene, camera } = useThree();

  /**
   * Inicializa el núcleo del motor con el contexto de Three.js
   * y vincula la API pública
   */
  useEffect(() => {
    core.init(gl, scene, camera);
    api.attachCore(core);
  }, [core, gl, scene, camera, api]);

  /**
   * Loop principal del motor sincronizado con el render de Three.js
   */
  useFrame((_, dt) => {
    core.update(dt);
  });

  // Verificar si hay contenido para renderizar
  const hasChildren = Children.count(children) > 0;

  return (
    <EngineCoreContext.Provider value={core}>
      {hasChildren ? children : <DefaultEngineIndicator />}
    </EngineCoreContext.Provider>
  );
}

EngineCoreProvider.displayName = "Engine.Core";
