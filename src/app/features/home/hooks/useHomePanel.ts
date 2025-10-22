import { useNavigate } from "react-router";
import { useDreamInput } from "../../hud/components/dreams/hooks/useDreamInput";
import useQuote from "./useQuote";

interface UseHomePanelProps {
    initialDream?: string;
    maxChars?: number;
    onNuevaFrase?: () => void;
    quote?: string;
    loadingQuote?: boolean;
    onInterpretar?: (_dream: string) => void;
    onPersonalizar?: () => void;
    onInsignias?: () => void;
}

export function useHomePanel({
    initialDream = "",
    maxChars = 1200,
    onNuevaFrase,
    quote = "Lo que no se nombra, se sueña",
    loadingQuote = false,
    onInterpretar,
    onPersonalizar,
    onInsignias,
}: UseHomePanelProps) {
    const navigate = useNavigate();

    const { dream, dreamRef, charsLeft, isEmpty, isTooLong, handleTextChange } =
        useDreamInput({ initialDream, maxChars });

    const { quoteText, isLoading: isLoadingQuote, handleRefresh: handleNuevaFrase } = useQuote({
        initialQuote: quote,
        initialLoading: loadingQuote,
        onNuevaFrase,
    });

    const handleInterpretar = () => {
        if (!isEmpty && !isTooLong) {
            onInterpretar?.(dreamRef.current?.value || "");
        }
    };

    const handlePersonalizar = () => {
        onPersonalizar?.();
    };

    const handleInsignias = () => {
        onInsignias?.();
    };

    const handleNavigateHistory = () => {
        navigate("/historial");
    };

    const handleCtaClick = () => {
        console.log("CTA click");
    };

    return {
        dream,
        dreamRef,
        charsLeft,
        isEmpty,
        isTooLong,
        handleTextChange,
        handleInterpretar,
        quoteText,
        isLoadingQuote,
        handleNuevaFrase,
        handlePersonalizar,
        handleInsignias,
        handleNavigateHistory,
        handleCtaClick,
    };
}