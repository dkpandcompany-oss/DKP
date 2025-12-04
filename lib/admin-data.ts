import { supabase, supabaseAdmin } from './supabase'
import { Database, Order } from '@/types/database'

export interface AdminStats {
  totalRevenue: number
  totalConsultations: number
  pendingPayments: number
  activeUsers: number
}

export interface PaymentData {
  id: string
  order_id: string
  payment_id: string | null
  customer_email: string
  customer_name?: string
  service_name?: string
  amount: number
  status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded' | 'cancelled'
  created_at: string
  razorpay_order_id?: string
  razorpay_payment_id?: string
}

export interface UserData {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string
  sign_in_count: number
  role?: string
}

// Fetch consultation requests from Supabase
export async function fetchConsultationRequests() {
  try {
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching consultation requests:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching consultation requests:', error)
    return []
  }
}

// Fetch users via API route (requires admin access)
export async function fetchUsers(): Promise<UserData[]> {
  try {
    const response = await fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer admin-token',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch users:', response.statusText)
      return []
    }

    const { users, error } = await response.json()
    
    if (error) {
      console.error('Error from API:', error)
      return []
    }
    
    return users || []
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Fetch orders/payments from Supabase
export async function fetchPayments(): Promise<PaymentData[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data.map((order: any) => ({
      id: order.id,
      order_id: order.razorpay_order_id || order.id,
      payment_id: order.razorpay_payment_id || null,
      customer_email: order.customer_email,
      customer_name: order.customer_name,
      service_name: order.service_name,
      amount: order.amount,
      status: order.status,
      created_at: order.created_at,
      razorpay_order_id: order.razorpay_order_id,
      razorpay_payment_id: order.razorpay_payment_id,
    }))
  } catch (error) {
    console.error('Error fetching payments:', error)
    return []
  }
}

// Calculate admin statistics
export async function fetchAdminStats(): Promise<AdminStats> {
  try {
    const [consultations, payments, users] = await Promise.all([
      fetchConsultationRequests(),
      fetchPayments(),
      fetchUsers()
    ])

    const totalRevenue = payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0)

    const pendingPayments = payments.filter(p => 
      p.status === 'created' || p.status === 'attempted'
    ).length

    return {
      totalRevenue,
      totalConsultations: consultations.length,
      pendingPayments,
      activeUsers: users.length
    }
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return {
      totalRevenue: 0,
      totalConsultations: 0,
      pendingPayments: 0,
      activeUsers: 0
    }
  }
}

// Update consultation status
export async function updateConsultationStatus(
  id: string, 
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
) {
  try {
    const { data, error } = await supabase
      .from('consultation_requests')
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating consultation status:', error)
      return null
    }

    return data?.[0] || null
  } catch (error) {
    console.error('Error updating consultation status:', error)
    return null
  }
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount / 100) // Convert paise to rupees
}

// Update order status
export async function updateOrderStatus(
  id: string,
  status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded' | 'cancelled'
) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating order status:', error)
      return null
    }

    return data?.[0] || null
  } catch (error) {
    console.error('Error updating order status:', error)
    return null
  }
}

// Delete consultation request
export async function deleteConsultation(id: string) {
  try {
    const { error } = await supabase
      .from('consultation_requests')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting consultation:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting consultation:', error)
    return false
  }
}

// Delete order
export async function deleteOrder(id: string) {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting order:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting order:', error)
    return false
  }
}