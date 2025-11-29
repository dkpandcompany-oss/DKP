export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalMinPrice?: number;
  originalMaxPrice?: number;
}

export interface Addon {
  id: string;
  name: string;
  description?: string;
  price: number;
  type: 'one_time' | 'monthly' | 'per_day';
}

export interface SelectedAddon extends Addon {
  selected: boolean;
}

export interface CheckoutTotals {
  one_time_total: number;
  monthly_total: number;
}

export interface CheckoutData {
  service: Service;
  addons: SelectedAddon[];
  one_time_total: number;
  monthly_total: number;
  razorpay_payment_id?: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}