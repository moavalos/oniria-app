# ⚙️ Configuración del Engine

Esta guía explica cómo configurar el Oniria Engine para diferentes casos de uso y entornos.

## 🏗️ Configuración Básica

### Estructura Mínima Requerida

```tsx
import { Engine, EngineApiProvider } from "@/engine";

export default function App() {
  return (
    <EngineApiProvider>
      <div className="w-full h-screen">
        <Engine.Canvas>
          <Engine.Core>{/* Sistemas aquí */}</Engine.Core>
        </Engine.Canvas>
      </div>
    </EngineApiProvider>
  );
}
```

### Provider Setup

El `EngineApiProvider` debe envolver tu aplicación para proporcionar acceso al contexto del engine:

```tsx
// app.tsx o layout.tsx
import { EngineApiProvider } from "@/engine";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <EngineApiProvider>{children}</EngineApiProvider>
      </body>
    </html>
  );
}
```

## 🎛️ Configuración del Canvas

### Configuración Básica

```tsx
<Engine.Canvas engineSettings={{
  backgroundColor: "#000000",
  antialias: true,
  alpha: false,
}}>
```

### Configuraciones por Entorno

#### Desarrollo

```tsx
const developmentSettings = {
  backgroundColor: "#1a1a1a",
  antialias: true,
  powerPreference: "high-performance",
  preserveDrawingBuffer: true, // Para screenshots de debug
  alpha: false,
};

<Engine.Canvas engineSettings={developmentSettings}>
```

#### Producción

```tsx
const productionSettings = {
  backgroundColor: "#000000",
  antialias: true,
  powerPreference: "default",
  alpha: false,
  premultipliedAlpha: false,
};

<Engine.Canvas engineSettings={productionSettings}>
```

#### Móvil Optimizado

```tsx
const mobileSettings = {
  backgroundColor: "#000000",
  antialias: false, // Mejor performance
  powerPreference: "low-power",
  alpha: false,
};

<Engine.Canvas engineSettings={mobileSettings}>
```

### Configuración Responsiva

```tsx
import { useEffect, useState } from "react";

const useEngineSettings = () => {
  const [settings, setSettings] = useState({
    backgroundColor: "#000000",
    antialias: true,
    powerPreference: "default" as const,
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    setSettings({
      backgroundColor: "#000000",
      antialias: !isMobile && !isLowEnd,
      powerPreference: isMobile ? "low-power" : "high-performance",
    });
  }, []);

  return settings;
};

export default function ResponsiveEngine() {
  const engineSettings = useEngineSettings();

  return (
    <Engine.Canvas engineSettings={engineSettings}>{/* ... */}</Engine.Canvas>
  );
}
```

## 🚀 Configuración de Sistemas

### Configuración Completa

```tsx
import {
  Engine,
  LoaderSystem,
  DebugSystem,
  CameraSystem,
  AnimationSystem,
  InteractionSystem,
  RoomScene,
} from "@/engine";

export default function FullConfiguredViewer() {
  return (
    <div>
      {/* Sistemas externos */}
      <LoaderSystem />
      <DebugSystem
        enabled={process.env.NODE_ENV === "development"}
        panels={{
          camera: true,
          performance: true,
          interaction: true,
        }}
      />

      {/* Canvas del Engine */}
      <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
        <Engine.Core>
          {/* Sistemas internos */}
          <CameraSystem
            enableControls={true}
            autoRotate={false}
            initialPosition={[0, 2, 5]}
          />

          <AnimationSystem autoPlay={true} defaultDuration={1000} />

          <InteractionSystem
            onObjectHoverEnter={(obj) => console.log("Hover:", obj)}
            onObjectClick={(obj) => console.log("Click:", obj)}
          />

          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

### Configuración Modular

```tsx
// Configuración por características
const FEATURES = {
  debug: process.env.NODE_ENV === "development",
  interactions: true,
  autoRotate: false,
  analytics: process.env.NODE_ENV === "production",
};

export default function ModularViewer() {
  return (
    <div>
      {FEATURES.debug && <DebugSystem />}
      <LoaderSystem />

      <Engine.Canvas>
        <Engine.Core>
          <CameraSystem autoRotate={FEATURES.autoRotate} />

          {FEATURES.interactions && (
            <InteractionSystem
              onObjectClick={(obj) => {
                if (FEATURES.analytics) {
                  analytics.track("3d_interaction", { object: obj });
                }
              }}
            />
          )}

          <AnimationSystem />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 🌍 Variables de Entorno

### .env.local (Desarrollo)

```bash
# Engine Debug
NEXT_PUBLIC_ENGINE_DEBUG=true
NEXT_PUBLIC_ENGINE_PERFORMANCE_MONITOR=true

# Assets
NEXT_PUBLIC_ASSETS_BASE_URL=http://localhost:3000
NEXT_PUBLIC_MODELS_PATH=/models
NEXT_PUBLIC_TEXTURES_PATH=/textures

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_INTERACTIONS=true
```

### .env.production

```bash
# Engine Debug
NEXT_PUBLIC_ENGINE_DEBUG=false
NEXT_PUBLIC_ENGINE_PERFORMANCE_MONITOR=false

# Assets CDN
NEXT_PUBLIC_ASSETS_BASE_URL=https://cdn.example.com
NEXT_PUBLIC_MODELS_PATH=/3d-assets/models
NEXT_PUBLIC_TEXTURES_PATH=/3d-assets/textures

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_INTERACTIONS=true
```

### Uso en Configuración

```tsx
const engineConfig = {
  debug: process.env.NEXT_PUBLIC_ENGINE_DEBUG === "true",
  performanceMonitor:
    process.env.NEXT_PUBLIC_ENGINE_PERFORMANCE_MONITOR === "true",
  assetsBaseUrl: process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "",
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
};

export default function ConfiguredViewer() {
  return (
    <div>
      <DebugSystem
        enabled={engineConfig.debug}
        panels={{ performance: engineConfig.performanceMonitor }}
      />

      <Engine.Canvas>
        <Engine.Core>
          <InteractionSystem
            onObjectClick={
              engineConfig.enableAnalytics ? trackClick : undefined
            }
          />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 📱 Configuración por Dispositivo

### Detección de Dispositivo

```tsx
import { useEffect, useState } from "react";

interface DeviceConfig {
  isMobile: boolean;
  isTablet: boolean;
  isLowEnd: boolean;
  hasTouch: boolean;
}

const useDeviceConfig = (): DeviceConfig => {
  const [config, setConfig] = useState<DeviceConfig>({
    isMobile: false,
    isTablet: false,
    isLowEnd: false,
    hasTouch: false,
  });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const hasTouch = "ontouchstart" in window;

    setConfig({ isMobile, isTablet, isLowEnd, hasTouch });
  }, []);

  return config;
};
```

### Configuración Adaptativa

```tsx
export default function AdaptiveViewer() {
  const device = useDeviceConfig();

  const engineSettings = {
    backgroundColor: "#000000",
    antialias: !device.isMobile && !device.isLowEnd,
    powerPreference: device.isMobile ? "low-power" : "high-performance",
  };

  return (
    <div>
      <DebugSystem enabled={!device.isMobile} />

      <Engine.Canvas engineSettings={engineSettings}>
        <Engine.Core>
          <CameraSystem
            enableControls={!device.isMobile}
            enablePan={!device.isMobile}
            autoRotate={device.isMobile}
          />

          <InteractionSystem
            enableInteractions={device.hasTouch || !device.isMobile}
          />

          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 🎨 Temas y Personalización

### Sistema de Temas

```tsx
interface EngineTheme {
  background: string;
  lighting: {
    intensity: number;
    color: string;
  };
  camera: {
    position: [number, number, number];
    fov: number;
  };
}

const THEMES: Record<string, EngineTheme> = {
  dark: {
    background: "#000000",
    lighting: { intensity: 1.0, color: "#ffffff" },
    camera: { position: [0, 2, 5], fov: 75 },
  },
  light: {
    background: "#f5f5f5",
    lighting: { intensity: 1.2, color: "#ffffe0" },
    camera: { position: [0, 2, 5], fov: 75 },
  },
  cinematic: {
    background: "#1a1a2e",
    lighting: { intensity: 0.8, color: "#4a90e2" },
    camera: { position: [0, 3, 8], fov: 60 },
  },
};

export default function ThemedViewer({
  theme = "dark",
}: {
  theme: keyof typeof THEMES;
}) {
  const currentTheme = THEMES[theme];

  return (
    <Engine.Canvas
      engineSettings={{ backgroundColor: currentTheme.background }}
    >
      <Engine.Core>
        <CameraSystem
          initialPosition={currentTheme.camera.position}
          fov={currentTheme.camera.fov}
        />
        <RoomScene />
      </Engine.Core>
    </Engine.Canvas>
  );
}
```

## 🔧 Configuración Avanzada

### Configuración con Context

```tsx
import { createContext, useContext } from "react";

interface EngineConfigContext {
  enableDebug: boolean;
  quality: "low" | "medium" | "high";
  enableAnalytics: boolean;
}

const EngineConfigContext = createContext<EngineConfigContext>({
  enableDebug: false,
  quality: "medium",
  enableAnalytics: false,
});

export const useEngineConfig = () => useContext(EngineConfigContext);

export const EngineConfigProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: EngineConfigContext;
}) => (
  <EngineConfigContext.Provider value={config}>
    {children}
  </EngineConfigContext.Provider>
);

// Uso
export default function App() {
  const config = {
    enableDebug: process.env.NODE_ENV === "development",
    quality: "high" as const,
    enableAnalytics: true,
  };

  return (
    <EngineConfigProvider config={config}>
      <EngineApiProvider>
        <MyViewer />
      </EngineApiProvider>
    </EngineConfigProvider>
  );
}
```

### Feature Flags

```tsx
interface FeatureFlags {
  newCameraControls: boolean;
  enhancedInteractions: boolean;
  experimentalRendering: boolean;
}

const useFeatureFlags = (): FeatureFlags => {
  return {
    newCameraControls: process.env.NEXT_PUBLIC_FF_NEW_CAMERA === "true",
    enhancedInteractions:
      process.env.NEXT_PUBLIC_FF_ENHANCED_INTERACTIONS === "true",
    experimentalRendering:
      process.env.NEXT_PUBLIC_FF_EXPERIMENTAL_RENDERING === "true",
  };
};

export default function FeatureFlaggedViewer() {
  const flags = useFeatureFlags();

  return (
    <Engine.Canvas>
      <Engine.Core>
        {flags.newCameraControls ? <EnhancedCameraSystem /> : <CameraSystem />}

        <InteractionSystem enhancedMode={flags.enhancedInteractions} />

        <RoomScene experimentalRendering={flags.experimentalRendering} />
      </Engine.Core>
    </Engine.Canvas>
  );
}
```

## 🔗 Ver También

- [Guía de Inicio Rápido](./quick-start.md) - Para empezar rápidamente
- [API del Engine](./engine-api.md) - Para referencia completa de APIs
- [Performance](./performance.md) - Para optimización avanzada
