// engine/context/EngineSceneProvider.test.tsx
import { render, renderHook, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  useEngineAPI,
  EngineApiProvider,
} from "@/engine/core/context/EngineApiProvider";

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
    activeRoom: { id: "mockServices" },
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
      <p data-testid="roomId">{api.roomId}</p>
      <p data-testid="skinId">{api.skinId}</p>
      <button onClick={() => api.setRoom("testRoom", "testSkin")}>
        Set Room
      </button>
    </div>
  );
};

describe("EngineApiProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza hijos correctamente", () => {
    render(
      <EngineApiProvider>
        <p data-testid="child">Hola</p>
      </EngineApiProvider>
    );
    expect(screen.getByTestId("child")).toHaveProperty("textContent", "Hola");
  });

  it("proporciona useEngineAPI a los componentes hijos", () => {
    render(
      <EngineApiProvider>
        <TestConsumer />
      </EngineApiProvider>
    );

    expect(screen.getByTestId("roomId")).toBeDefined();
    expect(screen.getByTestId("skinId")).toBeDefined();
  });

  it("al usar useEngineAPI fuera del provider lanza excepcion", () => {
    expect(() => renderHook(() => useEngineAPI())).toThrow(
      "useEngineAPI debe usarse dentro de EngineApiProvider"
    );
  });
});
