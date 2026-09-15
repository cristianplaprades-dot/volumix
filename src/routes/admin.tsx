import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getAdminLeads, getAdminMetrics } from '@/lib/admin.functions';
import { Header } from '@/components/landing/Header';

export const Route = createFileRoute('/admin')({
  ssr: false,
  beforeLoad: async () => { const { data } = await supabase.auth.getUser(); if (!data.user) throw redirect({ to: '/auth' }); },
  component: AdminPage,
});
type Metrics = Awaited<ReturnType<typeof getAdminMetrics>>;
type Leads = Awaited<ReturnType<typeof getAdminLeads>>;
function AdminPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [leads, setLeads] = useState<Leads>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  async function refresh() {
    setLoading(true); setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Vuelve a iniciar sesión.');
      const options = { data: { slug: 'unitree-go2-pro' }, headers: { Authorization: `Bearer ${session.access_token}` } };
      const [m, l] = await Promise.all([getAdminMetrics(options), getAdminLeads(options)]);
      setMetrics(m); setLeads(l);
    } catch (err) { setMetrics(null); setLeads([]); setError(err instanceof Error ? err.message : 'No se pudo cargar el panel.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void refresh(); }, []);
  function exportCSV() {
    const fields = ['name', 'email', 'country', 'postal_code', 'units', 'price_bucket', 'notify_on_price', 'traffic_source', 'referral_code', 'referred_by_code', 'created_at'] as const;
    const cell = (value: unknown) => { let text = String(value ?? ''); if (/^[\s]*[=+@-]/.test(text)) text = `'${text}`; return `"${text.replaceAll('"', '""')}"`; };
    const csv = '\uFEFF' + [fields.map(cell).join(';'), ...leads.map(lead => fields.map(key => cell(lead[key])).join(';'))].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'volumix-unitree-interesados.csv'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="min-h-screen bg-background text-foreground"><Header /><main className="mx-auto max-w-7xl px-5 py-10">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs tracking-widest text-primary">VALIDACIÓN DE DEMANDA</p><h1 className="mt-2 text-3xl font-bold">Unitree Go2 Pro</h1></div><div className="flex gap-3"><button className="rounded-xl border border-border p-3" disabled={loading} onClick={() => void refresh()}>Actualizar</button><button className="rounded-xl border border-border p-3" disabled={loading || !metrics} onClick={exportCSV}>Exportar CSV</button><button className="rounded-xl border border-border p-3" onClick={async () => { await supabase.auth.signOut(); window.location.assign('/auth'); }}>Salir</button></div></div>
    {loading && <p role="status" className="mt-8">Cargando datos…</p>}{error && <p role="alert" className="mt-8 text-destructive">{error}</p>}
    {metrics && <><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[['Visitas', metrics.visits], ['Interesados', `${metrics.interested}/${metrics.goal}`], ['Conversión', `${metrics.conversion}%`], ['Unidades potenciales', metrics.units], ['Precio máximo estimado', `${metrics.avgMaxPrice} €`]].map(([label, value]) => <div key={label} className="rounded-2xl border border-border bg-card p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-3 text-2xl font-bold">{value}</p></div>)}</div>
      <p className="mt-3 text-sm text-muted-foreground">El precio medio es una estimación a partir de los rangos indicados, no una oferta comercial.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{[['Embudo', metrics.funnel], ['Rangos de precio', metrics.priceDistribution], ['Países', metrics.countries], ['Códigos postales', metrics.postalCodes], ['Fuentes de tráfico', metrics.trafficSources], ['Referidos', { clics: metrics.referralsClicks, registros: metrics.referralsSignups }]].map(([title, entries]) => <section key={String(title)} className="rounded-2xl border border-border bg-card p-5"><h2 className="font-semibold">{String(title)}</h2><dl className="mt-4 space-y-2">{Object.entries(entries as Record<string, number>).map(([label, count]) => <div className="flex justify-between gap-3" key={label}><dt>{label}</dt><dd>{count}</dd></div>)}</dl></section>)}</div>
      <h2 className="mt-10 text-xl font-semibold">Interesados registrados</h2><div className="mt-4 overflow-x-auto rounded-xl border border-border"><table className="w-full text-left text-sm"><thead className="bg-card"><tr>{['Nombre', 'Email', 'País', 'CP', 'Unidades', 'Precio', 'Fuente', 'Fecha'].map(label => <th className="whitespace-nowrap p-3" key={label}>{label}</th>)}</tr></thead><tbody>{leads.map(lead => <tr key={lead.id} className="border-t border-border">{[lead.name, lead.email, lead.country, lead.postal_code, lead.units, lead.price_bucket, lead.traffic_source, new Date(lead.created_at).toLocaleString('es-ES')].map((value, i) => <td key={i} className="whitespace-nowrap p-3">{value}</td>)}</tr>)}</tbody></table></div>{leads.length === 0 && <p className="mt-4">Todavía no hay interesados registrados.</p>}
    </>}<Link className="mt-8 inline-block underline" to="/validacion/$slug" params={{ slug: 'unitree-go2-pro' }}>Ver campaña pública</Link>
  </main></div>;
}
