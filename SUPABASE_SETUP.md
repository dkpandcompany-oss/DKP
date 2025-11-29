# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Organization: Select your organization
   - Name: DKP Consulting
   - Database Password: Generate a strong password
   - Region: Choose closest to your users
4. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to Project Settings → API
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep this secret)

## 3. Setup Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your actual Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## 4. Create Database Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create the consultation_requests table
CREATE TABLE consultation_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contact Information
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT NOT NULL,
    designation TEXT,
    
    -- Company Information
    company_name TEXT,
    business_field TEXT,
    
    -- Services
    selected_services TEXT[],
    other_service_description TEXT,
    
    -- Request Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'in_progress', 'completed', 'cancelled')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    
    -- Additional Information
    source TEXT DEFAULT 'website',
    notes TEXT,
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    referrer TEXT
);

-- Create services lookup table
CREATE TABLE services_lookup (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert predefined services
INSERT INTO services_lookup (id, title, description) VALUES
('operations', 'Operations & Small Business Optimization', 'Streamline workflows, SOPs, scalable systems'),
('financial', 'Financial Management & Cost Control', 'Budgeting, forecasting & cost reduction'),
('business_dev', 'Business Development & Strategic Partnerships', 'Market expansion & partnership strategy'),
('marketing', 'Marketing & Web Consulting', 'Website strategy, digital branding & visibility');

-- Create indexes
CREATE INDEX idx_consultation_requests_email ON consultation_requests(email);
CREATE INDEX idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX idx_consultation_requests_created_at ON consultation_requests(created_at DESC);
CREATE INDEX idx_consultation_requests_company_name ON consultation_requests(company_name);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_consultation_requests_updated_at 
    BEFORE UPDATE ON consultation_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit consultation requests" ON consultation_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view all requests" ON consultation_requests
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update requests" ON consultation_requests
    FOR UPDATE USING (auth.role() = 'authenticated');
```

## 5. Install Dependencies

```bash
pnpm install @supabase/supabase-js
```

## 6. Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Go to `/contact` page
3. Fill out and submit the form
4. Check your Supabase dashboard → Table Editor → consultation_requests to see the data

## 7. Optional: Setup Email Notifications

To get notified when new consultation requests come in:

1. Go to Supabase → Database → Webhooks
2. Create a new webhook for `consultation_requests` table
3. Set it to trigger on `INSERT`
4. Use a service like Zapier or n8n to send emails

## 8. Admin Dashboard (Future Enhancement)

Consider creating an admin dashboard at `/admin/consultations` to:
- View all consultation requests
- Update request status
- Add notes
- Export data

## Security Notes

- The anon key is safe to expose publicly
- Never expose the service role key in client-side code
- Row Level Security (RLS) is enabled for data protection
- The public can only INSERT new requests, not view existing ones