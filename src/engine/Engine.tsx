import { EngineCanvas } from "@engine/core/components/EngineCanvas";
import { EngineCore } from "@engine/core/components/EngineCore";

/**
 * Namespace principal del motor que expone los componentes Canvas y Core
 *
 * @example
 * <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
 *   <Engine.Core>
 *     <AnimationSystem />
 *     <CameraSystem />
 *   </Engine.Core>
 * </Engine.Canvas>
 */
const Engine = {
  Canvas: EngineCanvas,
  Core: EngineCore,
};

export default Engine;
