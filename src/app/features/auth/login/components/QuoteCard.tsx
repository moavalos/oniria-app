import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import quotesEs from "../quotes/quotes-es.json";
import quotesEn from "../quotes/quotes-en.json";

interface Quote {
  author: string;
  work: string;
  quote: string;
}

export default function QuoteCard() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { i18n } = useTranslation();

  // Seleccionar el conjunto de citas según el idioma
  const quotes = i18n.language === "es" ? quotesEs : quotesEn;

  useEffect(() => {
    // Seleccionar una quote aleatoria al montar
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);

    // Cambiar de quote cada 15 segundos con fade
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // Después de 500ms (tiempo del fade), cambiar la quote
      setTimeout(() => {
        const newRandomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[newRandomIndex]);
        // Fade in
        setIsVisible(true);
      }, 500);
    }, 15000); // 15 segundos

    return () => clearInterval(interval);
  }, [quotes]);

  if (!currentQuote) return null;

  return (
    <div className="absolute bottom-8 left-8 right-8 z-10">
      <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 max-w-2xl">
        <blockquote
          className={`space-y-4 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-gray-200 text-md italic leading-relaxed">
            "{currentQuote.quote}"
          </p>
          <footer className="text-sm text-gray-400">
            <cite className="not-italic">
              <span className="font-semibold text-gray-300">
                {currentQuote.author}
              </span>
              {" — "}
              <span className="italic">{currentQuote.work}</span>
            </cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
