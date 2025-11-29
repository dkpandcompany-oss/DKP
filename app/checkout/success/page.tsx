'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Home, FileText } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-green-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for choosing DKP & Company for your consulting needs.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">What happens next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-blue-900">Confirmation Email</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    You'll receive a detailed confirmation email within 5 minutes with your order details and next steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-purple-900">Team Contact</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    Our consulting team will reach out within 24 hours to schedule your initial consultation session.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Project Kickoff</h3>
                  <p className="text-sm text-green-700 mt-1">
                    We'll begin working on your project according to the timeline discussed during your consultation.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-medium text-center mb-4">Need assistance?</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/contact">
                    <FileText className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Order processed securely by Razorpay</p>
              <p className="mt-1">
                For any immediate concerns, contact us at{' '}
                <a href="mailto:support@dkpandcompany.com" className="text-blue-600 hover:underline">
                  support@dkpandcompany.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}