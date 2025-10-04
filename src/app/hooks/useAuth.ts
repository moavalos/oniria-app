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
    fullName: string,
    metadata: UserMetadata
  ) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          ...metadata,
        },
      },
    });
  },
  []
);

  const signIn = useCallback(async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  }, []);

  const signOut = useCallback(async () => {
    return await supabase.auth.signOut();
  }, []);

  const getCurrentUserFromApi = useCallback(async () => {
  if (!session?.access_token) return null;

  const response = await fetch("http://localhost:3000/api/dreams/user", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch user from API:", await response.text());
    return null;
  }

  return await response.json();
}, [session?.access_token]);

  return { user, session, loading, signUp, signIn, signOut, getCurrentUserFromApi };
}
