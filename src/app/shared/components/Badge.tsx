interface BadgeProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  linkText?: string;
  onLinkClick?: () => void;
  variant?: "info" | "warning" | "success" | "feature";
  showButtons?: boolean;
}

export default function Badge({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  linkText,
  onLinkClick,
  variant = "info",
  showButtons = true,
}: BadgeProps) {
  const variantStyles = {
    info: "border-violet-400/40 bg-violet-500/10 shadow-[0_0_15px_rgba(217,70,239,0.25)]",
    warning:
      "border-amber-400/40 bg-amber-500/10 shadow-[0_0_15px_rgba(251,191,36,0.25)]",
    success:
      "border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    feature:
      "border-fuchsia-400/40 bg-fuchsia-500/10 shadow-[0_0_15px_rgba(232,121,249,0.35)]",
  };

  return (
    <div
      className={`rounded-2xl border ${variantStyles[variant]} p-3 sm:p-4 animate-in fade-in slide-in-from-bottom-2 duration-200`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="text-sm w-full">
          {title && (
            <h3 className="font-bold text-white text-base mb-2">{title}</h3>
          )}
          <p className="text-white/80 mb-3 leading-relaxed">{message}</p>

          {/* Link "Saber más" */}
          {linkText && onLinkClick && (
            <button
              onClick={onLinkClick}
              className="text-primary hover:text-primary/80 text-xs font-medium underline mb-3 block transition-colors"
            >
              {linkText}
            </button>
          )}

          {/* Botones de acción */}
          {showButtons && (onConfirm || onCancel) && (
            <div className="flex gap-2 justify-end">
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {cancelText}
                </button>
              )}
              {onConfirm && (
                <button onClick={onConfirm} className="modal-button">
                  {confirmText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
