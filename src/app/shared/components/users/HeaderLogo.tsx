type HeaderLogoProps = {
  text?: string;
  onClick?: () => void;
};

export default function HeaderLogo({ text, onClick }: HeaderLogoProps) {
  return (
    <div
      className="header-logo md:flex items-center gap-2 rounded-full px-3 py-1.5 border border-gray-500 transition-all duration-200 ease-out cursor-pointer backdrop-blur-2xl"
      onClick={onClick}
    >
      <span className="header-logo-text">{text}</span>
      <span className="bg-primary rounded-sm px-2 text-sm text-light font-extralight">
        Beta
      </span>
    </div>
  );
}
