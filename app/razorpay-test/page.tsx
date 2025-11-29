'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { loadRazorpayScript } from '@/lib/checkout-utils';
import { toast } from 'sonner';

export default function RazorpayTestPage() {
  const [amount, setAmount] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const testRazorpayIntegration = async () => {
    const testAmount = parseInt(amount);
    if (!testAmount || testAmount < 1) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    try {
      // Load Razorpay script
      console.log('Loading Razorpay script...');
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }
      console.log('✓ Razorpay script loaded successfully');

      // Create order
      console.log('Creating order for amount:', testAmount);
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: testAmount,
          currency: 'INR',
        }),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(`Order creation failed: ${errorText}`);
      }

      const orderData = await orderResponse.json();
      console.log('✓ Order created successfully:', orderData);

      // Configure Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'DKP & Company - Test',
        description: `Test payment of ₹${testAmount}`,
        order_id: orderData.orderId,
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#156d95',
        },
        handler: async (response: any) => {
          console.log('✓ Payment successful:', response);
          setTestResult('success');
          toast.success('Test payment completed successfully!');
          
          // Optionally save test order
          try {
            const saveResponse = await fetch('/api/save-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                service: {
                  id: 'test',
                  name: 'Test Service',
                  price: testAmount,
                },
                addons: [],
                one_time_total: testAmount,
                monthly_total: 0,
                razorpay_payment_id: response.razorpay_payment_id,
              }),
            });
            
            if (saveResponse.ok) {
              console.log('✓ Test order saved successfully');
            }
          } catch (saveError) {
            console.warn('Failed to save test order:', saveError);
          }
        },
        modal: {
          ondismiss: () => {
            console.log('Payment cancelled by user');
            toast.info('Payment cancelled');
            setTestResult('error');
          },
        },
      };

      console.log('Opening Razorpay checkout...');
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Razorpay test failed:', error);
      toast.error(`Test failed: ${(error as Error).message}`);
      setTestResult('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Razorpay Integration Test
          </h1>
          <p className="text-lg text-muted-foreground">
            Test your Razorpay integration with a sample payment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Test Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Test Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount to test"
                  min="1"
                  max="100000"
                />
                <p className="text-sm text-muted-foreground">
                  Enter any amount between ₹1 and ₹1,00,000
                </p>
              </div>

              <Button
                onClick={testRazorpayIntegration}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Test Razorpay Payment
                  </>
                )}
              </Button>

              {testResult && (
                <div className={`p-4 rounded-lg border ${
                  testResult === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {testResult === 'success' ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">
                          Integration Test Successful!
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-900">
                          Integration Test Failed
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Test Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">1</Badge>
                  <div>
                    <p className="font-medium">Configure Credentials</p>
                    <p className="text-sm text-muted-foreground">
                      Add your Razorpay credentials to .env.local file
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">2</Badge>
                  <div>
                    <p className="font-medium">Enter Test Amount</p>
                    <p className="text-sm text-muted-foreground">
                      Use any amount for testing (₹1 - ₹1,00,000)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">3</Badge>
                  <div>
                    <p className="font-medium">Use Test Cards</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Success:</strong> 4111 1111 1111 1111</p>
                      <p><strong>Failure:</strong> 4000 0000 0000 0002</p>
                      <p><strong>CVV:</strong> Any 3 digits</p>
                      <p><strong>Expiry:</strong> Any future date</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">4</Badge>
                  <div>
                    <p className="font-medium">Complete Payment</p>
                    <p className="text-sm text-muted-foreground">
                      Follow the Razorpay checkout flow
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Environment Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Razorpay Script:</span>
                    <Badge variant="outline">Ready to Load</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>API Endpoint:</span>
                    <Badge variant="outline">Configured</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Test Mode:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environment Check */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-sm font-mono mb-2">Required Environment Variables:</p>
              <pre className="text-xs text-slate-700">
{`# Add these to your .env.local file:
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Get your credentials from{' '}
              <a 
                href="https://dashboard.razorpay.com/app/website-app-settings/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Razorpay Dashboard → Settings → API Keys
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}