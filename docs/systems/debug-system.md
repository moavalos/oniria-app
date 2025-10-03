# 🔧 Sistema de Debug (DebugSystem)

El `DebugSystem` proporciona herramientas de debug y monitoreo para desarrolladores durante el desarrollo de aplicaciones con Oniria Engine.

## 🎯 Propósito

- Monitorear performance en tiempo real
- Controlar cámara y sistemas del engine
- Debug de interacciones y objetos
- Inspeccionar la escena 3D
- Analizar estados internos del engine

## 🛠️ Uso Básico

```tsx
import { DebugSystem } from "@/engine";

export default function MyApp() {
  return (
    <div>
      {/* DebugSystem debe ir FUERA del Engine.Canvas */}
      <DebugSystem enabled={process.env.NODE_ENV === "development"} />

      <Engine.Canvas>
        <Engine.Core>{/* Otros sistemas... */}</Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 📋 Props

### `enabled?: boolean`

Por defecto: `true`

Controla si el sistema de debug está activo.

```tsx
// Solo en desarrollo
<DebugSystem enabled={process.env.NODE_ENV === 'development'} />

// Basado en configuración del usuario
<DebugSystem enabled={user.isDeveloper} />

// Control dinámico
const [debugEnabled, setDebugEnabled] = useState(false);
<DebugSystem enabled={debugEnabled} />
```

### `panels?: DebugPanels`

Configura qué paneles de debug mostrar.

```tsx
interface DebugPanels {
  engine?: boolean; // Panel general del engine
  camera?: boolean; // Controles de cámara
  animation?: boolean; // Controles de animación
  interaction?: boolean; // Debug de interacciones
  scene?: boolean; // Información de escena
  performance?: boolean; // Monitor de performance
}

// Ejemplo de configuración personalizada
<DebugSystem
  enabled={true}
  panels={{
    engine: true,
    camera: true,
    animation: false, // Deshabilitar animaciones
    interaction: true,
    scene: true,
    performance: true,
  }}
/>;
```

## 🎛️ Paneles de Debug

### 🔧 Panel de Engine

**Información mostrada:**

- Room activa
- Estado del loop de renderizado
- Número de objetos cargados

**Controles disponibles:**

- Restart Engine
- Export State

```tsx
// Solo panel de engine
<DebugSystem
  panels={{
    engine: true,
    camera: false,
    animation: false,
    interaction: false,
    scene: false,
    performance: false,
  }}
/>
```

### 📷 Panel de Cámara

**Controles disponibles:**

- Selector de target para enfocar objetos
- Botones de posiciones predefinidas (Front, Top, Side)
- Reset de posición de cámara
- View Nodes (mostrar nodos de la escena)

```tsx
// Solo controles de cámara para diseñadores
<DebugSystem
  panels={{
    camera: true,
    performance: false,
  }}
/>
```

### 🎬 Panel de Animación

**Información mostrada:**

- Total de clips de animación
- Estado de animaciones activas

**Controles disponibles:**

- Play All / Pause All / Stop All

### 🎯 Panel de Interacción

**Información mostrada:**

- Número total de objetos interactuables
- Lista de objetos interactuables
- Estado de interacciones

**Controles disponibles:**

- Simulate Hover (simular hover en primer objeto)
- Log Interactables (mostrar en consola)

### 🌍 Panel de Escena

**Información mostrada:**

- Total de objetos en escena
- Número de luces
- Número de meshes

**Controles disponibles:**

- Log Scene Graph (árbol de objetos en consola)
- Toggle Wireframe (modo wireframe)

### ⚡ Panel de Performance

**Métricas en tiempo real:**

- Frame Rate (FPS)
- Memory Usage (uso de memoria)
- Profiling Status

**Herramientas disponibles:**

- Start/End Profiling
- Force Garbage Collection

## 🎮 Ejemplos de Implementación

### Ejemplo 1: Debug Solo en Desarrollo

```tsx
import { DebugSystem } from "@/engine";

export default function App() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div>
      <DebugSystem enabled={isDevelopment} />
      {/* ... resto de la app */}
    </div>
  );
}
```

### Ejemplo 2: Debug Configurado por Roles

```tsx
import { useUser } from "@/hooks/useUser";
import { DebugSystem } from "@/engine";

export default function App() {
  const { user } = useUser();

  const debugConfig = {
    enabled: user.role === "developer" || user.role === "designer",
    panels: {
      engine: user.role === "developer",
      camera: true, // Todos los roles pueden usar cámara
      animation: user.role === "developer",
      interaction: true,
      scene: user.role === "developer",
      performance: user.role === "developer",
    },
  };

  return (
    <div>
      <DebugSystem {...debugConfig} />
      {/* ... resto de la app */}
    </div>
  );
}
```

### Ejemplo 3: Debug con Toggle UI

```tsx
import { useState } from "react";
import { DebugSystem } from "@/engine";

export default function App() {
  const [debugVisible, setDebugVisible] = useState(false);
  const [debugPanels, setDebugPanels] = useState({
    engine: true,
    camera: true,
    animation: true,
    interaction: true,
    scene: true,
    performance: true,
  });

  const togglePanel = (panel: keyof typeof debugPanels) => {
    setDebugPanels((prev) => ({
      ...prev,
      [panel]: !prev[panel],
    }));
  };

  return (
    <div>
      {/* Control UI */}
      <div className="debug-controls">
        <button onClick={() => setDebugVisible(!debugVisible)}>
          {debugVisible ? "Ocultar" : "Mostrar"} Debug
        </button>

        {debugVisible && (
          <div className="panel-toggles">
            {Object.entries(debugPanels).map(([panel, enabled]) => (
              <label key={panel}>
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() =>
                    togglePanel(panel as keyof typeof debugPanels)
                  }
                />
                {panel}
              </label>
            ))}
          </div>
        )}
      </div>

      <DebugSystem enabled={debugVisible} panels={debugPanels} />

      {/* ... resto de la app */}
    </div>
  );
}
```

### Ejemplo 4: Debug con Persistencia

```tsx
import { useState, useEffect } from "react";
import { DebugSystem } from "@/engine";

const DEBUG_STORAGE_KEY = "oniria-debug-config";

export default function App() {
  const [debugConfig, setDebugConfig] = useState({
    enabled: false,
    panels: {
      engine: true,
      camera: true,
      animation: true,
      interaction: true,
      scene: true,
      performance: true,
    },
  });

  // Cargar configuración del localStorage
  useEffect(() => {
    const saved = localStorage.getItem(DEBUG_STORAGE_KEY);
    if (saved) {
      try {
        setDebugConfig(JSON.parse(saved));
      } catch (error) {
        console.warn("Error loading debug config:", error);
      }
    }
  }, []);

  // Guardar configuración en localStorage
  useEffect(() => {
    localStorage.setItem(DEBUG_STORAGE_KEY, JSON.stringify(debugConfig));
  }, [debugConfig]);

  const toggleDebug = () => {
    setDebugConfig((prev) => ({ ...prev, enabled: !prev.enabled }));
  };

  // Atajo de teclado para toggle (Ctrl+D)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        toggleDebug();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div>
      <DebugSystem {...debugConfig} />
      {/* ... resto de la app */}
    </div>
  );
}
```

## 🔍 Casos de Uso Específicos

### Para Desarrolladores Frontend

```tsx
<DebugSystem
  panels={{
    engine: false,
    camera: true, // Para ajustar vistas
    animation: false,
    interaction: true, // Para debug de eventos
    scene: false,
    performance: true, // Para monitorear FPS
  }}
/>
```

### Para Desarrolladores 3D/Artistas

```tsx
<DebugSystem
  panels={{
    engine: false,
    camera: true, // Para composición
    animation: true, // Para revisar animaciones
    interaction: true, // Para verificar interactivos
    scene: true, // Para inspeccionar objetos
    performance: false,
  }}
/>
```

### Para QA/Testing

```tsx
<DebugSystem
  panels={{
    engine: true, // Para estado general
    camera: true, // Para reproducir bugs
    animation: true, // Para verificar animaciones
    interaction: true, // Para testing de interacciones
    scene: true, // Para análisis completo
    performance: true, // Para testing de performance
  }}
/>
```

## 📱 Responsive y Móvil

### Configuración para Móviles

```tsx
import { useEffect, useState } from "react";

const useResponsiveDebug = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    enabled: !isMobile, // Deshabilitar en móvil por defecto
    panels: {
      engine: false,
      camera: !isMobile, // Solo en desktop
      animation: false,
      interaction: !isMobile, // Solo en desktop
      scene: false,
      performance: !isMobile, // Solo en desktop
    },
  };
};

export default function ResponsiveApp() {
  const debugConfig = useResponsiveDebug();

  return (
    <div>
      <DebugSystem {...debugConfig} />
      {/* ... resto de la app */}
    </div>
  );
}
```

## ⚡ Performance

### Optimización del Debug

```tsx
import { useMemo } from "react";

export default function OptimizedApp() {
  // Memorizar configuración para evitar re-renders
  const debugConfig = useMemo(
    () => ({
      enabled: process.env.NODE_ENV === "development",
      panels: {
        engine: true,
        camera: true,
        animation: false,
        interaction: true,
        scene: false,
        performance: true,
      },
    }),
    []
  );

  return (
    <div>
      <DebugSystem {...debugConfig} />
      {/* ... resto de la app */}
    </div>
  );
}
```

### Lazy Loading del Debug

```tsx
import { lazy, Suspense } from "react";

const DebugSystem = lazy(() =>
  import("@/engine").then((module) => ({ default: module.DebugSystem }))
);

export default function LazyDebugApp() {
  const shouldLoadDebug = process.env.NODE_ENV === "development";

  return (
    <div>
      {shouldLoadDebug && (
        <Suspense fallback={null}>
          <DebugSystem enabled={true} />
        </Suspense>
      )}
      {/* ... resto de la app */}
    </div>
  );
}
```

## 🚫 Consideraciones de Seguridad

### Ocultar Debug en Producción

```tsx
// ❌ No hacer - expone debug en producción
<DebugSystem enabled={true} />

// ✅ Hacer - solo en desarrollo
<DebugSystem enabled={process.env.NODE_ENV === 'development'} />

// ✅ Hacer - con feature flag
<DebugSystem enabled={featureFlags.debugMode && user.isDeveloper} />
```

### Sanitización de Datos

```tsx
// Si necesitas debug en producción con datos sensibles
const sanitizeForProduction = (data: any) => {
  if (process.env.NODE_ENV === "production") {
    // Remover datos sensibles
    const { userInfo, apiKeys, ...safeData } = data;
    return safeData;
  }
  return data;
};
```

## 🔗 Ver También

- [API del Engine](../engine-api.md) - Para APIs de control
- [Performance](../performance.md) - Para optimización
- [Solución de Problemas](../troubleshooting.md) - Para debugging de issues
