import type { SVGProps } from "react";
import { iconsStore, type IconName } from "./iconsStore";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

/**
 * Componente dinámico para renderizar iconos del registro
 * @example
 * <Icon name="portal" className="w-6 h-6 text-blue-500" />
 */
export default function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = iconsStore[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconsStore`);
    return null;
  }

  return <IconComponent className={className} {...props} />;
}
