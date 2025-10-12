import Card from "@/shared/components/Card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import "../styles/LeftPanel.css";
import DreamTextarea from "@/shared/components/DreamTextarea";
import BadgeIcon from "@/assets/icons/BadgeIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import MenuButton from "@/shared/components/MenuButton";
import ClockIcon from "@/assets/icons/ClockIcon";
import CtaButton from "@/shared/components/CtaButton";
import QuoteCard from "@/shared/components/QuoteCard";
import { useDreamInput } from "../../../features/home/hooks/useDreamInput";
import { useQuote } from "../../../features/home/hooks/useQuote";
import { useCallback, useMemo, useRef, useState } from "react";
import SidebarHeader from "../../history/components/SidebarHeader";
import { useTimelineScroll } from "@/app/features/history/timeLine/hooks/useTimelineScroll";
import { useTimelineKeyboard } from "@/app/features/history/timeLine/hooks/useTimelineKeyboard";
import { TimelineProgressBar } from "@/app/features/history/timeLine/TimelineProgressBar";
import { TimelineList } from "@/app/features/history/timeLine/TimelineList";
import { useTimelineProgress } from "@/app/features/history/timeLine/hooks/useTimelineProgress";
import type { TimelineItem } from "@/app/features/history/model/TimelineItem";

type HistoryVariantProps = {
    variant: "history";
    title: string;
    description: string;
    ctaText: string;
    timeline: TimelineItem[];
    initialSelectedId?: number;
    onSelectItem?: (_item: TimelineItem) => void;
    onCta?: (_item: TimelineItem) => void;
    ctaDisabled?: boolean;
    loading?: boolean;
};

type HomeVariantProps = {
    variant: "home";
    onInterpretar?: (_dream: string) => void;
    onPersonalizar?: () => void;
    onInsignias?: () => void;
    initialDream?: string;
    maxChars?: number;
    onNuevaFrase?: () => void;
    quote?: string;
    loadingQuote?: boolean;
    showQuoteCard?: boolean;
};

type UnifiedSidePanelProps = HistoryVariantProps | HomeVariantProps;

function HistoryPanel(props: HistoryVariantProps) {
    const {
        title,
        description,
        ctaText,
        timeline,
        initialSelectedId,
        onSelectItem,
        onCta,
        ctaDisabled = false,
        loading = false,
    } = props;

    const initialSelected =
        initialSelectedId ??
        timeline.find((t) => t.active)?.id ??
        (timeline.length ? timeline[0].id : undefined);

    const [selectedId, setSelectedId] = useState<number | undefined>(initialSelected);
    const [ctaPressed, setCtaPressed] = useState(false);

    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map());

    const items = useMemo(
        () =>
            timeline.map((t) => ({
                ...t,
                active: t.id === selectedId,
            })),
        [timeline, selectedId]
    );

    const selectedIndex = useMemo(
        () => items.findIndex((i) => i.id === selectedId),
        [items, selectedId]
    );

    const selectedItem = useMemo(() => items[selectedIndex], [items, selectedIndex]);

    const handleSelect = useCallback(
        (id: number) => {
            setSelectedId(id);
            const found = timeline.find((t) => t.id === id);
            if (found && onSelectItem) onSelectItem(found);
        },
        [timeline, onSelectItem]
    );

    const handleCTA = useCallback(async () => {
        if (!selectedItem || ctaDisabled) return;
        setCtaPressed(true);
        try {
            await onCta?.(selectedItem);
        } finally {
            setTimeout(() => setCtaPressed(false), 400);
        }
    }, [onCta, selectedItem, ctaDisabled]);

    const { progress, barHeight } = useTimelineProgress({
        listRef,
        itemRefs,
        items,
        selectedId,
    });

    useTimelineScroll({
        selectedId,
        itemRefs,
        listRef,
    });

    useTimelineKeyboard({
        listRef,
        items,
        selectedIndex,
        onSelect: handleSelect,
    });

    return (
        <Card className="col-span-12 md:col-span-4 xl:col-span-4 p-6 h-[88vh] flex flex-col text-[15px]">
            <SidebarHeader title={title} description={description} />

            {loading ? (
                <div className="space-y-4 flex-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-6 w-full rounded bg-white/10 animate-pulse" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="relative flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <TimelineProgressBar progress={progress} height={barHeight} />
                        <TimelineList
                            items={items}
                            selectedId={selectedId}
                            onSelect={handleSelect}
                            listRef={listRef}
                            itemRefs={itemRefs}
                        />
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                        <CtaButton
                            ctaText={ctaText}
                            onClick={handleCTA}
                            disabled={ctaDisabled}
                            pressed={ctaPressed}
                        />
                    </div>
                </>
            )}
        </Card>
    );
}

function HomePanel(props: HomeVariantProps) {
    const {
        onInterpretar,
        onPersonalizar,
        onInsignias,
        initialDream = "",
        maxChars = 1200,
        onNuevaFrase,
        quote = "Lo que no se nombra, se sueña",
        loadingQuote = false,
        showQuoteCard = true,
    } = props;

    const navigate = useNavigate();
    const { t } = useTranslation();

    const { dream, dreamRef, charsLeft, isEmpty, isTooLong, handleTextChange } =
        useDreamInput({ initialDream, maxChars });

    const { quoteText, isLoading: isLoadingQ, handleRefresh: handleNuevaFrase } = useQuote({
        initialQuote: quote,
        initialLoading: loadingQuote,
        onNuevaFrase,
    });

    return (
        <Card className="col-span-12 md:col-span-3 min-w-[300px] p-6 text-[15px] space-y-4 -my-4">
            {/* Dream Input Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-black/15">
                <DreamTextarea
                    ref={dreamRef}
                    value={dream}
                    onChange={handleTextChange}
                    maxChars={maxChars}
                    charsLeft={charsLeft}
                    isTooLong={isTooLong}
                />

                <button
                    onClick={() => {
                        if (!isEmpty && !isTooLong) onInterpretar?.(dreamRef.current?.value || "");
                    }}
                    disabled={isEmpty || isTooLong}
                    className="tap-button mt-4 w-full rounded-xl bg-gradient-to-r from-fuchsia-700 to-fuchsia-600
                     px-4 py-3 text-[14px] font-bold border border-fuchsia-400/30
                     shadow-[0_0_22px_rgba(217,70,239,0.35)]
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition-transform duration-200"
                >
                    <span className="inline-flex items-center gap-2">
                        {t("node.interpretar")}
                    </span>
                </button>
            </div>

            {/* Quote Card */}
            {showQuoteCard && (
                <QuoteCard quote={quoteText} isLoading={isLoadingQ} onRefresh={handleNuevaFrase} />
            )}

            {/* Menu Section */}
            <div className="px-4 sm:px-5 pb-[45px] rounded-2xl bg-white/5 border border-white/15">
                <div className="text-[12px] mt-4 font-semibold text-white/80 mb-3">
                    {t("node.myroom")}
                </div>

                <MenuButton
                    icon={<SettingsIcon />}
                    title={t("node.personalizar")}
                    description={t("node.toque")}
                    onClick={onPersonalizar || (() => { })}
                />

                <MenuButton
                    icon={<BadgeIcon />}
                    title={t("node.insignia")}
                    description={t("node.descriptionInsignia")}
                    onClick={onInsignias || (() => { })}
                />

                <MenuButton
                    icon={<ClockIcon />}
                    title={t("historial.link")}
                    description={t("historial.verSuenos")}
                    onClick={() => navigate("/historial")}
                />
            </div>

            {/* CTA PRO */}
            <CtaButton
                ctaText={t("historial.oniriaPro")}
                onClick={() => console.log("CTA click")}
                disabled={false}
                pressed={false}
            />
        </Card>
    );
}
export default function UnifiedSidePanel(props: UnifiedSidePanelProps) {
    return props.variant === "history" ? (
        <HistoryPanel {...props} />
    ) : (
        <HomePanel {...props} />
    );
}
