import Starfield from "@shared/components/Starfield";
import { useTranslation } from "react-i18next";
import HeaderContainer from "@/shared/components/users/HeaderContainer";
import UnifiedSidePanel from "../home/components/Panel";
import { useTimelineData } from "@/app/features/history/hooks/useTimelineData";
import HistoryContent from "./components/HistoryContent";
import type { HistoryFilters } from "@/app/features/history/model/types";
import { useCallback, useState } from "react";

export default function History() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<HistoryFilters>({});
  const { timeline, loading, error } = useTimelineData(filters);

  const handleChangeFilters = useCallback((newFilters: HistoryFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(60%_80%_at_50%_0%,#1b0f2a_0%,#0b0810_55%,#06050b_100%)] text-white overflow-hidden">
      <Starfield />
      <HeaderContainer />

      <main className="relative z-0 mx-auto grid max-w-[1980px] grid-cols-12 gap-6 px-4 py-6 lg:py-5">
        <UnifiedSidePanel
          variant="history"
          title={t("history.title")}
          description={t("history.description")}
          ctaText={t("history.oniriaPro")}
          timeline={timeline}
          loading={loading}
          onChangeFilters={handleChangeFilters}
        />

        <HistoryContent timeline={timeline} loading={loading} error={error} />
      </main>
    </div>
  );
}
