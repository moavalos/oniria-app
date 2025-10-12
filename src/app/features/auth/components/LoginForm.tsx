import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@shared/components/Button";
import { useAuth } from "@features/auth/hooks/useAuth";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/home");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-30">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("login.email")}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("login.password")}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <a
        href="/forgot-password"
        className="text-pink-500 text-sm self-end hover:underline"
      >
        {t("login.forgot")}
      </a>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit">{t("login.button")}</Button>
    </form>
  );
}
