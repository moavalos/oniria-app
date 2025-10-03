# 🔧 Troubleshooting y Solución de Problemas

Esta guía te ayudará a diagnosticar y resolver problemas comunes con Oniria Engine.

## 🚨 Problemas Comunes

### 🖤 Pantalla Negra / Canvas No Renderiza

#### Síntomas
- El canvas aparece pero permanece negro
- No se ven modelos 3D
- No hay errores en consola

#### Diagnóstico
```tsx
// Verificar configuración del engine
<DebugSystem 
  enabled={true}
  panels={{ engine: true, scene: true }}
/>
```

#### Soluciones

1. **Verificar configuración del room**:
```tsx
// ❌ Problemático
const [room, setRoom] = useState(null); // room es null

// ✅ Correcto
const [room, setRoom] = useState('oniria'); // room inicializado
```

2. **Verificar rutas de assets**:
```tsx
// ❌ Ruta incorrecta
const roomConfig = {
  gltf: './model.gltf', // Ruta relativa problemática
};

// ✅ Ruta correcta
const roomConfig = {
  gltf: '/models/oniria.gltf', // Ruta desde public
};
```

3. **Verificar configuración del Canvas**:
```tsx
// ✅ Configuración mínima funcional
<Engine.Canvas 
  engineSettings={{
    backgroundColor: "#000000", // Fondo negro explícito
    antialias: true
  }}
>
  <Engine.Core>
    <RoomScene />
  </Engine.Core>
</Engine.Canvas>
```

### 🎮 Controles No Funcionan

#### Síntomas
- No se puede rotar la cámara
- Los clicks no detectan objetos
- No hay respuesta a mouse/touch

#### Diagnóstico
```tsx
// Verificar estado de sistemas
const TestControls = () => {
  const engine = useEngine();
  
  useEffect(() => {
    console.log('Engine state:', {
      isLoaded: engine.isLoaded,
      hasActiveRoom: !!engine.activeRoom,
      systemsLoaded: engine.systemsLoaded
    });
  }, [engine]);
};
```

#### Soluciones

1. **Verificar orden de sistemas**:
```tsx
// ✅ Orden correcto
<Engine.Core>
  <CameraSystem enableControls={true} />
  <InteractionSystem />
  <RoomScene />
</Engine.Core>
```

2. **Verificar configuración de cámara**:
```tsx
// ✅ Configuración explícita
<CameraSystem 
  enableControls={true}
  enablePan={true}
  enableZoom={true}
  enableRotate={true}
/>
```

3. **Verificar interacciones**:
```tsx
// ✅ Callbacks explícitos
<InteractionSystem 
  onObjectClick={(objectName) => console.log('Clicked:', objectName)}
  onObjectHoverEnter={(objectName) => console.log('Hover start:', objectName)}
  onObjectHoverLeave={(objectName) => console.log('Hover end:', objectName)}
/>
```

### 🐌 Performance Lenta

#### Síntomas
- FPS bajo (< 30)
- Lag al interactuar
- Consumo alto de memoria

#### Diagnóstico
```tsx
// Monitor de performance
<DebugSystem 
  enabled={true}
  panels={{ performance: true }}
/>
```

#### Soluciones

1. **Optimizar configuración**:
```tsx
// Para dispositivos de baja potencia
const lowEndSettings = {
  backgroundColor: "#000000",
  antialias: false, // Deshabilitar
  powerPreference: "low-power"
};

<Engine.Canvas engineSettings={lowEndSettings}>
```

2. **Reducir sistemas activos**:
```tsx
// Renderizar condicionalmente
{isHighEndDevice && <InteractionSystem />}
{performanceMode !== 'low' && <AnimationSystem />}
```

3. **Ver guía completa**: [Performance](./performance.md)

### 💾 Memory Leaks

#### Síntomas
- Uso de memoria aumenta constantemente
- La aplicación se vuelve lenta con el tiempo
- Crashes después de uso prolongado

#### Diagnóstico
```tsx
// Monitor memoria en DebugSystem
const MemoryMonitor = () => {
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if ('memory' in performance) {
        const memMB = (performance as any).memory.usedJSHeapSize / 1024 / 1024;
        setMemory(memMB);
        console.log(`Memory usage: ${memMB.toFixed(1)}MB`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div>Memory: {memory.toFixed(1)}MB</div>;
};
```

#### Soluciones

1. **Verificar cleanup**:
```tsx
// ✅ Cleanup correcto
useEffect(() => {
  const subscription = loopService.subscribe(callback);
  
  return () => {
    subscription.unsubscribe(); // ¡Importante!
  };
}, []);
```

2. **Verificar listeners**:
```tsx
// ❌ Listener sin cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // ¡Falta cleanup!
}, []);

// ✅ Con cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### 🔄 Problemas de Estado

#### Síntomas
- Estado desincronizado entre componentes
- Cambios no se reflejan en la UI
- Errores de React hooks

#### Diagnóstico
```tsx
// Verificar estado del engine
const StateDebugger = () => {
  const engine = useEngine();
  const core = useEngineCore(); // Solo para debug

  console.log('Public state:', {
    room: engine.activeRoom?.id,
    skin: engine.activeSkin?.id,
    isLoaded: engine.isLoaded
  });

  console.log('Internal state:', {
    services: Object.keys(core.services),
    systems: core.systems.size
  });
};
```

#### Soluciones

1. **Usar API pública correctamente**:
```tsx
// ❌ Acceso directo a servicios internos
const core = useEngineCore();
core.services.camera.setTarget(target); // ¡No hacer esto!

// ✅ Usar API pública
const engine = useEngine();
engine.setTarget(target);
```

2. **Verificar dependencias**:
```tsx
// ✅ Dependencias correctas
useEffect(() => {
  if (engine.activeRoom) {
    engine.setTarget('nodo1');
  }
}, [engine.activeRoom]); // Dependencia explícita
```

### 🎨 Problemas de Materiales/Texturas

#### Síntomas
- Texturas no cargan
- Materiales aparecen blancos/grises
- Cambios de skin no funcionan

#### Diagnóstico
```tsx
// Verificar estado de materiales
<DebugSystem 
  enabled={true}
  panels={{ scene: true }} // Incluye info de materiales
/>
```

#### Soluciones

1. **Verificar rutas de texturas**:
```tsx
// Verificar en configuración del room
const roomConfig = {
  skins: {
    default: {
      // ✅ Rutas correctas desde public
      textures: {
        wall: '/skins/oniria_wall.ktx2',
        object: '/skins/oniria_object.ktx2'
      }
    }
  }
};
```

2. **Verificar formatos soportados**:
```tsx
// Formatos recomendados
- Texturas: .ktx2, .webp, .jpg
- Modelos: .gltf, .glb
```

3. **Preload de assets**:
```tsx
// Precargar assets críticos
useEffect(() => {
  engine.preloadAssets(['texture1', 'texture2']);
}, []);
```

## 🛠️ Herramientas de Debug

### Debug System Completo

```tsx
// Configuración de debug completa
<DebugSystem 
  enabled={process.env.NODE_ENV === 'development'}
  panels={{
    engine: true,     // Estado general del engine
    camera: true,     // Controles de cámara
    animation: true,  // Sistema de animaciones
    interaction: true,// Interacciones y raycasting
    scene: true,      // Información de escena
    performance: true // Métricas de rendimiento
  }}
/>
```

### Custom Debug Hooks

```tsx
// Hook para debug de estado
const useDebugState = (label: string, value: any) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${label}]`, value);
    }
  }, [label, value]);
};

// Hook para debug de renders
const useDebugRenders = (componentName: string) => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current++;
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCount.current} times`);
    }
  });
};

// Uso
const MyComponent = () => {
  const engine = useEngine();
  
  useDebugState('Engine State', {
    isLoaded: engine.isLoaded,
    activeRoom: engine.activeRoom?.id
  });
  
  useDebugRenders('MyComponent');

  return <div>...</div>;
};
```

### Debug con React DevTools

```tsx
// Añadir nombres de display para debugging
InteractionSystem.displayName = 'InteractionSystem';
CameraSystem.displayName = 'CameraSystem';
RoomScene.displayName = 'RoomScene';

// Exponer estado en window para debugging
if (process.env.NODE_ENV === 'development') {
  const DebugWindow = () => {
    const engine = useEngine();
    
    useEffect(() => {
      (window as any).oniriaEngine = engine;
    }, [engine]);
    
    return null;
  };
}
```

## 📊 Análisis de Performance

### Performance Profiling

```tsx
// Hook para profiling
const usePerformanceProfiler = (name: string) => {
  const start = useRef(0);

  const startProfiling = useCallback(() => {
    start.current = performance.now();
  }, []);

  const endProfiling = useCallback(() => {
    const duration = performance.now() - start.current;
    console.log(`[${name}] took ${duration.toFixed(2)}ms`);
    return duration;
  }, [name]);

  return { startProfiling, endProfiling };
};

// Uso
const MyComponent = () => {
  const profiler = usePerformanceProfiler('MyComponent');

  useEffect(() => {
    profiler.startProfiling();
    
    // ... operación costosa
    
    profiler.endProfiling();
  }, []);
};
```

### Bundle Analysis

```bash
# Analizar tamaño del bundle
npm run build
npx webpack-bundle-analyzer .next/static/chunks/

# Verificar imports no utilizados
npx depcheck

# Análisis de rendimiento
npm run build -- --analyze
```

## 🔍 Logging Avanzado

### Logger Configurado

```tsx
// Sistema de logging configurable
enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  error(message: string, ...args: any[]) {
    if (this.level >= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.level >= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]) {
    if (this.level >= LogLevel.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: any[]) {
    if (this.level >= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

// Configurar logger global
const logger = new Logger(
  process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.WARN
);

export { logger };
```

### Error Boundaries

```tsx
// Error boundary para engine
class EngineErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Engine Error:', error, errorInfo);
    
    // Enviar a servicio de monitoring
    if (process.env.NODE_ENV === 'production') {
      // sendErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="engine-error">
          <h2>Engine Error</h2>
          <p>Ha ocurrido un error en el motor 3D.</p>
          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>Error details</summary>
              <pre>{this.state.error?.stack}</pre>
            </details>
          )}
          <button onClick={() => this.setState({ hasError: false })}>
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Uso
export default function App() {
  return (
    <EngineErrorBoundary>
      <Engine.Canvas>
        <Engine.Core>
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </EngineErrorBoundary>
  );
}
```

## 📋 Checklist de Diagnóstico

### Verificación Inicial

- [ ] ¿Está el DebugSystem habilitado?
- [ ] ¿Hay errores en la consola del navegador?
- [ ] ¿Están cargando los assets (red/network tab)?
- [ ] ¿Está inicializado el room correctamente?

### Verificación de Sistemas

- [ ] ¿Están todos los sistemas requeridos en `<Engine.Core>`?
- [ ] ¿Están en el orden correcto?
- [ ] ¿Tienen las props necesarias?
- [ ] ¿Se están usando los hooks correctos?

### Verificación de Performance

- [ ] ¿FPS está por encima de 30?
- [ ] ¿Memoria se mantiene estable?
- [ ] ¿Tiempo de carga es aceptable?
- [ ] ¿No hay memory leaks visibles?

### Verificación de Assets

- [ ] ¿Rutas de modelos/texturas son correctas?
- [ ] ¿Formatos de archivo son soportados?
- [ ] ¿Assets están en la carpeta public?
- [ ] ¿Configuración del room es válida?

## 🆘 Obtener Ayuda

### Información para Reportar Bugs

```tsx
// Generar reporte de estado
const generateDebugReport = () => {
  const engine = useEngine();
  
  return {
    timestamp: new Date().toISOString(),
    engine: {
      isLoaded: engine.isLoaded,
      activeRoom: engine.activeRoom?.id,
      activeSkin: engine.activeSkin?.id
    },
    browser: {
      userAgent: navigator.userAgent,
      webGL: !!window.WebGLRenderingContext
    },
    performance: {
      memory: (performance as any).memory?.usedJSHeapSize || 'not available',
      timing: performance.timing
    }
  };
};
```

### Templates de Issues

**Bug Report:**
```
## Bug Description
[Descripción clara del problema]

## Steps to Reproduce
1. [Paso 1]
2. [Paso 2] 
3. [Paso 3]

## Expected Behavior
[Qué esperabas que pasara]

## Actual Behavior
[Qué pasó realmente]

## Environment
- Browser: [Chrome/Firefox/Safari + versión]
- OS: [Windows/Mac/Linux]
- Engine version: [versión]

## Debug Report
[Incluir salida de generateDebugReport()]

## Screenshots/Video
[Si aplica]
```

**Feature Request:**
```
## Feature Description
[Descripción de la funcionalidad deseada]

## Use Case
[Por qué necesitas esta funcionalidad]

## Proposed API
[Si tienes ideas de cómo debería funcionar]

## Additional Context
[Información adicional relevante]
```

## 🔗 Ver También

- [Performance](./performance.md) - Optimización de rendimiento
- [Sistema de Debug](./systems/debug-system.md) - Herramientas de debug
- [API del Engine](./engine-api.md) - Referencia de API
- [Configuración](./engine-setup.md) - Configuración del engine