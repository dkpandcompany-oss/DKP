'use client';

import { Service } from '@/types/checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/checkout-utils';
import { useState } from 'react';

interface ServiceSummaryProps {
  service: Service;
  selectedPrice: number;
  onPriceChange: (price: number) => void;
}

export default function ServiceSummary({ 
  service, 
  selectedPrice, 
  onPriceChange 
}: ServiceSummaryProps) {
  const [inputValue, setInputValue] = useState(selectedPrice.toString());

  const handleSliderChange = (value: number[]) => {
    const newPrice = value[0];
    setInputValue(newPrice.toString());
    onPriceChange(newPrice);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= service.min_price && numValue <= service.max_price) {
      onPriceChange(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < service.min_price || numValue > service.max_price) {
      setInputValue(selectedPrice.toString());
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{service.name}</CardTitle>
        {service.description && (
          <p className="text-sm text-muted-foreground">{service.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-medium">
            Select your investment ({formatCurrency(service.min_price)} - {formatCurrency(service.max_price)})
          </Label>
          
          <div className="space-y-4">
            <Slider
              value={[selectedPrice]}
              onValueChange={handleSliderChange}
              min={service.min_price}
              max={service.max_price}
              step={1000}
              className="w-full"
            />
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="price-input" className="text-sm">
                Amount:
              </Label>
              <div className="relative flex-1 max-w-[200px]">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  ₹
                </span>
                <Input
                  id="price-input"
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  min={service.min_price}
                  max={service.max_price}
                  className="pl-8"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(service.min_price)}</span>
            <span>{formatCurrency(service.max_price)}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Selected Price:</span>
            <span className="text-lg font-bold">{formatCurrency(selectedPrice)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}