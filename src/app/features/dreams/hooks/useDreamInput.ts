import { useState, useMemo, useRef } from "react";

interface UseDreamInputProps {
  initialDream?: string;
  maxChars?: number;
}

export function useDreamInput({ initialDream = "", maxChars = 1200 }: UseDreamInputProps = {}) {
  const [dream, setDream] = useState(initialDream);
  const dreamRef = useRef<HTMLTextAreaElement>(null);

  const charsLeft = useMemo(() => maxChars - dream.length, [dream, maxChars]);
  const isEmpty = dream.trim().length === 0;
  const isTooLong = dream.length > maxChars;

  const handleTextChange = (value: string) => {
    if (value.length <= maxChars) {
      setDream(value);
    }
  };

  return {
    dream,
    dreamRef,
    charsLeft,
    isEmpty,
    isTooLong,
    handleTextChange,
  };
}
