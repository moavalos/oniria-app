import AuthTitle from "@/app/features/auth/components/AuthTitle";
import RegisterForm from "@/app/features/auth/components/RegisterForm";
import AuthLinks from "@/app/features/auth/components/AuthLinks";
import bgImage from "@assets/images/Screenshot_1.png";
import { useTranslation } from "react-i18next";
import HudMenu from "@/app/shared/components/menu/CardMenu";

export default function Register() {
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
          <AuthTitle title="Oniria" subtitle={t('register.subtitle')} />
        </HudMenu.Header>

        <HudMenu.Body>
          <RegisterForm />
        </HudMenu.Body>

        <HudMenu.Footer>
          <AuthLinks href="/" section="register" />
        </HudMenu.Footer>
      </HudMenu.Container>
    </HudMenu.Root>
  );
}
