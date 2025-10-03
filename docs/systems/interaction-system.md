# 🎯 Sistema de Interacción (InteractionSystem)

El `InteractionSystem` maneja la detección y respuesta a interacciones del usuario con objetos 3D en la escena.

## 🎯 Propósito

- Detectar hover/click en objetos interactuables
- Proporcionar callbacks para eventos de interacción
- Manejar raycasting automático
- Integrar con animaciones automáticas

## 🛠️ Uso Básico

```tsx
import { InteractionSystem } from "@/engine";

<InteractionSystem
  onObjectHoverEnter={(objectName) => console.log("Hover enter:", objectName)}
  onObjectHoverLeave={(objectName) => console.log("Hover leave:", objectName)}
  onObjectClick={(objectName) => console.log("Click:", objectName)}
/>;
```

## 📋 Props

### Callbacks de Eventos

#### `onObjectHoverEnter?: (objectName: string, events: ObjectEventArray) => void`

Se ejecuta cuando el mouse entra en un objeto interactuable.

```tsx
const handleHoverEnter = (objectName: string, events: ObjectEventArray) => {
  console.log(`Mouse entró en: ${objectName}`);
  // Mostrar tooltip
  setTooltip({ visible: true, content: objectName, object: objectName });
  // Cambiar cursor
  document.body.style.cursor = "pointer";
};

<InteractionSystem onObjectHoverEnter={handleHoverEnter} />;
```

#### `onObjectHoverLeave?: (objectName: string, events: ObjectEventArray) => void`

Se ejecuta cuando el mouse sale de un objeto interactuable.

```tsx
const handleHoverLeave = (objectName: string, events: ObjectEventArray) => {
  console.log(`Mouse salió de: ${objectName}`);
  // Ocultar tooltip
  setTooltip({ visible: false });
  // Restaurar cursor
  document.body.style.cursor = "default";
};

<InteractionSystem onObjectHoverLeave={handleHoverLeave} />;
```

#### `onObjectClick?: (objectName: string, events: ObjectEventArray) => void`

Se ejecuta cuando se hace click en un objeto interactuable.

```tsx
const handleClick = (objectName: string, events: ObjectEventArray) => {
  console.log(`Click en: ${objectName}`);

  // Casos de uso típicos:
  if (objectName === "door") {
    navigate("/next-room");
  } else if (objectName === "info-panel") {
    setModalOpen(true);
  } else if (objectName === "product") {
    setSelectedProduct(objectName);
  }
};

<InteractionSystem onObjectClick={handleClick} />;
```

### Configuración

#### `enableInteractions?: boolean`

Por defecto: `true`

Habilita o deshabilita completamente el sistema de interacciones.

```tsx
<InteractionSystem enableInteractions={!isLoading} />
```

## 🎮 Ejemplos de Implementación

### Ejemplo 1: Tooltip Simple

```tsx
import { useState } from "react";
import { InteractionSystem } from "@/engine";

export default function ViewerWithTooltips() {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const handleHoverEnter = (objectName: string) => {
    setTooltip({
      visible: true,
      content: `Objeto: ${objectName}`,
      x: 0, // Podrías calcular posición del mouse
      y: 0,
    });
  };

  const handleHoverLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="relative">
      <InteractionSystem
        onObjectHoverEnter={handleHoverEnter}
        onObjectHoverLeave={handleHoverLeave}
      />

      {tooltip.visible && (
        <div className="absolute top-4 left-4 bg-black text-white p-2 rounded">
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
```

### Ejemplo 2: Navegación por Objetos

```tsx
import { useRouter } from "next/router";
import { InteractionSystem } from "@/engine";

const OBJECT_ROUTES = {
  door_exit: "/rooms/lobby",
  door_office: "/rooms/office",
  info_panel: "/info",
  product_showcase: "/products",
};

export default function NavigableViewer() {
  const router = useRouter();

  const handleClick = (objectName: string) => {
    const route = OBJECT_ROUTES[objectName];
    if (route) {
      router.push(route);
    } else {
      console.log(`No hay ruta definida para: ${objectName}`);
    }
  };

  return (
    <InteractionSystem
      onObjectClick={handleClick}
      onObjectHoverEnter={(obj) => {
        // Cambiar cursor si hay ruta disponible
        const hasRoute = OBJECT_ROUTES[obj];
        document.body.style.cursor = hasRoute ? "pointer" : "default";
      }}
      onObjectHoverLeave={() => {
        document.body.style.cursor = "default";
      }}
    />
  );
}
```

### Ejemplo 3: Sistema de Estado Global

```tsx
import { useCallback } from "react";
import { InteractionSystem } from "@/engine";
import { useAppStore } from "@/store";

export default function StatefulViewer() {
  const { setHoveredObject, setSelectedObject, addToHistory } = useAppStore();

  const handleHoverEnter = useCallback(
    (objectName: string) => {
      setHoveredObject(objectName);
    },
    [setHoveredObject]
  );

  const handleHoverLeave = useCallback(() => {
    setHoveredObject(null);
  }, [setHoveredObject]);

  const handleClick = useCallback(
    (objectName: string) => {
      setSelectedObject(objectName);
      addToHistory({
        type: "interaction",
        object: objectName,
        timestamp: Date.now(),
      });
    },
    [setSelectedObject, addToHistory]
  );

  return (
    <InteractionSystem
      onObjectHoverEnter={handleHoverEnter}
      onObjectHoverLeave={handleHoverLeave}
      onObjectClick={handleClick}
    />
  );
}
```

### Ejemplo 4: Integración con Analytics

```tsx
import { InteractionSystem } from "@/engine";
import { analytics } from "@/lib/analytics";

export default function AnalyticsViewer() {
  const trackInteraction = (type: string, objectName: string) => {
    analytics.track("3d_interaction", {
      type,
      object: objectName,
      room: currentRoom,
      timestamp: Date.now(),
    });
  };

  return (
    <InteractionSystem
      onObjectHoverEnter={(obj) => trackInteraction("hover_enter", obj)}
      onObjectClick={(obj) => trackInteraction("click", obj)}
    />
  );
}
```

## 🎛️ Objetos Interactuables

Los objetos interactuables se definen en la configuración de la room (`room.json`):

```json
{
  "interactableObjects": {
    "door_main": [
      {
        "type": "navigation",
        "target": "/lobby"
      }
    ],
    "info_panel": [
      {
        "type": "modal",
        "content": "information"
      }
    ]
  }
}
```

## 🔧 Configuración Avanzada

### Deshabilitar Interacciones Temporalmente

```tsx
const [interactionsEnabled, setInteractionsEnabled] = useState(true);

// Deshabilitar durante loading o modales
useEffect(() => {
  setInteractionsEnabled(!isLoading && !isModalOpen);
}, [isLoading, isModalOpen]);

<InteractionSystem enableInteractions={interactionsEnabled} />;
```

### Manejo de Errores

```tsx
const handleClick = (objectName: string) => {
  try {
    // Tu lógica aquí
    handleObjectAction(objectName);
  } catch (error) {
    console.error("Error en interacción:", error);
    showErrorToast("Error al interactuar con el objeto");
  }
};
```

## 🧪 Testing

```tsx
import { render, screen } from "@testing-library/react";
import { InteractionSystem } from "@/engine";

test("should call onObjectClick when object is clicked", () => {
  const mockOnClick = jest.fn();

  render(
    <Engine.Canvas>
      <Engine.Core>
        <InteractionSystem onObjectClick={mockOnClick} />
      </Engine.Core>
    </Engine.Canvas>
  );

  // Simular click en objeto...
  // expect(mockOnClick).toHaveBeenCalledWith('objectName');
});
```

## 🚀 Performance Tips

1. **Usa `useCallback`** para handlers que se pasan como props
2. **Evita lógica pesada** en los callbacks de hover (se ejecutan frecuentemente)
3. **Considera debouncing** para acciones que requieren llamadas a API
4. **Usa `React.memo`** para componentes que renderizan basándose en el estado de interacción

## 🔗 Ver También

- [Sistema de Cámara](./camera-system.md) - Para controles de cámara
- [Sistema de Animación](./animation-system.md) - Para animaciones automáticas
- [API del Engine](../engine-api.md) - Para APIs generales del engine
