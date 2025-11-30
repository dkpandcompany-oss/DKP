'use client';

import { Suspense } from 'react';
import CheckoutContent from './checkout-content';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="text-muted-foreground mt-2">
            Complete your consulting service purchase
          </p>
        </div>

        <Suspense fallback={
          <div className="text-center py-8">
            <div className="text-lg">Loading...</div>
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}