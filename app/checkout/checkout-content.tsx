'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Service, Addon, SelectedAddon, CheckoutTotals, CheckoutData, RazorpayResponse } from '@/types/checkout';
import { calculateTotals, loadRazorpayScript } from '@/lib/checkout-utils';
import SimpleServiceSummary from '@/components/SimpleServiceSummary';
import SimpleAddonsList from '@/components/SimpleAddonsList';
import BillingSummary from '@/components/BillingSummary';
import { SERVICES, ADD_ONS } from '@/components/pricing/data';

// Map pricing data to checkout format
const mapServiceToCheckout = (pricingService: any): Service => ({
  id: pricingService.id,
  name: pricingService.title,
  description: pricingService.outcome,
  price: pricingService.minPrice, // Use minimum price as default
  originalMinPrice: pricingService.minPrice,
  originalMaxPrice: pricingService.maxPrice,
});

const mapAddonsToCheckout = (): Addon[] => [
  {
    id: 'website',
    name: 'Custom Website Build',
    description: 'Professional, responsive website built for conversion',
    price: 29999,
    type: 'one_time',
  },
  {
    id: 'retainer',
    name: 'Monthly Retainer',
    description: 'Ongoing support and advisory services',
    price: 9999,
    type: 'monthly',
  },
  {
    id: 'implementation',
    name: 'In-office Implementation',
    description: 'On-site assistance to ensure smooth adoption',
    price: 4999,
    type: 'per_day',
  },
  {
    id: 'priority',
    name: 'Priority Support',
    description: 'Faster response times and dedicated channel',
    price: 3999,
    type: 'monthly',
  },
];

export default function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  
  const [service, setService] = useState<Service | null>(null);
  const [originalService, setOriginalService] = useState<any>(null);
  const [addons] = useState<Addon[]>(mapAddonsToCheckout());
  const [selectedAddons, setSelectedAddons] = useState<SelectedAddon[]>([]);
  const [totals, setTotals] = useState<CheckoutTotals>({ one_time_total: 0, monthly_total: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load service based on URL parameter
  useEffect(() => {
    if (serviceId) {
      const foundService = SERVICES.find(s => s.id === serviceId);
      if (foundService) {
        setOriginalService(foundService);
        setService(mapServiceToCheckout(foundService));
      } else {
        toast.error('Service not found');
        router.push('/');
      }
    } else {
      toast.error('No service selected');
      router.push('/');
    }
  }, [serviceId, router]);

  // Calculate totals whenever service or addons change
  useEffect(() => {
    if (service) {
      const newTotals = calculateTotals(service, selectedAddons);
      setTotals(newTotals);
    }
  }, [service, selectedAddons]);

  const handlePayment = async () => {
    if (!service || totals.one_time_total === 0) {
      toast.error('No one-time charges to process');
      return;
    }

    setIsLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order
      console.log('Creating order for amount:', totals.one_time_total);
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totals.one_time_total,
          currency: 'INR',
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Order creation failed:', errorData);
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Check if we're in demo mode
      const isDemoMode = orderData.key === 'rzp_test_demo_key';
      
      if (isDemoMode) {
        // Demo mode - simulate payment success
        toast.info('Demo mode: Simulating payment success...');
        setTimeout(() => {
          toast.success('Demo payment completed successfully!');
          router.push('/checkout/success');
        }, 2000);
        return;
      }

      // Configure Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'DKP & Company',
        description: `${service.name} - Consulting Service`,
        order_id: orderData.orderId,
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#156d95',
        },
        handler: async (response: RazorpayResponse) => {
          try {
            // Prepare checkout data
            const checkoutData: CheckoutData = {
              service: service,
              addons: selectedAddons,
              one_time_total: totals.one_time_total,
              monthly_total: totals.monthly_total,
              razorpay_payment_id: response.razorpay_payment_id,
            };

            // Save order to database
            const saveResponse = await fetch('/api/save-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(checkoutData),
            });

            if (!saveResponse.ok) {
              throw new Error('Failed to save order');
            }

            const saveData = await saveResponse.json();
            
            toast.success('Payment successful! Your order has been confirmed.');
            console.log('Order saved successfully:', saveData);

            // Redirect to success page
            router.push('/checkout/success');

          } catch (error) {
            console.error('Save order error:', error);
            toast.error('Payment successful but failed to save order. Please contact support.');
          }
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled');
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!service ? (
        <div className="text-center py-8">
          <div className="text-lg">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service & Add-ons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Summary */}
            <SimpleServiceSummary
              service={service}
              originalService={originalService}
            />

            {/* Add-ons List */}
            <SimpleAddonsList
              addons={addons}
              selectedAddons={selectedAddons}
              onAddonsChange={setSelectedAddons}
            />
          </div>

          {/* Right Column - Billing Summary */}
          <div className="lg:col-span-1">
            <BillingSummary
              service={service}
              selectedAddons={selectedAddons}
              totals={totals}
              isLoading={isLoading}
              onPayNow={handlePayment}
            />
          </div>
        </div>
      )}
    </>
  );
}