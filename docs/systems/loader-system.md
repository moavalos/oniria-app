# 📦 Sistema de Carga (LoaderSystem)

El `LoaderSystem` maneja la carga de assets 3D, texturas y configuraciones, proporcionando feedback visual del progreso de carga.

## 🎯 Propósito

- Cargar assets 3D (modelos GLTF, texturas, etc.)
- Mostrar estados de carga
- Manejar errores de carga
- Proporcionar feedback visual al usuario

## 🛠️ Uso Básico

```tsx
import { LoaderSystem } from '@/engine';

export default function MyViewer() {
  return (
    <div>
      {/* LoaderSystem debe ir FUERA del Engine.Canvas */}
      <LoaderSystem />
      
      <Engine.Canvas>
        <Engine.Core>
          {/* Otros sistemas... */}
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 📋 Props

### `customLoader?: React.ComponentType<LoaderProps>`

Permite usar un componente de loading personalizado.

```tsx
import { LoaderSystem } from '@/engine';

const CustomLoader = ({ progress, isLoading, error }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
    {error ? (
      <div className="text-red-500">Error: {error}</div>
    ) : isLoading ? (
      <div className="text-white">
        <div className="mb-4">Cargando...</div>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mt-2">{Math.round(progress)}%</div>
      </div>
    ) : null}
  </div>
);

<LoaderSystem customLoader={CustomLoader} />
```

### `showProgress?: boolean`
Por defecto: `true`

Controla si se muestra el progreso de carga.

```tsx
<LoaderSystem showProgress={false} />
```

### `timeout?: number`
Por defecto: `30000` (30 segundos)

Tiempo límite para la carga antes de mostrar error.

```tsx
<LoaderSystem timeout={60000} /> {/* 60 segundos */}
```

## 🎨 Estados de Carga

### Estado: Cargando

```tsx
// Loader por defecto muestra:
// - Spinner animado
// - Porcentaje de progreso
// - Texto "Cargando assets..."
```

### Estado: Error

```tsx
// En caso de error muestra:
// - Icono de error
// - Mensaje de error
// - Botón "Reintentar"
```

### Estado: Completado

```tsx
// Cuando termina:
// - Se oculta automáticamente
// - Libera recursos del loader
// - Activa los sistemas del engine
```

## 🎮 Ejemplos de Implementación

### Ejemplo 1: Loader Personalizado con Branding

```tsx
import { LoaderSystem } from '@/engine';

const BrandedLoader = ({ progress, isLoading, error }) => {
  if (!isLoading && !error) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 to-black flex flex-col items-center justify-center">
      <img src="/logo.png" alt="Logo" className="w-32 h-32 mb-8" />
      
      {error ? (
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">
            Error al cargar la experiencia
          </div>
          <div className="text-gray-300 mb-6">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-white text-xl mb-6">
            Preparando experiencia...
          </div>
          
          {/* Barra de progreso circular */}
          <div className="relative w-24 h-24 mb-4">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-600"
              />
              <circle
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${progress * 0.628} 62.8`}
                className="text-purple-400"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
              {Math.round(progress)}%
            </div>
          </div>
          
          <div className="text-gray-300">
            {progress < 30 && "Cargando modelos 3D..."}
            {progress >= 30 && progress < 70 && "Preparando texturas..."}
            {progress >= 70 && "Finalizando..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default function MyApp() {
  return (
    <div>
      <LoaderSystem customLoader={BrandedLoader} />
      {/* ... resto de la app */}
    </div>
  );
}
```

### Ejemplo 2: Loader con Analytics

```tsx
import { useEffect } from 'react';
import { LoaderSystem } from '@/engine';
import { analytics } from '@/lib/analytics';

const AnalyticsLoader = ({ progress, isLoading, error }) => {
  useEffect(() => {
    if (isLoading) {
      analytics.track('3d_loading_started');
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      analytics.track('3d_loading_error', { error });
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && !error && progress === 100) {
      analytics.track('3d_loading_completed', { 
        duration: performance.now() 
      });
    }
  }, [isLoading, error, progress]);

  // Tu UI de loader...
  return (
    <div className="loader">
      {/* ... */}
    </div>
  );
};

<LoaderSystem customLoader={AnalyticsLoader} />
```

### Ejemplo 3: Loader Responsivo

```tsx
const ResponsiveLoader = ({ progress, isLoading, error }) => {
  if (!isLoading && !error) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Desktop/Tablet */}
        <div className="hidden sm:block text-center">
          <div className="text-white text-2xl mb-6">Cargando experiencia 3D</div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-gray-300">{Math.round(progress)}% completado</div>
        </div>

        {/* Mobile */}
        <div className="sm:hidden text-center">
          <div className="text-white text-lg mb-4">Cargando...</div>
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-blue-500"></div>
          </div>
          <div className="text-gray-300 text-sm">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
};
```

### Ejemplo 4: Loader con Preload de Assets

```tsx
import { useEffect, useState } from 'react';
import { LoaderSystem } from '@/engine';

const PreloadLoader = ({ progress, isLoading, error }) => {
  const [preloadComplete, setPreloadComplete] = useState(false);

  useEffect(() => {
    // Precargar assets críticos
    const preloadAssets = async () => {
      try {
        // Precargar imágenes
        const images = ['/hero-bg.jpg', '/logo.png'];
        await Promise.all(
          images.map(src => {
            const img = new Image();
            img.src = src;
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // No fallar por una imagen
            });
          })
        );
        
        setPreloadComplete(true);
      } catch (error) {
        console.warn('Error preloading assets:', error);
        setPreloadComplete(true);
      }
    };

    preloadAssets();
  }, []);

  if (!isLoading && !error) return null;

  return (
    <div className="fixed inset-0">
      {preloadComplete ? (
        <div 
          className="w-full h-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        >
          <div className="bg-black bg-opacity-60 p-8 rounded-lg text-center">
            <div className="text-white text-xl mb-4">
              Preparando experiencia inmersiva
            </div>
            <div className="text-gray-300">
              {Math.round(progress)}% cargado
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="text-white">Inicializando...</div>
        </div>
      )}
    </div>
  );
};
```

## ⚡ Optimización de Carga

### Técnicas de Optimización

1. **Lazy Loading de Assets**
```tsx
// El engine carga assets solo cuando son necesarios
const engine = useEngine();

// Cambiar room trigger carga automática
engine.setRoom("newRoom", "newSkin");
```

2. **Precarga Inteligente**
```tsx
// Precargar rooms siguientes en background
useEffect(() => {
  if (currentRoom === "lobby") {
    // Precargar assets de la siguiente room
    engine.preloadRoom("office");
  }
}, [currentRoom]);
```

3. **Gestión de Memoria**
```tsx
// El sistema limpia automáticamente assets no usados
// Puedes forzar limpieza si es necesario
useEffect(() => {
  return () => {
    engine.cleanupUnusedAssets();
  };
}, []);
```

## 🐛 Manejo de Errores

### Errores Comunes

1. **Modelo no encontrado**
```tsx
// Error: Failed to load model: /models/room.gltf
// Solución: Verificar que el archivo existe y está accesible
```

2. **Textura corrupta**
```tsx
// Error: Texture loading failed
// Solución: Verificar formato y tamaño de texturas
```

3. **Timeout de carga**
```tsx
// Error: Loading timeout exceeded
// Solución: Aumentar timeout o optimizar assets
<LoaderSystem timeout={60000} />
```

### Recuperación de Errores

```tsx
const ErrorBoundaryLoader = ({ progress, isLoading, error }) => {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      window.location.reload();
    } else {
      // Fallback a versión simplificada
      engine.setFallbackMode(true);
    }
  };

  if (error) {
    return (
      <div className="error-loader">
        <h2>Error de carga</h2>
        <p>{error}</p>
        {retryCount < maxRetries ? (
          <button onClick={handleRetry}>
            Reintentar ({maxRetries - retryCount} intentos restantes)
          </button>
        ) : (
          <button onClick={() => engine.setFallbackMode(true)}>
            Continuar en modo simplificado
          </button>
        )}
      </div>
    );
  }

  // ... resto del loader
};
```

## 📱 Consideraciones Móviles

```tsx
const MobileOptimizedLoader = ({ progress, isLoading, error }) => {
  const isMobile = window.innerWidth < 768;
  
  return (
    <div className="loader">
      {isMobile ? (
        // Loader optimizado para móvil
        <div className="mobile-loader">
          <div className="text-sm">Cargando experiencia...</div>
          <div className="simple-progress-bar" />
        </div>
      ) : (
        // Loader completo para desktop
        <div className="desktop-loader">
          {/* Loader con más detalles */}
        </div>
      )}
    </div>
  );
};
```

## 🔗 Ver También

- [Sistema de Debug](./debug-system.md) - Para monitorear el proceso de carga
- [API del Engine](../engine-api.md) - Para métodos de control del engine
- [Performance](../performance.md) - Para optimización de carga