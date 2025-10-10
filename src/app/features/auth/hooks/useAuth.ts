import { useState, useEffect, useCallback } from "react";
import supabase from "../utils/supabase";
import type { User, Session } from "@supabase/supabase-js";

export type UserMetadata = {
  language: string;
  room_skin: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      username: string,
      metadata?: UserMetadata
    ) => {
      return await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: username,
            ...metadata,
          },
          emailRedirectTo: "http://localhost:5173/login",
        },
      });
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  }, []);

  const signInWithGoogle = useCallback(async () => {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    return await supabase.auth.signOut();
  }, []);

  return { user, session, loading, signUp, signIn, signInWithGoogle, signOut };
}
