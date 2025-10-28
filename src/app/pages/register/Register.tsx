import AuthTitle from "@/app/features/auth/components/AuthTitle";
import RegisterForm from "@/app/features/auth/components/RegisterForm";
import AuthLinks from "@/app/features/auth/components/AuthLinks";
import GoogleButton from "@/app/features/auth/components/GoogleButton";
import QuoteCard from "@features/auth/login/components/QuoteCard";
import { useTranslation } from "react-i18next";
import HudMenu from "@/app/shared/components/menu/CardMenu";
import LanguageToggle from "@/app/features/lang-toggle/LanguageToggle";
import { Engine } from "@/engine";
import NebulaScene from "@/engine/scenes/NebulaScene";

export default function Register() {
  const { t } = useTranslation();

  return (
    <HudMenu.Root className="relative flex justify-center items-center min-h-screen">
      <LanguageToggle className="absolute top-4 right-4 z-20 text-light max-h-12" />
      <div
        className="w-full h-screen absolute"
        style={{
          background:
            "radial-gradient(circle,rgba(29, 1, 46, 1) 30%, rgba(15, 4, 28, .7) 50%)",
        }}
      />
      <div className="absolute w-[400px] aspect-square rounded-full bg-fuchsia-400/40 blur-3xl animate-blob-1 top-[25%] left-[18%]" />
      <div className="absolute w-[400px] aspect-square rounded-full bg-orange-300/40 blur-3xl animate-blob-2 top-[27%] left-[55%]" />

      <HudMenu.Container
        disableAnimation
        className="relative z-10 p-[0px!important] overflow-hidden flex flex-row min-w-sm max-w-4xl w-full bg-gray-700/55 backdrop-blur-2xl"
      >
        <div className="max-w-[50%] w-full p-7">
          <HudMenu.Header baseline={false}>
            <AuthTitle
              title="Oniria"
              subtitle={t("register.subtitle")}
              subtitle2={t("register.subtitle2")}
            />
          </HudMenu.Header>

          <HudMenu.Body className="mt-0 pt-0">
            <RegisterForm />

            <div className="flex items-center gap-2 mt-1 text-gray-400">
              <div className="flex-1 h-px bg-gray-600" />
              <span className="text-light/70 font-light text-sm">
                {t("register.or")}
              </span>
              <div className="flex-1 h-px bg-gray-600" />
            </div>

            <GoogleButton />
            <AuthLinks href="/" section="register" />
          </HudMenu.Body>

          <HudMenu.Footer>
            <p className="text-xs text-white/60 text-center mt-8">
              {t("login.footer")}{" "}
              <a
                href="/terminos"
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                {t("login.terms")}
              </a>{" "}
              {t("login.and")}{" "}
              <a
                href="/privacidad"
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                {t("login.privacy")}
              </a>{" "}
              {t("login.ofOniria")}
            </p>
          </HudMenu.Footer>
        </div>
        <div className="max-w-[50%] w-full relative">
          <Engine.Canvas
            className="rounded-[0px!important]"
            engineSettings={{
              backgroundColor: "transparent",
              cameraPosition: [0, 0, 4],
            }}
          >
            <Engine.Core>
              <NebulaScene
                scale={2.5}
                position={[0, 0.3, 0]}
                rotation={[0, 0, 0]}
                color={{ r: 0.6, g: 0.3, b: 0.9 }}
              />
            </Engine.Core>
          </Engine.Canvas>
          <QuoteCard />
        </div>
      </HudMenu.Container>
    </HudMenu.Root>
  );
}
