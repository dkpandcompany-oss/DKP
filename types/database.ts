// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      consultation_requests: {
        Row: ConsultationRequest
        Insert: Omit<ConsultationRequest, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ConsultationRequest, 'id' | 'created_at'>>
      }
      services_lookup: {
        Row: ServiceLookup
        Insert: Omit<ServiceLookup, 'created_at'>
        Update: Partial<Omit<ServiceLookup, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at'>>
      }
    }
  }
}

export interface Order {
  id: string
  created_at: string
  updated_at: string
  
  // Customer Information
  customer_email: string
  customer_name?: string
  
  // Order Details
  service_name: string
  service_id: string
  addons: OrderAddon[]
  
  // Pricing
  one_time_total: number
  monthly_total: number
  amount: number // Total amount in paise
  currency: string
  
  // Razorpay Integration
  razorpay_order_id: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  
  // Status
  status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded' | 'cancelled'
  
  // Metadata
  notes?: string
}

export interface OrderAddon {
  id: string
  name: string
  price: number
  type: 'one_time' | 'monthly' | 'per_day'
}

export interface ConsultationRequest {
  id: string
  created_at: string
  updated_at: string
  
  // Contact Information
  first_name: string
  last_name?: string
  email: string
  designation?: string
  
  // Company Information
  company_name?: string
  business_field?: string
  
  // Services
  selected_services: string[]
  other_service_description?: string
  
  // Request Status
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  
  // Additional Information
  source: string
  notes?: string
  
  // Metadata
  ip_address?: string
  user_agent?: string
  referrer?: string
}

export interface ServiceLookup {
  id: string
  title: string
  description?: string
  active: boolean
  created_at: string
}

// Form data interface for the contact form
export interface ContactFormData {
  firstName: string
  lastName?: string
  email: string
  designation?: string
  companyName?: string
  businessField?: string
  selectedServices: string[]
  otherServiceDescription?: string
}