"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/admin";

export function useSupabaseAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        
        const currentUser = data?.user ?? null;
        setUser(currentUser);
        setIsAdmin(currentUser ? isAdminEmail(currentUser.email) : false);
      } catch (err) {
        console.error("supabase getUser error", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAdmin(currentUser ? isAdminEmail(currentUser.email) : false);
      setLoading(false);

      // Auto-redirect admin users after login
      if (currentUser && isAdminEmail(currentUser.email)) {
        const currentPath = window.location.pathname;
        if (currentPath === '/auth/login' || currentPath === '/') {
          router.push('/admin');
        }
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    router.push('/');
  };

  const checkIsAdmin = (email?: string) => {
    return isAdminEmail(email);
  };

  return { user, loading, isAdmin, signOut, checkIsAdmin };
}
