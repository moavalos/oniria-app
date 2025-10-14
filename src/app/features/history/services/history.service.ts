import type { Session } from "@supabase/supabase-js";
import type { HistoryApiResponse, HistoryFilters, HistoryPagination } from "../model/types";

export function buildQueryParams(filters: HistoryFilters = {}, pagination: HistoryPagination = {}) {
  console.log("filtros recibidos:", filters);

  const url = new URL("http://localhost:3000/api/dreams/history");

  const add = (k: string, v: unknown) => {
    if (v === undefined || v === null) return;
    const s = String(v).trim();
    if (s.length) url.searchParams.append(k, s);

  };

  if (filters.state) add("state", filters.state);
  if (filters.privacy) add("privacy", filters.privacy);
  if (filters.search) add("search", filters.search);
  if (filters.from) add("from", filters.from);
  if (filters.to) add("to", filters.to);

  if (filters.emotion) {
    if (Array.isArray(filters.emotion)) {

      filters.emotion.forEach((e) => add("emotion", e));
    } else {
      add("emotion", filters.emotion);
    }
  }

  if (pagination.page !== undefined) add("page", pagination.page);
  if (pagination.limit !== undefined) add("limit", pagination.limit);

  return url.toString();
}

export class HistoryService {
  async fetchHistory(session: Session | null, opts?: { filters?: HistoryFilters; pagination?: HistoryPagination }): Promise<HistoryApiResponse> {
    if (!session?.access_token) {
      throw new Error("No authentication token available");
    }

    const url = buildQueryParams(opts?.filters, opts?.pagination);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching history: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Data in service: ", data);

    return data;
  }
}
