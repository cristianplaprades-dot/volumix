import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  Zap,
  Lock,
  RefreshCcw,
  Star,
} from "lucide-react";

import { campaigns } from "@/data/campaigns";
import { CampaignCard } from "@/components/landing/CampaignCard";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Link } from "@tanstack/react-router";
import { useInterest } from "@/components/landing/InterestDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Volumix — Compra en grupo. Paga como mayorista." },
      {
        name: "description",
        content:
          "Prototipo en validación: la idea es agrupar compradores para negociar precios por volumen en equipos técnicos de gama alta. Campañas de demostración.",
      },
      { property: "og:title", content: "Volumix — Compra inteligente en grupo" },
      {
        property: "og:description",
        content: "Concepto en validación de compra colectiva. Contenido de demostración.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <section className="mx-auto max-w-7xl px-5 py-8"><Link to="/validacion/$slug" params={{ slug: "unitree-go2-pro" }} className="block rounded-2xl border border-primary bg-card p-6"><p className="text-xs tracking-widest text-primary">CAMPAÑA PILOTO EN VALIDACIÓN</p><h2 className="mt-3 text-2xl font-bold">Unitree Go2 Pro</h2><p className="mt-3">Objetivo: reunir 25 interesados para negociar un precio. Me interesa — sin compromiso →</p></Link></section><HowItWorks />
        <Campaigns />
        <Premium />
        <Trust />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Compra colectiva inteligente
          </span>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Compra en grupo.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Paga como mayorista.
            </span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Agrupamos compradores interesados en el mismo equipo para negociar un precio por volumen. Participa en la validación del Unitree Go2 Pro sin pagar ni comprometerte a comprar.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#campaigns"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Ver campañas <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              Cómo funciona
            </a>
          </div>

          <div className="mt-6 flex items-center gap-8">
            <Stat value="0" label="usuarios todavía: estamos validando" />
            <div className="h-10 w-px bg-border" />
            <Stat value="6" label="campañas de ejemplo" />
            <div className="hidden h-10 w-px bg-border sm:block" />
            <Stat value="Demo" label="sin pagos ni pedidos" className="hidden sm:block" />
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80"
            alt="Volumix"
            width={1600}
            height={1024}
            className="w-full rounded-2xl border border-border"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <div className={className}>
      <div className="font-display text-xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Users,
      title: "Únete a la campaña",
      desc: "Registra tu interés en la campaña piloto sin pagar nada. Los datos se guardan para medir la demanda real.",
    },
    {
      icon: TrendingDown,
      title: "El grupo desbloquea el precio",
      desc: "Con suficientes interesados tendría sentido negociar por volumen y bajar el precio del grupo.",
    },
    {
      icon: Zap,
      title: "Recibes a precio mayorista",
      desc: "Solo entonces existirían pago y envío. Hoy no hay ni cobros ni pedidos.",
    },
  ];
  return (
    <section id="how" className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Cómo funciona"
          title="Tres pasos para negociar en grupo"
          subtitle="Estamos reuniendo interesados. Los pagos y los pedidos todavía no están activos."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="absolute -top-3 left-6 rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Paso {i + 1}
              </span>
              <div
                className="mb-4 grid h-11 w-11 place-items-center rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Campaigns() {
  return (
    <section id="campaigns" className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Campañas de demostración"
          title="Ejemplos de campañas"
          subtitle="Productos, precios, plazas y cuentas atrás son ejemplos sin validez comercial."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} c={c} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Ver todos los ejemplos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Premium() {
  const { open: openInterest } = useInterest();
  const rows = [
    ["Acceso a campañas públicas", true, true],
    ["Acceso anticipado 48h", false, true],
    ["Campañas exclusivas Premium", false, true],
    ["Mejor precio garantizado", false, true],
    ["Alertas VIP y prioridad de stock", false, true],
    ["Cashback del 2% en wallet", false, true],
  ] as const;

  return (
    <section id="premium" className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader
          eyebrow="Volumix Premium"
          title="La idea de la suscripción"
          subtitle="Precio orientativo de 4,99€/mes. Todavía no se puede contratar."
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border px-6 py-5 text-sm font-medium">
            <span className="text-muted-foreground">Beneficios</span>
            <span className="text-center text-muted-foreground">Free</span>
            <span
              className="text-center font-semibold"
              style={{
                backgroundImage: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Premium
            </span>
          </div>
          {rows.map(([label, free, prem]) => (
            <div
              key={label as string}
              className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border/60 px-6 py-4 text-sm last:border-0"
            >
              <span>{label}</span>
              <span className="text-center text-muted-foreground">
                {free ? <Check className="mx-auto h-4 w-4 text-foreground" /> : "—"}
              </span>
              <span className="text-center">
                {prem ? <Check className="mx-auto h-4 w-4 text-primary" /> : "—"}
              </span>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
            <p className="text-sm text-muted-foreground">
              Beneficios propuestos, aún no disponibles para contratar.
            </p>
            <button
              type="button"
              onClick={() => openInterest("Volumix Premium")}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Me interesa Premium <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: ShieldCheck, title: "Compromiso: distribuidores oficiales", desc: "Si el proyecto avanza, solo trabajaríamos con canales oficiales." },
    { icon: Lock, title: "Compromiso: pagos con pasarela", desc: "Hoy no se procesa ningún pago en este prototipo." },
    { icon: RefreshCcw, title: "Compromiso: devolución si no hay grupo", desc: "Regla del modelo propuesto, aún no implementada." },
    { icon: Star, title: "Sin usuarios reales todavía", desc: "No mostramos métricas ni reseñas inventadas." },
  ];
  return (
    <section className="border-t border-border/60 py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-border bg-card/60 p-5">
            <it.icon className="h-5 w-5 text-primary" />
            <h4 className="mt-3 text-sm font-semibold">{it.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "¿Qué pasa si la campaña no se completa?",
      a: "En el modelo propuesto, si no se alcanza el mínimo se devolvería el importe íntegro. Hoy no hay pagos, así que no aplica.",
    },
    {
      q: "¿Cuándo pago?",
      a: "En esta versión no se paga nada. La idea es que el cargo solo se haga efectivo cuando el grupo se complete.",
    },
    {
      q: "¿Cómo conseguís precios más bajos?",
      a: "La propuesta es agrupar demanda y negociar con el distribuidor por volumen. Todavía no hay acuerdos cerrados.",
    },
    {
      q: "¿En qué se diferencia Premium?",
      a: "La idea es dar acceso anticipado, campañas exclusivas y cashback. Es una propuesta, no un servicio contratable.",
    },
    {
      q: "¿Hay envío y garantía?",
      a: "Todavía no: no hay envíos ni garantías porque no existe compra. Sería el siguiente paso si el concepto se valida.",
    },
  ];
  return (
    <section id="faq" className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeader eyebrow="FAQ" title="Preguntas frecuentes" />
        <Accordion type="single" collapsible className="mt-10">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium">{it.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  const { open: openInterest } = useInterest();
  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 text-center md:p-16"
          style={{ background: "var(--gradient-hero)" }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            ¿Te interesaría comprar así?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Estamos validando el concepto. Dinos qué equipo te interesa y lo tendremos en cuenta al
            decidir las primeras campañas reales.
          </p>
          <button
            type="button"
            onClick={() => openInterest("Volumix (general)")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-primary-foreground"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            Registrar mi interés <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
