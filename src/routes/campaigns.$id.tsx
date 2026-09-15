import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { campaigns } from "@/data/campaigns";
import { Header } from "@/components/landing/Header";
import { DemoBadge } from "@/components/landing/DemoBanner";
import { useInterest } from "@/components/landing/InterestDialog";
import { Footer } from "@/components/landing/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/campaigns/$id")({
  loader: ({ params }) => {
    const campaign = campaigns.find((c) => c.id === params.id);
    if (!campaign) throw notFound();
    return { campaign };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.campaign.name} — Volumix` },
          {
            name: "description",
            content: `Ejemplo de campaña de compra colectiva de ${loaderData.campaign.name} en el prototipo Volumix. Precios de demostración.`,
          },
          { property: "og:image", content: loaderData.campaign.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-bold">Campaña no encontrada</h1>
        <p className="mt-3 text-muted-foreground">Es posible que este ejemplo ya no exista.</p>
        <Link
          to="/campaigns"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Ver todas las campañas
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">No pudimos cargar la campaña</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error instanceof Error ? error.message : 'Inténtalo de nuevo.'}</p>
      </div>
      <Footer />
    </div>
  ),
  component: CampaignDetail,
});

function CampaignDetail() {
  const { campaign: c } = Route.useLoaderData();
  const { open: openInterest } = useInterest();
  const pct = Math.min(100, Math.round((c.joined / c.target) * 100));
  const saving = Math.round(((c.priceOriginal - c.priceGroup) / c.priceOriginal) * 100);
  const premiumSaving = Math.round(((c.priceOriginal - c.pricePremium) / c.priceOriginal) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="border-b border-border/60 py-10">
          <div className="mx-auto max-w-7xl px-5">
            <Link
              to="/campaigns"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Todas las campañas
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              {/* Image */}
              <div className="relative">
                <div
                  className="absolute -inset-4 -z-10 rounded-3xl opacity-50 blur-2xl"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <img
                  src={c.image}
                  alt={`Imagen ilustrativa de ${c.name}`}
                  className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
                />
                {c.gallery && c.gallery.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {c.gallery.slice(0, 2).map((src: string, i: number) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${c.name} — vista ${i + 1}`}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-xl border border-border object-cover"
                      />
                    ))}
                  </div>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  Imágenes ilustrativas: no corresponden necesariamente a la unidad exacta del
                  producto.
                </p>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{c.category}</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{c.name}</h1>
  
                </div>

                {/* Price tiers */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <PriceTier label="Precio de referencia" value={c.priceOriginal} muted />
                  <PriceTier
                    label="Precio grupo"
                    value={c.priceGroup}
                    highlight
                    badge={`−${saving}%`}
                  />
                  <PriceTier
                    label="Premium"
                    value={c.pricePremium}
                    premium
                    badge={`−${premiumSaving}%`}
                  />
                </div>

                {/* Progress */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-2 text-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{c.joined}</span> / {c.target} apuntados
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {c.countdown}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: "var(--gradient-primary)" }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Cifras de ejemplo.{" "}
                    {pct < 100
                      ? `En el modelo propuesto faltarían ${c.target - c.joined} compradores para negociar el precio de grupo.`
                      : "En el modelo propuesto, el grupo estaría completo y se negociaría el precio."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openInterest(c.name)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground"
                    style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                  >
                    Me interesa <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openInterest(`${c.name} — avisarme del lanzamiento`)}
                    className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Avisarme del lanzamiento
                  </button>
                </div>

                <ul className="grid gap-2 text-sm text-muted-foreground">
                  <Bullet icon={ShieldCheck}>
                    Propuesta: trabajar solo con distribuidores oficiales (aún por acordar)
                  </Bullet>
                  <Bullet icon={Truck}>Propuesta: envío gestionado por el distribuidor</Bullet>
                  <Bullet icon={Sparkles}>
                    Propuesta: devolución del importe si el grupo no se completa
                  </Bullet>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline + FAQ mini */}
        <section className="border-b border-border/60 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Cómo funcionaría</h2>
              <ol className="mt-6 space-y-5">
                <Step n={1} title="Muestras interés" desc="Indicas que te interesa el producto, sin pago ni compromiso." />
                <Step
                  n={2}
                  title="Se completa el grupo"
                  desc={`Con unos ${c.target} interesados tendría sentido negociar precio por volumen.`}
                />
                <Step n={3} title="Se abriría la compra" desc="Solo entonces existiría pago y envío. Hoy no hay ninguno de los dos." />
              </ol>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Características</h2>
              {c.highlights && c.highlights.length > 0 && (
                <ul className="mt-6 grid gap-2 rounded-2xl border border-border bg-card p-5">
                  {c.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              <h3 className="mt-8 text-lg font-semibold">Detalles</h3>
              <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                <Row k="Categoría" v={c.category} />
                <Row k="Mínimo de compradores (ejemplo)" v={String(c.target)} />
                <Row k="Ahorro estimado (ejemplo)" v={`${saving}% (Premium ${premiumSaving}%)`} />
                <Row k="Cuenta atrás (demo)" v={c.countdown} />
                <Row k="Estado" v="Sin contratación disponible" />
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PriceTier({
  label,
  value,
  badge,
  highlight,
  premium,
  muted,
}: {
  label: string;
  value: number;
  badge?: string;
  highlight?: boolean;
  premium?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-primary/40 bg-primary/10"
          : premium
            ? "border-accent/40 bg-accent/10"
            : "border-border bg-card"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs uppercase tracking-wider ${muted ? "text-muted-foreground" : "text-foreground"}`}>
          {label}
        </span>
        {badge && (
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
              premium ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <div
        className={`mt-2 font-display text-2xl font-bold ${
          muted ? "text-muted-foreground line-through" : "text-foreground"
        }`}
      >
        {value}€
      </div>
    </div>
  );
}

function Bullet({ icon: Icon, children }: { icon: typeof Check; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 text-primary" />
      <span>{children}</span>
    </li>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <li className="flex gap-4">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
      >
        {n}
      </span>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
      </div>
    </li>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 text-sm">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-foreground">{v}</dd>
    </div>
  );
}
