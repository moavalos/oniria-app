import { useTranslation } from "react-i18next";

interface AuthLinksProps {
  href: string;
  section: "login" | "register"; // para que TypeScript te guíe
}

export default function AuthLinks({ href, section }: AuthLinksProps) {
  const { t } = useTranslation();

  return (
    <p className="text-gray-300 text-sm mt-6">
      {t(`${section}.text`)}{" "}
      <a href={href} className="text-pink-600 font-bold hover:underline">
        {t(`${section}.textLink`)}
      </a>
    </p>
  );
}
