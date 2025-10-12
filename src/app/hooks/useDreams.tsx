import { DreamsService, type DreamAPIResponse } from "@/services/DreamsService";
import { useState } from "react";

export default function useDreams() {
  const [dreams, setDreams] = useState<DreamAPIResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDreams = async (description: string) => {
    setLoading(true);
    setError(null);

    try {
      const service = new DreamsService();
      const response = await service.fetchDreamInterpretation(description);
      setDreams([response]);
      console.log(response);
      return response;
    } catch (err: any) {
      setError("Failed to fetch dream interpretation: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { dreams, loading, error, fetchDreams };
}
