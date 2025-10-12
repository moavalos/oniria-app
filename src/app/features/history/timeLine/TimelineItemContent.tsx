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
            <div className="text-[11px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-hover)] transition-colors">
                {date}
            </div>
            <div
                className={`truncate ${isActive
                    ? "font-semibold text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)]"
                    }`}
            >
                {title}
            </div>
            {isActive && (
                <div className="h-[2px] w-10 mt-1 rounded bg-[var(--color-active-bar)]" />
            )}
        </button>
    );
}
