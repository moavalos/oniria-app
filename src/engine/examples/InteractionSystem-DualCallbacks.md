# Sistema Dual de Callbacks en InteractionSystem

## Visión General

El `InteractionSystem` ahora implementa un **sistema dual de callbacks** que proporciona tanto la funcionalidad automática original como la nueva configurabilidad desde la UI.

## Arquitectura de Eventos

### 1. **Eventos Automáticos de Animación** (Legacy)

Estos eventos se ejecutan automáticamente cuando hay interacciones configuradas en la `room.json`:

```tsx
// Manejados internamente por useHandlers
const { onEnter, onLeave, onClick: onClickHandler } = useHandlers();

// Conectados al EventEmitter legacy
interactionService.on("hoverEnter", onEnter);
interactionService.on("hoverLeave", onLeave);
interactionService.on("click", onClickHandler);
```

**Funcionalidad:**

- Lee la configuración de `room.json`
- Ejecuta automáticamente animaciones basadas en `action.on` (hoverEnter, hoverLeave, click)
- Maneja cursors automáticamente
- Compatible con la configuración existente

### 2. **Callbacks Configurables desde UI** (Nuevo)

Estos callbacks se pasan como props y se ejecutan junto con los automáticos:

```tsx
<InteractionSystem
  onHoverEnter={(objectName, event) => {
    // Lógica personalizada desde la UI
    console.log("Hover en:", objectName);
  }}
  onClick={(objectName, event) => {
    // Lógica personalizada desde la UI
    handleCustomClick(objectName, event);
  }}
/>
```

## Flujo de Ejecución

Cuando ocurre una interacción:

1. **InteractionService detecta la interacción** (raycasting)
2. **Se ejecutan AMBOS sistemas en paralelo:**
   - **Sistema Legacy**: `useHandlers` ejecuta animaciones automáticas de la configuración
   - **Sistema Configurable**: Se ejecutan los callbacks pasados por props
3. **EventEmitter y nuevos callbacks coexisten**

## Ejemplo de Configuración Completa

### room.json (Configuración Automática)

```json
{
  "objects": {
    "button": {
      "interceptable": true,
      "event": [
        {
          "type": "animation",
          "action": [
            {
              "target": "button",
              "type": "rotate",
              "on": "click",
              "params": { "to": 45, "duration": 0.5 }
            }
          ]
        }
      ]
    }
  }
}
```

### InteractionSystem (UI Personalizada)

```tsx
<InteractionSystem
  // Callbacks personalizados que se ejecutan ADEMÁS de los automáticos
  onHoverEnter={(objectName, event) => {
    // UI feedback personalizado
    setHoveredObject(objectName);
    showTooltip(objectName);
  }}
  onClick={(objectName, event) => {
    // Lógica de negocio personalizada
    analytics.track("object_clicked", { object: objectName });
    updateGameState(objectName);
  }}
  // Configuración del sistema
  autoConfigureForRoom={true} // Cargar eventos automáticos de room.json
  enableInteractions={true}
/>
```

## Beneficios del Sistema Dual

### ✅ **Compatibilidad Total**

- Las configuraciones existentes en `room.json` siguen funcionando sin cambios
- No se requiere migración de contenido existente

### ✅ **Flexibilidad Máxima**

- Permite agregar lógica personalizada desde la UI
- Los callbacks son opcionales y se ejecutan junto con los automáticos

### ✅ **Separación de Responsabilidades**

- **useHandlers**: Maneja animaciones automáticas basadas en configuración
- **Props callbacks**: Maneja lógica de UI y negocio personalizada

### ✅ **Debugging Mejorado**

- Los eventos automáticos siguen el flujo legacy conocido
- Los eventos personalizados se pueden debuggear independientemente

## Casos de Uso

### 1. **Solo Eventos Automáticos** (Comportamiento Original)

```tsx
<InteractionSystem autoConfigureForRoom={true} />
```

### 2. **Solo Eventos Personalizados**

```tsx
<InteractionSystem
  autoConfigureForRoom={false}
  onHoverEnter={customHoverHandler}
  onClick={customClickHandler}
/>
```

### 3. **Híbrido** (Recomendado)

```tsx
<InteractionSystem
  autoConfigureForRoom={true} // Animaciones automáticas
  onHoverEnter={customHoverHandler} // + lógica personalizada
  onClick={customClickHandler}
/>
```

## Migración y Compatibilidad

### Para Desarrolladores

- **Sin cambios requeridos**: El comportamiento original se mantiene por defecto
- **Opciones adicionales**: Se pueden agregar callbacks personalizados cuando sea necesario

### Para Diseñadores de Contenido

- **room.json sigue funcionando**: No se requieren cambios en las configuraciones existentes
- **Nuevas posibilidades**: Se pueden crear interacciones más complejas combinando ambos sistemas

## Debugging

### Eventos Automáticos

```javascript
// Los logs de useHandlers siguen funcionando
console.log("ejecutando animación:", action);
```

### Eventos Personalizados

```tsx
<InteractionSystem
  onHoverEnter={(objectName, event) => {
    console.log("🎯 Hover personalizado:", objectName, event);
  }}
/>
```

Este sistema dual garantiza **máxima compatibilidad** con el código existente mientras proporciona **máxima flexibilidad** para nuevas implementaciones.
