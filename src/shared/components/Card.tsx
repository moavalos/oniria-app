type CardProps = {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
};

export default function Card({
  children,
  className,
  scrollable = false,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/20 overflow-hidden   h-full
                  bg-gradient-to-b from-black/30 via-purple-800/50 to-purple-500/30 
                  backdrop-blur-md shadow-2xl text-left p-4 ${className} ${
        scrollable ? "pr-2" : ""
      }`}
    >
      <div
        className={`overflow-hidden w-full h-full  ${
          scrollable ? "scrollbar overflow-y-scroll" : ""
        } `}
      >
        <div
          className={`w-full h-full flex flex-col gap-4 ${
            scrollable ? "pr-1" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
