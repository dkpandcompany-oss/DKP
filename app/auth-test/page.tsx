"use client";

import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthTestPage() {
  const { user, loading, signOut } = useSupabaseAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Auth Status</h1>
        
        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">
                <strong>Logged in as:</strong> {user.email}
              </p>
              <p className="text-sm text-green-600 mt-1">
                User ID: {user.id}
              </p>
              {user.user_metadata?.full_name && (
                <p className="text-sm text-green-600">
                  Name: {user.user_metadata.full_name}
                </p>
              )}
            </div>
            
            <Button onClick={signOut} variant="outline" className="w-full">
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800">Not logged in</p>
            </div>
            
            <div className="space-y-2">
              <Link href="/login" className="block">
                <Button className="w-full">
                  Go to Login
                </Button>
              </Link>
              
              <Link href="/signup" className="block">
                <Button variant="outline" className="w-full">
                  Go to Signup
                </Button>
              </Link>
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}