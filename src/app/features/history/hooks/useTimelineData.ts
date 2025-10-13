import { useState, useEffect } from "react";
import type { TimelineItem } from "../model/TimelineItem";
import useHistory from "./useHistory";
import { mapHistoryToTimeline } from "./utils/mapHistoryToTimeline";
import type { HistoryApiResponse } from "../services/history.service";

export function useTimelineData() {
    const [timeline, setTimeline] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { fetchHistory } = useHistory();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const resp = await fetchHistory();
                if (!mounted) return;
                setTimeline(mapHistoryToTimeline(resp as HistoryApiResponse));
            } catch (e: any) {
                if (mounted) setError(e?.message ?? "Error cargando historial");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    return { timeline, loading, error };
}