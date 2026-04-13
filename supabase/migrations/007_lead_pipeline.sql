-- Lead pipeline: status tracking + UTM attribution
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','qualified','converted','lost')),
  ADD COLUMN IF NOT EXISTS utm_source  text,
  ADD COLUMN IF NOT EXISTS utm_medium  text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS notes text;

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads (created_at DESC);
