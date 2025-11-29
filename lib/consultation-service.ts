import { supabase } from '@/lib/supabase'
import { ContactFormData, ConsultationRequest } from '@/types/database'

export class ConsultationService {
  /**
   * Submit a new consultation request
   */
  static async submitConsultationRequest(formData: ContactFormData): Promise<{ success: boolean; data?: ConsultationRequest; error?: string }> {
    try {
      // Prepare the data for insertion
      const requestData = {
        first_name: formData.firstName,
        last_name: formData.lastName || null,
        email: formData.email,
        designation: formData.designation || null,
        company_name: formData.companyName || null,
        business_field: formData.businessField || null,
        selected_services: formData.selectedServices,
        other_service_description: formData.otherServiceDescription || null,
        source: 'website',
        status: 'pending' as const,
        priority: 'normal' as const,
        ip_address: await this.getClientIP(),
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
        referrer: typeof window !== 'undefined' ? document.referrer : null,
      }

      const { data, error } = await supabase
        .from('consultation_requests')
        .insert(requestData)
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Submission error:', error)
      return { success: false, error: 'Failed to submit consultation request' }
    }
  }

  /**
   * Get all consultation requests (admin function)
   */
  static async getAllConsultationRequests(): Promise<{ success: boolean; data?: ConsultationRequest[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('consultation_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Fetch error:', error)
      return { success: false, error: 'Failed to fetch consultation requests' }
    }
  }

  /**
   * Update consultation request status
   */
  static async updateRequestStatus(
    id: string, 
    status: ConsultationRequest['status'],
    notes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = { status }
      if (notes) updateData.notes = notes

      const { error } = await supabase
        .from('consultation_requests')
        .update(updateData)
        .eq('id', id)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      console.error('Update error:', error)
      return { success: false, error: 'Failed to update request status' }
    }
  }

  /**
   * Get services lookup data
   */
  static async getServicesLookup() {
    try {
      const { data, error } = await supabase
        .from('services_lookup')
        .select('*')
        .eq('active', true)
        .order('id')

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Services fetch error:', error)
      return { success: false, error: 'Failed to fetch services' }
    }
  }

  /**
   * Get client IP address (helper function)
   */
  private static async getClientIP(): Promise<string | null> {
    try {
      if (typeof window !== 'undefined') {
        // Client-side: Use a service to get IP
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        return data.ip
      }
      return null
    } catch (error) {
      console.error('IP fetch error:', error)
      return null
    }
  }
}