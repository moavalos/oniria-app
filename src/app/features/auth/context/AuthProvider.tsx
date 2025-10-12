import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {
  getSession,
  onAuthStateChange,
  signIn as signInService,
  signUp as signUpService,
  signOut as signOutService,
  signInWithGoogle as signInWithGoogleService
} from "@features/auth/services";
import type { Session, User } from "@supabase/supabase-js";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = onAuthStateChange((session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn: (email, password) => signInService(email, password),
        signUp: (email, password, username, metadata) =>
          signUpService(email, password, username, metadata),
        signInWithGoogle: () => signInWithGoogleService(),
        signOut: () => signOutService(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
