export function TimelinePoint({ isActive, onSelect }: { isActive: boolean; onSelect: () => void }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={isActive}
            className="absolute -left-[42px] top-[10px] h-[16px] w-[16px] rounded-full ring-2 focus:outline-none transition-all duration-300"
            style={{
                background: isActive
                    ? "var(--color-timeline-active-bg)"
                    : "transparent",
                boxShadow: isActive
                    ? `0 0 18px var(--color-timeline-active-glow)`
                    : "none",
            }}
        >
            {isActive && (
                <span
                    className="absolute inset-[-6px] rounded-full border animate-ping"
                    style={{ borderColor: "var(--color-timeline-ring-focus)" }}
                />
            )}
        </button>
    );
}