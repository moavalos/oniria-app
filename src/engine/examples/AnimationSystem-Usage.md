# AnimationSystem y AnimationService - Guía de Uso

## Visión General

El `AnimationSystem` y `AnimationService` han sido refactorizados siguiendo el patrón configurable del `CameraSystem`, permitiendo mayor flexibilidad y control desde la UI.

## Características Principales

### AnimationSystem Configurable

- **Props-based Configuration**: Se puede configurar desde la UI mediante props
- **Event Callbacks**: Callbacks para eventos de animación (start, complete, update)
- **Autoconfiguración**: Carga automática de animaciones desde la habitación
- **Control Granular**: Habilitar/deshabilitar animaciones, autoplay, etc.

### AnimationService Mejorado

- **Event Callbacks**: Soporte para callbacks de eventos de animación
- **Control de Animaciones**: Pausar, reanudar, obtener progreso
- **Información de Estado**: Verificar qué animaciones están activas
- **Gestión Avanzada**: Control individual y grupal de animaciones

## Uso desde la UI

### Básico

```tsx
<AnimationSystem
  config={{
    animations: {
      my_object: {
        target: "my_object",
        type: "rotate",
        loop: true,
        params: { axis: [0, 1, 0], to: 360, duration: 3 },
      },
    },
    autoPlay: true,
  }}
  onAnimationStart={(target, type) => console.log("Started:", target, type)}
  onAnimationComplete={(target, type) =>
    console.log("Completed:", target, type)
  }
  enableAnimations={true}
  autoConfigureForRoom={true}
/>
```

### Avanzado

```tsx
// Control manual de animaciones
const animationService = core.getAnimationService();

// Verificar estado
if (animationService.isAnimating("my_object")) {
  const progress = animationService.getAnimationProgress("my_object");
  console.log(`Progreso: ${progress * 100}%`);
}

// Control de reproducción
animationService.pauseAnimation("my_object");
animationService.resumeAnimation("my_object");
animationService.pauseAll();
animationService.resumeAll();

// Obtener animaciones activas
const activeAnimations = animationService.getActiveAnimations();
console.log("Animaciones activas:", activeAnimations);
```

## Interfaces Exportadas

```typescript
export interface AnimationConfig {
  animations?: Record<string, AnimationAction>;
  autoPlay?: boolean;
  playOnMount?: boolean;
}

export interface AnimationSystemProps {
  config?: AnimationConfig;
  onAnimationStart?: (targetName: string, animationType: string) => void;
  onAnimationComplete?: (targetName: string, animationType: string) => void;
  onAnimationUpdate?: (targetName: string, progress: number) => void;
  enableAnimations?: boolean;
  autoConfigureForRoom?: boolean;
}
```

## Beneficios del Nuevo Patrón

1. **UI Configurable**: Se puede agregar a la escena desde la UI con configuración dinámica
2. **Inyección de Eventos**: Funciones de callback se pueden pasar por props
3. **Flexibilidad Total**: Configuración automática desde habitación + override manual
4. **Control Granular**: Pausar, reanudar, obtener progreso de animaciones individuales
5. **Tipado Completo**: TypeScript para desarrollo seguro
6. **Separación de Responsabilidades**: Sistema configurable vs servicio core

## Migración desde Versión Anterior

**Antes:**

```tsx
<AnimationSystem />
```

**Ahora:**

```tsx
<AnimationSystem
  autoConfigureForRoom={true} // Comportamiento anterior
  enableAnimations={true}
/>
```

El sistema mantiene compatibilidad con el comportamiento anterior cuando se usa `autoConfigureForRoom={true}`.
