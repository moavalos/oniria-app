# 🚀 Optimización y Performance

Esta guía cubre las mejores prácticas para optimizar el rendimiento de aplicaciones construidas con Oniria Engine.

## 📊 Métricas de Performance

### Métricas Clave

- **FPS (Frames Per Second)**: Objetivo 60 FPS en desktop, 30 FPS aceptable en móvil
- **Frame Time**: < 16.67ms para 60 FPS
- **Memory Usage**: Mantenimiento estable, sin memory leaks
- **Load Time**: Assets cargados en < 3 segundos
- **First Contentful Paint**: < 1.5 segundos

### Monitoreo con DebugSystem

```tsx
<DebugSystem
  enabled={true}
  panels={{
    performance: true, // Monitor FPS y memoria en tiempo real
    engine: true, // Estado general del engine
  }}
/>
```

## ⚡ Optimización del Engine

### Configuración de Canvas Optimizada

```tsx
// Configuración de alto rendimiento
const highPerformanceSettings = {
  backgroundColor: "#000000",
  antialias: true,
  powerPreference: "high-performance",
  alpha: false,
  premultipliedAlpha: false,
  preserveDrawingBuffer: false, // Solo true si necesitas screenshots
};

// Configuración para móvil
const mobileSettings = {
  backgroundColor: "#000000",
  antialias: false, // Deshabilitar para mejor performance
  powerPreference: "low-power",
  alpha: false,
};

<Engine.Canvas engineSettings={isMobile ? mobileSettings : highPerformanceSettings}>
```

### Lazy Loading de Sistemas

```tsx
import { lazy, Suspense } from "react";

// Cargar sistemas solo cuando se necesiten
const DebugSystem = lazy(() =>
  import("@/engine").then((m) => ({ default: m.DebugSystem }))
);
const InteractionSystem = lazy(() =>
  import("@/engine").then((m) => ({ default: m.InteractionSystem }))
);

export default function OptimizedViewer() {
  const [enableInteractions, setEnableInteractions] = useState(false);

  return (
    <div>
      <Suspense fallback={null}>
        {process.env.NODE_ENV === "development" && <DebugSystem />}
      </Suspense>

      <Engine.Canvas>
        <Engine.Core>
          <Suspense fallback={null}>
            {enableInteractions && <InteractionSystem />}
          </Suspense>

          <CameraSystem />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 🖼️ Optimización de Assets

### Compresión de Modelos

```bash
# Optimizar modelos GLTF
npx gltf-pipeline -i model.gltf -o model-optimized.gltf --draco.compressionLevel 10

# Optimizar texturas
# Usar formatos WebP o AVIF para texturas
# Usar KTX2 con compresión Basis Universal para WebGL
```

### Estrategia de Carga

```tsx
// Preload de assets críticos
useEffect(() => {
  const preloadCriticalAssets = async () => {
    // Precargar modelos principales
    await engine.preloadRoom("main-room");

    // Precargar texturas en background
    engine.preloadTextures(["hero-texture", "ui-texture"]);
  };

  preloadCriticalAssets();
}, []);

// Lazy loading de assets secundarios
const loadSecondaryAssets = useCallback(async () => {
  if (userScrolledToBottom) {
    await engine.loadRoom("detail-room");
  }
}, [userScrolledToBottom]);
```

### Asset Budgets

```tsx
// Configurar límites de assets por tipo de dispositivo
const ASSET_BUDGETS = {
  mobile: {
    maxTextureSize: 1024,
    maxPolyCount: 50000,
    maxMemoryUsage: 100 * 1024 * 1024, // 100MB
  },
  desktop: {
    maxTextureSize: 2048,
    maxPolyCount: 200000,
    maxMemoryUsage: 500 * 1024 * 1024, // 500MB
  },
};

const budget = isMobile ? ASSET_BUDGETS.mobile : ASSET_BUDGETS.desktop;
```

## 🔄 Optimización de Render Loop

### Throttling de Updates

```tsx
// Limitar frecuencia de updates para sistemas no críticos
const useThrottledUpdate = (callback: () => void, delay: number) => {
  const lastRun = useRef(Date.now());

  const throttledCallback = useCallback(() => {
    if (Date.now() - lastRun.current >= delay) {
      callback();
      lastRun.current = Date.now();
    }
  }, [callback, delay]);

  return throttledCallback;
};

// Uso en sistema de interacciones
const InteractionSystem = () => {
  const core = useEngineCore();

  // Throttle interacciones a 30 FPS en lugar de 60
  const throttledUpdate = useThrottledUpdate(() => {
    interactionService.update(activeRoom, interceptables);
  }, 1000 / 30);

  useEffect(() => {
    loopService.subscribe(throttledUpdate);
    return () => loopService.unsubscribe(throttledUpdate);
  }, [throttledUpdate]);
};
```

### Conditional Rendering

```tsx
// Renderizar sistemas solo cuando son necesarios
const ConditionalSystems = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isInteractive, setIsInteractive] = useState(false);

  // Usar Intersection Observer para detectar visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Engine.Canvas>
      <Engine.Core>
        {/* Siempre renderizar escena básica */}
        <RoomScene />

        {/* Sistemas opcionales basados en estado */}
        {isVisible && <CameraSystem />}
        {isVisible && isInteractive && <InteractionSystem />}
        {isVisible && <AnimationSystem />}
      </Engine.Core>
    </Engine.Canvas>
  );
};
```

## 💾 Gestión de Memoria

### Cleanup Automático

```tsx
// Hook para cleanup automático de recursos
const useResourceCleanup = () => {
  const resourcesRef = useRef<Set<THREE.Object3D>>(new Set());

  const addResource = useCallback((resource: THREE.Object3D) => {
    resourcesRef.current.add(resource);
  }, []);

  const cleanup = useCallback(() => {
    resourcesRef.current.forEach((resource) => {
      if (resource.geometry) resource.geometry.dispose();
      if (resource.material) {
        if (Array.isArray(resource.material)) {
          resource.material.forEach((mat) => mat.dispose());
        } else {
          resource.material.dispose();
        }
      }
    });
    resourcesRef.current.clear();
  }, []);

  useEffect(() => {
    return cleanup; // Cleanup al desmontar
  }, [cleanup]);

  return { addResource, cleanup };
};
```

### Memory Monitoring

```tsx
// Monitor de memoria con alertas
const useMemoryMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [memoryWarning, setMemoryWarning] = useState(false);

  useEffect(() => {
    const checkMemory = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        const usageMB = memory.usedJSHeapSize / 1024 / 1024;

        setMemoryUsage(usageMB);
        setMemoryWarning(usageMB > 200); // Alerta si supera 200MB

        if (usageMB > 400) {
          // Forzar garbage collection si es posible
          if ("gc" in window) {
            (window as any).gc();
          }
        }
      }
    };

    const interval = setInterval(checkMemory, 5000);
    return () => clearInterval(interval);
  }, []);

  return { memoryUsage, memoryWarning };
};
```

## 📱 Optimización Móvil

### Detección y Adaptación

```tsx
const useMobileOptimization = () => {
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    isMobile: false,
    isLowEnd: false,
    supportsWebGL2: false,
    maxTextureSize: 1024,
  });

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    const supportsWebGL2 = !!canvas.getContext("webgl2");
    const maxTextureSize = gl?.getParameter(gl.MAX_TEXTURE_SIZE) || 1024;

    setDeviceCapabilities({
      isMobile,
      isLowEnd,
      supportsWebGL2,
      maxTextureSize,
    });
  }, []);

  return deviceCapabilities;
};

export default function MobileOptimizedViewer() {
  const device = useMobileOptimization();

  const engineSettings = {
    backgroundColor: "#000000",
    antialias: !device.isMobile && !device.isLowEnd,
    powerPreference: device.isMobile ? "low-power" : "high-performance",
  };

  return (
    <Engine.Canvas engineSettings={engineSettings}>
      <Engine.Core>
        <CameraSystem
          enableControls={!device.isMobile}
          autoRotate={device.isMobile} // Auto-rotación en móvil
          enablePan={!device.isMobile}
        />

        <InteractionSystem enableInteractions={!device.isLowEnd} />

        <RoomScene qualityLevel={device.isLowEnd ? "low" : "high"} />
      </Engine.Core>
    </Engine.Canvas>
  );
}
```

### Touch Optimizations

```tsx
// Optimizaciones específicas para touch
const TouchOptimizedControls = () => {
  const [touchStartTime, setTouchStartTime] = useState(0);

  const handleTouchStart = () => {
    setTouchStartTime(Date.now());
  };

  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartTime;

    // Distinguir entre tap y drag
    if (touchDuration < 200) {
      // Tap corto - trigger click
      handleClick();
    }
    // Drag largo - ignorar para evitar clicks accidentales
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "pan-y" }} // Permitir scroll vertical
    >
      <Engine.Canvas>{/* ... */}</Engine.Canvas>
    </div>
  );
};
```

## 🔧 Optimización de Código

### Memoización

```tsx
// Memoizar configuraciones complejas
const MemoizedViewer = React.memo(
  ({ roomId, skinId }: { roomId: string; skinId: string }) => {
    const engine = useEngine();

    const engineSettings = useMemo(
      () => ({
        backgroundColor: "#000000",
        antialias: true,
        powerPreference: "high-performance" as const,
      }),
      []
    );

    const interactionHandlers = useMemo(
      () => ({
        onObjectHoverEnter: (obj: string) => console.log("Hover:", obj),
        onObjectClick: (obj: string) => console.log("Click:", obj),
      }),
      []
    );

    useEffect(() => {
      engine.setRoom(roomId, skinId);
    }, [engine, roomId, skinId]);

    return (
      <Engine.Canvas engineSettings={engineSettings}>
        <Engine.Core>
          <InteractionSystem {...interactionHandlers} />
          <CameraSystem />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    );
  }
);
```

### Debouncing

```tsx
// Debounce de operaciones costosas
const useDebouncedRoom = (roomId: string, delay: number = 300) => {
  const [debouncedRoomId, setDebouncedRoomId] = useState(roomId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRoomId(roomId);
    }, delay);

    return () => clearTimeout(timer);
  }, [roomId, delay]);

  return debouncedRoomId;
};

export default function DebouncedViewer({ roomId }: { roomId: string }) {
  const debouncedRoomId = useDebouncedRoom(roomId);
  const engine = useEngine();

  useEffect(() => {
    if (debouncedRoomId) {
      engine.setRoom(debouncedRoomId, "default");
    }
  }, [debouncedRoomId]);

  return (
    <Engine.Canvas>
      <Engine.Core>
        <RoomScene />
      </Engine.Core>
    </Engine.Canvas>
  );
}
```

## 📈 Performance Monitoring

### Custom Performance Hook

```tsx
const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    renderTime: 0,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let frameTimeSum = 0;

    const measurePerformance = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastTime;

      frameCount++;
      frameTimeSum += frameTime;

      if (frameCount >= 60) {
        // Update every 60 frames
        const avgFrameTime = frameTimeSum / frameCount;
        const fps = 1000 / avgFrameTime;

        setMetrics((prev) => ({
          ...prev,
          fps: Math.round(fps),
          frameTime: avgFrameTime,
          memoryUsage:
            (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0,
        }));

        frameCount = 0;
        frameTimeSum = 0;
      }

      lastTime = currentTime;
      requestAnimationFrame(measurePerformance);
    };

    measurePerformance();
  }, []);

  return metrics;
};

// Uso
export default function MonitoredViewer() {
  const metrics = usePerformanceMetrics();

  return (
    <div>
      <div className="performance-overlay">
        FPS: {metrics.fps} | Frame: {metrics.frameTime.toFixed(1)}ms | Memory:{" "}
        {metrics.memoryUsage.toFixed(1)}MB
      </div>

      <Engine.Canvas>
        <Engine.Core>
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 🎯 Performance Budgets

### Definir Budgets

```tsx
const PERFORMANCE_BUDGETS = {
  targetFPS: {
    mobile: 30,
    tablet: 45,
    desktop: 60,
  },
  maxMemory: {
    mobile: 150, // MB
    tablet: 300,
    desktop: 500,
  },
  maxLoadTime: {
    mobile: 5000, // ms
    tablet: 3000,
    desktop: 2000,
  },
};

// Monitor de budget
const useBudgetMonitor = (deviceType: "mobile" | "tablet" | "desktop") => {
  const budget = PERFORMANCE_BUDGETS[deviceType];
  const metrics = usePerformanceMetrics();

  const budgetStatus = useMemo(
    () => ({
      fpsOk: metrics.fps >= budget.targetFPS,
      memoryOk: metrics.memoryUsage <= budget.maxMemory,
      overall:
        metrics.fps >= budget.targetFPS &&
        metrics.memoryUsage <= budget.maxMemory,
    }),
    [metrics, budget]
  );

  // Alertas automáticas
  useEffect(() => {
    if (!budgetStatus.overall) {
      console.warn("Performance budget exceeded", { metrics, budget });
    }
  }, [budgetStatus.overall]);

  return budgetStatus;
};
```

## 🚀 Optimización de Build

### Bundle Analysis

```bash
# Analizar bundle size
npm run build
npx webpack-bundle-analyzer .next/static/chunks/

# Verificar tree shaking
npm run build -- --analyze
```

### Code Splitting

```tsx
// Split por rutas
const HomeViewer = lazy(() => import("./viewers/HomeViewer"));
const ProductViewer = lazy(() => import("./viewers/ProductViewer"));

// Split por features
const AdvancedFeatures = lazy(() => import("./features/AdvancedFeatures"));

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomeViewer />} />
        <Route path="/product" element={<ProductViewer />} />
      </Routes>
    </Suspense>
  );
}
```

## 🔗 Ver También

- [Sistema de Debug](./systems/debug-system.md) - Para monitoreo de performance
- [Configuración del Engine](./engine-setup.md) - Para optimización de configuración
- [Solución de Problemas](./troubleshooting.md) - Para debugging de performance
