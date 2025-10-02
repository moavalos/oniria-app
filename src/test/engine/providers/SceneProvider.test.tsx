// engine/context/EngineSceneProvider.test.tsx
import { render, renderHook, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  SceneProvider,
  useEngineAPI,
} from "@/engine/context/EngineApiProvider";

// Mock de useThree de @react-three/fiber
vi.mock("@react-three/fiber", () => ({
  useThree: () => ({
    scene: { id: "mockScene" },
    camera: { id: "mockCamera" },
    gl: { domElement: { id: "mockCanvas" } },
  }),
}));

vi.mock("@engine/entities", () => {
  class MockSkin {
    constructor(
      _id: string,
      _objectTextureUrl: string,
      _environmentTextureUrl: string
    ) {}
  }

  class MockRoom {
    constructor(_id: string, _meshUrl: string | null, _skin: MockSkin) {}
  }
  return {
    Skin: MockSkin,
    Room: MockRoom,
  };
});

// Mock de EngineCoreProvider
vi.mock("@engine/context/EngineCoreProvider", () => ({
  useEngineCore: () => ({
    activeRoom: { id: "mockCore" },
    activeSkin: { id: "mockSkin" },
  }),
}));

// Mock de servicios
vi.mock("@engine/services", () => {
  class MockLoopService {}
  class MockTargetRegisterService {}
  class MockAnimationService {
    constructor(_scene: any) {}
  }
  class MockInteractionService {
    constructor(_camera: any, _dom: any) {}
  }
  class MockCameraService {
    constructor(_camera: any, _dom: any) {}
  }
  return {
    LoopService: MockLoopService,
    TargetRegisterService: MockTargetRegisterService,
    AnimationService: MockAnimationService,
    InteractionService: MockInteractionService,
    CameraService: MockCameraService,
  };
});

// Componente de prueba que usa el contexto
const TestConsumer = () => {
  const api = useEngineAPI();
  return (
    <div>
      <p data-testid="core">{api.activeRoom?.id}</p>
      <p data-testid="scene">{api.scene?.id}</p>
      <p data-testid="camera">{api.camera?.id}</p>
      <p data-testid="gl">{api.gl?.domElement?.id}</p>
      <p data-testid="loop">{api.loopService?.constructor?.name}</p>
    </div>
  );
};

describe("SceneProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza hijos correctamente", () => {
    render(
      <SceneProvider>
        <p data-testid="child">Hola</p>
      </SceneProvider>
    );
    expect(screen.getByTestId("child")).toHaveProperty("textContent", "Hola");
  });

  it("proporciona useEngineAPI a los componentes hijos", () => {
    render(
      <SceneProvider>
        <TestConsumer />
      </SceneProvider>
    );

    expect(screen.getByTestId("core")).toHaveProperty(
      "textContent",
      "mockCore"
    );
    expect(screen.getByTestId("scene")).toHaveProperty(
      "textContent",
      "mockScene"
    );
    expect(screen.getByTestId("camera")).toHaveProperty(
      "textContent",
      "mockCamera"
    );
    expect(screen.getByTestId("gl")).toHaveProperty(
      "textContent",
      "mockCanvas"
    );
    expect(screen.getByTestId("loop")).toHaveProperty(
      "textContent",
      "MockLoopService"
    );
  });

  it("al usar useEngineAPI fuera del provider lanza excepcion", () => {
    expect(() => renderHook(() => useEngineAPI())).toThrow(
      "useEngineAPI debe usarse dentro de EngineSceneProvider"
    );
  });
});
