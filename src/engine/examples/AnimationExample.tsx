import { AnimationSystem, type AnimationConfig } from "../systems";

// Ejemplo de uso del AnimationSystem configurable desde la UI
export function AnimationExample() {
  // Configuración personalizada de animaciones
  const animationConfig: AnimationConfig = {
    animations: {
      // Ejemplo de rotación personalizada
      custom_object: {
        target: "custom_object",
        type: "rotate",
        loop: true,
        params: {
          axis: [0, 1, 0],
          to: 360,
          duration: 3,
          ease: "power2.inOut",
        },
      },
      // Ejemplo de péndulo personalizado
      pendulum_object: {
        target: "pendulum_object",
        type: "pendulum",
        loop: true,
        params: {
          axis: [0, 0, 1],
          angle: 45,
          D_right: 1.2,
          D_left: 1.2,
          T_rest: 0.5,
          ease: "sine.inOut",
        },
      },
    },
    autoPlay: true,
    playOnMount: true,
  };

  // Handlers para eventos de animación
  const handleAnimationStart = (targetName: string, animationType: string) => {
    console.log(`Animación iniciada: ${animationType} en ${targetName}`);
  };

  const handleAnimationComplete = (
    targetName: string,
    animationType: string
  ) => {
    console.log(`Animación completada: ${animationType} en ${targetName}`);
  };

  const handleAnimationUpdate = (targetName: string, progress: number) => {
    // Solo loggear cada 25% para evitar spam
    if (progress % 0.25 < 0.01) {
      console.log(
        `Progreso de animación en ${targetName}: ${Math.round(progress * 100)}%`
      );
    }
  };

  return (
    <AnimationSystem
      config={animationConfig}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      onAnimationUpdate={handleAnimationUpdate}
      enableAnimations={true}
      autoConfigureForRoom={true} // También carga animaciones de la habitación
    />
  );
}

// Ejemplo avanzado con control manual
export function AdvancedAnimationExample() {
  const animationConfig: AnimationConfig = {
    // Solo animaciones personalizadas, sin autoPlay
    animations: {
      interactive_object: {
        target: "interactive_object",
        type: "rotateTo",
        loop: false,
        params: {
          axis: [1, 0, 0],
          to: 90,
          duration: 2,
          ease: "back.out(1.7)",
        },
      },
    },
    autoPlay: false, // No reproducir automáticamente
    playOnMount: false,
  };

  const handleAnimationStart = (targetName: string, animationType: string) => {
    // Notificar a la UI que se inició una animación
    console.log("🎬 Animación iniciada:", {
      target: targetName,
      type: animationType,
    });
  };

  const handleAnimationComplete = (
    targetName: string,
    animationType: string
  ) => {
    // Ejecutar lógica post-animación
    console.log("✅ Animación completada:", {
      target: targetName,
      type: animationType,
    });
  };

  return (
    <AnimationSystem
      config={animationConfig}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      enableAnimations={true}
      autoConfigureForRoom={false} // Solo animaciones manuales
    />
  );
}

export default AnimationExample;
