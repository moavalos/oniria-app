import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <h1 className="text-3xl font-bold text-black">{t("notFound.message")}</h1>
      <Link to="/" className="text-3xl underline text-primary">{t("notFound.link")}</Link>
    </div>
  );
}
