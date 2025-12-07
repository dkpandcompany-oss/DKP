import { Service, Addon, SelectedAddon, CheckoutTotals } from '@/types/checkout';

export function calculateTotals(
  service: Service,
  selectedAddons: SelectedAddon[]
): CheckoutTotals {
  let one_time_total = service.price;
  let monthly_total = 0;

  selectedAddons.forEach(addon => {
    if (addon.selected) {
      // Add all addon prices to one-time total (no future payments)
      one_time_total += addon.price;
      
      // Keep monthly_total for display purposes only
      if (addon.type === 'monthly') {
        monthly_total += addon.price;
      }
    }
  });

  return {
    one_time_total,
    monthly_total
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    const existingScript = document.getElementById('razorpay-script');
    
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    
    document.body.appendChild(script);
  });
}