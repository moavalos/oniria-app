import Icon from "@/assets/icons/Icon";
import type { IconName } from "@/assets/icons/iconsStore";
import type { PropsWithChildren } from "react";

export function MenuRoot({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>;
}

export function MenuDescription({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={className}>{children}</div>;
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
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-[8px] px-4 py-1.5 h-fit border border-gray-500/20 cursor-pointer backdrop-blur-md bg-gray-600/30 pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
}

export function MenuHeader({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`pointer-events-auto ${className}`}>
      <div className="flex w-full py-2">{children}</div>
      <div className="w-full h-[1px] bg-gradient-to-r from-primary to-gray-500" />
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
    <div className={`pointer-events-auto flex flex-col gap-2 ${className}`}>
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
