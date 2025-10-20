import Starfield from "@/app/shared/components/Starfield";
import { useTranslation } from "react-i18next";
import HeaderContainer from "@/app/shared/components/users/HeaderContainer";
import UnifiedSidePanel from "../main/components/Panel";
import { useTimelineData } from "@/app/features/history/hooks/useTimelineData";
import HistoryContent from "./components/HistoryContent";

export default function History() {
  const { t } = useTranslation();
  const { timeline, loading, error } = useTimelineData();

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(60%_80%_at_50%_0%,#1b0f2a_0%,#0b0810_55%,#06050b_100%)] text-white overflow-hidden">
      <Starfield />
      <HeaderContainer />

      <main className="relative z-0 mx-auto grid max-w-[1980px] grid-cols-12 gap-6 px-4 py-6 lg:py-5">
        <UnifiedSidePanel
          variant="history"
          title={t("historial.title")}
          description={t("historial.description")}
          ctaText={t("historial.oniriaPro")}
          timeline={timeline}
          loading={loading}
        />

        <HistoryContent timeline={timeline} loading={loading} error={error} />
      </main>
    </div>
  );
}
