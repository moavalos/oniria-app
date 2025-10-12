export function TimelineProgressBar({ progress, height }: { progress: number; height: number }) {
    return (
        <>
            {/* Barra base */}
            <div
                className="absolute left-3 w-[3px] rounded bg-white/15 top-[25px]"
                style={{ height: `${height}px` }}
            />
            {/* Barra de progreso */}
            <div
                className="absolute left-3 w-[3px] rounded bg-gradient-to-b from-fuchsia-500 via-fuchsia-400 to-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.5)] transition-all duration-500 ease-out top-[25px]"
                style={{ height: `${height * progress}px` }}
            />
        </>
    );
}