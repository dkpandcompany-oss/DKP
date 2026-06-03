"use client";

import { usePathname } from 'next/navigation';
import { PortfolioNavbar } from "@/components/PortfolioNavbar";
import { Footer } from "@/components/Footer";
import { AdminAccess } from "@/components/AdminAccess";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  

  // Check if current path is admin, auth, login, or signup
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthRoute = pathname?.startsWith('/auth');
  const isLoginPage = pathname === '/login';
  const isSignupPage = pathname === '/signup';

  // Don't show navbar/footer on admin, login, or signup routes
  const showNavbarFooter = !isAdminRoute && !isLoginPage && !isSignupPage;

  return (
    <>
      {showNavbarFooter && <AdminAccess />}
      {showNavbarFooter && <PortfolioNavbar />}
      <div className='pb-[30px] '>
        {children}
      </div>
      {showNavbarFooter && <Footer />}
    </>
  );
}