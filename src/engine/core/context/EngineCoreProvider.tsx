import {
  useMemo,
  type PropsWithChildren,
  Children,
  createContext,
  useContext,
  useEffect,
} from "react";

import { DefaultEngineIndicator } from "@engine/core/components/DefaultEngineIndicator";
import { EngineCore } from "@engine/core";
import { useFrame, useThree } from "@react-three/fiber";
import { useEngineAPI } from "../context/EngineApiProvider";

/**
 * Contexto principal del núcleo del motor
 */
export const EngineCoreContext = createContext<EngineCore | null>(null);

type EngineCoreProps = PropsWithChildren;

/**
 * Núcleo del motor 3D que gestiona servicios, entidades y el ciclo de vida del engine
 *
 * @param children - Sistemas y componentes del motor a renderizar
 */
export function EngineCoreProvider({ children }: EngineCoreProps) {
  const core = useMemo(() => new EngineCore(), []);
  const api = useEngineAPI();
  const { gl, scene, camera } = useThree();

  // Inyectar contexto de Three al core
  useEffect(() => {
    core.init(gl, scene, camera);
    api.attachCore(core);
  }, [core, gl, scene, camera]);

  // Loop principal sincronizado con el render
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

export function useEngineCore() {
  const context = useContext(EngineCoreContext);
  if (!context) {
    throw new Error("useEngineCore must be used within an EngineCoreProvider");
  }
  return context;
}

EngineCoreProvider.displayName = "Engine.Core";
