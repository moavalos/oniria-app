import { useTranslation } from "react-i18next";
import { useAuth } from "@features/auth/hooks/useAuth";
import googleIcon from "@assets/images/google-icon.svg"
export default function GoogleButton() {
    const { signInWithGoogle } = useAuth();
    const { t } = useTranslation();
    return (
        <button className="w-full flex items-center justify-center gap-2 bg-white py-2 rounded mt-4" onClick={signInWithGoogle}>
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            <span className="text-gray-700">{t("login.google")}</span>
        </button>
    );
}
