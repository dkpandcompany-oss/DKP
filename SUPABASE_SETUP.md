-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.consultation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  designation text,
  company_name text,
  business_field text,
  selected_services ARRAY,
  other_service_description text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'contacted'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text])),
  priority text DEFAULT 'normal'::text CHECK (priority = ANY (ARRAY['low'::text, 'normal'::text, 'high'::text, 'urgent'::text])),
  source text DEFAULT 'website'::text,
  notes text,
  ip_address inet,
  user_agent text,
  referrer text,
  CONSTRAINT consultation_requests_pkey PRIMARY KEY (id)
);
CREATE TABLE public.services_lookup (
  id text NOT NULL,
  title text NOT NULL,
  description text,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT services_lookup_pkey PRIMARY KEY (id)
);