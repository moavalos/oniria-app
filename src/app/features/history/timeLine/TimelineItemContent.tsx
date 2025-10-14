export function TimelineItemContent({
    creationDate,
    title,
    isActive,
    onSelect,
}: {
    creationDate: string;
    title: string;
    isActive: boolean;
    onSelect: () => void;
}) {
    return (
        <button type="button" onClick={onSelect} className="text-left group w-full">
            <div className="text-[11px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-hover)] transition-colors">
                {creationDate}
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
