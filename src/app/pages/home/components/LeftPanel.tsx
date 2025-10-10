import Card from "@/shared/components/Card";
import { motion } from "framer-motion";
import {
  Settings2,
  BadgeCheck,
  ChevronRight,
  Quote,
  RefreshCcw,
} from "lucide-react";
import { useMemo, useState } from "react";
import CtaButton from "../../../features/auth/components/CtaButton";
import { useTranslation } from "react-i18next";

type LeftPanelProps = {
  onInterpretar?: (_dream: string) => void;
  onPersonalizar?: () => void;
  onInsignias?: () => void;
  initialDream?: string;
  maxChars?: number;
  onNuevaFrase?: () => void;
  quote?: string;
  loadingQuote?: boolean;
  showQuoteCard?: boolean;
};

export default function LeftPanel({
  onInterpretar,
  onPersonalizar,
  onInsignias,
  initialDream = "",
  maxChars = 1200,
  onNuevaFrase,
  quote = "“Lo que no se nombra, se sueña”",
  loadingQuote = false,
  showQuoteCard = true,
}: LeftPanelProps) {
  const [dream, setDream] = useState(initialDream);
  const charsLeft = useMemo(() => maxChars - dream.length, [dream, maxChars]);
  const isEmpty = dream.trim().length === 0;
  const isTooLong = dream.length > maxChars;
  const { t } = useTranslation();

  return (
    <Card className="col-span-12 md:col-span-3 min-w-[300px] p-6 h-[88vh] overflow-y-auto text-[15px] space-y-4">
      <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-semibold text-white/80">
            {t("node.title")}
          </div>
          <div
            className={`text-[11px] ${
              isTooLong ? "text-red-300" : "text-white/50"
            }`}
          >
            {charsLeft}
          </div>
        </div>

        <label className="sr-only" htmlFor="dream-input">
          {t("node.descriptionLabel")}
        </label>
        <textarea
          id="dream-input"
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          placeholder={t("node.placeholderNode")}
          className="min-h-[160px] w-full resize-y rounded-xl bg-black/20 text-white/90 placeholder:text-white/40
                     border border-white/15 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50
                     px-3 py-3 text-[13px] leading-relaxed"
        />

        {isTooLong && (
          <div className="mt-2 text-[11px] text-red-300">
            {t("node.character1")} {maxChars} {t("node.character2")}
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            !isEmpty && !isTooLong && onInterpretar?.(dream.trim())
          }
          disabled={isEmpty || isTooLong}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-fuchsia-700 to-fuchsia-600
                     px-4 py-3 text-[14px] font-bold border border-fuchsia-400/30
                     shadow-[0_0_22px_rgba(217,70,239,0.35)]
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="inline-flex items-center gap-2">
            {t("node.interpretar")}
          </span>
        </motion.button>
      </div>

      {/*frases*/}
      {showQuoteCard && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/15">
          <div className="text-[12px] font-semibold text-white/80 mb-1">
            {t("node.fraseHoy", "Frase de hoy")}
          </div>
          <p className="text-[11px] text-white/50 mb-3">
            {t("node.fraseHint", "Un guiño simbólico para arrancar..")}
          </p>

          <div className="rounded-xl border border-fuchsia-400/25 bg-black/20 px-3 py-4 mb-3">
            <div className="flex items-start gap-2 justify-center text-center">
              <Quote size={16} className="mt-0.5 opacity-70 shrink-0" />
              <span className="text-[13px] text-fuchsia-200 leading-snug">
                {quote}
              </span>
              <Quote
                size={16}
                className="rotate-180 mt-0.5 opacity-70 shrink-0"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onNuevaFrase}
            disabled={loadingQuote}
            className="w-full rounded-xl bg-gradient-to-r from-fuchsia-700 to-fuchsia-600
                                     px-4 py-3 text-[14px] font-semibold border border-fuchsia-400/30
                                     shadow-[0_0_22px_rgba(217,70,239,0.25)]
                                     disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="inline-flex items-center gap-2">
              <RefreshCcw
                size={16}
                className={loadingQuote ? "animate-spin" : ""}
              />
              {t("node.nuevaFrase", "Nueva frase")}
            </span>
          </motion.button>
        </div>
      )}

      <div className="px-4 sm:px-5 pb-45 rounded-2xl bg-white/5 border border-white/15">
        <div className="text-[12px] mt-4 font-semibold text-white/80 mb-3">
          {t("node.myroom")}
        </div>

        <button
          onClick={onPersonalizar}
          className="w-full mb-3 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-3 hover:bg-white/[0.08]"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full grid place-items-center bg-white/10 border border-white/10">
              <Settings2 size={16} />
            </div>
            <div className="leading-tight text-left">
              <div className="text-[12px] font-semibold">
                {t("node.personalizar")}
              </div>
              <div className="text-[11px] text-white/60">{t("node.toque")}</div>
            </div>
          </div>
          <ChevronRight size={16} className="text-white/60" />
        </button>

        <button
          onClick={onInsignias}
          className="w-full flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-3 hover:bg-white/[0.08]"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full grid place-items-center bg-white/10 border border-white/10">
              <BadgeCheck size={16} />
            </div>
            <div className="leading-tight text-left">
              <div className="text-[12px] font-semibold">
                {t("node.insignia")}
              </div>
              <div className="text-[11px] text-white/60">
                {t("node.descriptionInsignia")}
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-white/60" />
        </button>
      </div>

      {/* CTA PRO */}
      <CtaButton
        ctaText={t("historial.oniriaPro")}
        onClick={() => console.log("CTA click")}
        disabled={false}
        pressed={false}
      />
    </Card>
  );
}
