"use client";

import Link from 'next/link';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';
import { Button } from '@/components/ui/button';

export function AdminAccess() {
  const { user, isAdmin, loading } = useSupabaseAuth();

  if (loading) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {user ? (
        isAdmin ? (
          <Link href="/admin">
            <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              Admin Dashboard
            </Button>
          </Link>
        ) : (
          <div className="text-sm text-gray-600">
            Logged in as: {user.email}
          </div>
        )
      ) : (
        <Link href="/auth/login">
          {/* <Button variant="outline" size="sm">
            Admin Login
          </Button> */}
        </Link>
      )}
    </div>
  );
}