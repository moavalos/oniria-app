import TimelinePoint from "./TimelinePoint";
import TimelineItemContent from "./TimelineItemContent";

export type TimelineItemType = {
    id: number;
    date: string;
    title: string;
    active?: boolean;
};

type TimelineItemProps = {
    item: TimelineItemType;
    isActive: boolean;
    onSelect: (_id: number) => void;
    itemRef: (_el: HTMLLIElement | null) => void;
};

export default function TimelineItem({
    item,
    isActive,
    onSelect,
    itemRef
}: TimelineItemProps) {
    return (
        <li className="relative" ref={itemRef}>
            <TimelinePoint
                isActive={isActive}
                itemId={item.id}
                onSelect={() => onSelect(item.id)}
            />
            <TimelineItemContent
                date={item.date}
                title={item.title}
                isActive={isActive}
                itemId={item.id}
                onSelect={() => onSelect(item.id)}
            />
        </li>
    );
}