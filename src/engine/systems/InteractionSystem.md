# InteractionSystem con Props Configurables

## Resumen de Implementación

Hemos extendido el `InteractionSystem` para que soporte eventos personalizados a través de props, permitiendo que los usuarios ejecuten funciones personalizadas en cada evento de interacción.

## Cambios Realizados

### 1. InteractionService.ts

- ✅ Agregados tipos para callbacks: `InteractionCallback` y `StateChangeCallback`
- ✅ Agregadas propiedades privadas para callbacks personalizados
- ✅ Implementados métodos setter: `setOnHoverEnter`, `setOnHoverLeave`, `setOnClick`, `setOnStateChange`
- ✅ Modificado `handleEvent` para ejecutar tanto EventEmitter como callbacks personalizados
- ✅ Soporte dual: mantiene el sistema original + callbacks nuevos

### 2. InteractionSystem.tsx

- ✅ Agregada interfaz `InteractionSystemProps` con todas las opciones
- ✅ Props para eventos: `onObjectHoverEnter`, `onObjectHoverLeave`, `onObjectClick`, `onInteractionStateChange`
- ✅ Props de configuración: `enableInteractions`, `enableDebugControls`, `debugControlsConfig`
- ✅ useEffect para configurar callbacks en el InteractionService
- ✅ Limpieza automática de callbacks al desmontar
- ✅ Controles de debug condicionales

## Interfaz de Props

```typescript
interface InteractionSystemProps {
  // Event callbacks
  onObjectHoverEnter?: (objectName: string, events: ObjectEventArray) => void;
  onObjectHoverLeave?: (objectName: string, events: ObjectEventArray) => void;
  onObjectClick?: (objectName: string, events: ObjectEventArray) => void;
  onInteractionStateChange?: (state: any) => void;

  // Configuration
  enableInteractions?: boolean;
  enableDebugControls?: boolean;
  debugControlsConfig?: {
    showPortalControls?: boolean;
    showCameraControls?: boolean;
  };
}
```

## Uso Básico

```tsx
<InteractionSystem
  onObjectHoverEnter={(objectName, events) => {
    console.log(`Mouse entró a: ${objectName}`, events);
    // Tu lógica personalizada aquí
  }}
  onObjectClick={(objectName, events) => {
    console.log(`Click en: ${objectName}`, events);
    // Tu lógica personalizada aquí
  }}
  enableInteractions={true}
/>
```

## Casos de Uso

1. **Tooltips dinámicos**: Mostrar información cuando el mouse entra/sale
2. **Efectos visuales**: Activar highlights, cambios de material, etc.
3. **Navegación**: Cambiar vistas o cámaras al hacer click
4. **UI interactiva**: Actualizar estado de React, mostrar modales
5. **Analytics**: Trackear interacciones del usuario
6. **Sonidos**: Reproducir audio en eventos específicos

## Arquitectura Dual

El sistema mantiene **compatibilidad completa** con el comportamiento anterior:

- **EventEmitter**: Sigue funcionando para las animaciones automáticas de las salas
- **Callbacks personalizados**: Nuevas funciones ejecutadas por el usuario

Esto permite que:

- Las animaciones definidas en `room.json` funcionen automáticamente
- Los usuarios agreguen lógica personalizada sin romper lo existente
- Se puedan combinar ambos comportamientos

## Próximos Pasos

1. **Sistema de Debug**: Implementar controles Leva modulares
2. **Optimizaciones**: Performance del sistema de raycasting
3. **Más eventos**: Drag, double-click, etc.
4. **Documentación**: Guías de uso más detalladas

## Archivos Modificados

- ✅ `src/engine/core/InteractionService.ts`
- ✅ `src/engine/systems/InteractionSystem.tsx`
- ✅ `src/engine/systems/InteractionSystem.example.tsx` (nuevo)
