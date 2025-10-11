import type { MutableRefObject, RefObject } from "react";
import TimelineItem, { type TimelineItemType } from "./TimelineItem";

type TimelineListProps = {
    items: TimelineItemType[];
    selectedId?: number;
    onSelect: (_id: number) => void;
    listRef: RefObject<HTMLUListElement | null>;
    itemRefs: MutableRefObject<Map<number, HTMLLIElement>>;
};

export default function TimelineList({
    items,
    selectedId,
    onSelect,
    listRef,
    itemRefs
}: TimelineListProps) {
    return (
        <ul
            ref={listRef}
            tabIndex={0}
            className="space-y-6 pl-10 pr-2 outline-none"
            aria-label="Línea de tiempo"
        >
            {items.map((item) => (
                <TimelineItem
                    key={item.id}
                    item={item}
                    isActive={item.id === selectedId}
                    onSelect={onSelect}
                    itemRef={(el) => {
                        if (el) {
                            itemRefs.current.set(item.id, el);
                        } else {
                            itemRefs.current.delete(item.id);
                        }
                    }}
                />
            ))}
        </ul>
    );
}