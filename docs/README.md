# Oniria Engine - Documentación para Desarrolladores UI

Esta documentación está dirigida a desarrolladores que implementarán la interfaz de usuario utilizando el motor de renderizado Oniria Engine.

## 📋 Tabla de Contenido

### Guías Principales
- [🚀 Guía de Inicio Rápido](./quick-start.md)
- [⚙️ Configuración del Engine](./engine-setup.md)
- [🎮 API del Engine](./engine-api.md)

### Sistemas
- [📦 Sistema de Carga (LoaderSystem)](./systems/loader-system.md)
- [📷 Sistema de Cámara (CameraSystem)](./systems/camera-system.md)
- [🎬 Sistema de Animación (AnimationSystem)](./systems/animation-system.md)
- [🎯 Sistema de Interacción (InteractionSystem)](./systems/interaction-system.md)
- [🌍 Escena de Room (RoomScene)](./systems/room-scene.md)
- [🔧 Sistema de Debug (DebugSystem)](./systems/debug-system.md)

### Avanzado
- [🏗️ Arquitectura del Engine](./architecture.md)
- [🔌 Hooks Disponibles](./hooks.md)
- [📊 Gestión de Estado](./state-management.md)
- [🚀 Optimización y Performance](./performance.md)
- [🐛 Solución de Problemas](./troubleshooting.md)

## 🎯 Principios de Diseño

El Oniria Engine está diseñado con los siguientes principios:

1. **Encapsulación**: Los servicios internos están encapsulados y solo se exponen através de APIs públicas
2. **Composición**: Sistema modular basado en componentes que se pueden combinar según las necesidades
3. **Declarativo**: Configuración simple y declarativa para casos de uso comunes
4. **Extensible**: Permite personalización avanzada cuando es necesario
5. **Type-Safe**: TypeScript completo para mejor desarrollo y menor errores

## 🚦 Flujo Básico de Implementación

```tsx
import { 
  Engine, 
  useEngine, 
  LoaderSystem,
  CameraSystem,
  AnimationSystem,
  InteractionSystem,
  RoomScene,
  DebugSystem 
} from '@/engine';

export default function MyApp() {
  const engine = useEngine();

  // 1. Configurar room y skin
  useEffect(() => {
    engine.setRoom("myRoom", "mySkin");
  }, []);

  return (
    <div>
      {/* 2. Agregar sistemas necesarios fuera del Canvas */}
      <LoaderSystem />
      <DebugSystem enabled={isDev} />
      
      {/* 3. Configurar Canvas del Engine */}
      <Engine.Canvas engineSettings={{ backgroundColor: "#000000" }}>
        <Engine.Core>
          {/* 4. Agregar sistemas internos */}
          <InteractionSystem />
          <AnimationSystem />
          <CameraSystem />
          <RoomScene />
        </Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## 🛡️ Reglas de Uso

### ✅ Permitido para Desarrolladores UI
- Usar `useEngine()` para interactuar con el engine
- Usar todos los sistemas exportados (`LoaderSystem`, `CameraSystem`, etc.)
- Configurar sistemas através de props
- Usar hooks públicos como `useEngine()`

### ❌ No Permitido para Desarrolladores UI
- Usar `useEngineCore()` (es interno del engine)
- Importar servicios directamente (`CameraService`, `InteractionService`, etc.)
- Acceder al store interno `useEngineStore`
- Modificar configuraciones internas del engine

## 🔗 Links Útiles

- [Repositorio del Proyecto](https://github.com/PedroOsnaghi/oniria-app)
- [Ejemplos de Implementación](./examples/)
- [Changelog](./changelog.md)

---

Para comenzar, lee la [Guía de Inicio Rápido](./quick-start.md) y luego explora los sistemas específicos que necesites implementar.