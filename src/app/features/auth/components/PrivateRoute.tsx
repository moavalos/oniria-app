import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@features/auth/context/AuthContext";
import { useTranslation } from "react-i18next";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) return <p>{t("private_route.loading")}</p>;

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
}