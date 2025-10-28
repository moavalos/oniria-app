import { useState } from "react";
import ModalButton from "@/app/shared/components/ModalButton";
import Icon from "@/assets/icons/Icon";
import { useTranslation } from "react-i18next";
import { useAuth } from "@features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(
        t("register.errorPasswordMatch", {
          defaultValue: "Las contraseñas no coinciden",
        })
      );
      return;
    }

    const { error } = await signUp(email, password, username);
    if (error) {
      console.error(error);
      setError(t("register.error", { defaultValue: "Error al registrarse" }));
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      {/* Form Container */}
      <div
        className={`w-full transition-all duration-500 ${
          isSuccess
            ? "translate-x-[-100%] opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-30">
          {error && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-2 text-white placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none"
            placeholder={t("register.username")}
          />

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-2 text-white placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none"
            placeholder={t("register.email")}
          />

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-2 pr-12 text-white placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none"
              placeholder={t("register.password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
            >
              <Icon name={showPassword ? "eye-open" : "eye-close"} size={20} />
            </button>
          </div>

          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-black/40 px-4 py-2 pr-12 text-white placeholder-gray-400 transition-colors focus:border-purple-500 focus:outline-none"
              placeholder={t("register.confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
            >
              <Icon
                name={showConfirmPassword ? "eye-open" : "eye-close"}
                size={20}
              />
            </button>
          </div>

          <ModalButton type="submit" icon={<Icon name="arrow" size={18} />}>
            {t("register.button")}
          </ModalButton>
        </form>
      </div>

      {/* Success Message Container */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isSuccess
            ? "translate-x-0 opacity-100"
            : "translate-x-[100%] opacity-0"
        }`}
      >
        <div className="text-center space-y-6 px-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <Icon name="check" size={32} className="text-green-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              {t("register.successTitle")}
            </h3>
            <p className="text-white/70">{t("register.successMessage")}</p>
          </div>
          <ModalButton
            type="button"
            onClick={() => navigate("/")}
            icon={<Icon name="arrow" size={18} />}
          >
            {t("register.goToLogin")}
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
