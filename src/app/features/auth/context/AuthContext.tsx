import { createContext } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import type { UserMetadata } from "@features/auth/services";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  signUp: (
    email: string,
    password: string,
    username: string,
    metadata?: UserMetadata
  ) => Promise<{ data: any; error: any }>;
  signInWithGoogle: () => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: AuthError | null }>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
