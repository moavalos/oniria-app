import { TimelineItemContent } from "./TimelineItemContent";
import { TimelinePoint } from "./TimelinePoint";

export type TimelineItemType = {
    id: number;
    date: string;
    title: string;
};

export function TimelineItem({
    item,
    isActive,
    onSelect,
    itemRef,
}: {
    item: TimelineItemType;
    isActive: boolean;
    onSelect: (_id: number) => void;
    itemRef: (_el: HTMLLIElement | null) => void;
}) {
    return (
        <li className="relative" ref={itemRef}>
            <TimelinePoint isActive={isActive} onSelect={() => onSelect(item.id)} />
            <TimelineItemContent
                date={item.date}
                title={item.title}
                isActive={isActive}
                onSelect={() => onSelect(item.id)}
            />
        </li>
    );
}