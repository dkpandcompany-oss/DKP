"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginMinimal() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Authentication Functions
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      router.push("/");
    } catch (err: any) {
      setMessage(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center md:justify-end md:pr-[20%] bg-white p-4 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/LoginBack.png')" }}
        aria-hidden="true"
      />

      {/* Login Card */}
      <div className="
        w-full max-w-sm
        bg-white backdrop-blur-xl
        rounded-3xl p-8
        shadow-2xl border border-[#0000000d]
        relative z-10
      ">

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-12">
          Login
        </h1>

        {/* Email Field */}
        <div className="mb-4">
          <div className="flex items-center gap-3 bg-white/40 border border-white/60 rounded-xl px-4 py-3">
            <FiMail className="h-5 w-5 text-gray-600" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent focus:outline-none placeholder-gray-600 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <div className="flex items-center gap-3 bg-white/40 border border-white/60 rounded-xl px-4 py-3">
            <FiLock className="h-5 w-5 text-gray-600" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none placeholder-gray-600 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Sign-in Button */}
        <form onSubmit={handleLogin}>
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-4 rounded-xl
              bg-gradient-to-b from-sky-900 to-sky-800
              text-white font-semibold text-lg
              shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-gray-600 text-sm">or</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Sign up with Google Button */}
        <button
          onClick={handleGoogle}
          className="
            w-full py-3 rounded-xl
            bg-white/50 border border-white/60
            text-gray-800 font-medium
            shadow-md hover:bg-white/60 transition
            flex items-center justify-center gap-3
          "
        >
          <FcGoogle className="h-5 w-5" />
          Sign up with Google
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-sky-800 hover:text-sky-900 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {message && (
          <div className="mt-4 p-3 bg-red-100/80 border border-red-200/60 rounded-xl backdrop-blur-sm">
            <p className="text-sm text-red-600 text-center font-medium">{message}</p>
          </div>
        )}

      </div>
    </div>
  );
}
