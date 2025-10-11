type TimelinePointProps = {
    isActive: boolean;
    itemId: number;
    onSelect: () => void;
};

export default function TimelinePoint({
    isActive,
    itemId,
    onSelect
}: TimelinePointProps) {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={isActive}
            aria-current={isActive ? "step" : undefined}
            className="absolute -left-[34px] top-[2px] h-[16px] w-[16px] rounded-full ring-2 
                 focus:outline-none focus-visible:ring-4 focus-visible:ring-fuchsia-400/50
                 transition-all duration-300"
            style={{
                background: isActive ? "rgb(232 121 249)" : "transparent",
                boxShadow: isActive ? "0 0 18px rgba(232,121,249,0.6)" : "none",
            }}
        >
            {isActive && (
                <span
                    key={`pulse-${itemId}`}
                    className="absolute inset-[-6px] rounded-full border border-fuchsia-400/50 pulse-ring"
                />
            )}
        </button>
    );
}