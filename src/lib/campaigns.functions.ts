import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function createPublicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith('sb_publishable_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization'); return fetch(input, { ...init, headers }); } },
  });
}

export const getCampaignBySlug = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ slug: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select("*, products(*)")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .single();

    if (error || !campaign) throw new Error("Campaña no encontrada");
    return campaign;
  });

export const getCampaignStats = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ slug: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { data: rows, error } = await supabase.rpc("campaign_public_stats", {
      _slug: data.slug,
    });
    if (error) throw new Error(error.message);
    const row = rows?.[0];
    return {
      interested: row?.interested ?? 0,
      units: row?.units ?? 0,
      goal: row?.goal ?? 25,
    };
  });

export const recordCampaignMetric = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        campaignSlug: z.string(),
        event: z.enum(["visit", "view_product", "interest_click", "form_submit", "share"]),
        sessionId: z.string().nullable().default(null),
        trafficSource: z.string().default("direct"),
        referralCode: z.string().nullable().default(null),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const supabase = createPublicClient();
    const { data: campaign } = await supabase
      .from("campaigns")
      .select("id")
      .eq("slug", data.campaignSlug)
      .eq("is_active", true)
      .single();

    if (!campaign) return { ok: false };

    const { error } = await supabase.from("campaign_metrics").insert({
      campaign_id: campaign.id,
      event: data.event,
      session_id: data.sessionId,
      traffic_source: data.trafficSource,
      referral_code: data.referralCode,
    });


    return { ok: !error };
  });

