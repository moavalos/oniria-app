import { useState, useCallback } from "react";
import { useAuth } from "@features/auth/hooks/useAuth";
import type { HistoryApiResponse, HistoryFilters, HistoryPagination } from "../model/types";
import { HistoryService } from "../services/history.service";

export default function useHistory() {
  const [history, setHistory] = useState<HistoryApiResponse>({
    data: [],
    pagination: {
      currentPage: 0,
      limit: 0,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  const fetchHistory = useCallback(async (opts?: { filters?: HistoryFilters; pagination?: HistoryPagination }) => {
    setLoading(true);
    setError(null);

    try {
      const service = new HistoryService();
      const response = await service.fetchHistory(session, opts);
      setHistory(response);
      console.log(response);
      return response;
    } catch (err: any) {
      setError("Failed to fetch history: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [session]);

  return { history, loading, error, fetchHistory };
}
