# 🚀 Guía de Inicio Rápido

Esta guía te ayudará a integrar el Oniria Engine en tu aplicación React en menos de 10 minutos.

## 📋 Prerrequisitos

- React 18+
- TypeScript
- Three.js (se instala automáticamente)
- Leva (para controles de debug)

## 🛠️ Instalación

```bash
# El engine ya está incluido en el proyecto
# Solo necesitas importarlo en tu componente
```

## 🏗️ Implementación Básica

### 1. Importar el Engine

```tsx
import {
  Engine,
  useEngine,
  LoaderSystem,
  CameraSystem,
  AnimationSystem,
  InteractionSystem,
  RoomScene,
} from "@/engine";
```

### 2. Crear tu Componente Principal

```tsx
import { useEffect } from "react";

export default function MyViewer() {
  const engine = useEngine();

  // Configurar room y skin al montar
  useEffect(() => {
    engine.setRoom("oniria", "oniria");
  }, [engine]);

  // Handler de ejemplo para interacciones
  const handleObjectHover = (objectName: string) => {
    console.log(`Hover sobre: ${objectName}`);
  };

  return (
    <div className="w-full h-full">
      {/* Sistemas que van fuera del Canvas */}
      <LoaderSystem />

      {/* Canvas del Engine */}
      <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
        <Engine.Core>
          {/* Sistemas internos del Canvas */}
          <InteractionSystem onObjectHoverEnter={handleObjectHover} />
          <AnimationSystem />
          <CameraSystem />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

### 3. Envolver con Provider (si no está ya)

```tsx
import { EngineApiProvider } from "@/engine";

export default function App() {
  return (
    <EngineApiProvider>
      <MyViewer />
    </EngineApiProvider>
  );
}
```

## 🎮 Interacciones Básicas

### Configurar Room y Skin

```tsx
const engine = useEngine();

// Cambiar room/skin dinámicamente
const changeRoom = (roomId: string, skinId: string) => {
  engine.setRoom(roomId, skinId);
};
```

### Manejar Eventos de Interacción

```tsx
const handleHoverEnter = (objectName: string) => {
  console.log(`Mouse entró a: ${objectName}`);
  // Mostrar tooltip, cambiar cursor, etc.
};

const handleHoverLeave = (objectName: string) => {
  console.log(`Mouse salió de: ${objectName}`);
  // Ocultar tooltip, restaurar cursor, etc.
};

const handleClick = (objectName: string) => {
  console.log(`Click en: ${objectName}`);
  // Navegar, abrir modal, ejecutar acción, etc.
};

<InteractionSystem
  onObjectHoverEnter={handleHoverEnter}
  onObjectHoverLeave={handleHoverLeave}
  onObjectClick={handleClick}
/>;
```

## 🔧 Configuración de Desarrollo

### Habilitar Debug

```tsx
import { DebugSystem } from '@/engine';

// Solo en desarrollo
<DebugSystem enabled={process.env.NODE_ENV === 'development'} />

// O con configuración específica
<DebugSystem
  enabled={true}
  panels={{
    camera: true,
    performance: true,
    interaction: false,
  }}
/>
```

### Configurar Canvas

```tsx
<Engine.Canvas
  engineSettings={{
    backgroundColor: "#1a1a1a",
    antialias: true,
    powerPreference: "high-performance"
  }}
>
```

## 📦 Ejemplo Completo

```tsx
import React, { useEffect, useState } from "react";
import {
  Engine,
  useEngine,
  LoaderSystem,
  CameraSystem,
  AnimationSystem,
  InteractionSystem,
  RoomScene,
  DebugSystem,
} from "@/engine";

export default function OniriaViewer() {
  const engine = useEngine();
  const [currentRoom, setCurrentRoom] = useState("oniria");
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  useEffect(() => {
    engine.setRoom(currentRoom, "oniria");
  }, [engine, currentRoom]);

  const handleRoomChange = (newRoom: string) => {
    setCurrentRoom(newRoom);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* UI de control */}
      <div className="absolute top-4 left-4 z-10 text-white">
        <h1>Oniria Viewer</h1>
        <p>Objeto hover: {hoveredObject || "ninguno"}</p>
        <button
          onClick={() => handleRoomChange("oniria")}
          className="bg-blue-500 px-3 py-1 rounded mr-2"
        >
          Room Oniria
        </button>
      </div>

      {/* Sistemas del Engine */}
      <LoaderSystem />
      <DebugSystem enabled={true} />

      <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
        <Engine.Core>
          <InteractionSystem
            onObjectHoverEnter={setHoveredObject}
            onObjectHoverLeave={() => setHoveredObject(null)}
            onObjectClick={(obj) => console.log("Click:", obj)}
          />
          <AnimationSystem />
          <CameraSystem />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 📱 Responsive y Móvil

```tsx
<div className="w-full h-full min-h-screen">
  <Engine.Canvas
    engineSettings={{
      backgroundColor: "#000000",
      // Optimizaciones para móvil
      powerPreference: "low-power"
    }}
    style={{
      touchAction: 'none' // Prevenir scroll en móvil
    }}
  >
```

## ⚡ Performance Tips

1. **Usa `DebugSystem` solo en desarrollo**
2. **Configura `powerPreference` según el dispositivo**
3. **Minimiza re-renders innecesarios**
4. **Usa `React.memo` para componentes pesados**

## 🔗 Próximos Pasos

- [API Completa del Engine](./engine-api.md)
- [Configuración Avanzada](./engine-setup.md)
- [Sistema de Interacción](./systems/interaction-system.md)
- [Sistema de Cámara](./systems/camera-system.md)
