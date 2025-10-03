# Sistema de Debug de Oniria Engine

El `DebugSystem` proporciona un conjunto completo de herramientas de debug para el motor de renderizado usando Leva como interfaz de controles.

## Uso Básico

```tsx
import { DebugSystem } from '@/engine';

// Uso simple con todos los paneles habilitados
<DebugSystem />

// Uso con configuración personalizada
<DebugSystem
  enabled={true}
  panels={{
    engine: true,
    camera: true,
    animation: true,
    interaction: true,
    scene: true,
    performance: true,
  }}
/>
```

## Paneles Disponibles

### 🔧 Panel de Engine

- **Active Room**: Muestra la room actualmente cargada
- **Loop Status**: Estado del loop de renderizado
- **Restart Engine**: Reinicia el engine
- **Export State**: Exporta el estado actual del engine a consola

### 📷 Panel de Cámara

- **Focus Target**: Dropdown para seleccionar objetos a enfocar
- **Reset Position**: Restaura la posición inicial de la cámara
- **Front View**: Vista frontal predefinida
- **Top View**: Vista superior predefinida
- **Side View**: Vista lateral predefinida
- **View Nodes**: Activa la visualización de nodos

### 🎬 Panel de Animación

- **Total Clips**: Número de clips de animación cargados
- **Play All**: Reproduce todas las animaciones
- **Pause All**: Pausa todas las animaciones
- **Stop All**: Detiene todas las animaciones

### 🎯 Panel de Interacción

- **Total Interactables**: Número de objetos interactuables
- **Objects**: Lista de objetos interactuables
- **Simulate Hover**: Simula hover en el primer objeto
- **Log Interactables**: Muestra los objetos interactuables en consola

### 🌍 Panel de Escena

- **Total Objects**: Número total de objetos en la escena
- **Lights**: Número de luces en la escena
- **Meshes**: Número de meshes en la escena
- **Log Scene Graph**: Muestra el árbol de objetos en consola
- **Toggle Wireframe**: Activa/desactiva modo wireframe

### ⚡ Panel de Performance

- **Frame Rate**: FPS en tiempo real
- **Memory Usage**: Uso de memoria (si está disponible)
- **Start/End Profiling**: Herramientas de profiling
- **Force GC**: Fuerza garbage collection
- **Profiling Status**: Estado del profiling actual

## Configuración

### Props del DebugSystem

```tsx
interface DebugSystemProps {
  enabled?: boolean;
  panels?: {
    engine?: boolean;
    camera?: boolean;
    animation?: boolean;
    interaction?: boolean;
    scene?: boolean;
    performance?: boolean;
  };
}
```

### Ejemplos de Configuración

```tsx
// Solo paneles de cámara y performance
<DebugSystem
  panels={{
    engine: false,
    camera: true,
    animation: false,
    interaction: false,
    scene: false,
    performance: true,
  }}
/>

// Deshabilitar completamente en producción
<DebugSystem enabled={process.env.NODE_ENV === 'development'} />
```

## Integración en Home.tsx

```tsx
import { DebugSystem } from "@/engine";

export default function Home() {
  return (
    <div>
      <LoaderSystem />
      <DebugSystem /> {/* Agregar aquí */}
      <Engine.Canvas>
        <Engine.Core>{/* ... otros sistemas */}</Engine.Core>
      </Engine.Canvas>
    </div>
  );
}
```

## Características Avanzadas

### Performance Monitoring

El panel de performance incluye un monitor de FPS en tiempo real y medición de memoria:

- Se actualiza cada segundo
- Funciona con `requestAnimationFrame`
- Incluye herramientas de profiling con `console.time/timeEnd`

### Scene Debugging

- Traversal completo del árbol de objetos
- Toggle de wireframe para todos los meshes
- Información detallada sobre tipos de objetos

### Camera Controls

- Integración con el `CameraService`
- Posiciones predefinidas para vistas rápidas
- Control dinámico de targets basado en objetos de la escena

## Notas de Desarrollo

- El sistema está optimizado para no afectar el performance cuando está deshabilitado
- Todos los paneles son modulares y pueden habilitarse/deshabilitarse independientemente
- Las funciones de debug usan `console.log` para no interferir con la UI
- Compatible con TypeScript para type safety completo

## Solución de Problemas

### Si no aparecen los controles

1. Verificar que Leva esté instalado: `npm install leva`
2. Verificar que el `DebugSystem` esté fuera del `Engine.Canvas`
3. Verificar que `enabled={true}` esté configurado

### Si faltan datos en los paneles

1. Verificar que la room esté cargada
2. Verificar que los servicios estén inicializados
3. Revisar la consola para errores de configuración

### Performance Issues

- Deshabilitar paneles que no se usen frecuentemente
- El panel de performance puede consumir recursos adicionales
- Usar `enabled={false}` en producción
