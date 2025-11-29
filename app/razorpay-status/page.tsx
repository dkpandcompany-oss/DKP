'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Settings, ExternalLink } from 'lucide-react';

export default function RazorpayStatusPage() {
  const [status, setStatus] = useState<'checking' | 'demo' | 'configured' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    checkRazorpayStatus();
  }, []);

  const checkRazorpayStatus = async () => {
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // Test with ₹100
          currency: 'INR',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.key === 'rzp_test_demo_key') {
          setStatus('demo');
        } else {
          setStatus('configured');
        }
      } else {
        const errorData = await response.json();
        setStatus('error');
        setErrorMessage(errorData.error || 'Unknown error');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to connect to API');
    }
  };

  const getStatusInfo = () => {
    switch (status) {
      case 'checking':
        return {
          icon: <Settings className="h-6 w-6 text-blue-600 animate-spin" />,
          title: 'Checking Status...',
          description: 'Verifying Razorpay integration',
          color: 'bg-blue-50 border-blue-200',
          badge: <Badge className="bg-blue-100 text-blue-800">Checking</Badge>
        };
      case 'demo':
        return {
          icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
          title: 'Demo Mode Active',
          description: 'Razorpay credentials not configured. Running in demo mode.',
          color: 'bg-orange-50 border-orange-200',
          badge: <Badge className="bg-orange-100 text-orange-800">Demo Mode</Badge>
        };
      case 'configured':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-600" />,
          title: 'Razorpay Connected',
          description: 'Successfully connected to Razorpay API',
          color: 'bg-green-50 border-green-200',
          badge: <Badge className="bg-green-100 text-green-800">Connected</Badge>
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-600" />,
          title: 'Configuration Error',
          description: errorMessage,
          color: 'bg-red-50 border-red-200',
          badge: <Badge className="bg-red-100 text-red-800">Error</Badge>
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Razorpay Integration Status
          </h1>
          <p className="text-lg text-muted-foreground">
            Check your Razorpay configuration and test the integration
          </p>
        </div>

        {/* Status Card */}
        <Card className={`mb-8 ${statusInfo.color}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {statusInfo.icon}
                <div>
                  <CardTitle className="text-xl">{statusInfo.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {statusInfo.description}
                  </p>
                </div>
              </div>
              {statusInfo.badge}
            </div>
          </CardHeader>
          {status !== 'checking' && (
            <CardContent>
              <Button 
                onClick={checkRazorpayStatus}
                variant="outline"
                size="sm"
              >
                Recheck Status
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Configuration Guide */}
        {status === 'demo' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">1</Badge>
                  <div>
                    <p className="font-medium">Get Razorpay Account</p>
                    <p className="text-sm text-muted-foreground">
                      Sign up at{' '}
                      <a 
                        href="https://razorpay.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        razorpay.com
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">2</Badge>
                  <div>
                    <p className="font-medium">Get API Keys</p>
                    <p className="text-sm text-muted-foreground">
                      Go to Dashboard → Settings → API Keys and generate test keys
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">3</Badge>
                  <div>
                    <p className="font-medium">Update Environment Variables</p>
                    <div className="bg-slate-100 p-3 rounded-lg mt-2">
                      <pre className="text-xs text-slate-700">
{`# Add to .env.local file:
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-0.5">4</Badge>
                  <div>
                    <p className="font-medium">Restart Development Server</p>
                    <p className="text-sm text-muted-foreground">
                      Run <code className="bg-gray-100 px-1 rounded">pnpm dev</code> to reload environment variables
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Links */}
        <Card>
          <CardHeader>
            <CardTitle>Test Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button asChild className="justify-start h-auto p-4">
                <a href="/razorpay-test">
                  <div className="text-left">
                    <div className="font-medium">API Test Page</div>
                    <div className="text-sm text-muted-foreground">
                      Test Razorpay integration with custom amounts
                    </div>
                  </div>
                </a>
              </Button>

              <Button asChild variant="outline" className="justify-start h-auto p-4">
                <a href="/checkout?service=bizdev">
                  <div className="text-left">
                    <div className="font-medium">Full Checkout Flow</div>
                    <div className="text-sm text-muted-foreground">
                      Test complete checkout with business development service
                    </div>
                  </div>
                </a>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p><strong>Demo Mode:</strong> Payments are simulated - no actual charges will be made</p>
              <p><strong>Test Mode:</strong> Use Razorpay test cards for safe testing</p>
              <p><strong>Live Mode:</strong> Real payments will be processed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}