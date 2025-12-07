'use client';

import { Addon, SelectedAddon } from '@/types/checkout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/checkout-utils';

interface SimpleAddonsListProps {
  addons: Addon[];
  selectedAddons: SelectedAddon[];
  onAddonsChange: (addons: SelectedAddon[]) => void;
}

export default function SimpleAddonsList({ 
  addons, 
  selectedAddons, 
  onAddonsChange 
}: SimpleAddonsListProps) {
  const isAddonSelected = (addonId: string): boolean => {
    return selectedAddons.some(addon => addon.id === addonId && addon.selected);
  };

  const handleAddonToggle = (addon: Addon, checked: boolean) => {
    if (checked) {
      const newAddon: SelectedAddon = {
        ...addon,
        selected: true,
      };
      // Remove existing addon if present and add new one
      const filtered = selectedAddons.filter(a => a.id !== addon.id);
      onAddonsChange([...filtered, newAddon]);
    } else {
      onAddonsChange(selectedAddons.filter(a => a.id !== addon.id));
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
      <CardContent className="space-y-4">
        {addons.map((addon) => {
          const isSelected = isAddonSelected(addon.id);

          return (
            <div 
              key={addon.id} 
              className={`p-4 border rounded-lg transition-all cursor-pointer ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm'
              }`}
              onClick={() => handleAddonToggle(addon, !isSelected)}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={`addon-${addon.id}`}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleAddonToggle(addon, checked as boolean)}
                  className="mt-1 pointer-events-none"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`addon-${addon.id}`} className="text-base font-medium cursor-pointer">
                        {addon.name}
                      </Label>
                      <Badge className={getTypeColor(addon.type)}>
                        {getTypeLabel(addon.type)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{formatCurrency(addon.price)}</div>
                      {addon.type === 'monthly' && (
                        <div className="text-sm text-muted-foreground">/month</div>
                      )}
                      {addon.type === 'per_day' && (
                        <div className="text-sm text-muted-foreground">/day</div>
                      )}
                    </div>
                  </div>
                  {addon.description && (
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}