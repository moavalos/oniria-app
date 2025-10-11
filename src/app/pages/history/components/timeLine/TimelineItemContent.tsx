type TimelineItemContentProps = {
    date: string;
    title: string;
    isActive: boolean;
    itemId: number;
    onSelect: () => void;
};

export default function TimelineItemContent({
    date,
    title,
    isActive,
    itemId,
    onSelect
}: TimelineItemContentProps) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className="text-left group w-full"
        >
            <div className="text-[11px] text-white/60 group-hover:text-white/80 transition-colors">
                {date}
            </div>
            <div
                className={`truncate title-text ${isActive ? "text-white font-semibold" : "text-white/85"
                    }`}
            >
                {title}
            </div>
            {isActive && (
                <div
                    key={`underline-${itemId}`}
                    className="h-[2px] w-10 mt-1 rounded bg-fuchsia-400/70 underline-active"
                />
            )}
        </button>
    );
}