# Sistema de Loading Propio - Oniria Engine

## 🎯 Descripción

Este sistema reemplaza la dependencia de `useProgress` de Drei con un sistema de loading completamente propio y controlable. Ofrece control total sobre cuándo y cómo mostrar el loader.

## 📦 Componentes Principales

### 1. LoaderSystem

Sistema de loading base sin dependencias externas.

```tsx
import LoaderSystem from "@engine/systems/LoaderSystem";

<LoaderSystem
  isLoading={true}
  progress={75}
  error={null}
  onLoadStart={() => console.log("Carga iniciada")}
  onLoadComplete={() => console.log("Carga completada")}
/>;
```

### 2. useThreeLoader

Hook para cargar assets de Three.js con progreso real.

```tsx
import { useThreeLoader } from "@engine/hooks";

const { isLoading, progress, error, loadAssets } = useThreeLoader();

const assets = await loadAssets([
  { url: "/models/oniria.gltf", type: "gltf" },
  { url: "/skins/texture.ktx2", type: "ktx2" },
]);
```

### 3. AssetLoader

Componente que combina LoaderSystem + useThreeLoader.

```tsx
import AssetLoader from "@engine/components/AssetLoader";

<AssetLoader
  assets={[
    { url: "/models/oniria.gltf", type: "gltf" },
    { url: "/skins/oniria_wall.ktx2", type: "ktx2" },
  ]}
  onAssetsLoaded={(assets) => {
    // assets.oniria = modelo GLTF cargado
    // assets.oniria_wall = textura KTX2 cargada
  }}
>
  <YourScene />
</AssetLoader>;
```

### 4. RoomRendererTest

Reemplazo directo del RoomRenderer original con sistema propio.

```tsx
import RoomRendererTest from "@engine/systems/renderer/RoomRendererTest";

// Reemplazar:
// <RoomRenderer />

// Por:
<RoomRendererTest />;
```

## 🚀 Ejemplos de Uso

### Ejemplo 1: RoomRendererTest (Recomendado)

```tsx
import { Engine } from "@engine/Engine";
import RoomRendererTest from "@engine/systems/renderer/RoomRendererTest";
import { DebugSystem } from "@engine/systems";

function App() {
  return (
    <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
      <Engine.Core>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <RoomRendererTest />
        <DebugSystem />
      </Engine.Core>
    </Engine.Canvas>
  );
}
```

### Ejemplo 2: AssetLoader Directo

```tsx
import AssetLoader from "@engine/components/AssetLoader";

function CustomScene() {
  const [loadedAssets, setLoadedAssets] = useState({});

  return (
    <AssetLoader
      assets={[
        { url: "/models/oniria.gltf", type: "gltf" },
        { url: "/skins/oniria_wall.ktx2", type: "ktx2" },
      ]}
      onAssetsLoaded={setLoadedAssets}
    >
      {loadedAssets.oniria && <primitive object={loadedAssets.oniria.scene} />}
    </AssetLoader>
  );
}
```

### Ejemplo 3: Control Manual

```tsx
import { useThreeLoader } from "@engine/hooks";
import LoaderSystem from "@engine/systems/LoaderSystem";

function ManualLoader() {
  const { isLoading, progress, error, loadAssets } = useThreeLoader();

  const handleLoad = async () => {
    const assets = await loadAssets([
      { url: "/models/oniria.gltf", type: "gltf" },
    ]);
    // Hacer algo con los assets
  };

  return (
    <>
      <LoaderSystem isLoading={isLoading} progress={progress} error={error} />
      <button onClick={handleLoad}>Cargar Assets</button>
    </>
  );
}
```

## ✅ Ventajas del Sistema Propio

1. **Control Total**: Tú decides cuándo mostrar/ocultar el loader
2. **Progreso Real**: Basado en la carga real de assets de Three.js
3. **Sin Simulaciones**: No hay progreso falso o simulado
4. **Flexible**: Puedes usar componentes por separado o combinados
5. **Robusto**: Manejo de errores, timeouts y cleanup automático
6. **TypeScript**: Tipado completo para mejor experiencia de desarrollo
7. **Sin Dependencias**: No depende de `useProgress` de Drei

## 🔧 Tipos de Assets Soportados

- `gltf`: Modelos 3D GLTF/GLB
- `texture`: Texturas estándar (JPG, PNG, etc.)
- `ktx2`: Texturas comprimidas KTX2
- `audio`: Archivos de audio
- `binary`: Archivos binarios genéricos

## 📁 Estructura de Archivos

```
src/engine/
├── systems/
│   ├── LoaderSystem.tsx           # Sistema de loading base
│   └── renderer/
│       ├── RoomRenderer.tsx       # Original (no tocar)
│       └── RoomRendererTest.tsx   # Nueva implementación
├── hooks/
│   └── useThreeLoader.ts          # Hook para carga de assets
├── components/
│   └── AssetLoader.tsx            # Componente helper
└── examples/
    ├── RoomTestExample.tsx        # Ejemplo con RoomRendererTest
    └── AssetLoaderExample.tsx     # Ejemplo con AssetLoader
```

## 🎨 Personalización

### Loader Personalizado

```tsx
function MyCustomLoader({ progress, isLoading, error }: LoaderProps) {
  if (!isLoading && !error) return null;

  return (
    <div
      style={
        {
          /* tu estilo */
        }
      }
    >
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div>Cargando... {Math.round(progress)}%</div>
      )}
    </div>
  );
}

<LoaderSystem customLoader={MyCustomLoader} />;
```

### Callbacks Personalizados

```tsx
<LoaderSystem
  isLoading={loading}
  progress={progress}
  onLoadStart={() => console.log("Inicio")}
  onLoadProgress={(p) => console.log(`${p}%`)}
  onLoadComplete={() => console.log("Completado")}
  onLoadError={(err) => console.error("Error:", err)}
/>
```

## 🚀 Migración desde RoomRenderer

Para migrar del RoomRenderer original al nuevo sistema:

1. **Cambiar import:**

```tsx
// ANTES
import RoomRenderer from "@engine/systems/renderer/RoomRenderer";

// DESPUÉS
import RoomRendererTest from "@engine/systems/renderer/RoomRendererTest";
```

2. **Reemplazar componente:**

```tsx
// ANTES
<RoomRenderer />

// DESPUÉS
<RoomRendererTest />
```

3. **¡Listo!** El nuevo sistema maneja automáticamente:
   - Detección de cambios en activeRoom
   - Carga de assets con progreso real
   - Aplicación de materiales
   - Renderizado de escena

## 🐛 Debugging

Todos los componentes incluyen logs detallados para debugging:

```
🎯 LoaderSystem (Propio): { isLoading, progress, error }
🚀 Iniciando carga de assets: [...]
📊 Asset cargando: 45%
✅ Assets cargados: ['oniria', 'oniria_wall']
🏠 Creando room con assets cargados
🎨 Aplicando materiales a la room
```

## 📝 Notas

- El RoomRenderer original se mantiene intacto como backup
- El nuevo sistema es completamente independiente de Drei
- Los logs incluyen emojis para fácil identificación
- Manejo automático de errores y timeouts
- Cleanup automático de recursos al desmontar

¡Ya tienes control total sobre el sistema de loading! 🎉
