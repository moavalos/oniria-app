# 🏗️ Arquitectura del Engine

Esta documentación explica la arquitectura interna del Oniria Engine para desarrolladores que necesiten entender su funcionamiento.

## 🔍 Visión General

El Oniria Engine está diseñado con una arquitectura modular y orientada a servicios que encapsula la complejidad de Three.js y proporciona una API declarativa para React.

```
┌─────────────────────────────────────────────────────────────┐
│                     UI Layer (React)                        │
├─────────────────────────────────────────────────────────────┤
│                   Public API Layer                          │
│  useEngine() │ Engine.Canvas │ Systems (Props-based)        │
├─────────────────────────────────────────────────────────────┤
│                   Engine Core Layer                         │
│  useEngineCore() │ Service Management │ State Management    │
├─────────────────────────────────────────────────────────────┤
│                   Service Layer                             │
│  CameraService │ InteractionService │ AnimationService      │
├─────────────────────────────────────────────────────────────┤
│                   Data Layer                                │
│  Room │ Skin │ ConfigManager │ EventEmitter                │
├─────────────────────────────────────────────────────────────┤
│                   Three.js Layer                            │
│  Scene │ Renderer │ Camera │ Loader │ Materials            │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Principios de Diseño

### 1. Encapsulación
- Los servicios internos no son accesibles directamente desde UI
- Solo se exponen APIs necesarias a través de hooks públicos
- Separación clara entre lógica interna y API pública

### 2. Composición
- Sistemas modulares que se pueden combinar según necesidades
- Cada sistema tiene responsabilidades específicas
- Dependencias mínimas entre sistemas

### 3. Declarativo
- Configuración basada en props de React
- Estado reactivo automático
- Manejo de efectos secundarios interno

## 🧩 Capas de la Arquitectura

### UI Layer (Desarrolladores Frontend)

**Responsabilidad:** Componentes React que implementan la experiencia de usuario

**Elementos:**
- Componentes de aplicación
- Handlers de eventos
- Estado de UI
- Routing y navegación

**APIs Disponibles:**
```tsx
// Hook principal
const engine = useEngine();

// Componentes del engine
<Engine.Canvas>
  <Engine.Core>
    <InteractionSystem />
    <CameraSystem />
  </Engine.Core>
</Engine.Canvas>

// Sistemas externos
<LoaderSystem />
<DebugSystem />
```

### Public API Layer

**Responsabilidad:** Interfaz pública estable para desarrolladores

**Elementos:**
- `useEngine()` hook
- Provider de contexto (`EngineApiProvider`)
- Sistemas configurables
- Tipos TypeScript públicos

**Características:**
- API estable versionada
- Encapsulación de complejidad interna
- Validación de parámetros
- Manejo de errores

### Engine Core Layer

**Responsabilidad:** Gestión de servicios y estado interno

**Elementos:**
- `useEngineCore()` (interno)
- `EngineStore` (Zustand)
- Lifecycle management
- Service orchestration

**Funciones:**
```tsx
// Solo para uso interno del engine
const core = useEngineCore();
const cameraService = core.getCameraService();
const interactionService = core.getInteractionService();
```

### Service Layer

**Responsabilidad:** Lógica de negocio específica de cada área

**Servicios:**

#### CameraService
```tsx
class CameraService {
  setLookAt(position: Vector3, target: Vector3, animate?: boolean): void
  getPosition(): Vector3
  getTarget(): Vector3
  // ... métodos internos
}
```

#### InteractionService
```tsx
class InteractionService extends EventEmitter {
  update(room: Room, interactables: Record<string, ObjectEventArray>): void
  on(event: string, callback: Function): void
  off(event: string): void
  // ... métodos internos
}
```

#### AnimationService
```tsx
class AnimationService {
  playAnimation(name: string): void
  pauseAnimation(name: string): void
  stopAnimation(name: string): void
  // ... métodos internos
}
```

#### LoopService
```tsx
class LoopService {
  subscribe(callback: () => void): void
  unsubscribe(callback: () => void): void
  start(): void
  stop(): void
  // ... métodos internos
}
```

### Data Layer

**Responsabilidad:** Gestión de datos, configuración y estado

**Elementos:**

#### Room Entity
```tsx
class Room {
  constructor(config: RoomConfig)
  getScene(): THREE.Scene | null
  getInteractableObjectsSync(): Record<string, ObjectEventArray>
  getLookAtableObjectsSync(): Record<string, Vector3>
  getObjectByName(name: string): THREE.Object3D | null
}
```

#### ConfigManager
```tsx
class ConfigManager {
  // Métodos async para carga inicial
  getInteractableObjects(roomId: string): Promise<Record<string, ObjectEventArray>>
  getLookAtableObjects(roomId: string): Promise<Record<string, Vector3>>
  
  // Métodos sync para acceso en cache
  getInteractableObjectsSync(): Record<string, ObjectEventArray>
  getLookAtableObjectsSync(): Record<string, Vector3>
}
```

#### EventEmitter
```tsx
class EventEmitter {
  trigger(event: string, data: any): void
  on(event: string, callback: Function): void
  off(event: string): void
}
```

### Three.js Layer

**Responsabilidad:** Renderizado 3D y manejo de assets

**Elementos:**
- Scene management
- Renderer configuration
- Camera controls
- Material system
- Loader system

## 🔄 Flujo de Datos

### 1. Inicialización

```
User -> useEngine().setRoom() -> EngineStore -> ConfigManager -> Room -> Three.js Scene
```

### 2. Interacciones

```
Mouse Event -> InteractionService -> Raycasting -> Event Detection -> EventEmitter -> Handlers
```

### 3. Animaciones

```
System Props -> AnimationService -> Three.js AnimationMixer -> Scene Updates
```

### 4. Cámara

```
System Props -> CameraService -> Three.js Camera -> Render Loop
```

## 🔧 Gestión de Estado

### Engine Store (Zustand)

```tsx
interface EngineState {
  roomId: string | null;
  skinId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setRoomId: (id: string) => void;
  setSkinId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

### Estado Local de Sistemas

Cada sistema mantiene su propio estado local usando hooks de React:

```tsx
// InteractionSystem
const [hoveredObjects, setHoveredObjects] = useState<Set<string>>(new Set());

// CameraSystem  
const [cameraPosition, setCameraPosition] = useState<Vector3>(initialPosition);

// AnimationSystem
const [activeAnimations, setActiveAnimations] = useState<Map<string, THREE.AnimationAction>>(new Map());
```

## 🎣 Sistema de Hooks

### Hook Hierarchy

```
useEngine() (público)
    ↓
useEngineAPI() (interno)
    ↓
useEngineStore() (interno)
    ↓
Zustand Store
```

### Hooks Internos

```tsx
// Core hook - solo para sistemas internos
const useEngineCore = () => {
  const store = useEngineStore();
  return {
    activeRoom: store.activeRoom,
    loopService: store.loopService,
    getCameraService: () => store.cameraService,
    getInteractionService: () => store.interactionService,
    // ... otros servicios
  };
};

// Hooks especializados
const useHandlers = () => {
  const { onEnter, onLeave, onClick } = useRoomEventHandlers();
  return { onEnter, onLeave, onClick };
};

const useTransitions = () => {
  const { viewNodes } = useCameraTransitions();
  return { viewNodes };
};
```

## 🔌 Sistema de Plugins/Extensiones

### Extensión de Servicios

```tsx
// Ejemplo: Extension del CameraService
class ExtendedCameraService extends CameraService {
  setOrthographicView(): void {
    // Lógica adicional
  }
  
  enableVRMode(): void {
    // Funcionalidad VR
  }
}

// Registro en el core
const core = useEngineCore();
core.registerService('camera', new ExtendedCameraService());
```

### Sistemas Personalizados

```tsx
// Sistema personalizado siguiendo el patrón
export default function CustomSystem({ customProp }: { customProp: string }) {
  const core = useEngineCore();
  const customService = core.getCustomService();

  useEffect(() => {
    customService.configure(customProp);
  }, [customProp]);

  return null;
}
```

## 🔄 Lifecycle Management

### Engine Lifecycle

```tsx
1. Provider Mount -> Store Initialization
2. Canvas Mount -> Three.js Scene Creation
3. Core Mount -> Services Initialization
4. Systems Mount -> Service Configuration
5. Room Set -> Asset Loading
6. Ready State -> User Interactions
```

### Service Lifecycle

```tsx
class ExampleService {
  constructor() {
    this.initialize();
  }

  initialize(): void {
    // Setup inicial
  }

  dispose(): void {
    // Cleanup de recursos
  }

  update(deltaTime: number): void {
    // Lógica de frame
  }
}
```

## 🧪 Testing Architecture

### Unit Testing

```tsx
// Testing de servicios aislados
describe('CameraService', () => {
  test('should set camera position', () => {
    const service = new CameraService(mockCamera);
    service.setPosition([0, 5, 10]);
    expect(service.getPosition()).toEqual([0, 5, 10]);
  });
});
```

### Integration Testing

```tsx
// Testing de sistemas completos
describe('InteractionSystem', () => {
  test('should detect object interactions', () => {
    render(
      <Engine.Canvas>
        <Engine.Core>
          <InteractionSystem onObjectClick={mockClick} />
        </Engine.Core>
      </Engine.Canvas>
    );
    // ... simular interacción
  });
});
```

### E2E Testing

```tsx
// Testing de flujo completo
describe('Engine E2E', () => {
  test('should load room and enable interactions', async () => {
    const { getByTestId } = render(<App />);
    
    // Esperar carga
    await waitFor(() => {
      expect(getByTestId('3d-scene')).toBeInTheDocument();
    });
    
    // Interactuar
    fireEvent.click(getByTestId('interactive-object'));
    expect(mockAnalytics).toHaveBeenCalled();
  });
});
```

## 🔗 Dependencias Externas

### Core Dependencies

- **React**: Framework UI y gestión de estado
- **Three.js**: Motor 3D y renderizado
- **Zustand**: Gestión de estado global
- **Leva**: Controles de debug

### Optional Dependencies

- **React Router**: Navegación (si se usa)
- **Analytics**: Tracking de eventos
- **Performance Tools**: Monitoreo de performance

## 🔒 Patrones de Seguridad

### Encapsulación

```tsx
// ❌ No exponer servicios internos
export { CameraService } from './services';

// ✅ Solo exponer API pública
export { useEngine } from './hooks/useEngine';
```

### Validación

```tsx
// Validación en capa pública
export const useEngine = () => {
  const api = useEngineAPI();
  
  return {
    setRoom: (roomId: string, skinId: string) => {
      if (!roomId || !skinId) {
        throw new Error('roomId and skinId are required');
      }
      return api.setRoom(roomId, skinId);
    }
  };
};
```

## 📈 Performance Considerations

### Lazy Loading

- Servicios se inicializan bajo demanda
- Assets se cargan cuando son necesarios
- Sistemas se pueden deshabilitar dinámicamente

### Memory Management

- Cleanup automático de recursos
- Disposición de objetos Three.js
- Gestión de event listeners

### Render Optimization

- Frame rate limiting
- Frustum culling automático
- Level of detail (LOD) support

Esta arquitectura asegura un balance entre flexibilidad, performance y facilidad de uso, manteniendo una separación clara entre la complejidad interna del engine y la simplicidad de la API pública.