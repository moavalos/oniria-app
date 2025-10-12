import type { Session } from "@supabase/supabase-js";

export type NodeListItem = {
  id: string;
  title: string;
  interpretation: string;
  creationDate: string;
};

export type HistoryApiResponse = {
  data: NodeListItem[];
  pagination: {
    currentPage: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};
export class HistoryService {
  async fetchHistory(session: Session | null): Promise<HistoryApiResponse> {
    if (!session?.access_token) {
      throw new Error("No authentication token available");
    }

    const response = await fetch("http://localhost:3000/api/dreams/history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching history: ${response.statusText}`);
    }

    return await response.json();
  }
}
