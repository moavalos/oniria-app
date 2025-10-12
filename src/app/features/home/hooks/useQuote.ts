import { useState } from "react";
import { getRandomQuote } from "@/app/features/home/services/home.service";

interface UseQuoteProps {
  initialQuote?: string;
  initialLoading?: boolean;
  onNuevaFrase?: () => void;
}

export function useQuote({ 
  initialQuote = "Lo que no se nombra, se sueña",
  initialLoading = false,
  onNuevaFrase 
}: UseQuoteProps = {}) {
  const [quoteText, setQuoteText] = useState(initialQuote);
  const [isLoading, setIsLoading] = useState(initialLoading);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const q = await getRandomQuote();
      setQuoteText(q);
      onNuevaFrase?.();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    quoteText,
    isLoading,
    handleRefresh,
  };
}
