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
  isLoading?: boolean;
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
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
  isLoading = false,
  secondaryButtonText,
  onSecondaryClick,
}: BadgeProps) {
  const variantStyles = {
    info: "border-violet-400/30 bg-violet-500/5 shadow-[0_0_15px_rgba(217,70,239,0.25)]",
    warning:
      "border-amber-400/30 bg-amber-500/5 shadow-[0_0_15px_rgba(251,191,36,0.25)]",
    success:
      "border-emerald-400/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    feature:
      "border-fuchsia-400/30 bg-fuchsia-500/5 shadow-[0_0_15px_rgba(232,121,249,0.35)]",
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
                <button
                  onClick={onConfirm}
                  className="modal-button flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {confirmText}
                </button>
              )}
              {secondaryButtonText && onSecondaryClick && (
                <button
                  onClick={onSecondaryClick}
                  className="modal-button flex items-center gap-2"
                >
                  {secondaryButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
