'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, Star, CheckCircle } from 'lucide-react';

export default function CheckoutDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Complete Checkout System Demo
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            A fully functional checkout page for consulting services with Razorpay integration
          </p>
          <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2">
            ✅ Production Ready
          </Badge>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'Service Selection',
              description: 'Dynamic price slider for main consulting service',
              icon: '🎯',
            },
            {
              title: 'Add-ons System',
              description: 'Optional add-ons with one-time, monthly, and per-day billing',
              icon: '🔧',
            },
            {
              title: 'Smart Billing',
              description: 'Automatic calculation of one-time and recurring totals',
              icon: '💰',
            },
            {
              title: 'Razorpay Integration',
              description: 'Secure payment processing with order management',
              icon: '🔒',
            },
            {
              title: 'Responsive Design',
              description: 'Works perfectly on desktop and mobile devices',
              icon: '📱',
            },
            {
              title: 'Database Ready',
              description: 'API routes for saving orders and managing data',
              icon: '💾',
            },
          ].map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Service Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Strategic Business Consulting
            </CardTitle>
            <p className="text-muted-foreground">
              Comprehensive business strategy and growth consulting tailored to your needs
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Price Range:</span>
                <span>₹50,000 - ₹5,00,000</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Available Add-ons:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Market Research (One-time)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Financial Planning (One-time)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Monthly Mentoring (Recurring)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>Daily Support (Per Day)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Team Training (One-time)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Monthly Reports (Recurring)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-4">Try the Complete Checkout Experience</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience a fully functional checkout flow with service selection, add-ons, 
              real-time billing calculations, and Razorpay integration. Perfect for consulting 
              businesses and service providers.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/checkout">
                Start Checkout Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Technical Implementation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div>Next.js 15 + App Router</div>
            <div>TypeScript</div>
            <div>TailwindCSS</div>
            <div>Radix UI Components</div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Note: To test payments, you'll need to add your Razorpay credentials to .env.local
          </p>
        </div>
      </div>
    </div>
  );
}