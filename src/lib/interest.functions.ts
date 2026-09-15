import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const schema = z.object({
  campaignSlug: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1, 'Introduce tu nombre').max(80),
  email: z.string().trim().email('Introduce un email válido').max(255),
  country: z.string().trim().min(1).max(80),
  postalCode: z.string().trim().min(1).max(20),
  units: z.number().int().min(1).max(999),
  priceBucket: z.enum(['<3400', '3400-3500', '3500-3600', '3600-3700', '>3700']),
  notifyOnPrice: z.boolean(), consent: z.literal(true),
  trafficSource: z.string().trim().max(120).default('direct'),
  referralCode: z.string().trim().max(80).nullable().default(null),
});
export const registerInterest = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error('La campaña no está configurada.');
    const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith('sb_publishable_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization'); return fetch(input, { ...init, headers }); } } });
    const { data: campaign, error: campaignError } = await client.from('campaigns').select('id').eq('slug', data.campaignSlug).eq('is_active', true).single();
    if (campaignError || !campaign) throw new Error('Campaña no encontrada.');
    const id = crypto.randomUUID();
    const code = crypto.randomUUID().replaceAll('-', '');
    const { error } = await client.from('leads').insert({ id, campaign_id: campaign.id, name: data.name, email: data.email.toLowerCase(), country: data.country, postal_code: data.postalCode, units: data.units, price_bucket: data.priceBucket, notify_on_price: data.notifyOnPrice, consent: true, traffic_source: data.trafficSource, referral_code: code, referred_by_code: data.referralCode });
    if (error) { if (error.code === '23505') throw new Error('Este email ya ha registrado interés en esta campaña.'); throw new Error('No se pudo guardar tu interés. Inténtalo de nuevo.'); }
    // The lead is authoritative. Optional analytics failures must not report a failed registration.
    const prices: Record<string, number | null> = { '<3400': 3399, '3400-3500': 3450, '3500-3600': 3550, '3600-3700': 3650, '>3700': null };
    await Promise.allSettled([
      client.from('price_preferences').insert({ lead_id: id, campaign_id: campaign.id, price_bucket: data.priceBucket, max_price: prices[data.priceBucket], units: data.units }),
      client.from('referrals').insert({ campaign_id: campaign.id, code, referrer_lead_id: id }),
      client.from('campaign_metrics').insert({ campaign_id: campaign.id, event: 'lead_validated', traffic_source: data.trafficSource, referral_code: data.referralCode }),
    ]);
    return { leadId: id, referralCode: code };
  });
