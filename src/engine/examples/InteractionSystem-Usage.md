# InteractionSystem y InteractionService - Guía de Uso

## Visión General

El `InteractionSystem` y `InteractionService` han sido refactorizados siguiendo el patrón configurable establecido, permitiendo control completo desde la UI y gestión avanzada de interacciones con objetos 3D.

## Características Principales

### InteractionSystem Configurable

- **Props-based Configuration**: Configuración completa desde la UI mediante props
- **Event Callbacks**: Callbacks para eventos de interacción (hover enter/leave, click)
- **Raycasting Configurable**: Control de capas, habilitación/deshabilitación
- **Debug Mode**: Modo debug configurable para desarrollo
- **State Tracking**: Seguimiento de objetos en hover y cambios de estado

### InteractionService Mejorado

- **Event Callbacks**: Soporte para callbacks configurables de eventos
- **Raycasting Avanzado**: Filtrado por capas, control de habilitación
- **Estado Observable**: Métodos para obtener objetos en hover y estado actual
- **Debug Features**: Logging configurable para desarrollo
- **Gestión de Estado**: Cache de objetos interactuables y estado de hover

## Uso desde la UI

### Básico

```tsx
<InteractionSystem
  config={{
    enableRaycasting: true,
    raycastingLayers: [0, 1], // Solo capas 0 y 1
    debugMode: true,
  }}
  onHoverEnter={(objectName, event) => console.log("Hover:", objectName)}
  onHoverLeave={(objectName, event) => console.log("Leave:", objectName)}
  onClick={(objectName, event) => console.log("Click:", objectName)}
  onInteractionStateChange={(hoveredObjects) =>
    console.log("Hovering:", hoveredObjects)
  }
  enableInteractions={true}
  autoConfigureForRoom={true}
  showDebugControls={true}
/>
```

### Avanzado - Control Programático

```tsx
// Acceso directo al servicio
const interactionService = core.getInteractionService();

// Verificar estado
const hoveredObjects = interactionService.getHoveredObjects();
console.log("Objetos en hover:", hoveredObjects);

if (interactionService.isObjectHovered("my_object")) {
  console.log("my_object está siendo hover");
}

// Configuración dinámica
interactionService.setRaycastingEnabled(false); // Desactivar raycasting
interactionService.setDebugMode(true); // Activar debug
interactionService.setRaycastingLayers([0, 2]); // Solo capas 0 y 2

// Gestión de objetos interactuables
const currentInteractables = interactionService.getInteractableObjects();
interactionService.updateInteractables({
  new_object: [
    {
      type: "function",
      action: [
        /* acciones */
      ],
    },
  ],
});

// Limpiar estado
interactionService.clearHovered(); // Limpiar objetos en hover
```

## Interfaces Exportadas

```typescript
export interface InteractionConfig {
  interactions?: Record<string, ObjectEventArray>;
  enableRaycasting?: boolean;
  raycastingLayers?: number[];
  debugMode?: boolean;
}

export interface InteractionSystemProps {
  config?: InteractionConfig;
  onHoverEnter?: (objectName: string, event: ObjectEvent) => void;
  onHoverLeave?: (objectName: string, event: ObjectEvent) => void;
  onClick?: (objectName: string, event: ObjectEvent) => void;
  onInteractionStateChange?: (hoveredObjects: string[]) => void;
  enableInteractions?: boolean;
  autoConfigureForRoom?: boolean;
  showDebugControls?: boolean;
}
```

## API del InteractionService

### Métodos de Configuración

```typescript
// Configuración de raycasting
setRaycastingEnabled(enabled: boolean): void
setRaycastingLayers(layers: number[]): void
setDebugMode(enabled: boolean): void

// Configuración de callbacks
setOnHoverEnter(callback?: InteractionCallback): void
setOnHoverLeave(callback?: InteractionCallback): void
setOnClick(callback?: InteractionCallback): void
setOnStateChange(callback?: StateChangeCallback): void
```

### Métodos de Estado

```typescript
// Información de estado
getHoveredObjects(): string[]
isObjectHovered(objectName: string): boolean
getInteractableObjects(): Record<string, ObjectEventArray>

// Gestión de objetos
updateInteractables(interactables: Record<string, ObjectEventArray>): void
clearHovered(): void
```

## Características Avanzadas

### 1. **Filtrado por Capas**

```tsx
<InteractionSystem
  config={{
    raycastingLayers: [0, 1, 2], // Solo detectar objetos en estas capas
    enableRaycasting: true,
  }}
/>
```

### 2. **Callbacks de Estado**

```tsx
const handleStateChange = (hoveredObjects: string[]) => {
  // Actualizar UI basada en objetos en hover
  setUIState({ hoveredCount: hoveredObjects.length });
};

<InteractionSystem onInteractionStateChange={handleStateChange} />;
```

### 3. **Modo Debug**

```tsx
<InteractionSystem
  config={{ debugMode: true }}
  showDebugControls={true} // Muestra controles de Leva
/>
```

### 4. **Configuración Híbrida**

```tsx
<InteractionSystem
  config={{
    interactions: {
      // Interacciones personalizadas
      custom_object: [
        /* eventos personalizados */
      ],
    },
  }}
  autoConfigureForRoom={true} // + interacciones de la habitación
/>
```

## Beneficios del Nuevo Patrón

1. **UI Configurable**: Sistema completamente configurable desde la UI
2. **Eventos Granulares**: Callbacks específicos para cada tipo de interacción
3. **Control de Rendimiento**: Filtrado por capas para optimizar raycasting
4. **Estado Observable**: Acceso completo al estado de interacciones
5. **Debug Integrado**: Herramientas de debug configurables
6. **Flexibilidad Total**: Configuración automática + override manual
7. **Tipado Completo**: TypeScript para desarrollo seguro

## Migración desde Versión Anterior

**Antes:**

```tsx
<InteractionSystem />
```

**Ahora:**

```tsx
<InteractionSystem
  autoConfigureForRoom={true} // Comportamiento anterior
  enableInteractions={true}
  showDebugControls={true}
/>
```

El sistema mantiene compatibilidad con el comportamiento anterior cuando se usa `autoConfigureForRoom={true}`.
