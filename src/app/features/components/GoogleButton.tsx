import { useTranslation } from "react-i18next";

export default function GoogleButton() {
    const { t } = useTranslation();
    return (
        <button className="w-full flex items-center justify-center gap-2 bg-white py-2 rounded mt-4">
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            <span className="text-gray-700">{t("login.google")}</span>
        </button>
    );
}
