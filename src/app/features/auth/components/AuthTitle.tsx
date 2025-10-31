interface AuthTitleProps {
  title: string;
  subtitle: string;
  subtitle2?: string;
}

export default function AuthTitle({
  title,
  subtitle,
  subtitle2,
}: AuthTitleProps) {
  return (
    <div className="mb-2">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-gray-300 mt-1 text-md">{subtitle}</p>
      <p className="text-gray-300/70 mt-6 text-sm mb-0 pt-0">{subtitle2}</p>
    </div>
  );
}
