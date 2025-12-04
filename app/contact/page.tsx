"use client"

import { ContactSection } from "@/components/ContactSection"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import Link from "next/link"
import { User, LogIn, UserPlus } from "lucide-react"

export default function ContactPage() {
    const { user, loading } = useSupabaseAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#156d95]"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-[#156d95]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="w-8 h-8 text-[#156d95]" />
                        </div>
                        
                        <h1 className="text-2xl font-semibold text-[#111A4A] mb-4">
                            Sign In Required
                        </h1>
                        
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Please sign in to your account to access the contact form and submit consultation requests.
                        </p>
                        
                        <div className="space-y-3">
                            <Link
                                href="/login"
                                className="w-full bg-[#156d95] text-white font-medium py-3 px-6 rounded-xl hover:bg-[#156d95]/90 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </Link>
                            
                            <Link
                                href="/signup"
                                className="w-full border border-slate-200 text-[#111A4A] font-medium py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <UserPlus className="w-4 h-4" />
                                Create Account
                            </Link>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <p className="text-sm text-slate-500">
                                New to DKP Consulting?{" "}
                                <Link href="/about" className="text-[#156d95] hover:underline">
                                    Learn more about us
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="pt-20">
                <ContactSection />
            </div>
        </>
    )
}
