import { TimelineItemContent } from "./TimelineItemContent";
import { TimelinePoint } from "./TimelinePoint";

export type TimelineItemType = {
    id: number;
    creationDate: string;
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
                creationDate={item.creationDate}
                title={item.title}
                isActive={isActive}
                onSelect={() => onSelect(item.id)}
            />
        </li>
    );
}