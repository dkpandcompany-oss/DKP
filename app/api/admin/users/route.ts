import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAdminEmail } from '@/lib/admin'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function GET(request: Request) {
  try {
    // Get the user from the Authorization header
    const authorization = request.headers.get('Authorization')
    if (!authorization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if service role key is configured
    if (!supabaseServiceRoleKey) {
      console.warn('SUPABASE_SERVICE_ROLE_KEY not configured')
      return NextResponse.json({ 
        users: [], 
        error: 'Service role key not configured' 
      })
    }

    // Create admin client with service role key (server-side only)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
    
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json({ users: [], error: 'Failed to fetch users' })
    }

    const users = data.users.map(user => ({
      id: user.id,
      email: user.email || 'No email',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || user.created_at,
      sign_in_count: user.user_metadata?.sign_in_count || 0,
      role: user.user_metadata?.role || (isAdminEmail(user.email) ? 'admin' : 'user')
    }))

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error in users API route:', error)
    return NextResponse.json({ users: [], error: 'Internal server error' })
  }
}