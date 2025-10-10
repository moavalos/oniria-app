import { useTranslation } from "react-i18next";
import Card from "@/shared/components/Card";
import { useCallback, useEffect, useRef, useState } from "react";
import Starfield from "@/shared/components/Starfield";
import Header from "@/shared/components/Header";
import LeftPanel from "../../home/components/LeftPanel";
import DreamCardModal from "./DreamCardModal";

export default function Node() {
  const { t } = useTranslation();

  const [showDreamCard, setShowDreamCard] = useState(true);
  const [dreamText, setDreamText] = useState("");
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePersonalizar = () => console.log("Ir a Personalizar habitación");
  const handleInsignias = () => console.log("Ir a Mis insignias");

  const handleInterpretar = useCallback((dream: string) => {
    setDreamText(dream);
    setShowDreamCard(true);
    console.log("Interpretando sueño:", dream);
  }, []);

  const handleGuardar = () => {
    console.log("Guardar sueño del nodo:", dreamText);
    setShowDreamCard(false);
  };

  const handleReinterpretar = () => {
    console.log("Reinterpretar sueño:", dreamText);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDreamCard(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (showDreamCard) setTimeout(() => textRef.current?.focus(), 0);
  }, [showDreamCard]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(60%_80%_at_50%_0%,#1b0f2a_0%,#0b0810_55%,#06050b_100%)] text-white overflow-hidden">
      <Starfield />

      {/* top bar */}
      <Header />

      {/* layout principal */}
      <main className="relative z-0 mx-auto container px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        <LeftPanel
          onInterpretar={handleInterpretar}
          onPersonalizar={handlePersonalizar}
          onInsignias={handleInsignias}
          showQuoteCard={false}
        />

        <Card className="col-span-12 md:col-span-8 lg:col-span-9 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6 relative">
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
        </Card>
      </main>
    </div>
  );
}