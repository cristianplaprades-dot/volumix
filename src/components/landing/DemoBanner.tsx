import { FlaskConical } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="border-b border-border/60 bg-card/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2 text-center text-xs text-muted-foreground">
        <FlaskConical className="h-3.5 w-3.5 shrink-0 text-accent" />
        <p>
          <span className="font-medium text-foreground">Prototipo en validación</span> · Campañas,
          precios y plazas son ejemplos de demostración sin validez comercial.
        </p>
      </div>
    </div>
  );
}

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent ${className}`}
    >
      <FlaskConical className="h-3 w-3" />
      Campaña de demostración
    </span>
  );
}

