import type { PropsWithChildren } from "react";

/**
 * HudSystem - Sistema de layout para el HUD de la aplicación
 * 
 * Este sistema proporciona un layout flexible con:
 * - TopBar: Barra superior fija (altura: ~3.5rem)
 * - Body: Área principal flexible con espacio reservado abajo
 * - Footer: Área inferior reservada para futuras cards o controles
 * 
 * Notas importantes:
 * - El footerHeight en Body debe coincidir con height en Footer
 * - Las cards dentro de Body tendrán altura: calc(100vh - TopBar - Footer)
 * - Usa h-full en las cards para que ocupen toda la altura disponible
 */

export interface HudContainerProps
  extends PropsWithChildren,
    React.HTMLProps<HTMLDivElement> {
  className?: string;
}

export function HudContainer({
  className,
  children,
  ...props
}: HudContainerProps) {
  return (
    <div
      className={`fixed inset-0 z-10 text-light pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface HudTopBarProps
  extends PropsWithChildren,
    React.HTMLProps<HTMLDivElement> {
  className?: string;
}

export function HudTopBar({ className, children, ...props }: HudTopBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 flex justify-between w-full px-4 py-2 pointer-events-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface HudBodyProps
  extends PropsWithChildren,
    React.HTMLProps<HTMLDivElement> {
  className?: string;
  footerHeight?: string; // Altura del footer reservado (e.g., "h-20", "h-24")
}

export function HudBody({ 
  className, 
  children, 
  footerHeight = "h-24",
  ...props 
}: HudBodyProps) {
  // Convertir clase de Tailwind a valor en rem
  // h-20 = 5rem, h-24 = 6rem, h-32 = 8rem, etc.
  const heightMap: Record<string, string> = {
    'h-16': '4rem',
    'h-20': '5rem',
    'h-24': '6rem',
    'h-32': '8rem',
    'h-40': '10rem',
  };

  const footerHeightValue = heightMap[footerHeight] || '6rem';

  return (
    <div
      className={`flex relative gap-5 px-5 w-full mt-20 pointer-events-none ${className}`}
      style={{
        height: `calc(100vh - 5rem - ${footerHeightValue})`,
        maxHeight: `calc(100vh - 5rem - ${footerHeightValue})`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface HudFooterProps
  extends PropsWithChildren,
    React.HTMLProps<HTMLDivElement> {
  className?: string;
  height?: string; // Altura del footer (debe coincidir con footerHeight de HudBody)
}

export function HudFooter({ 
  className, 
  children, 
  height = "h-24",
  ...props 
}: HudFooterProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 flex justify-center items-center w-full px-5 ${height} pointer-events-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

const HudSystem = Object.assign(HudContainer, {
  Container: HudContainer,
  TopBar: HudTopBar,
  Body: HudBody,
  Footer: HudFooter,
});

export default HudSystem;
