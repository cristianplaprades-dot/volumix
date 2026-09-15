import type { Campaign } from "@/data/campaigns";
import { Clock, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useInterest } from "./InterestDialog";

const statusLabel: Record<Campaign["status"], { text: string; cls: string }> = {
  active: { text: "Ejemplo activo", cls: "bg-primary/15 text-primary border-primary/30" },
  almost: { text: "Ejemplo casi completo", cls: "bg-accent/15 text-accent border-accent/30" },
  confirmed: {
    text: "Ejemplo completado",
    cls: "bg-[oklch(0.72_0.17_155)]/15 text-[oklch(0.78_0.17_155)] border-[oklch(0.72_0.17_155)]/30",
  },
};

export function CampaignCard({ c }: { c: Campaign }) {
  const pct = Math.min(100, Math.round((c.joined / c.target) * 100));
  const saving = Math.round(((c.priceOriginal - c.priceGroup) / c.priceOriginal) * 100);
  const s = statusLabel[c.status];
  const { open } = useInterest();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={c.image}
          alt={`Imagen ilustrativa de ${c.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-md ${s.cls}`}>
          {s.text}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
          −{saving}% (ejemplo)
        </span>
        <span className="absolute bottom-3 left-3 rounded-md bg-background/75 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur-md">
          Imagen ilustrativa
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{c.name}</h3>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-2xl font-bold text-foreground">{c.priceGroup}€</span>
          <span className="pb-1 text-sm text-muted-foreground line-through">{c.priceOriginal}€</span>
          <span className="ml-auto rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            Premium {c.pricePremium}€
          </span>
        </div>
        <p className="-mt-2 text-[11px] text-muted-foreground">Precios de ejemplo, no comerciales.</p>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{c.joined}/{c.target}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{c.countdown}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: "var(--gradient-primary)" }}
            />
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            to="/campaigns/$id"
            params={{ id: c.id }}
            className="flex-1 rounded-xl border border-border bg-secondary/60 px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Ver detalle
          </Link>
          <button
            type="button"
            onClick={() => open(c.name)}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            Me interesa
          </button>
        </div>
      </div>
    </article>
  );
}

