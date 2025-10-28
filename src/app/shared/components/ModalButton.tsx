import type { ReactNode } from "react";

interface ModalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: ReactNode;
}

export default function ModalButton({
  children,
  icon,
  type = "button",
  className = "",
  ...props
}: ModalButtonProps) {
  return (
    <button
      type={type}
      className={`modal-button flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-primary text-white text-base font-medium hover:bg-primary-dark transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
      {icon && icon}
    </button>
  );
}
