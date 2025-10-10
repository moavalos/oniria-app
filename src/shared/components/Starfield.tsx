const dots = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  s: Math.random() * 1.5 + 1.5,
  o: Math.random() * 0.7 + 0.2,
}));
export default function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-white blur-[1px] animate-pulse"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            opacity: d.o,
            boxShadow: "0 0 6px rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}
