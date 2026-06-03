"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-700 hover:text-sky-800 bg-white/80 rounded-full px-4 py-2 shadow-md border border-gray-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden md:flex relative bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: "url('/Login.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Centered Text */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-8">
          <div className="max-w-lg w-full text-center  flex flex-col justify-center items-start md:items-start">
            <h1 className="text-[4rem] font-bold leading-tight mb-6 text-white">
              Helping Businesses <br /> Make Smarter Decisions
            </h1>
            <p className="text-lg opacity-90 text-white">
              Strategy • Operations • Growth Consulting
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIGNUP PANEL */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-sm">

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">
            Create Account
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3">
              <FiUser className="text-gray-500" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full outline-none text-gray-800"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full outline-none text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3">
              <FiLock className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <form onSubmit={handleSignup}>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-sky-900 text-white font-semibold hover:bg-sky-800 transition"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-800 font-semibold">
              Log in
            </Link>
          </p>

          {/* Success/Error Message */}
          {message && (
            <div className={`mt-4 text-sm text-center font-medium ${
              message.includes('successfully') || message.includes('email')
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
