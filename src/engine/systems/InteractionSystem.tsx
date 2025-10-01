import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useEngineAPI } from "../context/SceneProvider";
import { useHandlers, useTransitions } from "../hooks";
import { button, useControls } from "leva";

export default function InteractionSystem() {
  const {
    loopService,
    activeRoom,
    interactionService,
    animationService,
    cameraService,
  } = useEngineAPI();
  const { onEnter, onLeave, onClick } = useHandlers();
  const { viewNodes } = useTransitions();
  const interceptablesRef = useRef<Record<string, any>>({});

  //debugging
  useControls("Portal", {
    reset: button(() => {
      cameraService?.setLookAt(
        new THREE.Vector3(-3.5, 3, 6),
        new THREE.Vector3(0, 1.8, 0),
        true
      );
    }),
    nodos: button(() => {
      cameraService?.setLookAt(
        new THREE.Vector3(-3.5, 3, 6),
        new THREE.Vector3(0, 1.8, 0),
        true
      );
      viewNodes({});
    }),
  });

  //  (Record<string, Vector3>)
  const lookAtables = useMemo(() => {
    if (!activeRoom) return {};
    return activeRoom.getLookAtableObjects();
  }, [activeRoom]);

  // Creamos las opciones para el select
  const options = useMemo(() => Object.keys(lookAtables), [lookAtables]);

  // Control con dropdown
  const { target } = useControls("Camera", {
    target: {
      value: "scene",
      options: ["scene", ...options],
      label: "Focus Target",
    },
  });

  // Efecto: cuando cambia el target seleccionado
  useEffect(() => {
    if (!target || !cameraService) return;
    const objPos = activeRoom
      ?.getObjectByName(target)
      ?.getWorldPosition(new THREE.Vector3());
    const from = lookAtables[target];
    console.log("Moving camera to:", target, objPos, "from:", from);
    if (from && objPos) {
      cameraService.setLookAt(from, objPos, true);
    }
  }, [target, cameraService, lookAtables]);

  // cargar objetos interceptables
  useEffect(() => {
    if (!activeRoom) return;
    let mounted = true;

    if (mounted)
      interceptablesRef.current = activeRoom.getInteractableObjects();

    return () => {
      mounted = false;
    };
  }, [activeRoom]);

  // actualizar interacciones en el loop
  useEffect(() => {
    if (!loopService || !interactionService || !activeRoom) return;

    const cb = () =>
      interactionService.update(activeRoom, interceptablesRef.current);

    loopService.subscribe(cb);
    return () => loopService.unsubscribe(cb);
  }, [loopService, interactionService, activeRoom]);

  // listeners de eventos
  useEffect(() => {
    if (!interactionService) return;

    interactionService.on("hoverEnter", onEnter);
    interactionService.on("hoverLeave", onLeave);
    interactionService.on("click", onClick);

    return () => {
      interactionService.off("hoverEnter");
      interactionService.off("hoverLeave");
      interactionService.off("click");
    };
  }, [interactionService, animationService]);

  return null;
}
