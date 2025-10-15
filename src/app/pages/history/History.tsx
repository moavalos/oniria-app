import Starfield from "@shared/components/Starfield";
import { useTranslation } from "react-i18next";
import HeaderContainer from "@/shared/components/users/HeaderContainer";
import UnifiedSidePanel from "../home/components/Panel";
import { useTimelineData } from "@/app/features/history/hooks/useTimelineData";
import HistoryContent from "./components/HistoryContent";
import type { HistoryFilters } from "@/app/features/history/model/types";
import { useCallback, useState } from "react";
import Card from "@/shared/components/Card";

export default function History() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<HistoryFilters>({});
  const { timeline, loading, error } = useTimelineData(filters);

  const handleChangeFilters = useCallback((newFilters: HistoryFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="w-full h-dvh text-[var(--color-text-primary)] overflow-hidden flex flex-col"
      style={{ background: "var(--app-bg)" }}>
      <Starfield />
      <HeaderContainer />

      <main className="container relative z-0 mx-auto grid grid-cols-12 gap-4 flex-1 min-h-0 pb-4">
        <UnifiedSidePanel
          variant="history"
          title={t("history.title")}
          description={t("history.description")}
          ctaText={t("history.oniriaPro")}
          timeline={timeline}
          loading={loading}
          onChangeFilters={handleChangeFilters}
          scrollable
        />
        <Card.Container className="col-span-12 sm:col-span-9 rounded-2xl border backdrop-blur-md p-5 md:p-4 overflow-hidden relative">
          <HistoryContent timeline={timeline} loading={loading} error={error} />
        </Card.Container>
      </main>
    </div>
  );
}
