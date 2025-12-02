"use client";

import { usePathname } from 'next/navigation';
import { PortfolioNavbar } from "@/components/PortfolioNavbar";
import { Footer } from "@/components/Footer";
import { AdminAccess } from "@/components/AdminAccess";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path is admin or auth related
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthRoute = pathname?.startsWith('/auth');
  
  // Don't show navbar/footer on admin routes, but show on auth routes
  const showNavbarFooter = !isAdminRoute;

  return (
    <>
      {showNavbarFooter && <AdminAccess />}
      {showNavbarFooter && <PortfolioNavbar />}
      {children}
      {showNavbarFooter && <Footer />}
    </>
  );
}