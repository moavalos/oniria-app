type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/20 
                  bg-gradient-to-b from-black/30 via-purple-800/50 to-purple-500/30 
                  backdrop-blur-md shadow-2xl text-left ${className}`}
    >
      {children}
    </div>
  );
}
