'use client';

import { useState } from 'react';
import { Addon, SelectedAddon } from '@/types/checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/checkout-utils';

interface AddonsListProps {
  addons: Addon[];
  selectedAddons: SelectedAddon[];
  onAddonsChange: (addons: SelectedAddon[]) => void;
}

export default function AddonsList({ 
  addons, 
  selectedAddons, 
  onAddonsChange 
}: AddonsListProps) {
  const [inputValues, setInputValues] = useState<{[key: string]: string}>({});

  const isAddonSelected = (addonId: string): boolean => {
    return selectedAddons.some(addon => addon.id === addonId);
  };

  const getAddonPrice = (addonId: string): number => {
    const addon = selectedAddons.find(a => a.id === addonId);
    return addon?.selected_price || addons.find(a => a.id === addonId)?.min_price || 0;
  };

  const handleAddonToggle = (addon: Addon, checked: boolean) => {
    if (checked) {
      const newAddon: SelectedAddon = {
        ...addon,
        selected_price: addon.min_price,
      };
      onAddonsChange([...selectedAddons, newAddon]);
      setInputValues(prev => ({
        ...prev,
        [addon.id]: addon.min_price.toString()
      }));
    } else {
      onAddonsChange(selectedAddons.filter(a => a.id !== addon.id));
      setInputValues(prev => {
        const { [addon.id]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const handlePriceChange = (addonId: string, newPrice: number) => {
    const updatedAddons = selectedAddons.map(addon =>
      addon.id === addonId 
        ? { ...addon, selected_price: newPrice }
        : addon
    );
    onAddonsChange(updatedAddons);
  };

  const handleSliderChange = (addonId: string, value: number[]) => {
    const newPrice = value[0];
    setInputValues(prev => ({
      ...prev,
      [addonId]: newPrice.toString()
    }));
    handlePriceChange(addonId, newPrice);
  };

  const handleInputChange = (addonId: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [addonId]: value
    }));
    
    const numValue = parseInt(value);
    const addon = addons.find(a => a.id === addonId);
    if (addon && !isNaN(numValue) && numValue >= addon.min_price && numValue <= addon.max_price) {
      handlePriceChange(addonId, numValue);
    }
  };

  const handleInputBlur = (addonId: string) => {
    const currentValue = inputValues[addonId];
    const numValue = parseInt(currentValue);
    const addon = addons.find(a => a.id === addonId);
    const currentPrice = getAddonPrice(addonId);
    
    if (!addon || isNaN(numValue) || numValue < addon.min_price || numValue > addon.max_price) {
      setInputValues(prev => ({
        ...prev,
        [addonId]: currentPrice.toString()
      }));
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'one_time': return 'One-time';
      case 'monthly': return 'Monthly';
      case 'per_day': return 'Per Day';
      default: return type;
    }
  };

  if (addons.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Add-ons</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No add-ons available for this service.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optional Add-ons</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enhance your service with these additional offerings
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {addons.map((addon) => {
          const isSelected = isAddonSelected(addon.id);
          const currentPrice = getAddonPrice(addon.id);
          const inputValue = inputValues[addon.id] || currentPrice.toString();

          return (
            <div key={addon.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={`addon-${addon.id}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleAddonToggle(addon, checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`addon-${addon.id}`} className="text-base font-medium cursor-pointer">
                      {addon.name}
                    </Label>
                    <Badge className={getTypeColor(addon.type)}>
                      {getTypeLabel(addon.type)}
                    </Badge>
                  </div>
                  {addon.description && (
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  )}
                  <div className="text-sm text-muted-foreground">
                    Price range: {formatCurrency(addon.min_price)} - {formatCurrency(addon.max_price)}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="ml-6 space-y-4">
                  <Label className="text-sm font-medium">
                    Select price ({formatCurrency(addon.min_price)} - {formatCurrency(addon.max_price)})
                  </Label>
                  
                  <div className="space-y-4">
                    <Slider
                      value={[currentPrice]}
                      onValueChange={(value) => handleSliderChange(addon.id, value)}
                      min={addon.min_price}
                      max={addon.max_price}
                      step={addon.type === 'per_day' ? 100 : 1000}
                      className="w-full"
                    />
                    
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`price-input-${addon.id}`} className="text-sm">
                        Amount:
                      </Label>
                      <div className="relative flex-1 max-w-[200px]">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                          ₹
                        </span>
                        <Input
                          id={`price-input-${addon.id}`}
                          type="number"
                          value={inputValue}
                          onChange={(e) => handleInputChange(addon.id, e.target.value)}
                          onBlur={() => handleInputBlur(addon.id)}
                          min={addon.min_price}
                          max={addon.max_price}
                          className="pl-8"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{formatCurrency(addon.min_price)}</span>
                    <span>{formatCurrency(addon.max_price)}</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Selected Price:</span>
                      <span className="font-bold">{formatCurrency(currentPrice)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}