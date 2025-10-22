import type { PropsWithChildren } from "react";

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
}

export function HudBody({ className, children, ...props }: HudBodyProps) {
  return (
    <div
      className={`flex relative gap-5 px-5 w-full h-full mt-20  pointer-events-none ${className}`}
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
});

export default HudSystem;
