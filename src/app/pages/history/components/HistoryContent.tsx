import Card from "@/app/shared/components/Card";
import type { TimelineItem } from "@/app/features/history/model/TimelineItem";
import DreamCardModal from "../../node/modal/DreamCardModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface HistoryContentProps {
  timeline: TimelineItem[];
  loading: boolean;
  error: string | null;
}

export default function HistoryContent({
  timeline,
  loading,
  error,
}: HistoryContentProps) {
  const { t } = useTranslation();
  const [showDreamCard, setShowDreamCard] = useState(false);
  const [dreamText, setDreamText] = useState<string>("");

  const handleGuardar = () => {
    // Lógica para guardar
    setDreamText("");
    setShowDreamCard(false);
  };

  const handleReinterpretar = () => {
    // Lógica para reinterpretar
    setShowDreamCard(false);
  };
  return (
    <Card className="col-span-12 md:col-span-8 xl:col-span-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6">
      <div className="mb-3 flex items-center justify-between">
        {loading && <span className="text-sm text-white/70">Cargando…</span>}
        {error && <span className="text-sm text-red-300">{error}</span>}
      </div>

      {/*TODO sacar este modal y ponerlo en el nodo*/}
      <DreamCardModal
        title={t("node.suenoDelNodo", "Sueño del nodo")}
        isVisible={showDreamCard}
        onClose={() => setShowDreamCard(false)}
        onSave={handleGuardar}
        onReinterpret={handleReinterpretar}
      >
        <div className="text-white/80 text-sm leading-relaxed">
          {dreamText || t("node.acaAparecera")}
        </div>
      </DreamCardModal>

      {!loading && !error && timeline.length === 0 && (
        <div className="text-white/60 text-sm">
          No hay sueños guardados todavía.
        </div>
      )}
    </Card>
  );
}
