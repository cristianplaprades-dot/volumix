
create type public.app_role as enum ('admin','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text,
  category text not null,
  short_description text,
  description text,
  image_url text,
  gallery jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.products to anon, authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "products public read" on public.products for select to anon, authenticated using (true);
create policy "products admin write" on public.products for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger products_updated before update on public.products for each row execute function public.update_updated_at_column();

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  slug text not null unique,
  title text not null,
  status text not null default 'validating',
  market text not null default 'España',
  currency text not null default 'EUR',
  reference_price numeric(10,2),
  target_price_min numeric(10,2),
  target_price_max numeric(10,2),
  potential_saving numeric(10,2),
  goal_leads integer not null default 25,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.campaigns to anon, authenticated;
grant all on public.campaigns to service_role;
alter table public.campaigns enable row level security;
create policy "campaigns public read" on public.campaigns for select to anon, authenticated using (is_active);
create policy "campaigns admin write" on public.campaigns for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger campaigns_updated before update on public.campaigns for each row execute function public.update_updated_at_column();

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  name text not null,
  email text not null,
  country text not null,
  postal_code text not null,
  units integer not null default 1,
  price_bucket text not null,
  notify_on_price boolean not null default true,
  consent boolean not null default false,
  traffic_source text not null default 'direct',
  referral_code text,
  referred_by_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index leads_campaign_email_key on public.leads (campaign_id, lower(email));
create unique index leads_referral_code_key on public.leads (referral_code);
grant insert on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;
grant all on public.leads to service_role;
alter table public.leads enable row level security;
create policy "leads public insert" on public.leads for insert to anon, authenticated with check (consent = true);
create policy "leads admin read" on public.leads for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "leads admin write" on public.leads for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger leads_updated before update on public.leads for each row execute function public.update_updated_at_column();

create table public.price_preferences (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  price_bucket text not null,
  max_price numeric(10,2),
  units integer not null default 1,
  created_at timestamptz not null default now()
);
grant insert on public.price_preferences to anon, authenticated;
grant select on public.price_preferences to authenticated;
grant all on public.price_preferences to service_role;
alter table public.price_preferences enable row level security;
create policy "prefs public insert" on public.price_preferences for insert to anon, authenticated with check (true);
create policy "prefs admin read" on public.price_preferences for select to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  code text not null unique,
  referrer_lead_id uuid references public.leads(id) on delete set null,
  clicks integer not null default 0,
  signups integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant insert on public.referrals to anon, authenticated;
grant select on public.referrals to authenticated;
grant all on public.referrals to service_role;
alter table public.referrals enable row level security;
create policy "referrals public insert" on public.referrals for insert to anon, authenticated with check (true);
create policy "referrals admin read" on public.referrals for select to authenticated using (public.has_role(auth.uid(),'admin'));
create trigger referrals_updated before update on public.referrals for each row execute function public.update_updated_at_column();

create table public.traffic_sources (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  source text not null,
  medium text,
  utm_campaign text,
  visits integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, source, medium, utm_campaign)
);
grant select on public.traffic_sources to authenticated;
grant all on public.traffic_sources to service_role;
alter table public.traffic_sources enable row level security;
create policy "traffic admin read" on public.traffic_sources for select to authenticated using (public.has_role(auth.uid(),'admin'));

create table public.campaign_metrics (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  event text not null,
  session_id text,
  traffic_source text not null default 'direct',
  referral_code text,
  created_at timestamptz not null default now()
);
create index campaign_metrics_campaign_event_idx on public.campaign_metrics (campaign_id, event);
grant insert on public.campaign_metrics to anon, authenticated;
grant select on public.campaign_metrics to authenticated;
grant all on public.campaign_metrics to service_role;
alter table public.campaign_metrics enable row level security;
create policy "metrics public insert" on public.campaign_metrics for insert to anon, authenticated
  with check (event in ('visit','view_product','interest_click','form_submit','lead_validated','share'));
create policy "metrics admin read" on public.campaign_metrics for select to authenticated using (public.has_role(auth.uid(),'admin'));

create or replace function public.campaign_public_stats(_slug text)
returns table (interested integer, units integer, goal integer)
language sql stable security definer set search_path = public as $$
  select coalesce(count(l.id),0)::int,
         coalesce(sum(l.units),0)::int,
         max(c.goal_leads)::int
  from public.campaigns c
  left join public.leads l on l.campaign_id = c.id
  where c.slug = _slug and c.is_active
  group by c.id
$$;
grant execute on function public.campaign_public_stats(text) to anon, authenticated;

insert into public.products (slug, name, brand, category, short_description, description, image_url, gallery, highlights)
values (
  'unitree-go2-pro',
  'Unitree Go2 Pro',
  'Unitree',
  'Robótica',
  'Robot cuadrúpedo con IA embebida y visión 4D LiDAR.',
  'El Unitree Go2 Pro es un robot cuadrúpedo de última generación con visión 4D LiDAR, control por app y SDK abierto. Orientado a desarrollo, investigación y usos profesionales.',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
  '["https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80","https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=1200&q=80"]'::jsonb,
  '["Visión 4D LiDAR integrada","Autonomía aproximada de 2-4 horas","SDK abierto para desarrolladores","Control por app móvil"]'::jsonb
);

insert into public.campaigns (product_id, slug, title, status, market, reference_price, target_price_min, target_price_max, potential_saving, goal_leads)
select id, 'unitree-go2-pro', 'Unitree Go2 Pro — compra colectiva', 'validating', 'España', 3995.00, 3500.00, 3700.00, 500.00, 25
from public.products where slug = 'unitree-go2-pro';

