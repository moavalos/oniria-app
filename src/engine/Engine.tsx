// ===================================================================
// Engine.tsx - Namespace principal del Engine
// ===================================================================

import { EngineCanvas } from "@engine/core/components/EngineCanvas";
import { EngineCore } from "@engine/core/components/EngineCore";

/**
 * Namespace Engine que expone los componentes principales
 * Uso: <Engine.Canvas><Engine.Core>...sistemas...</Engine.Core></Engine.Canvas>
 */
const Engine = {
  Canvas: EngineCanvas,
  Core: EngineCore,
};

export default Engine;
