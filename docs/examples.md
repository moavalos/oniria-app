# 📚 Ejemplos de Implementación

Esta guía contiene ejemplos prácticos de implementación para diferentes casos de uso con Oniria Engine.

## 🏠 Básico: Visor de Modelo Simple

Implementación mínima para mostrar un modelo 3D.

```tsx
import { Engine } from '@/engine';

export default function SimpleViewer() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Engine.Canvas>
        <Engine.Core>
          <Engine.CameraSystem enableControls={true} />
          <Engine.RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 🎨 Visor con Cambio de Skins

Permite al usuario cambiar entre diferentes variaciones visuales.

```tsx
import { useState } from 'react';
import { Engine, useEngine } from '@/engine';

const AVAILABLE_SKINS = [
  { id: 'default', name: 'Original' },
  { id: 'modern', name: 'Moderno' },
  { id: 'vintage', name: 'Vintage' }
];

export default function SkinViewer() {
  const [selectedSkin, setSelectedSkin] = useState('default');
  
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Controles de UI */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '8px'
      }}>
        <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Seleccionar Estilo:</h3>
        {AVAILABLE_SKINS.map(skin => (
          <button
            key={skin.id}
            onClick={() => setSelectedSkin(skin.id)}
            style={{
              display: 'block',
              width: '100%',
              margin: '5px 0',
              padding: '8px 12px',
              background: selectedSkin === skin.id ? '#007AFF' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {skin.name}
          </button>
        ))}
      </div>

      {/* Engine Canvas */}
      <Engine.Canvas>
        <Engine.Core>
          <SkinController skinId={selectedSkin} />
          <Engine.CameraSystem enableControls={true} />
          <Engine.RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}

// Componente para controlar el skin activo
function SkinController({ skinId }: { skinId: string }) {
  const engine = useEngine();

  useEffect(() => {
    if (engine.isLoaded) {
      engine.setSkin(skinId);
    }
  }, [engine, skinId]);

  return null;
}
```

## 🖱️ Visor Interactivo con Hotspots

Implementa interacciones click/hover sobre objetos específicos.

```tsx
import { useState } from 'react';
import { Engine } from '@/engine';

interface Hotspot {
  objectName: string;
  title: string;
  description: string;
  position?: { x: number; y: number }; // Posición 2D para overlay
}

const HOTSPOTS: Hotspot[] = [
  {
    objectName: 'sofa',
    title: 'Sofá Moderno',
    description: 'Sofá de 3 plazas en cuero sintético de alta calidad.',
    position: { x: 60, y: 40 }
  },
  {
    objectName: 'mesa',
    title: 'Mesa de Centro',
    description: 'Mesa de madera maciza con acabado natural.',
    position: { x: 50, y: 60 }
  }
];

export default function InteractiveViewer() {
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);
  const [clickedObject, setClickedObject] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleObjectHover = (objectName: string | null) => {
    setHoveredObject(objectName);
  };

  const handleObjectClick = (objectName: string) => {
    setClickedObject(objectName);
    setShowInfo(true);
  };

  const currentHotspot = HOTSPOTS.find(h => h.objectName === clickedObject);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Hotspot indicators */}
      {HOTSPOTS.map(hotspot => (
        <div
          key={hotspot.objectName}
          style={{
            position: 'absolute',
            left: `${hotspot.position?.x}%`,
            top: `${hotspot.position?.y}%`,
            width: '20px',
            height: '20px',
            backgroundColor: hoveredObject === hotspot.objectName ? '#ff6b6b' : '#007AFF',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            animation: hoveredObject === hotspot.objectName ? 'pulse 1s infinite' : 'none'
          }}
          onClick={() => handleObjectClick(hotspot.objectName)}
        />
      ))}

      {/* Info panel */}
      {showInfo && currentHotspot && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '300px',
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 20
        }}>
          <button
            onClick={() => setShowInfo(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
            {currentHotspot.title}
          </h3>
          <p style={{ margin: 0, color: '#666', lineHeight: 1.5 }}>
            {currentHotspot.description}
          </p>
        </div>
      )}

      {/* Engine Canvas */}
      <Engine.Canvas>
        <Engine.Core>
          <Engine.InteractionSystem 
            onObjectClick={handleObjectClick}
            onObjectHoverEnter={(obj) => handleObjectHover(obj)}
            onObjectHoverLeave={() => handleObjectHover(null)}
          />
          <Engine.CameraSystem enableControls={true} />
          <Engine.RoomScene />
        </Engine.Core>
      </Engine.Canvas>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}
```

## 📱 Visor Móvil Optimizado

Versión optimizada para dispositivos móviles con controles touch.

```tsx
import { useState, useEffect } from 'react';
import { Engine } from '@/engine';

export default function MobileViewer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const landscape = window.innerWidth > window.innerHeight;
      
      setIsMobile(mobile);
      setIsLandscape(landscape);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  const engineSettings = {
    backgroundColor: "#000000",
    antialias: !isMobile, // Deshabilitar en móvil para mejor performance
    powerPreference: isMobile ? "low-power" : "high-performance"
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      touchAction: 'none' // Prevenir scroll en móvil
    }}>
      {/* Instrucciones para móvil */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          textAlign: 'center',
          zIndex: 10,
          fontSize: '14px'
        }}>
          {isLandscape 
            ? '🔄 Usa un dedo para rotar, dos dedos para zoom'
            : '📱 Rota el dispositivo para mejor experiencia'
          }
        </div>
      )}

      {/* Controls overlay */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10
      }}>
        <MobileControls />
      </div>

      <Engine.Canvas engineSettings={engineSettings}>
        <Engine.Core>
          <Engine.CameraSystem 
            enableControls={true}
            enablePan={!isMobile} // Deshabilitar pan en móvil
            autoRotate={isMobile} // Auto-rotación en móvil
            autoRotateSpeed={0.5}
          />
          <Engine.InteractionSystem 
            enableInteractions={isLandscape} // Solo en landscape
          />
          <Engine.RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}

function MobileControls() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.7)',
          border: 'none',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer'
        }}
      >
        ⚙️
      </button>

      {isExpanded && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '0',
          background: 'rgba(0,0,0,0.8)',
          borderRadius: '8px',
          padding: '10px',
          minWidth: '150px'
        }}>
          <button style={mobileButtonStyle}>🏠 Vista inicial</button>
          <button style={mobileButtonStyle}>🔍 Acercar</button>
          <button style={mobileButtonStyle}>🎨 Cambiar estilo</button>
        </div>
      )}
    </div>
  );
}

const mobileButtonStyle = {
  display: 'block',
  width: '100%',
  margin: '5px 0',
  padding: '8px 12px',
  background: 'transparent',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};
```

## 🎮 Visor con Control de Cámara Avanzado

Implementa controles de cámara personalizados con puntos de vista predefinidos.

```tsx
import { useState } from 'react';
import { Engine, useEngine } from '@/engine';

interface CameraPreset {
  id: string;
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  icon: string;
}

const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'overview',
    name: 'Vista General',
    position: [5, 5, 5],
    target: [0, 0, 0],
    icon: '🏠'
  },
  {
    id: 'living',
    name: 'Sala',
    position: [2, 1.8, 3],
    target: [0, 1, 0],
    icon: '🛋️'
  },
  {
    id: 'kitchen',
    name: 'Cocina',
    position: [-2, 1.8, 2],
    target: [-1, 1, 0],
    icon: '🍳'
  },
  {
    id: 'bedroom',
    name: 'Dormitorio',
    position: [3, 1.8, -2],
    target: [2, 1, -1],
    icon: '🛏️'
  }
];

export default function AdvancedCameraViewer() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Camera controls */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        background: 'rgba(0,0,0,0.8)',
        borderRadius: '12px',
        padding: '15px'
      }}>
        <h3 style={{ color: 'white', margin: '0 0 15px 0', fontSize: '16px' }}>
          Puntos de Vista
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CAMERA_PRESETS.map(preset => (
            <CameraPresetButton 
              key={preset.id}
              preset={preset}
              isSelected={selectedPreset === preset.id}
              isAnimating={isAnimating}
              onSelect={(presetId) => {
                setSelectedPreset(presetId);
                setIsAnimating(true);
                // Reset animation state after transition
                setTimeout(() => setIsAnimating(false), 1500);
              }}
            />
          ))}
        </div>

        {/* Manual controls */}
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <h4 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '14px' }}>
            Control Manual
          </h4>
          <ManualCameraControls />
        </div>
      </div>

      {/* Animation indicator */}
      {isAnimating && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          zIndex: 20,
          fontSize: '14px'
        }}>
          🎥 Moviendo cámara...
        </div>
      )}

      <Engine.Canvas>
        <Engine.Core>
          <CameraController presets={CAMERA_PRESETS} selectedPreset={selectedPreset} />
          <Engine.CameraSystem enableControls={!isAnimating} />
          <Engine.InteractionSystem />
          <Engine.RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}

function CameraPresetButton({ 
  preset, 
  isSelected, 
  isAnimating, 
  onSelect 
}: {
  preset: CameraPreset;
  isSelected: boolean;
  isAnimating: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(preset.id)}
      disabled={isAnimating}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 15px',
        background: isSelected ? '#007AFF' : 'rgba(255,255,255,0.1)',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        cursor: isAnimating ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        opacity: isAnimating ? 0.6 : 1,
        minWidth: '140px'
      }}
    >
      <span style={{ fontSize: '18px' }}>{preset.icon}</span>
      <span style={{ fontSize: '14px' }}>{preset.name}</span>
    </button>
  );
}

function ManualCameraControls() {
  const engine = useEngine();

  const actions = [
    { icon: '⬆️', action: () => engine.moveCamera('up'), label: 'Subir' },
    { icon: '⬇️', action: () => engine.moveCamera('down'), label: 'Bajar' },
    { icon: '🔄', action: () => engine.resetCamera(), label: 'Reset' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.action}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          <span>{action.icon}</span>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}

function CameraController({ 
  presets, 
  selectedPreset 
}: { 
  presets: CameraPreset[]; 
  selectedPreset: string | null; 
}) {
  const engine = useEngine();

  useEffect(() => {
    if (selectedPreset && engine.isLoaded) {
      const preset = presets.find(p => p.id === selectedPreset);
      if (preset) {
        engine.setCameraPosition(preset.position, preset.target, { 
          animated: true,
          duration: 1500
        });
      }
    }
  }, [selectedPreset, engine, presets]);

  return null;
}
```

## 🎛️ Visor con Debug y Desarrollo

Implementación con herramientas de debug integradas para desarrollo.

```tsx
import { useState } from 'react';
import { Engine } from '@/engine';

export default function DebugViewer() {
  const [debugMode, setDebugMode] = useState(false);
  const [debugPanels, setDebugPanels] = useState({
    engine: true,
    camera: true,
    interaction: false,
    performance: true,
    scene: false,
    animation: false
  });

  const togglePanel = (panel: keyof typeof debugPanels) => {
    setDebugPanels(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Debug toggle */}
      <button
        onClick={() => setDebugMode(!debugMode)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 30,
          padding: '10px 15px',
          background: debugMode ? '#ff6b6b' : '#333',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {debugMode ? '🔧 DEBUG ON' : '⚙️ DEBUG OFF'}
      </button>

      {/* Debug panel selector */}
      {debugMode && (
        <div style={{
          position: 'absolute',
          top: '70px',
          right: '20px',
          zIndex: 25,
          background: 'rgba(0,0,0,0.9)',
          padding: '15px',
          borderRadius: '8px',
          maxWidth: '200px'
        }}>
          <h4 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '14px' }}>
            Paneles Debug
          </h4>
          
          {Object.entries(debugPanels).map(([panel, enabled]) => (
            <label
              key={panel}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '5px 0',
                color: 'white',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => togglePanel(panel as keyof typeof debugPanels)}
                style={{ margin: 0 }}
              />
              <span style={{ textTransform: 'capitalize' }}>{panel}</span>
            </label>
          ))}
        </div>
      )}

      {/* Performance overlay */}
      <PerformanceMonitor enabled={debugMode && debugPanels.performance} />

      <Engine.Canvas>
        <Engine.Core>
          {/* Debug system solo en modo debug */}
          {debugMode && (
            <Engine.DebugSystem 
              enabled={true}
              panels={debugPanels}
            />
          )}
          
          <Engine.CameraSystem enableControls={true} />
          <Engine.InteractionSystem />
          <Engine.RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}

function PerformanceMonitor({ enabled }: { enabled: boolean }) {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    frameTime: 0
  });

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();

    const updateMetrics = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastTime;
      
      frameCount++;

      if (frameCount >= 30) { // Update every 30 frames
        const fps = Math.round(1000 / frameTime);
        const memory = (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0;

        setMetrics({
          fps,
          memory: Math.round(memory),
          frameTime: Math.round(frameTime)
        });

        frameCount = 0;
      }

      lastTime = currentTime;
      
      if (enabled) {
        requestAnimationFrame(updateMetrics);
      }
    };

    updateMetrics();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      zIndex: 20,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '6px',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {metrics.memory}MB</div>
      <div>Frame: {metrics.frameTime}ms</div>
    </div>
  );
}
```

## 🎬 Visor con Animaciones Automáticas

Implementa animaciones y transiciones automáticas para crear experiencias cinematográficas.

```tsx
import { useState, useEffect } from 'react';
import { Engine, useEngine } from '@/engine';

interface AnimationSequence {
  id: string;
  name: string;
  steps: AnimationStep[];
  duration: number;
}

interface AnimationStep {
  camera?: {
    position: [number, number, number];
    target: [number, number, number];
  };
  skin?: string;
  object?: string;
  duration: number;
  delay?: number;
}

const ANIMATION_SEQUENCES: AnimationSequence[] = [
  {
    id: 'tour',
    name: 'Tour Virtual',
    duration: 20000,
    steps: [
      {
        camera: { position: [5, 5, 5], target: [0, 0, 0] },
        duration: 3000
      },
      {
        camera: { position: [2, 2, 3], target: [0, 1, 0] },
        object: 'sofa',
        duration: 4000,
        delay: 500
      },
      {
        skin: 'modern',
        duration: 2000,
        delay: 1000
      },
      {
        camera: { position: [-2, 2, 2], target: [-1, 1, 0] },
        duration: 4000
      },
      {
        camera: { position: [0, 6, 0], target: [0, 0, 0] },
        duration: 3000
      }
    ]
  },
  {
    id: 'focus',
    name: 'Enfoque Productos',
    duration: 15000,
    steps: [
      {
        camera: { position: [3, 1.5, 2], target: [0, 1, 0] },
        object: 'sofa',
        duration: 5000
      },
      {
        skin: 'vintage',
        duration: 2000
      },
      {
        camera: { position: [1, 1.5, 2], target: [-1, 1, 0] },
        object: 'mesa',
        duration: 5000
      },
      {
        camera: { position: [5, 5, 5], target: [0, 0, 0] },
        duration: 3000
      }
    ]
  }
];

export default function CinematicViewer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Animation controls */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        background: 'rgba(0,0,0,0.8)',
        borderRadius: '25px',
        padding: '15px 25px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        {/* Sequence selector */}
        <select
          value={currentSequence || ''}
          onChange={(e) => setCurrentSequence(e.target.value || null)}
          disabled={isPlaying}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '6px',
            color: 'white',
            padding: '6px 10px',
            fontSize: '14px'
          }}
        >
          <option value="">Seleccionar animación</option>
          {ANIMATION_SEQUENCES.map(seq => (
            <option key={seq.id} value={seq.id}>
              {seq.name}
            </option>
          ))}
        </select>

        {/* Play/Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={!currentSequence}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: !currentSequence ? '#666' : (isPlaying ? '#ff6b6b' : '#007AFF'),
            border: 'none',
            color: 'white',
            cursor: !currentSequence ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Progress bar */}
        {currentSequence && (
          <div style={{
            width: '200px',
            height: '4px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: '#007AFF',
              borderRadius: '2px',
              transition: 'width 0.1s ease'
            }} />
          </div>
        )}

        {/* Time display */}
        {currentSequence && (
          <span style={{ color: 'white', fontSize: '12px', fontFamily: 'monospace' }}>
            {formatTime(progress / 100 * (ANIMATION_SEQUENCES.find(s => s.id === currentSequence)?.duration || 0))} / {' '}
            {formatTime(ANIMATION_SEQUENCES.find(s => s.id === currentSequence)?.duration || 0)}
          </span>
        )}
      </div>

      <Engine.Canvas>
        <Engine.Core>
          <AnimationController 
            sequence={currentSequence ? ANIMATION_SEQUENCES.find(s => s.id === currentSequence) : null}
            isPlaying={isPlaying}
            onProgress={setProgress}
            onComplete={() => setIsPlaying(false)}
          />
          <Engine.CameraSystem enableControls={!isPlaying} />
          <Engine.InteractionSystem enableInteractions={!isPlaying} />
          <Engine.RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}

function AnimationController({ 
  sequence, 
  isPlaying, 
  onProgress, 
  onComplete 
}: {
  sequence: AnimationSequence | null;
  isPlaying: boolean;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}) {
  const engine = useEngine();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!sequence || !isPlaying || !engine.isLoaded) {
      setStartTime(null);
      return;
    }

    setStartTime(Date.now());
    setCurrentStepIndex(0);
  }, [sequence, isPlaying, engine.isLoaded]);

  useEffect(() => {
    if (!sequence || !isPlaying || startTime === null) {
      return;
    }

    const updateAnimation = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / sequence.duration) * 100, 100);
      
      onProgress(progress);

      // Check if animation is complete
      if (elapsed >= sequence.duration) {
        onComplete();
        return;
      }

      // Execute animation steps
      let timeOffset = 0;
      for (let i = 0; i < sequence.steps.length; i++) {
        const step = sequence.steps[i];
        const stepStart = timeOffset + (step.delay || 0);
        const stepEnd = stepStart + step.duration;

        if (elapsed >= stepStart && elapsed < stepEnd && i >= currentStepIndex) {
          executeAnimationStep(step);
          setCurrentStepIndex(i + 1);
          break;
        }

        timeOffset += step.duration + (step.delay || 0);
      }

      requestAnimationFrame(updateAnimation);
    };

    updateAnimation();
  }, [sequence, isPlaying, startTime, currentStepIndex]);

  const executeAnimationStep = (step: AnimationStep) => {
    if (step.camera) {
      engine.setCameraPosition(step.camera.position, step.camera.target, {
        animated: true,
        duration: step.duration
      });
    }

    if (step.skin) {
      engine.setSkin(step.skin);
    }

    if (step.object) {
      engine.focusObject(step.object);
    }
  };

  return null;
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
```

## 🔗 Más Ejemplos

### Integración con Frameworks

- **Next.js**: [Ver ejemplo de SSR](./integrations/nextjs.md)
- **Vite**: [Ver configuración de Vite](./integrations/vite.md)
- **Gatsby**: [Ver ejemplo de SSG](./integrations/gatsby.md)

### Casos de Uso Específicos

- **E-commerce**: [Configurador de productos](./use-cases/ecommerce.md)
- **Real Estate**: [Tours virtuales](./use-cases/real-estate.md)
- **Portfolio**: [Presentación de trabajos](./use-cases/portfolio.md)

### Optimizaciones

- **Performance**: [Ver guía completa](./performance.md)
- **Mobile**: [Optimizaciones móviles](./mobile-optimization.md)
- **Loading**: [Estrategias de carga](./loading-strategies.md)

## 🔗 Ver También

- [API del Engine](./engine-api.md) - Referencia completa de API
- [Guía de Inicio Rápido](./quick-start.md) - Configuración básica
- [Sistemas](./systems/) - Documentación de sistemas individuales
- [Troubleshooting](./troubleshooting.md) - Solución de problemas