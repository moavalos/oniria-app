export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full max-w-md p-8 rounded-2xl 
                 bg-gradient-to-b from-black/30 via-purple-800/50 to-purple-500/30
                 backdrop-blur-md border border-white/20 
                 shadow-2xl text-center"
    >
      {children}
    </div>
  );
}
