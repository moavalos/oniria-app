# 📷 Sistema de Cámara (CameraSystem)

El `CameraSystem` controla el comportamiento de la cámara 3D, incluyendo posicionamiento, animaciones y controles de usuario.

## 🎯 Propósito

- Controlar posición y orientación de la cámara
- Gestionar transiciones de cámara suaves
- Proporcionar controles interactivos opcionales
- Manejar puntos de vista predefinidos

## 🛠️ Uso Básico

```tsx
import { CameraSystem } from "@/engine";

<CameraSystem
  enableControls={true}
  autoRotate={false}
  initialPosition={[0, 2, 5]}
/>;
```

## 📋 Props

### `enableControls?: boolean`

Por defecto: `true`

Habilita controles de cámara interactivos (OrbitControls).

```tsx
// Permitir que el usuario mueva la cámara
<CameraSystem enableControls={true} />

// Cámara fija, solo movimientos programáticos
<CameraSystem enableControls={false} />
```

### `autoRotate?: boolean`

Por defecto: `false`

Activa rotación automática alrededor del punto central.

```tsx
<CameraSystem enableControls={true} autoRotate={true} autoRotateSpeed={0.5} />
```

### `autoRotateSpeed?: number`

Por defecto: `2.0`

Velocidad de rotación automática.

```tsx
<CameraSystem
  autoRotate={true}
  autoRotateSpeed={1.0} // Rotación lenta
/>
```

### `initialPosition?: [number, number, number]`

Por defecto: `[0, 0, 5]`

Posición inicial de la cámara.

```tsx
<CameraSystem initialPosition={[-3.5, 3, 6]} />
```

### `target?: [number, number, number]`

Por defecto: `[0, 0, 0]`

Punto hacia el que mira la cámara.

```tsx
<CameraSystem initialPosition={[0, 5, 0]} target={[0, 1.8, 0]} />
```

### `enableZoom?: boolean`

Por defecto: `true`

Permite zoom con la rueda del mouse.

```tsx
<CameraSystem enableZoom={false} />
```

### `enablePan?: boolean`

Por defecto: `true`

Permite movimiento lateral con click derecho.

```tsx
<CameraSystem enablePan={false} />
```

### `minDistance?: number` y `maxDistance?: number`

Limita el zoom mínimo y máximo.

```tsx
<CameraSystem minDistance={2} maxDistance={10} />
```

## 🎮 Control Programático

### Usando el Hook useEngine()

```tsx
import { useEngine } from "@/engine";

export default function CameraController() {
  const engine = useEngine();

  const moveToPosition = (position: [number, number, number]) => {
    // El engine expone métodos de cámara
    engine.camera.setPosition(position);
  };

  const lookAtObject = (objectName: string) => {
    engine.camera.lookAtObject(objectName);
  };

  return (
    <div>
      <button onClick={() => moveToPosition([0, 5, 0])}>Vista Superior</button>
      <button onClick={() => lookAtObject("main-object")}>
        Enfocar Objeto Principal
      </button>
    </div>
  );
}
```

## 🎮 Ejemplos de Implementación

### Ejemplo 1: Cámara con Posiciones Predefinidas

```tsx
import { useState } from "react";
import { CameraSystem } from "@/engine";

const CAMERA_POSITIONS = {
  front: { position: [0, 2, 5], target: [0, 1, 0] },
  top: { position: [0, 10, 0], target: [0, 0, 0] },
  side: { position: [5, 2, 0], target: [0, 1, 0] },
  detail: { position: [1, 1.5, 2], target: [0, 1, 0] },
};

export default function ViewerWithPresets() {
  const [currentView, setCurrentView] = useState("front");
  const engine = useEngine();

  const changeView = (viewName: keyof typeof CAMERA_POSITIONS) => {
    const view = CAMERA_POSITIONS[viewName];
    engine.camera.animateTo(view.position, view.target, 1000);
    setCurrentView(viewName);
  };

  return (
    <div>
      <div className="camera-controls">
        {Object.keys(CAMERA_POSITIONS).map((view) => (
          <button
            key={view}
            onClick={() => changeView(view as keyof typeof CAMERA_POSITIONS)}
            className={currentView === view ? "active" : ""}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      <CameraSystem
        enableControls={true}
        initialPosition={CAMERA_POSITIONS.front.position}
        target={CAMERA_POSITIONS.front.target}
      />
    </div>
  );
}
```

### Ejemplo 2: Cámara Responsiva

```tsx
import { useEffect, useState } from "react";
import { CameraSystem } from "@/engine";

export default function ResponsiveCamera() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <CameraSystem
      enableControls={!isMobile} // Deshabilitar controles en móvil
      enablePan={!isMobile}
      enableZoom={!isMobile}
      autoRotate={isMobile} // Auto-rotación solo en móvil
      autoRotateSpeed={0.5}
      initialPosition={isMobile ? [0, 3, 8] : [0, 2, 5]}
      minDistance={isMobile ? 3 : 2}
      maxDistance={isMobile ? 12 : 10}
    />
  );
}
```

### Ejemplo 3: Cámara con Restricciones

```tsx
import { CameraSystem } from "@/engine";

export default function ConstrainedCamera() {
  return (
    <CameraSystem
      enableControls={true}
      // Limitar zoom
      minDistance={3}
      maxDistance={8}
      // Restringir ángulos verticales
      minPolarAngle={Math.PI / 4} // 45 grados
      maxPolarAngle={Math.PI / 2} // 90 grados
      // Deshabilitar pan para mantener foco
      enablePan={false}
      // Posición inicial óptima
      initialPosition={[0, 4, 6]}
      target={[0, 1.5, 0]}
    />
  );
}
```

### Ejemplo 4: Cámara Cinematográfica

```tsx
import { useEffect, useState } from "react";
import { CameraSystem } from "@/engine";

const CINEMATIC_SEQUENCE = [
  { position: [-5, 2, 5], target: [0, 1, 0], duration: 3000 },
  { position: [0, 8, 0], target: [0, 0, 0], duration: 2000 },
  { position: [3, 1, 3], target: [0, 1, 0], duration: 2500 },
  { position: [0, 2, 5], target: [0, 1, 0], duration: 2000 },
];

export default function CinematicViewer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const engine = useEngine();

  const playCinematic = async () => {
    setIsPlaying(true);

    for (let i = 0; i < CINEMATIC_SEQUENCE.length; i++) {
      const step = CINEMATIC_SEQUENCE[i];
      setCurrentStep(i);

      await engine.camera.animateTo(step.position, step.target, step.duration);

      // Pausa entre movimientos
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div>
      <div className="cinematic-controls">
        <button
          onClick={playCinematic}
          disabled={isPlaying}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          {isPlaying
            ? `Reproduciendo ${currentStep + 1}/${CINEMATIC_SEQUENCE.length}`
            : "Reproducir Secuencia"}
        </button>
      </div>

      <CameraSystem enableControls={!isPlaying} initialPosition={[0, 2, 5]} />
    </div>
  );
}
```

## 🎥 Tipos de Cámara

### Cámara Orbital (Por Defecto)

```tsx
<CameraSystem
  enableControls={true}
  target={[0, 1, 0]} // Punto central de rotación
/>
```

### Cámara de Primera Persona

```tsx
<CameraSystem
  enableControls={true}
  enablePan={true}
  enableZoom={false}
  minPolarAngle={0}
  maxPolarAngle={Math.PI}
/>
```

### Cámara Fija con Auto-rotación

```tsx
<CameraSystem enableControls={false} autoRotate={true} autoRotateSpeed={1.0} />
```

### Cámara de Inspección

```tsx
<CameraSystem
  enableControls={true}
  enablePan={false}
  minDistance={1}
  maxDistance={5}
  target={[0, 0, 0]} // Centro del objeto
/>
```

## 📱 Optimización Móvil

### Controles Táctiles

```tsx
const MobileCameraSystem = () => (
  <CameraSystem
    enableControls={true}
    // Optimizaciones para touch
    enablePan={false} // Evitar conflictos con scroll
    enableZoom={true} // Pinch-to-zoom
    // Sensibilidad reducida
    rotateSpeed={0.3}
    zoomSpeed={0.5}
    // Límites más restrictivos
    minDistance={2}
    maxDistance={8}
    // Auto-rotación suave para demostración
    autoRotate={true}
    autoRotateSpeed={0.2}
  />
);
```

### Detección de Dispositivo

```tsx
import { useEffect, useState } from "react";

const useDeviceOptimization = () => {
  const [deviceConfig, setDeviceConfig] = useState({
    enableControls: true,
    autoRotate: false,
    enablePan: true,
  });

  useEffect(() => {
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

    if (isMobile) {
      setDeviceConfig({
        enableControls: true,
        autoRotate: true,
        enablePan: false,
      });
    } else if (isTablet) {
      setDeviceConfig({
        enableControls: true,
        autoRotate: false,
        enablePan: true,
      });
    }
  }, []);

  return deviceConfig;
};

export default function AdaptiveCamera() {
  const config = useDeviceOptimization();

  return <CameraSystem {...config} />;
}
```

## ⚡ Performance

### Configuración Optimizada

```tsx
<CameraSystem
  // Reducir cálculos innecesarios
  enableDamping={true}
  dampingFactor={0.1}
  // Limitar rate de actualización
  updateFrequency={60} // FPS máximo para controles
  // Deshabilitar funciones pesadas si no se necesitan
  enableAutoRotate={false}
  enablePan={false}
/>
```

### Lazy Loading de Controles

```tsx
import { lazy, Suspense } from "react";

const CameraSystem = lazy(() =>
  import("@/engine").then((m) => ({ default: m.CameraSystem }))
);

export default function LazyCamera() {
  return (
    <Suspense fallback={<div>Cargando controles de cámara...</div>}>
      <CameraSystem />
    </Suspense>
  );
}
```

## 🧪 Testing

```tsx
import { render } from "@testing-library/react";
import { CameraSystem } from "@/engine";

test("should initialize with correct position", () => {
  const initialPosition = [0, 5, 10];

  render(
    <Engine.Canvas>
      <Engine.Core>
        <CameraSystem initialPosition={initialPosition} />
      </Engine.Core>
    </Engine.Canvas>
  );

  // Verificar posición inicial...
});
```

## 🔗 Ver También

- [Sistema de Interacción](./interaction-system.md) - Para interacciones con objetos
- [Sistema de Animación](./animation-system.md) - Para animaciones de cámara
- [Sistema de Debug](./debug-system.md) - Para herramientas de debug de cámara
