export function TimelineItemContent({
    date,
    title,
    isActive,
    onSelect,
}: {
    date: string;
    title: string;
    isActive: boolean;
    onSelect: () => void;
}) {
    return (
        <button type="button" onClick={onSelect} className="text-left group w-full">
            <div className="text-[11px] text-white/60 group-hover:text-white/80 transition-colors">
                {date}
            </div>
            <div className={`truncate ${isActive ? "text-white font-semibold" : "text-white/85"}`}>
                {title}
            </div>
            {isActive && (
                <div className="h-[2px] w-10 mt-1 rounded bg-fuchsia-400/70" />
            )}
        </button>
    );
}