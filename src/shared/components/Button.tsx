import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const hoverCircleRef = useRef<HTMLDivElement>(null);

  // Configurar estado inicial del círculo una sola vez
  useEffect(() => {
    const hoverCircle = hoverCircleRef.current;
    if (!hoverCircle) return;

    gsap.set(hoverCircle, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
    });
  }, []);

  // Handlers para hover usando props de React
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    // No animar si está disabled
    if (disabled) return;

    const hoverCircle = hoverCircleRef.current;
    if (!hoverCircle) return;

    gsap.to(hoverCircle, {
      scale: 350,
      opacity: 0.15,
      duration: 0.4,
      ease: "power2.out",
    });

    // Llamar al onMouseEnter original si existe
    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hoverCircle = hoverCircleRef.current;
    if (!hoverCircle) return;

    gsap.to(hoverCircle, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // Llamar al onMouseLeave original si existe
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // No ejecutar si está disabled
    if (disabled) return;

    // Animación de compresión del botón
    const button = e.currentTarget;
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
    });

    // Ejecutar onClick original
    if (onClick) {
      onClick(e);
    }
  };

  const baseClassName =
    "relative overflow-hidden w-full py-2 rounded-lg transition-colors duration-200";
  const enabledClassName =
    "bg-primary cursor-pointer text-white hover:bg-primary-dark";
  const disabledClassName = "bg-gray-400 cursor-not-allowed text-gray-200";

  const finalClassName = `${baseClassName} ${
    disabled ? disabledClassName : enabledClassName
  } ${className}`.trim();

  return (
    <button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={finalClassName}
      {...props}
    >
      {/* Círculo de hover desde esquina inferior izquierda */}
      <div
        ref={hoverCircleRef}
        className="absolute bg-white rounded-full pointer-events-none"
        style={{
          left: "50%",
          bottom: "0",
          transform: "translate(-40%, 50%)", // Centrar el círculo en la esquina
          width: "1px",
          height: "1px",
        }}
      />

      {/* Contenido del botón */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
