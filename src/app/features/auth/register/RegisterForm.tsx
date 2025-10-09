import { useState } from "react";
import Button from "../../../../shared/components/Button";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError(t("register.errorPasswordMatch", { defaultValue: "Las contraseñas no coinciden" }));
            return;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("register.username")}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("register.email")}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("register.password")}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("register.confirmPassword")}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit">{t("register.button")}</Button>
        </form>
    );
}
