import { X, Save, Sparkles } from "lucide-react";
import Card from "@/shared/components/Card";
import { useTranslation } from "react-i18next";

type DreamCardModalProps = {
    title: string;
    onClose: () => void;
    onSave: () => void;
    onReinterpret: () => void;
    isVisible: boolean;
    children?: React.ReactNode;
};

export default function DreamCardModal({
    title,
    onClose,
    onSave,
    onReinterpret,
    isVisible,
    children,
}: DreamCardModalProps) {
    const { t } = useTranslation();
    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 z-20 grid place-items-center px-4 sm:px-6">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Card del modal */}
            <Card className="relative w-full max-w-screen-sm sm:max-w-md md:max-w-lg border border-white/15 bg-white/10 backdrop-blur-md p-4 sm:p-5 shadow-[0_0_35px_rgba(217,70,239,0.25)]">
                {/* header */}
                <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-semibold text-white/90">{title}</div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 bg-white/10 hover:bg-white/15 border border-white/15 transition"
                        aria-label={t("node.cerrar")}
                    >
                        <X size={16} className="text-white/80" />
                    </button>
                </div>

                <div className="w-full min-h-[160px] rounded-xl">{children}</div>

                {/* acciones */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={onSave}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-700 to-fuchsia-600 px-4 py-2 text-sm font-semibold shadow-[0_0_22px_rgba(217,70,239,0.35)]"
                    >
                        <Save size={16} />
                        {t("node.guardar")}
                    </button>

                    <button
                        onClick={onReinterpret}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-800 to-fuchsia-700 px-4 py-2 text-sm font-semibold"
                    >
                        <Sparkles size={16} />
                        {t("node.reinterpretar")}
                    </button>
                </div>
            </Card>
        </div>
    );
}