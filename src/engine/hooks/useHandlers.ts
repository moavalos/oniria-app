import { useCallback } from "react";
import { useEngineAPI } from "../context/SceneProvider";
import type { AnimationAction, FunctionAction, ObjectEvent, ObjectEventArray } from "../config/room.type";

export function useHandlers() {
    const { animationService } = useEngineAPI();

    const onEnter = useCallback((event: ObjectEventArray) => {
        event.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((animation: AnimationAction) => {
                    if (animation.on === "hoverEnter") {
                        document.body.style.cursor = "grab";
                        animationService?.stop(animation.target);
                        animationService?.play(animation);
                    }
                });
            }
        });
    }, [animationService]);

    const onLeave = useCallback((event: ObjectEventArray) => {
        event.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((action: AnimationAction) => {
                    if (action.on === "hoverLeave") {
                        document.body.style.cursor = "default";
                        animationService?.stop(action.target);
                        animationService?.play(action);
                    }
                });
            }
        });
    }, [animationService]);

    const onClick = useCallback((event: ObjectEventArray) => {
        event.forEach((element: ObjectEvent) => {
            if (element.type === "animation") {
                element.action.forEach((action: AnimationAction) => {
                    if (action.on === "click") {
                        document.body.style.cursor = "pointer";
                        animationService?.stop(action.target);
                        animationService?.play(action);
                        document.body.style.cursor = "default";
                    }
                });
            }

            if (element.type === "function") {
                element.action.forEach((action: FunctionAction) => {
                    if (action.on === "click") {
                        console.log("ejecutando función:", action.function);
                    }
                });
            }
        });
    }, [animationService]);

    return { onEnter, onLeave, onClick };
}
