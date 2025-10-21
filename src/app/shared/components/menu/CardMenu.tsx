import type { PropsWithChildren } from "react";

export function MenuContainer({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`pointer-events-none ${className}`}>{children}</div>;
}

export function MenuHeader({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`pointer-events-auto ${className}`}>{children}</div>;
}

export function MenuBody({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={`pointer-events-auto ${className}`}>{children}</div>;
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
});

export default HudMenu;
