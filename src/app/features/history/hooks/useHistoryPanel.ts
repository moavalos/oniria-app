import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TimelineItem } from "../model/TimelineItem";
import { useTimelineProgress } from "../timeLine/hooks/useTimelineProgress";
import { useTimelineScroll } from "../timeLine/hooks/useTimelineScroll";
import { useTimelineKeyboard } from "../timeLine/hooks/useTimelineKeyboard";

interface UseHistoryPanelProps {
    timeline: TimelineItem[];
    initialSelectedId?: number;
    onSelectItem?: (item: TimelineItem) => void;
    onCta?: (item: TimelineItem) => void;
    ctaDisabled?: boolean;
}

export function useHistoryPanel({
    timeline,
    initialSelectedId,
    onSelectItem,
}: UseHistoryPanelProps) {
    const initialSelected =
        initialSelectedId ??
        timeline.find((t) => t.active)?.id ??
        (timeline.length ? timeline[0].id : undefined);

    const [selectedId, setSelectedId] = useState<number | undefined>(initialSelected);

    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map());

    useEffect(() => {
        if (timeline.length > 0 && selectedId === undefined) {
            const calculatedId =
                initialSelectedId ??
                timeline.find((t) => t.active)?.id ??
                timeline[0].id;

            setSelectedId(calculatedId);
        }
    }, [timeline, initialSelectedId, selectedId]);

    const items = useMemo(
        () =>
            timeline.map((t) => ({
                ...t,
                active: t.id === selectedId,
                creationDate: t.creationDate || "",
            })),
        [timeline, selectedId]
    );

    const selectedIndex = useMemo(
        () => {
            const index = items.findIndex((i) => i.id === selectedId);
            return index;
        },
        [items, selectedId]
    );

    const selectedItem = useMemo(() => {
        const item = items[selectedIndex];
        return item;
    }, [items, selectedIndex]);

    const handleSelect = useCallback(
        (id: number) => {
            setSelectedId(id);
            const found = timeline.find((t) => t.id === id);
            if (found && onSelectItem) onSelectItem(found);
        },
        [timeline, onSelectItem]
    );

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

    return {
        selectedId,
        items,
        selectedItem,
        handleSelect,
        listRef,
        itemRefs,
        progress,
        barHeight,
    };
}