import { useEffect, type RefObject } from "react";
import type { TimelineItemType } from "../TimelineItem";

type UseTimelineKeyboardProps = {
    listRef: RefObject<HTMLUListElement | null>;
    items: TimelineItemType[];
    selectedIndex: number;
    onSelect: (_id: number) => void;
};

export function useTimelineKeyboard({ listRef, items, selectedIndex, onSelect }: UseTimelineKeyboardProps) {
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        const onKey = (e: KeyboardEvent) => {
            if (!["ArrowUp", "ArrowDown"].includes(e.key)) return;
            e.preventDefault();

            if (e.key === "ArrowUp") {
                const idx = Math.max(0, selectedIndex - 1);
                onSelect(items[idx]?.id);
            } else if (e.key === "ArrowDown") {
                const idx = Math.min(items.length - 1, selectedIndex + 1);
                onSelect(items[idx]?.id);
            }
        };

        el.addEventListener("keydown", onKey);
        return () => el.removeEventListener("keydown", onKey);
    }, [items, selectedIndex, onSelect, listRef]);
}