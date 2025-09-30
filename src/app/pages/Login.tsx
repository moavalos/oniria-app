import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import supabase from "../utils/supabase";

export default function Login() {
  const { t } = useTranslation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await signIn(email, password);
    if (error) {
      alert(error.message);
    } else {
      alert("Logged in!");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert(error.message);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleEmailLogin} className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t("login.title")}</h1>

        <input
          type="email"
          placeholder={t("login.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={t("login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{t("login.button")}</button>

        <button type="button" onClick={handleGoogleLogin}>
          {t("login.google")}
        </button>
      </form>
    </div>
  );
}