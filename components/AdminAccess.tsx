"use client";

import Link from 'next/link';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';
import { Button } from '@/components/ui/button';

export function AdminAccess() {
  const { user, isAdmin, loading } = useSupabaseAuth();

  if (loading) return null;

  return (
     <div className="fixed top-4 right-4 z-50">
       
    </div>
  );
}