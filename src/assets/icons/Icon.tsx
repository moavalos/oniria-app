import type { SVGProps } from "react";
import { iconsStore, type IconName } from "./iconsStore";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  size?: number | string; // Tamaño personalizado opcional
}

/**
 * Componente dinámico para renderizar iconos del registro
 * @example
 * <Icon name="portal" className="w-6 h-6 text-blue-500" />
 * <Icon name="magic" size={20} /> // Tamaño fijo
 * <Icon name="magic" className="w-5 h-5" /> // Controlado por CSS
 */
export default function Icon({ name, className, size, ...props }: IconProps) {
  const IconComponent = iconsStore[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconsStore`);
    return null;
  }

  // Si se especifica un tamaño, se sobrescriben width y height
  const sizeProps = size ? { width: size, height: size } : {};

  return <IconComponent className={className} {...sizeProps} {...props} />;
}
