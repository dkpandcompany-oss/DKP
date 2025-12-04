"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Authentication Functions
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        setMessage("Check your email for verification link!");
      } else {
        setMessage("Account created successfully!");
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (err: any) {
      setMessage(err.message || "Signup failed");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-sky-100 p-4 relative">
      {/* Background Image */}
      <div 
        className="absolute top-0 left-0 right-0 w-full bg-cover bg-center bg-no-repeat"
      />

      {/* Signup Card */}
      <div className="
        w-full max-w-sm
        bg-white/30 backdrop-blur-xl
        rounded-3xl p-8
        shadow-xl border border-white/40
        relative z-10
      ">

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Create Account
        </h1>

        {/* Full Name Field */}
        <div className="mb-4">
          <div className="flex items-center gap-3 bg-white/40 border border-white/60 rounded-xl px-4 py-3">
            <FiUser className="h-5 w-5 text-gray-600" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent focus:outline-none placeholder-gray-600 text-gray-800"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

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

        {/* Sign-up Button */}
        <form onSubmit={handleSignup}>
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              bg-gradient-to-b from-sky-900 to-sky-800
              text-white font-medium
              shadow-md hover:opacity-90 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
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
          Continue with Google
        </button>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-sky-800 hover:text-sky-900 transition-colors">
              Log in
            </Link>
          </p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mt-4 p-3 border rounded-xl backdrop-blur-sm ${
            message.includes('successfully') || message.includes('email') 
              ? 'bg-green-100/80 border-green-200/60' 
              : 'bg-red-100/80 border-red-200/60'
          }`}>
            <p className={`text-sm text-center font-medium ${
              message.includes('successfully') || message.includes('email')
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {message}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
