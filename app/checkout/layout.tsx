import type { Metadata } from 'next';
import { LayoutContent } from '@/components/LayoutContent';

export const metadata: Metadata = {
  title: 'Checkout | DKP & Company',
  description: 'Complete your consulting service purchase',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}