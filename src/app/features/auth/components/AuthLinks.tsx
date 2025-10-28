import { useTranslation } from "react-i18next";

interface AuthLinksProps {
  href: string;
  section: "login" | "register"; // para que TypeScript te guíe
}

export default function AuthLinks({ href, section }: AuthLinksProps) {
  const { t } = useTranslation();

  return (
    <p className="text-gray-200 text-sm mt-2 font-light flex items-center gap-1">
      <span>{t(`${section}.text`)}</span>
      <a href={href} className="text-purple-300 font-light hover:underline">
        {t(`${section}.textLink`)}
      </a>
    </p>
  );
}
