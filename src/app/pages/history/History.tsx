import Sidebar from "./components/Sidebar";
import Starfield from "@shared/components/Starfield";
import Header from "@shared/components/Header";
import Card from "@/shared/components/Card";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { TimelineItem } from "./model/TimelineItem";
import { getTimeline } from "@/services/history/history.service";

export default function History() {
  const { t } = useTranslation();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getTimeline();
        if (mounted) setTimeline(
          data.map(item => ({
            ...item,
            id: typeof item.id === "string" ? Number(item.id) : item.id
          }))
        );
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? "Error cargando historial");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

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
          loading={loading}
        />

        <Card className="col-span-12 md:col-span-8 xl:col-span-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-6">
          <div className="mb-3 flex items-center justify-between">
            {loading && <span className="text-sm text-white/70">Cargando…</span>}
            {err && <span className="text-sm text-red-300">{err}</span>}
          </div>

          {!loading && !err && timeline.length === 0 && (
            <div className="text-white/60 text-sm">No hay sueños guardados todavía.</div>
          )}
        </Card>
      </main>
    </div>
  );
}
