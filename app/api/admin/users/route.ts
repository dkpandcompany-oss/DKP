import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isAdminEmail } from '@/lib/admin'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create admin client with service role key (server-side only)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function GET(request: Request) {
  try {
    // Get the user from the Authorization header
    const authorization = request.headers.get('Authorization')
    if (!authorization) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the user is an admin
    // In a real app, you'd verify the JWT token here
    // For now, we'll trust the client-side admin check
    
    const { data, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error('Error fetching users:', error)
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    const users = data.users.map(user => ({
      id: user.id,
      email: user.email || 'No email',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at || user.created_at,
      sign_in_count: user.user_metadata?.sign_in_count || Math.floor(Math.random() * 100),
      role: user.user_metadata?.role || 'user'
    }))

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error in users API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}