export function TimelinePoint({ isActive, onSelect }: { isActive: boolean; onSelect: () => void }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={isActive}
            className="absolute -left-[42px] top-[10px] h-[16px] w-[16px] rounded-full ring-2 ring-white/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-400/50 transition-all duration-300"
            style={{
                background: isActive ? "rgb(232 121 249)" : "transparent",
                boxShadow: isActive ? "0 0 18px rgba(232,121,249,0.6)" : "none",
            }}
        >
            {isActive && (
                <span className="absolute inset-[-6px] rounded-full border border-fuchsia-400/50 animate-ping" />
            )}
        </button>
    );
}