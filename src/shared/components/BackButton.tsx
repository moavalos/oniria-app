import { useTranslation } from "react-i18next";

interface BackButtonProps {
    onClick: () => void;
    label?: string;
}

export default function BackButton({ onClick, label }: BackButtonProps) {
    const { t } = useTranslation();
    const buttonLabel = label || t("volverHome", "Volver a home");

    return (
        <button
            type="button"
            onClick={onClick}
            className="mb-3 -mt-2 inline-flex items-center gap-2 text-[12px] font-semibold rounded-lg px-2 py-1
                 transition-colors duration-200 hover:opacity-80"
            style={{
                color: "var(--text-80)",
                backgroundColor: "var(--surface-subtle)",
            }}
            aria-label={buttonLabel}
        >
            ← {buttonLabel}
        </button>
    );
}