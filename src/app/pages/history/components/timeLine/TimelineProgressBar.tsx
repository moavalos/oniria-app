type TimelineProgressBarProps = {
    progress: number;
    selectedId?: number;
};

export default function TimelineProgressBar({
    progress,
    selectedId
}: TimelineProgressBarProps) {
    return (
        <>
            {/* Barra base */}
            <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded bg-white/15" />

            {/* Barra de progreso animada */}
            <div
                key={`progress-${selectedId}`}
                className="absolute left-3 top-2 w-[3px] rounded bg-fuchsia-400 progress-bar"
                style={{
                    '--progress-height': `calc(${progress * 100}% + 6px)`,
                } as React.CSSProperties}
            />
        </>
    );
}