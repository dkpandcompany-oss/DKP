import { supabase, supabaseAdmin } from './supabase'
import { Database } from '@/types/database'

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
  amount: number
  status: 'created' | 'attempted' | 'paid' | 'failed' | 'cancelled'
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

// Fetch users (requires admin access)
export async function fetchUsers(): Promise<UserData[]> {
  // For now, return mock data since the API route needs proper setup
  // In production, this would use the API route or direct Supabase admin client
  console.log('Fetching users - using mock data for development')
  return getMockUsers()
  
  /* 
  // TODO: Uncomment when API route is properly configured
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
      return getMockUsers()
    }

    const { users } = await response.json()
    return users || getMockUsers()
  } catch (error) {
    console.error('Error fetching users:', error)
    return getMockUsers()
  }
  */
}

// Mock users data for development/fallback
function getMockUsers(): UserData[] {
  return [
    {
      id: '1',
      email: 'john.doe@techcorp.com',
      created_at: '2024-11-15T10:30:00Z',
      last_sign_in_at: '2024-12-02T09:15:00Z',
      sign_in_count: 23,
      role: 'user'
    },
    {
      id: '2',
      email: 'sarah.wilson@startup.com',
      created_at: '2024-11-20T14:22:00Z',
      last_sign_in_at: '2024-12-01T16:45:00Z',
      sign_in_count: 15,
      role: 'user'
    },
    {
      id: '3',
      email: 'mike.johnson@enterprise.com',
      created_at: '2024-10-05T08:10:00Z',
      last_sign_in_at: '2024-12-02T11:30:00Z',
      sign_in_count: 67,
      role: 'user'
    },
    {
      id: '4',
      email: 'lisa.chen@innovate.com',
      created_at: '2024-11-28T12:15:00Z',
      last_sign_in_at: '2024-12-02T07:20:00Z',
      sign_in_count: 8,
      role: 'user'
    },
    {
      id: '5',
      email: 'rohitsoneji6@gmail.com',
      created_at: '2024-09-12T16:40:00Z',
      last_sign_in_at: '2024-12-02T14:10:00Z',
      sign_in_count: 134,
      role: 'admin'
    }
  ]
}

// Mock payment data (since we don't have Razorpay integrated yet)
export async function fetchPayments(): Promise<PaymentData[]> {
  // For now, return mock data until Razorpay is integrated
  // In production, this would fetch from your payments table or Razorpay API
  return [
    {
      id: '1',
      order_id: 'order_DKP001',
      payment_id: 'pay_DKP001',
      customer_email: 'john.doe@techcorp.com',
      amount: 150000, // ₹1,500
      status: 'paid',
      created_at: '2024-12-01T10:30:00Z',
      razorpay_order_id: 'order_DKP001',
      razorpay_payment_id: 'pay_DKP001'
    },
    {
      id: '2',
      order_id: 'order_DKP002',
      payment_id: null,
      customer_email: 'sarah.wilson@startup.com',
      amount: 250000, // ₹2,500
      status: 'failed',
      created_at: '2024-12-01T14:15:00Z',
      razorpay_order_id: 'order_DKP002'
    },
    {
      id: '3',
      order_id: 'order_DKP003',
      payment_id: null,
      customer_email: 'mike.johnson@enterprise.com',
      amount: 500000, // ₹5,000
      status: 'created',
      created_at: '2024-12-02T09:00:00Z',
      razorpay_order_id: 'order_DKP003'
    }
  ]
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