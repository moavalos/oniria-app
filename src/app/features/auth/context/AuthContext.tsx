import { createContext } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import type { UserMetadata } from "@features/auth/services";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (
    _email: string,
    _password: string
  ) => Promise<{ data: any; error: any }>;
  signUp: (
    _email: string,
    _password: string,
    _username: string,
    _metadata?: UserMetadata
  ) => Promise<{ data: any; error: any }>;
  signInWithGoogle: () => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: AuthError | null }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
