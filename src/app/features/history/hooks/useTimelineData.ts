import { useState, useEffect } from "react";
import type { TimelineItem } from "../model/TimelineItem";
import useHistory from "./useHistory";

export function useTimelineData() {
    const [timeline, setTimeline] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { fetchHistory } = useHistory();

    useEffect(() => {
        let mounted = true;

        const loadHistory = async () => {
            try {
                const data = await fetchHistory();
                if (mounted) {
                    setTimeline(
                        Array.isArray(data)
                            ? data.map(item => ({
                                ...item,
                                id: typeof item.id === "string" ? Number(item.id) : item.id
                            }))
                            : []
                    );
                }
            } catch (e: any) {
                if (mounted) {
                    setError(e?.message ?? "Error cargando historial");
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadHistory();

        return () => {
            mounted = false;
        };
    }, [fetchHistory]);

    return { timeline, loading, error };
}