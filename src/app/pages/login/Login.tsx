import AuthTitle from "@features/auth/components/AuthTitle";
import LoginForm from "@features/auth/components/LoginForm";
import GoogleButton from "@features/auth/components/GoogleButton";
import AuthLinks from "@features/auth/components/AuthLinks";
import bgImage from "@assets/images/Screenshot_1.png";

import { useTranslation } from "react-i18next";
import HudMenu from "@/app/shared/components/menu/CardMenu";

export default function Login() {
  const { t } = useTranslation();

  return (
    <HudMenu.Root className="relative flex justify-center items-center min-h-screen">
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <HudMenu.Container className="relative z-10 p-7 min-w-sm max-w-md w-full">
        <HudMenu.Header>
          <AuthTitle title="Oniria" subtitle={t("login.subtitle")} />
        </HudMenu.Header>

        <HudMenu.Body>
          <LoginForm />

          <div className="flex items-center gap-2 my-4 text-gray-400">
            <div className="flex-1 h-px bg-gray-600" />
            <span>{t("login.or")}</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          <GoogleButton />
        </HudMenu.Body>

        <HudMenu.Footer>
          <AuthLinks href="/register" section="login" />
        </HudMenu.Footer>
      </HudMenu.Container>
    </HudMenu.Root>
  );
}
