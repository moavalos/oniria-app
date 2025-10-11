import { useTranslation } from "react-i18next";
import '@pages/home/styles/LeftPanel.css';
import QuoteIcon from "@/assets/icons/QuoteIcon";
import RefreshIcon from "@/assets/icons/RefreshIcon";

type QuoteCardProps = {
    quote: string;
    isLoading: boolean;
    onRefresh: () => void;
};

export default function QuoteCard({ quote, isLoading, onRefresh }: QuoteCardProps) {
    const { t } = useTranslation();

    return (
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15">
            <div className="text-[12px] font-semibold text-white/80 mb-1">
                {t("node.fraseHoy", "Frase de hoy")}
            </div>
            <p className="text-[11px] text-white/50 mb-3">
                {t("node.fraseHint", "Un guiño simbólico para arrancar..")}
            </p>

            <div className="rounded-xl border border-fuchsia-400/25 bg-black/20 px-3 py-4 mb-3">
                <div className="flex items-start gap-2 justify-center text-center">
                    <QuoteIcon className="mt-0.5 opacity-70 shrink-0" />
                    <span className="text-[13px] text-fuchsia-200 leading-snug">{quote}</span>
                    <QuoteIcon className="rotate-180 mt-0.5 opacity-70 shrink-0" />
                </div>
            </div>

            <button
                onClick={onRefresh}
                disabled={isLoading}
                className="tap-button w-full rounded-xl bg-gradient-to-r from-fuchsia-700 to-fuchsia-600
                   px-4 py-3 text-[14px] font-semibold border border-fuchsia-400/30
                   shadow-[0_0_22px_rgba(217,70,239,0.25)]
                   disabled:opacity-60 disabled:cursor-not-allowed
                   transition-transform duration-200"
            >
                <span className="inline-flex items-center gap-2">
                    <RefreshIcon spinning={isLoading} />
                    {t("node.nuevaFrase", "Nueva frase")}
                </span>
            </button>
        </div>
    );
}