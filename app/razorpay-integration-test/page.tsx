"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RazorpayTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testRazorpayIntegration = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Test order creation
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // ₹100 test amount
          currency: 'INR',
        }),
      });

      const data = await response.json();
      setResult({
        success: response.ok,
        data,
        status: response.status,
      });

    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const testRazorpayCheckout = async () => {
    setLoading(true);

    try {
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        // Create order
        const response = await fetch('/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 100, // ₹100 test amount
            currency: 'INR',
          }),
        });

        const orderData = await response.json();

        if (!response.ok) {
          throw new Error(orderData.error || 'Failed to create order');
        }

        // Check if demo mode
        const isDemoMode = orderData.key === 'rzp_test_demo_key';

        if (isDemoMode) {
          setResult({
            success: true,
            data: orderData,
            message: 'Demo mode - order created successfully!',
          });
          setLoading(false);
          return;
        }

        // Open Razorpay checkout
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'DKP & Company - Test',
          description: 'Test Payment Integration',
          order_id: orderData.orderId,
          prefill: {
            name: 'Test User',
            email: 'test@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#156d95',
          },
          handler: (response: any) => {
            setResult({
              success: true,
              data: response,
              message: 'Payment successful!',
            });
            setLoading(false);
          },
          modal: {
            ondismiss: () => {
              setResult({
                success: false,
                message: 'Payment cancelled by user',
              });
              setLoading(false);
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        setResult({
          success: false,
          error: 'Failed to load Razorpay script',
        });
        setLoading(false);
      };

    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Razorpay Integration Test</h1>
          <p className="text-gray-600">Test your Razorpay configuration and payment flow</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Test Order Creation</CardTitle>
              <CardDescription>
                Test if the server can create Razorpay orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={testRazorpayIntegration} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Testing...' : 'Test Order API'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Full Checkout</CardTitle>
              <CardDescription>
                Test the complete payment flow with Razorpay UI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={testRazorpayCheckout} 
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                {loading ? 'Loading...' : 'Test Checkout Flow'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Test Result
                <Badge variant={result.success ? "default" : "destructive"}>
                  {result.success ? "Success" : "Error"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {result.message && (
                  <p className="text-sm font-medium">{result.message}</p>
                )}
                {result.error && (
                  <p className="text-red-600 text-sm">{result.error}</p>
                )}
                {result.data && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium">
                      View Response Data
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Required Environment Variables:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>RAZORPAY_KEY_ID</code> - Your Razorpay Key ID (starts with rzp_test_ for test mode)</li>
                <li><code>RAZORPAY_KEY_SECRET</code> - Your Razorpay Key Secret</li>
                <li><code>NEXT_PUBLIC_RAZORPAY_KEY_ID</code> - Same as RAZORPAY_KEY_ID (for frontend)</li>
              </ul>
              <p className="mt-4"><strong>Get Test Keys:</strong></p>
              <p>Visit <a href="https://dashboard.razorpay.com/app/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Razorpay Dashboard</a> to get your test keys.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}