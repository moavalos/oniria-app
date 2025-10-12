import { useState } from "react";
import { QuotesService, type QuotesAPIResponse } from "../services/quotes.service";

export default function UseQuoteS({ initialQuote, initialLoading, onNuevaFrase }: { initialQuote: string; initialLoading: boolean; onNuevaFrase: (() => void) | undefined; }) {

  const [quotes, setQuotes] = useState<QuotesAPIResponse[]>([]);
  const [quoteText, setQuoteText] = useState(initialQuote);
  const [isLoading, setIsLoading] = useState(initialLoading);

  // TODO MODIFICAR
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const service = new QuotesService();
      const q = await service.fetchQuotes();
      setQuotes(Array.isArray(q) ? q : [q]);
      setQuoteText(initialQuote);
      onNuevaFrase?.();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    quoteText,
    quotes,
    isLoading,
    handleRefresh,
  };
}
