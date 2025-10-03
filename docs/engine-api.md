# 🎮 API del Engine

Esta es la referencia completa de la API pública del Oniria Engine disponible para desarrolladores UI.

## 🔗 Hook Principal: `useEngine()`

El hook principal para interactuar con el engine desde componentes UI.

```tsx
import { useEngine } from '@/engine';

const engine = useEngine();
```

### Métodos Disponibles

#### `setRoom(roomId: string, skinId: string): void`

Configura la room y skin activas del engine.

```tsx
const engine = useEngine();

// Cambiar room y skin
engine.setRoom("oniria", "oniria_object");
engine.setRoom("office", "modern_theme");
```

**Parámetros:**
- `roomId` (string): ID de la room a cargar
- `skinId` (string): ID del skin/tema a aplicar

**Uso típico:**
```tsx
useEffect(() => {
  engine.setRoom("oniria", "oniria");
}, [engine]);
```

### Propiedades de Estado

#### `roomId: string | null`

ID de la room actualmente activa.

```tsx
const engine = useEngine();
console.log(engine.roomId); // "oniria" | null
```

#### `skinId: string | null`

ID del skin actualmente activo.

```tsx
const engine = useEngine();
console.log(engine.skinId); // "oniria" | null
```

**Ejemplo de uso reactivo:**
```tsx
const engine = useEngine();
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  setIsLoaded(!!engine.roomId && !!engine.skinId);
}, [engine.roomId, engine.skinId]);
```

## 🏗️ Componentes del Engine

### `Engine.Canvas`

Componente raíz que envuelve el Canvas de Three.js y configura el contexto del engine.

```tsx
<Engine.Canvas engineSettings={engineSettings}>
  <Engine.Core>
    {/* Sistemas aquí */}
  </Engine.Core>
</Engine.Canvas>
```

#### Props: `engineSettings`

```tsx
interface EngineSettings {
  backgroundColor?: string;
  antialias?: boolean;
  powerPreference?: "high-performance" | "low-power" | "default";
  alpha?: boolean;
  premultipliedAlpha?: boolean;
  preserveDrawingBuffer?: boolean;
}
```

**Ejemplos:**
```tsx
// Configuración básica
<Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>

// Configuración para móvil
<Engine.Canvas engineSettings={{ 
  backgroundColor: "#1a1a1a",
  antialias: false,
  powerPreference: "low-power"
}}>

// Configuración para desktop de alta calidad
<Engine.Canvas engineSettings={{ 
  backgroundColor: "#000000",
  antialias: true,
  powerPreference: "high-performance"
}}>
```

### `Engine.Core`

Contenedor interno que inicializa los servicios del engine. Debe estar dentro de `Engine.Canvas`.

```tsx
<Engine.Canvas>
  <Engine.Core>
    {/* Todos los sistemas van aquí */}
    <InteractionSystem />
    <CameraSystem />
    <AnimationSystem />
    <RoomScene />
  </Engine.Core>
</Engine.Canvas>
```

## 🎛️ Provider

### `EngineApiProvider`

Provider que debe envolver la aplicación para proporcionar acceso al contexto del engine.

```tsx
import { EngineApiProvider } from '@/engine';

export default function App() {
  return (
    <EngineApiProvider>
      {/* Tu aplicación aquí */}
      <MyViewer />
    </EngineApiProvider>
  );
}
```

## 📦 Componentes de Sistema (Públicos)

Estos sistemas pueden ser configurados y usados por desarrolladores UI:

### LoaderSystem
```tsx
<LoaderSystem />
```
Maneja la carga de assets y muestra estados de loading.

### DebugSystem
```tsx
<DebugSystem 
  enabled={isDev}
  panels={{
    camera: true,
    performance: true,
    interaction: false,
  }}
/>
```
Proporciona herramientas de debug y monitoreo.

### InteractionSystem
```tsx
<InteractionSystem 
  onObjectHoverEnter={(objectName) => console.log('hover enter:', objectName)}
  onObjectHoverLeave={(objectName) => console.log('hover leave:', objectName)}
  onObjectClick={(objectName) => console.log('click:', objectName)}
/>
```
Maneja la detección de interacciones con objetos.

### CameraSystem
```tsx
<CameraSystem 
  enableControls={true}
  autoRotate={false}
/>
```
Controla el comportamiento de la cámara.

### AnimationSystem
```tsx
<AnimationSystem 
  autoPlay={true}
  defaultDuration={1000}
/>
```
Gestiona las animaciones de la escena.

### RoomScene
```tsx
<RoomScene />
```
Renderiza la escena 3D de la room activa.

## 📝 Ejemplos de Uso Completo

### Ejemplo Básico
```tsx
import { Engine, useEngine, LoaderSystem, RoomScene } from '@/engine';

export default function BasicViewer() {
  const engine = useEngine();

  useEffect(() => {
    engine.setRoom("oniria", "oniria");
  }, []);

  return (
    <Engine.Canvas engineSettings={{ backgroundColor: "#000" }}>
      <Engine.Core>
        <RoomScene />
      </Engine.Core>
    </Engine.Canvas>
  );
}
```

### Ejemplo con Interacciones
```tsx
import { useState } from 'react';
import { 
  Engine, 
  useEngine, 
  LoaderSystem,
  InteractionSystem, 
  RoomScene 
} from '@/engine';

export default function InteractiveViewer() {
  const engine = useEngine();
  const [status, setStatus] = useState('');

  useEffect(() => {
    engine.setRoom("oniria", "oniria");
  }, []);

  return (
    <div>
      <div>Estado: {status}</div>
      <LoaderSystem />
      <Engine.Canvas engineSettings={{ backgroundColor: "#000" }}>
        <Engine.Core>
          <InteractionSystem 
            onObjectHoverEnter={(obj) => setStatus(`Hover: ${obj}`)}
            onObjectHoverLeave={() => setStatus('')}
            onObjectClick={(obj) => alert(`Click en: ${obj}`)}
          />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

### Ejemplo con Debug
```tsx
export default function DevViewer() {
  const engine = useEngine();
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    engine.setRoom("oniria", "oniria");
  }, []);

  return (
    <div>
      <LoaderSystem />
      <DebugSystem enabled={isDev} />
      <Engine.Canvas engineSettings={{ backgroundColor: "#000" }}>
        <Engine.Core>
          <InteractionSystem />
          <CameraSystem />
          <AnimationSystem />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 🚫 APIs Internas (No Usar)

Estas APIs son internas del engine y **NO** deben ser usadas por desarrolladores UI:

- `useEngineCore()` - Hook interno del engine
- `useEngineStore()` - Store interno del engine
- Servicios directos (`CameraService`, `InteractionService`, etc.)
- Clases internas (`Room`, `Skin`, etc.)

## 🔄 Flujo de Datos

```
useEngine() -> EngineApiProvider -> useEngineAPI() -> Internal Services
    ↑                                                        ↓
UI Components  ←------- Public API ←-------- Engine Core ←----
```

El engine encapsula toda la complejidad interna y expone solo las APIs necesarias para el desarrollo de UI.