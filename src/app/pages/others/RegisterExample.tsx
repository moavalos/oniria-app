import { useState } from "react";
import { useAuth } from "@features/auth/hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await signUp(email, password, fullName, {
      ...{ language: "es", room_skin: "default" },
      date_of_birth: dateOfBirth,
    } as any);

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm your account!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder={t("register.fullName")}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder={t("register.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={t("register.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder={t("register.dateOfBirth")}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />

        <button type="submit">{t("register.button")}</button>
      </form>
    </div>
  );
}
