import Icon from "@/assets/icons/Icon";
import type { IconName } from "@/assets/icons/iconsStore";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

// Contexto para compartir el estado de cierre entre componentes
interface MenuContextValue {
  isClosing: boolean;
}

const MenuContext = createContext<MenuContextValue>({ isClosing: false });

// Hook para consumir el contexto
const useMenuContext = () => useContext(MenuContext);

export function MenuRoot({
  children,
  className,
  isClosing = false,
}: PropsWithChildren<{ className?: string; isClosing?: boolean }>) {
  return (
    <MenuContext.Provider value={{ isClosing }}>
      <div className={className}>{children}</div>
    </MenuContext.Provider>
  );
}

export function MenuDescription({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const { isClosing } = useMenuContext();

  return (
    <div
      className={`border p-2 relative border-gray-500/20 backdrop-blur-md text-light/70 bg-gray-800/50 pointer-events-none ${className}`}
      style={{
        animation: isClosing
          ? "fadeOutSlide 0.3s ease-in forwards"
          : "fadeInSlide 0.3s ease-out 0.35s both",
      }}
    >
      <div className="absolute top-0 left-0 h-full w-[5px] bg-orange-300  text-xs text-gray-400" />
      <p className="ml-3">{children}</p>
      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOutSlide {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

export function MenuItem({
  className,
  onClick,
  label,
  description,
  icon,
  active = false,
}: PropsWithChildren<{
  className?: string;
  onClick: () => void;
  label: string;
  description: string;
  icon?: IconName;
  active?: boolean;
}>) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex flex-col p-4 border rounded-xl hover:bg-purple-600/5 transition-all justify-start backdrop-blur-2xl hover:shadow-lg hover:cursor-pointer ${
        active ? "border-primary border-2" : "border-gray-400/30"
      }`}
      style={
        active
          ? {
              background:
                "radial-gradient(circle at right, rgba(108, 58, 133, 1.0) 0%, rgba(63, 49, 72, .7) 50%, transparent 100%)",
            }
          : undefined
      }
    >
      <div className="flex items-center mb-2 gap-3">
        <Icon name={icon || "sparkles"} className="w-6 h-6" />
        <h3 className="text-xl font-medium mb-1">{label}</h3>
      </div>
      <p className="text-sm text-start text-gray-400">{description}</p>
    </button>
  );
}

export function MenuContainer({
  className,
  children,
  disableAnimation = false,
}: PropsWithChildren<{ className?: string; disableAnimation?: boolean }>) {
  const { isClosing } = useMenuContext();

  // Si className incluye h-full, no añadir h-fit
  const heightClass = className?.includes("h-full") ? "" : "h-fit";

  return (
    <div
      className={`flex flex-col gap-2 rounded-[8px] px-4 py-1.5 ${heightClass} border border-gray-500/20 cursor-pointer backdrop-blur-md bg-gray-600/30 pointer-events-none ${className}`}
      style={{
        animation: disableAnimation
          ? "none"
          : isClosing
          ? "fadeOutSlide 0.3s ease-in forwards"
          : "fadeInSlide 0.5s ease-out",
      }}
    >
      {children}
      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOutSlide {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

export function MenuHeader({
  className,
  children,
  baseline = true,
}: PropsWithChildren<{ className?: string; baseline?: boolean }>) {
  return (
    <div className={`pointer-events-auto ${className}`}>
      <div className="flex w-full py-2">{children}</div>
      {baseline && (
        <div className="w-full h-[1px] bg-gradient-to-r from-primary to-gray-500" />
      )}
    </div>
  );
}

export interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export function CloseButton({ onClick, className, icon }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-gray-300 border border-gray-400 rounded-full aspect-square w-7 hover:text-white cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors ${className}`}
    >
      {icon || "✕"}
    </button>
  );
}

export function MenuBody({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`pointer-events-auto flex flex-col gap-2 flex-1 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function MenuFooter({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`pointer-events-auto ${className}`}>{children}</div>;
}

const HudMenu = Object.assign(MenuContainer, {
  Container: MenuContainer,
  Header: MenuHeader,
  Body: MenuBody,
  Footer: MenuFooter,
  CloseButton: CloseButton,
  Root: MenuRoot,
  Description: MenuDescription,
  Item: MenuItem,
});

export default HudMenu;
