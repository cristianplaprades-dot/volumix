import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { getCampaignBySlug, getCampaignStats, recordCampaignMetric } from '@/lib/campaigns.functions';
import { registerInterest } from '@/lib/interest.functions';

export const Route = createFileRoute('/validacion/$slug')({
  loader: async ({ params }) => {
    const [campaign, stats] = await Promise.all([getCampaignBySlug({ data: { slug: params.slug } }), getCampaignStats({ data: { slug: params.slug } })]);
    return { campaign, stats };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.campaign.products?.name ?? 'Campaña'} — Volumix` }] }),
  errorComponent: ({ error }) => <main className="mx-auto max-w-xl p-8"><h1 className="text-2xl font-bold">No se pudo cargar la campaña</h1><p role="alert">{error instanceof Error ? error.message : 'Inténtalo de nuevo.'}</p><Link to="/">Volver al inicio</Link></main>,
  component: ValidationPage,
});

const fieldClass = 'w-full rounded-xl border border-border bg-card px-3 py-3 text-foreground';
function ValidationPage() {
  const { campaign, stats: initialStats } = Route.useLoaderData();
  const [stats, setStats] = useState(initialStats);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [attribution, setAttribution] = useState({ sessionId: '', trafficSource: 'direct', referralCode: null as string | null });
  const product = campaign.products;
  const euro = (value: number | null) => value == null ? 'Por confirmar' : new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  function metric(event: 'visit' | 'view_product' | 'interest_click' | 'form_submit' | 'share') {
    void recordCampaignMetric({ data: { campaignSlug: campaign.slug, event, ...attribution } }).catch(() => {});
  }
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const info = { sessionId: crypto.randomUUID(), trafficSource: query.get('utm_source') ?? 'direct', referralCode: query.get('ref') };
    setAttribution(info);
    for (const event of ['visit', 'view_product'] as const) void recordCampaignMetric({ data: { campaignSlug: campaign.slug, event, ...info } }).catch(() => {});
    const timer = window.setInterval(() => { void getCampaignStats({ data: { slug: campaign.slug } }).then(setStats).catch(() => {}); }, 30000);
    return () => window.clearInterval(timer);
  }, [campaign.slug]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    setBusy(true); setError(''); metric('form_submit');
    try {
      const result = await registerInterest({ data: {
        campaignSlug: campaign.slug, name: String(form.get('name') ?? ''), email: String(form.get('email') ?? ''), country: String(form.get('country') ?? ''), postalCode: String(form.get('postalCode') ?? ''), units: Number(form.get('units')), priceBucket: String(form.get('priceBucket')) as '3400-3500', notifyOnPrice: form.get('notify') === 'on', consent: (form.get('consent') === 'on') as true, trafficSource: attribution.trafficSource, referralCode: attribution.referralCode,
      } });
      const url = new URL(`/validacion/${campaign.slug}`, window.location.origin);
      if (result.referralCode) url.searchParams.set('ref', result.referralCode);
      setShareUrl(url.toString());
      void getCampaignStats({ data: { slug: campaign.slug } }).then(setStats).catch(() => {});
    } catch (err) { setError(err instanceof Error ? err.message : 'No se pudo guardar el interés. Inténtalo de nuevo.'); }
    finally { setBusy(false); }
  }
  const message = `Me he unido al grupo interesado en ${product?.name ?? campaign.title} en Volumix para negociar un mejor precio. Sin compra ni compromiso de pago. ${shareUrl}`;
  return <div className="min-h-screen bg-background text-foreground"><Header /><main className="mx-auto max-w-6xl px-5 py-12">
    <p className="text-xs font-semibold tracking-widest text-primary">CAMPAÑA EN VALIDACIÓN · {campaign.market}</p>
    <h1 className="mt-4 text-4xl font-bold md:text-5xl">{product?.name ?? campaign.title}</h1>
    <p className="mt-4 max-w-2xl text-muted-foreground">Reunimos compradores interesados para negociar con proveedores. Registrar tu interés es gratis y no supone ninguna compra ni compromiso de pago.</p>
    <div className="mt-10 grid gap-8 lg:grid-cols-2"><section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6"><h2 className="text-xl font-semibold">Objetivo colectivo</h2><p className="mt-4 text-sm text-muted-foreground">Referencia orientativa: {euro(campaign.reference_price)}</p><p className="mt-2 text-3xl font-bold">{euro(campaign.target_price_min)} – {euro(campaign.target_price_max)}</p><p className="mt-2 text-sm">Ahorro potencial: hasta {euro(campaign.potential_saving)}</p><p className="mt-4 text-sm text-muted-foreground">Precios orientativos pendientes de negociación. No existe una oferta confirmada.</p></div>
      <div className="rounded-2xl border border-border bg-card p-6"><h2 className="text-xl font-semibold">Midiendo demanda</h2><p aria-live="polite" className="my-4 text-3xl font-bold">{stats.interested} / {stats.goal} interesados</p><progress className="h-3 w-full accent-primary" max={Math.max(stats.goal, 1)} value={Math.min(stats.interested, stats.goal)} aria-label="Objetivo de interesados" /><p className="mt-3 text-sm text-muted-foreground">{stats.interested >= stats.goal ? 'Hemos alcanzado el primer objetivo de negociación.' : `Faltan ${stats.goal - stats.interested} compradores para alcanzar nuestro primer objetivo de negociación.`}</p></div>
      <p className="text-muted-foreground">{product?.description}</p>
      <a href="#interest-form" onClick={() => metric('interest_click')} className="inline-block rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">ME INTERESA — SIN COMPROMISO</a>
    </section><section id="interest-form" className="rounded-2xl border border-border bg-card p-6">
      {shareUrl ? <div className="space-y-5"><h2 className="text-2xl font-semibold">Ya formas parte del grupo</h2><p role="status">No has realizado ninguna compra ni adquirido ningún compromiso de pago. Si has solicitado avisos, te avisaremos cuando tengamos una oferta negociada.</p><h3 className="font-semibold">INVITA A OTROS COMPRADORES</h3><div className="flex flex-wrap gap-3">
        <a className="rounded-xl border border-border p-3" onClick={() => metric('share')} href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="rounded-xl border border-border p-3" onClick={() => metric('share')} href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Telegram</a>
        <a className="rounded-xl border border-border p-3" onClick={() => metric('share')} href={`mailto:?subject=${encodeURIComponent('Compra colectiva en Volumix')}&body=${encodeURIComponent(message)}`}>Email</a>
        <button className="rounded-xl border border-border p-3" type="button" onClick={async () => { try { await navigator.clipboard.writeText(shareUrl); metric('share'); setShareStatus('Enlace copiado'); } catch { setShareStatus('Copia el enlace del campo inferior'); } }}>Copiar enlace</button>
      </div><input aria-label="Tu enlace para invitar" className={fieldClass} readOnly value={shareUrl} /><p role="status">{shareStatus}</p></div> : <form onSubmit={submit} className="space-y-4"><h2 className="mb-5 text-2xl font-semibold">Registra tu interés</h2>
        <label className="block">Nombre<input name="name" autoComplete="name" required maxLength={80} className={fieldClass} /></label>
        <label className="block">Email<input name="email" type="email" autoComplete="email" required maxLength={255} className={fieldClass} /></label>
        <div className="grid gap-4 sm:grid-cols-2"><label>País<input name="country" autoComplete="country-name" required defaultValue="España" maxLength={80} className={fieldClass} /></label><label>Código postal<input name="postalCode" autoComplete="postal-code" required maxLength={20} className={fieldClass} /></label></div>
        <label className="block">Unidades<input name="units" type="number" required min={1} max={999} defaultValue={1} className={fieldClass} /></label>
        <label className="block">Rango de precio máximo aceptado<select name="priceBucket" required defaultValue="" className={fieldClass}><option value="" disabled>Selecciona un rango</option><option value="<3400">Menos de 3.400 €</option><option value="3400-3500">3.400–3.500 €</option><option value="3500-3600">3.500–3.600 €</option><option value="3600-3700">3.600–3.700 €</option><option value=">3700">Más de 3.700 €</option></select></label>
        <label className="flex items-start gap-2"><input type="checkbox" name="notify" defaultChecked />Avísame cuando se consiga un precio definitivo</label>
        <label className="flex items-start gap-2"><input type="checkbox" name="consent" required /><span>He leído y acepto la <Link to="/privacidad" className="underline">política de privacidad</Link>.</span></label>
        {error && <p role="alert" className="text-destructive">{error}</p>}<button disabled={busy} className="w-full rounded-xl bg-primary p-3 font-semibold text-primary-foreground disabled:opacity-50">{busy ? 'Guardando…' : 'ME INTERESA — SIN COMPROMISO'}</button>
      </form>}
    </section></div>
  </main><Footer /></div>;
}
