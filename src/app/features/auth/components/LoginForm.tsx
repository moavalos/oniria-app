import { useState } from "react";
import { useTranslation } from "react-i18next";
import ModalButton from "@/app/shared/components/ModalButton";
import { useAuth } from "@features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Icon from "@/assets/icons/Icon";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(t("login.error", { defaultValue: "Error al iniciar sesión" }));
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-30">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("login.email")}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("login.password")}
          className="w-full px-4 py-2 pr-12 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-gray-300 transition-colors"
        >
          <Icon name={showPassword ? "eye-close" : "eye-open"} size={20} />
        </button>
      </div>

      <a
        href="/forgot-password"
        className="text-purple-300 text-sm font-light self-end hover:underline"
      >
        {t("login.forgot")}
      </a>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ModalButton type="submit" icon={<Icon name="arrow" size={18} />}>
        {t("login.button")}
      </ModalButton>
    </form>
  );
}
