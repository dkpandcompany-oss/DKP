# Supabase & Auth Setup Guide

## Quick Start

To get the authentication working, you need to set up Supabase:

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be set up (takes ~2 minutes)

### 2. Get Your Supabase Credentials

1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like `https://yourprojectref.supabase.co`)
   - **Project API Keys** → **anon public** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)
   - **Project API Keys** → **service_role** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

### 3. Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the commented lines with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://yourprojectref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App Configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 4. Configure Google OAuth (Optional)

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials (get them from [Google Cloud Console](https://console.cloud.google.com/))
4. Add `http://localhost:3001` to your allowed redirect URLs

### 5. Restart Development Server

```bash
pnpm dev
```

## Testing

- Visit `/auth-test` to check if auth is working
- Try signing up at `/signup`
- Try logging in at `/login`

## Troubleshooting

- **"Invalid supabaseUrl"**: Make sure your `.env.local` has real Supabase URLs, not placeholder text
- **Google OAuth not working**: Check that you've enabled Google provider in Supabase and configured redirect URLs
- **Email verification**: Check your Supabase email templates in **Authentication** → **Email Templates**