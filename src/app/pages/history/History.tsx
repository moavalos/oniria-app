import {
  MoreHorizontal,
  HelpCircle,
  LogOut,
  Globe as GlobeIcon,
  Menu,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import Starfield from "@shared/components/Starfield";
import Pill from "@shared/components/Pill";
import Header from "@shared/components/Header";
import Card from "@/shared/components/Card";
import { useTranslation } from "react-i18next";

// ------- data mock (sacar cuando haya backend) -------
const timeline = new Array(9).fill(0).map((_, i) => ({
  id: i,
  date: "Viernes, 17 de julio del 2025",
  title: i === 2 ? "El árbol y la manzana…" : "El arbol y la manzana…",
  active: i === 2,
}));

export default function History() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(60%_80%_at_50%_0%,#1b0f2a_0%,#0b0810_55%,#06050b_100%)] text-white overflow-hidden">
      {/* fondo de estrellas */}
      <Starfield />

      {/* top bar */}
      <Header />

      {/* layout principal */}
      <main className="relative z-0 mx-auto grid max-w-[1500px] grid-cols-12 gap-6 px-4 py-6 lg:px-8 lg:py-8">
        {/* ===== sidebar izquierdo ===== */}
        <Sidebar
          title={t("historial.title")}
          description={t("historial.description")}
          ctaText={t("historial.oniriaPro")}
          timeline={timeline}
        />

        {/* ===== panel central con marco sci-fi ===== */}
        <Card className="col-span-12 md:col-span-8 xl:col-span-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6">
          {/* barra superior del panel (pills + insignias) */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="h-10 w-10 grid place-items-center rounded-xl bg-white/5 border border-white/10">
                <MoreHorizontal size={18} />
              </button>
              <div className="flex items-center gap-2">
                <Pill>{/* fecha tipo label */}Jueves, 15 de septiembre</Pill>
                <Pill>
                  {t("historial.visibility")}:&nbsp;
                  <span className="inline-flex items-center gap-1">
                    <GlobeIcon size={14} /> {t("historial.public")}
                  </span>
                </Pill>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70 mr-2">
                {t("historial.insignia")}
              </span>

              <button className="ml-2 rounded-full p-2 bg-white/5 border border-white/10">
                <HelpCircle size={16} />
              </button>
            </div>
          </div>

          {/* marco / contenedor del orbe con “esquinas” */}
          <div className="relative rounded-2xl border border-fuchsia-400/25 p-6 md:p-8">
            <div className="pointer-events-none absolute -top-1 left-8 h-[6px] w-40 bg-fuchsia-400/70 rounded" />
            <div className="pointer-events-none absolute -top-1 right-24 h-[6px] w-24 bg-fuchsia-400/70 rounded" />
            <div className="pointer-events-none absolute -bottom-1 right-8 h-[6px] w-40 bg-fuchsia-400/70 rounded" />
            <div className="pointer-events-none absolute -bottom-1 left-24 h-[6px] w-24 bg-fuchsia-400/70 rounded" />

            {/* columna de barras a la izquierda (UI deco) */}
            <div className="absolute left-5 top-16 flex flex-col gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 w-3 rounded-sm bg-fuchsia-500/70" />
              ))}
            </div>
          </div>
        </Card>
      </main>

      {/* menú flotante */}
      <div className="fixed right-6 top-5 z-20">
        <button className="rounded-full p-2 bg-white/10 border border-white/20">
          <Menu size={18} />
        </button>
      </div>

      {/* acciones footer */}
      <div className="fixed bottom-4 right-4 z-20 hidden md:flex items-center gap-2 text-xs text-white/60">
        <button className="rounded-full bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/15">
          {t("historial.soporte")}
        </button>
        <button className="rounded-full bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/15">
          {t("historial.atajos")}
        </button>
        <button className="rounded-full bg-white/10 px-3 py-1 border border-white/10 hover:bg-white/15 flex items-center gap-1">
          <LogOut size={12} /> {t("historial.salir")}
        </button>
      </div>
    </div>
  );
}
