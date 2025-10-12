import Card from "@shared/components/Card";
import AuthTitle from "@features/auth/components/AuthTitle";
import RegisterForm from "@/app/features/auth/components/RegisterForm";
import AuthLinks from "@features/auth/components/AuthLinks";
import bgImage from "@assets/images/Screenshot_1.png";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <Card>
        <AuthTitle title="Oniria" subtitle={t("register.subtitle")} />
        <RegisterForm />
        <AuthLinks href="/login" section="register" />
      </Card>
    </div>
  );
}
