# 🔧 Systems Reference

Esta es la referencia completa de todos los sistemas disponibles en Oniria Engine y sus configuraciones.

## 📋 Índice de Sistemas

- [CameraSystem](#camerasystem) - Control de cámara y navegación
- [InteractionSystem](#interactionsystem) - Detección de interacciones
- [AnimationSystem](#animationsystem) - Sistema de animaciones
- [LoaderSystem](#loadersystem) - Carga de assets y escenas
- [DebugSystem](#debugsystem) - Herramientas de desarrollo
- [RoomScene](#roomscene) - Renderizado de escenas

---

## CameraSystem

Sistema que maneja el control de la cámara, navegación y transiciones.

### Props

```tsx
interface CameraSystemProps {
  // Control básico
  enableControls?: boolean;        // Habilitar controles de usuario (default: true)
  enablePan?: boolean;            // Permitir paneo (default: true)
  enableZoom?: boolean;           // Permitir zoom (default: true)
  enableRotate?: boolean;         // Permitir rotación (default: true)
  
  // Auto-rotación
  autoRotate?: boolean;           // Rotación automática (default: false)
  autoRotateSpeed?: number;       // Velocidad de auto-rotación (default: 2.0)
  
  // Límites de control
  minDistance?: number;           // Distancia mínima de zoom (default: 1)
  maxDistance?: number;           // Distancia máxima de zoom (default: 20)
  maxPolarAngle?: number;         // Ángulo polar máximo (default: Math.PI)
  minPolarAngle?: number;         // Ángulo polar mínimo (default: 0)
  
  // Configuración de damping
  enableDamping?: boolean;        // Suavizado de movimientos (default: true)
  dampingFactor?: number;         // Factor de suavizado (default: 0.05)
  
  // Callbacks
  onCameraChange?: (position: Vector3, target: Vector3) => void;
  onControlStart?: () => void;
  onControlEnd?: () => void;
}
```

### Ejemplo de Uso

```tsx
<CameraSystem 
  enableControls={true}
  autoRotate={false}
  enablePan={true}
  enableZoom={true}
  minDistance={2}
  maxDistance={15}
  dampingFactor={0.1}
  onCameraChange={(pos, target) => console.log('Camera moved:', pos, target)}
/>
```

### Configuración para Móvil

```tsx
<CameraSystem 
  enableControls={true}
  enablePan={false}           // Deshabilitar pan en móvil
  autoRotate={true}           // Auto-rotación para mejor UX
  autoRotateSpeed={0.5}       // Rotación lenta
  dampingFactor={0.2}         // Más suavizado en móvil
/>
```

---

## InteractionSystem

Sistema que detecta y maneja interacciones del usuario con objetos 3D.

### Props

```tsx
interface InteractionSystemProps {
  // Habilitación de interacciones
  enableInteractions?: boolean;   // Habilitar sistema (default: true)
  enableHover?: boolean;          // Detectar hover (default: true)
  enableClick?: boolean;          // Detectar clicks (default: true)
  
  // Configuración de raycasting
  threshold?: number;             // Umbral de detección (default: 0.1)
  recursive?: boolean;            // Buscar en hijos (default: true)
  
  // Callbacks de eventos
  onObjectClick?: (objectName: string, event: MouseEvent) => void;
  onObjectHoverEnter?: (objectName: string, event: MouseEvent) => void;
  onObjectHoverLeave?: (objectName: string, event: MouseEvent) => void;
  onObjectDoubleClick?: (objectName: string, event: MouseEvent) => void;
  
  // Callbacks de estado
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
  
  // Filtros de objetos
  interceptableNames?: string[];  // Solo estos objetos (default: todos)
  excludeNames?: string[];        // Excluir estos objetos
}
```

### Ejemplo de Uso

```tsx
<InteractionSystem 
  enableInteractions={true}
  enableHover={true}
  enableClick={true}
  onObjectClick={(objName) => {
    console.log('Clicked:', objName);
    // Ejemplo: mostrar info del objeto
    setSelectedObject(objName);
  }}
  onObjectHoverEnter={(objName) => {
    console.log('Hover start:', objName);
    // Ejemplo: cambiar cursor
    document.body.style.cursor = 'pointer';
  }}
  onObjectHoverLeave={(objName) => {
    console.log('Hover end:', objName);
    // Restaurar cursor
    document.body.style.cursor = 'default';
  }}
  interceptableNames={['sofa', 'mesa', 'lampara']} // Solo estos objetos
/>
```

### Configuración Avanzada

```tsx
<InteractionSystem 
  enableInteractions={true}
  threshold={0.05}            // Detección más precisa
  recursive={true}            // Incluir objetos hijos
  onObjectDoubleClick={(objName) => {
    // Ejemplo: zoom al objeto
    engine.focusObject(objName);
  }}
  excludeNames={['floor', 'ceiling']} // Excluir objetos de fondo
/>
```

---

## AnimationSystem

Sistema que maneja animaciones y transiciones de objetos y cámara.

### Props

```tsx
interface AnimationSystemProps {
  // Control general
  enableAnimations?: boolean;     // Habilitar animaciones (default: true)
  globalSpeed?: number;          // Velocidad global (default: 1.0)
  
  // Animaciones automáticas
  autoPlay?: boolean;            // Reproducir automáticamente (default: false)
  loop?: boolean;                // Loop de animaciones (default: false)
  
  // Configuración de transiciones
  defaultDuration?: number;      // Duración por defecto (ms) (default: 1000)
  defaultEasing?: string;        // Easing por defecto (default: 'easeInOutQuad')
  
  // Callbacks
  onAnimationStart?: (animationName: string) => void;
  onAnimationComplete?: (animationName: string) => void;
  onAnimationUpdate?: (progress: number) => void;
}
```

### Ejemplo de Uso

```tsx
<AnimationSystem 
  enableAnimations={true}
  globalSpeed={1.0}
  defaultDuration={1500}
  defaultEasing="easeInOutCubic"
  onAnimationStart={(name) => console.log('Animation started:', name)}
  onAnimationComplete={(name) => console.log('Animation completed:', name)}
/>
```

### Control Programático

```tsx
// En un componente que use useEngine()
const engine = useEngine();

// Animar cámara a posición específica
engine.animateCamera(
  [5, 5, 5],     // position
  [0, 0, 0],     // target
  { 
    duration: 2000,
    easing: 'easeInOutQuad',
    onComplete: () => console.log('Camera animation done')
  }
);

// Animar objeto
engine.animateObject('sofa', {
  rotation: [0, Math.PI, 0],
  duration: 1000
});
```

---

## LoaderSystem

Sistema interno que maneja la carga de assets, modelos y configuraciones.

### Configuración

```tsx
interface LoaderConfig {
  // Estrategia de carga
  preloadCritical?: boolean;     // Precargar assets críticos (default: true)
  lazyLoadSecondary?: boolean;   // Carga lazy de secundarios (default: true)
  
  // Timeouts
  assetTimeout?: number;         // Timeout para assets (ms) (default: 30000)
  retryAttempts?: number;        // Intentos de reintento (default: 3)
  
  // Callbacks de progreso
  onLoadStart?: () => void;
  onLoadProgress?: (progress: number) => void;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}
```

### Uso con useLoader Hook

```tsx
const LoaderComponent = () => {
  const { 
    isLoading, 
    progress, 
    error,
    loadRoom,
    preloadAssets 
  } = useLoader();

  useEffect(() => {
    // Precargar assets críticos
    preloadAssets(['model.gltf', 'texture1.ktx2']);
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        Cargando... {Math.round(progress * 100)}%
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return null;
};
```

---

## DebugSystem

Sistema de herramientas de desarrollo y debugging.

### Props

```tsx
interface DebugSystemProps {
  // Control general
  enabled?: boolean;             // Habilitar debug (default: false)
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  // Paneles disponibles
  panels?: {
    engine?: boolean;            // Panel de estado del engine
    camera?: boolean;            // Controles de cámara
    animation?: boolean;         // Control de animaciones
    interaction?: boolean;       // Debug de interacciones
    scene?: boolean;             // Información de escena
    performance?: boolean;       // Métricas de rendimiento
  };
  
  // Configuración de rendimiento
  performanceMonitor?: {
    updateInterval?: number;     // Intervalo de actualización (ms)
    historyLength?: number;      // Longitud del historial
  };
  
  // Personalización
  theme?: 'dark' | 'light';     // Tema visual
  collapsed?: boolean;          // Iniciar colapsado
}
```

### Ejemplo de Uso

```tsx
<DebugSystem 
  enabled={process.env.NODE_ENV === 'development'}
  position="top-right"
  panels={{
    engine: true,
    camera: true,
    performance: true,
    interaction: false,    // Deshabilitar panel de interacciones
    scene: true,
    animation: false
  }}
  performanceMonitor={{
    updateInterval: 1000,  // Actualizar cada segundo
    historyLength: 60      // Mantener 60 muestras
  }}
  theme="dark"
  collapsed={false}
/>
```

### Configuración de Desarrollo

```tsx
// Solo en desarrollo
{process.env.NODE_ENV === 'development' && (
  <DebugSystem 
    enabled={true}
    panels={{
      engine: true,
      camera: true,
      performance: true,
      scene: true,
      interaction: true,
      animation: true
    }}
  />
)}
```

---

## RoomScene

Componente que renderiza la escena 3D principal con modelos y materiales.

### Props

```tsx
interface RoomSceneProps {
  // Configuración de calidad
  qualityLevel?: 'low' | 'medium' | 'high';  // Nivel de calidad (default: 'high')
  
  // Configuración de sombras
  enableShadows?: boolean;       // Habilitar sombras (default: true)
  shadowMapSize?: number;        // Tamaño del mapa de sombras (default: 1024)
  
  // Configuración de iluminación
  enableEnvironmentMap?: boolean; // Mapa de entorno (default: true)
  environmentIntensity?: number;  // Intensidad del entorno (default: 1.0)
  
  // Optimizaciones
  frustumCulling?: boolean;      // Culling de frustum (default: true)
  occlusionCulling?: boolean;    // Culling de oclusión (default: false)
  
  // Callbacks
  onSceneReady?: () => void;
  onModelLoad?: (modelName: string) => void;
  onMaterialChange?: (materialName: string) => void;
}
```

### Ejemplo de Uso

```tsx
<RoomScene 
  qualityLevel="high"
  enableShadows={true}
  shadowMapSize={2048}
  enableEnvironmentMap={true}
  environmentIntensity={0.8}
  onSceneReady={() => console.log('Scene ready!')}
  onModelLoad={(model) => console.log('Model loaded:', model)}
/>
```

### Configuración de Performance

```tsx
// Para dispositivos de baja potencia
<RoomScene 
  qualityLevel="low"
  enableShadows={false}
  shadowMapSize={512}
  enableEnvironmentMap={false}
  frustumCulling={true}
  occlusionCulling={false}
/>

// Para alta calidad
<RoomScene 
  qualityLevel="high"
  enableShadows={true}
  shadowMapSize={4096}
  enableEnvironmentMap={true}
  environmentIntensity={1.2}
  frustumCulling={true}
  occlusionCulling={true}
/>
```

---

## Configuración Combinada

### Ejemplo de Setup Completo

```tsx
export default function CompleteViewer() {
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [qualityLevel, setQualityLevel] = useState<'low' | 'medium' | 'high'>('high');

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Engine.Canvas>
        <Engine.Core>
          {/* Sistema de Cámara */}
          <CameraSystem 
            enableControls={true}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.1}
            minDistance={2}
            maxDistance={15}
          />

          {/* Sistema de Interacciones */}
          <InteractionSystem 
            enableInteractions={true}
            enableHover={true}
            enableClick={true}
            onObjectClick={(obj) => console.log('Clicked:', obj)}
            onObjectHoverEnter={(obj) => document.body.style.cursor = 'pointer'}
            onObjectHoverLeave={() => document.body.style.cursor = 'default'}
          />

          {/* Sistema de Animaciones */}
          <AnimationSystem 
            enableAnimations={true}
            defaultDuration={1500}
            defaultEasing="easeInOutQuad"
          />

          {/* Escena Principal */}
          <RoomScene 
            qualityLevel={qualityLevel}
            enableShadows={qualityLevel !== 'low'}
            shadowMapSize={qualityLevel === 'high' ? 2048 : 1024}
            enableEnvironmentMap={true}
          />

          {/* Sistema de Debug */}
          {debugEnabled && (
            <DebugSystem 
              enabled={true}
              panels={{
                engine: true,
                camera: true,
                performance: true,
                interaction: true,
                scene: true,
                animation: true
              }}
            />
          )}
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

### Configuración Responsive

```tsx
export default function ResponsiveViewer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Engine.Canvas>
      <Engine.Core>
        <CameraSystem 
          enableControls={true}
          enablePan={!isMobile}       // Sin pan en móvil
          autoRotate={isMobile}       // Auto-rotación en móvil
          dampingFactor={isMobile ? 0.2 : 0.1}
        />

        <InteractionSystem 
          enableInteractions={!isMobile} // Sin interacciones en móvil
          enableHover={!isMobile}
          enableClick={!isMobile}
        />

        <AnimationSystem 
          enableAnimations={true}
          globalSpeed={isMobile ? 0.8 : 1.0} // Más lento en móvil
        />

        <RoomScene 
          qualityLevel={isMobile ? 'low' : 'high'}
          enableShadows={!isMobile}
          shadowMapSize={isMobile ? 512 : 2048}
        />
      </Engine.Core>
    </Engine.Canvas>
  );
}
```

## 🔗 Ver También

- [Guía de Inicio Rápido](./quick-start.md) - Configuración básica
- [API del Engine](./engine-api.md) - API pública completa
- [Ejemplos](./examples.md) - Implementaciones prácticas
- [Performance](./performance.md) - Optimización de sistemas
- [Troubleshooting](./troubleshooting.md) - Solución de problemas