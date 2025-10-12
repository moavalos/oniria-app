import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useAuth } from "@features/auth/hooks/useAuth";

export default function HeaderContainer() {
  const { user, loading, signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Header
      logoText="Oniria"
      userName={
        loading
          ? t("header.loading")
          : user?.user_metadata.full_name ?? t("header.guest")
      }
      userEmail={loading ? "..." : user?.email ?? ""}
      onProfileClick={signOut}
    />
  );
}
