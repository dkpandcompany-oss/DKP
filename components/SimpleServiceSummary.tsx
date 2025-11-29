'use client';

import { Service } from '@/types/checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/checkout-utils';
import { Check, Clock, Package } from 'lucide-react';

interface ServiceSummaryProps {
  service: Service;
  originalService?: any; // From pricing data
}

export default function SimpleServiceSummary({ service, originalService }: ServiceSummaryProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
        {service.description && (
          <p className="text-sm text-muted-foreground">{service.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Service Price:</span>
          </div>
          <span className="text-xl font-bold text-blue-900">{formatCurrency(service.price)}</span>
        </div>

        {originalService && (
          <div className="space-y-4">
            {originalService.bullets && originalService.bullets.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">What's Included:</h4>
                <ul className="space-y-2">
                  {originalService.bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {originalService.timeline && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Timeline: {originalService.timeline}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}