'use client';

import { Service, SelectedAddon, CheckoutTotals } from '@/types/checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/checkout-utils';
import { Loader2, CreditCard } from 'lucide-react';

interface BillingSummaryProps {
  service: Service;
  selectedAddons: SelectedAddon[];
  totals: CheckoutTotals;
  isLoading: boolean;
  onPayNow: () => void;
}

export default function BillingSummary({ 
  service, 
  selectedAddons, 
  totals, 
  isLoading, 
  onPayNow 
}: BillingSummaryProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'one_time': return 'One-time';
      case 'monthly': return 'Monthly';
      case 'per_day': return 'Per Day';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'one_time': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-green-100 text-green-800';
      case 'per_day': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const oneTimeAddons = selectedAddons.filter(addon => 
    addon.selected && (addon.type === 'one_time' || addon.type === 'per_day')
  );
  const monthlyAddons = selectedAddons.filter(addon => 
    addon.selected && addon.type === 'monthly'
  );

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Service */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Main Service</h4>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium">{service.name}</p>
              <Badge className="bg-blue-100 text-blue-800 mt-1">
                One-time
              </Badge>
            </div>
            <p className="font-medium">{formatCurrency(service.price)}</p>
          </div>
        </div>

        {/* One-time Add-ons */}
        {oneTimeAddons.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">
                One-time Add-ons
              </h4>
              {oneTimeAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm">{addon.name}</p>
                    <Badge className={getTypeColor(addon.type)}>
                      {getTypeLabel(addon.type)}
                    </Badge>
                </div>
                <p className="text-sm font-medium">{formatCurrency(addon.price)}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Monthly Add-ons */}
        {monthlyAddons.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">
                Monthly Add-ons
              </h4>
              {monthlyAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between items-start">
                  <div className="flex-1">
                  <p className="text-sm">{addon.name}</p>
                  <Badge className={getTypeColor(addon.type)}>
                    {getTypeLabel(addon.type)}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{formatCurrency(addon.price)}/mo</p>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator />

        {/* Totals */}
        <div className="space-y-3">
          {totals.one_time_total > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-medium">One-time Total:</span>
              <span className="text-lg font-bold">{formatCurrency(totals.one_time_total)}</span>
            </div>
          )}
          
          {totals.monthly_total > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-medium">Monthly Total:</span>
              <span className="text-lg font-bold text-green-600">
                {formatCurrency(totals.monthly_total)}/mo
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Payment Information */}
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium mb-1">Payment Details:</p>
            {totals.one_time_total > 0 && (
              <p className="text-blue-700">
                • One-time payment of {formatCurrency(totals.one_time_total)} will be charged now
              </p>
            )}
            {totals.monthly_total > 0 && (
              <p className="text-blue-700">
                • Monthly subscription of {formatCurrency(totals.monthly_total)} will be set up separately
              </p>
            )}
          </div>
        </div>

        {/* Pay Now Button */}
        <Button 
          onClick={onPayNow}
          disabled={isLoading || totals.one_time_total === 0}
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
              Pay {formatCurrency(totals.one_time_total)} Now
            </>
          )}
        </Button>

        {totals.one_time_total === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No one-time charges to process
          </p>
        )}

        <div className="text-xs text-muted-foreground text-center">
          {process.env.NODE_ENV === 'development' ? (
            <div className="space-y-1">
              <div className="text-orange-600 font-medium">Demo Mode Active</div>
              <div>Configure Razorpay credentials for live payments</div>
            </div>
          ) : (
            <div>Secure payment powered by Razorpay</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}