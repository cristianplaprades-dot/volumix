import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const slugSchema = z.object({ slug: z.string() });

async function requireAdmin(context: { supabase: import("@supabase/supabase-js").SupabaseClient<import("@/integrations/supabase/types").Database>; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
}

export const getAdminCampaigns = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("campaigns")
      .select("*, products(name, category)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getAdminLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => slugSchema.parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { data: campaign } = await context.supabase
      .from("campaigns")
      .select("id")
      .eq("slug", data.slug)
      .single();
    if (!campaign) throw new Error("Campaña no encontrada");

    const { data: leads, error } = await context.supabase
      .from("leads")
      .select("*, price_preferences(max_price, units)")
      .eq("campaign_id", campaign.id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return leads ?? [];
  });

export const getAdminMetrics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => slugSchema.parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { data: campaign } = await context.supabase
      .from("campaigns")
      .select("id, goal_leads")
      .eq("slug", data.slug)
      .single();
    if (!campaign) throw new Error("Campaña no encontrada");

    const { data: funnel, error: funnelError } = await context.supabase
      .from("campaign_metrics")
      .select("event, session_id, referral_code")
      .eq("campaign_id", campaign.id);
    if (funnelError) throw new Error(funnelError.message);

    const { data: leads, error: leadsError } = await context.supabase
      .from("leads")
      .select("country, postal_code, price_bucket, units, created_at, traffic_source, referral_code, referred_by_code")
      .eq("campaign_id", campaign.id);
    if (leadsError) throw new Error(leadsError.message);

    const { data: referrals, error: referralsError } = await context.supabase
      .from("referrals")
      .select("clicks, signups")
      .eq("campaign_id", campaign.id);
    if (referralsError) throw new Error(referralsError.message);

    const counts: Record<string, number> = {};
    for (const e of ["visit", "view_product", "interest_click", "form_submit", "lead_validated", "share"] as const) {
      counts[e] = funnel?.filter((x) => x.event === e).length ?? 0;
    }

    counts.lead_validated = leads?.length ?? 0;
    counts.visit = new Set((funnel ?? []).filter(x => x.event === 'visit' && x.session_id).map(x => x.session_id)).size + (funnel ?? []).filter(x => x.event === 'visit' && !x.session_id).length;
    const priceDistribution: Record<string, number> = {};
    let units = 0;
    for (const l of leads ?? []) {
      priceDistribution[l.price_bucket] = (priceDistribution[l.price_bucket] ?? 0) + 1;
      units += l.units;
    }

    const avgMaxPrice =
      leads && leads.length > 0
        ? (leads.reduce((acc, l) => {
            const map: Record<string, number> = {
              "<3400": 3399,
              "3400-3500": 3450,
              "3500-3600": 3550,
              "3600-3700": 3650,
              ">3700": 3750,
            };
            return acc + (map[l.price_bucket] ?? 0);
          }, 0) / leads.length)
        : 0;

    return {
      goal: campaign.goal_leads,
      interested: counts.lead_validated,
      visits: counts.visit,
      conversion: counts.visit > 0 ? Math.round((counts.lead_validated / counts.visit) * 1000) / 10 : 0,
      units,
      avgMaxPrice: Math.round(avgMaxPrice),
      priceDistribution,
      countries: Object.fromEntries(
        Object.entries(
          (leads ?? []).reduce((acc, l) => {
            acc[l.country] = (acc[l.country] ?? 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        ).sort((a, b) => b[1] - a[1]),
      ),
      postalCodes: Object.fromEntries(
        Object.entries(
          (leads ?? []).reduce((acc, l) => {
            acc[l.postal_code] = (acc[l.postal_code] ?? 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        ).sort((a, b) => b[1] - a[1]),
      ),
      trafficSources: Object.fromEntries(
        Object.entries(
          (leads ?? []).reduce((acc, l) => {
            acc[l.traffic_source] = (acc[l.traffic_source] ?? 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        ).sort((a, b) => b[1] - a[1]),
      ),
      referralsClicks: (funnel ?? []).filter(x => x.event === "visit" && x.referral_code).length,
      referralsSignups: (leads ?? []).filter(x => x.referred_by_code).length,
      funnel: counts,
      leads: leads ?? [],
    };
  });

