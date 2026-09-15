import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { campaigns } from "@/data/campaigns";
import { CampaignCard } from "@/components/landing/CampaignCard";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/campaigns/")({
  head: () => ({
    meta: [
      { title: "Campañas de ejemplo — Volumix" },
      {
        name: "description",
        content:
          "Explora las campañas de compra colectiva activas en Volumix. Filtra por categoría y ahorro.",
      },
    ],
  }),
  component: Catalog,
});

const categories = ["Todas", ...Array.from(new Set(campaigns.map((c) => c.category)))];
const sorts = [
  { id: "ending", label: "Cierra antes" },
  { id: "saving", label: "Mayor ahorro" },
  { id: "popular", label: "Más populares" },
] as const;
type SortId = (typeof sorts)[number]["id"];

function Catalog() {
  const [category, setCategory] = useState("Todas");
  const [onlyAlmost, setOnlyAlmost] = useState(false);
  const [sort, setSort] = useState<SortId>("ending");

  const filtered = useMemo(() => {
    let list = campaigns.slice();
    if (category !== "Todas") list = list.filter((c) => c.category === category);
    if (onlyAlmost) list = list.filter((c) => c.status === "almost" || c.joined / c.target >= 0.8);
    if (sort === "saving") {
      list.sort(
        (a, b) =>
          (b.priceOriginal - b.priceGroup) / b.priceOriginal -
          (a.priceOriginal - a.priceGroup) / a.priceOriginal,
      );
    } else if (sort === "popular") {
      list.sort((a, b) => b.joined - a.joined);
    } else {
      // ending — fake parse: confirmed last, almost first, else as-is
      const order: Record<string, number> = { almost: 0, active: 1, confirmed: 2 };
      list.sort((a, b) => order[a.status] - order[b.status]);
    }
    return list;
  }, [category, onlyAlmost, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="border-b border-border/60 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Inicio
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Campañas de ejemplo
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {filtered.length} campañas disponibles. Ejemplos de campañas.
            </p>
          </div>
        </section>

        <section className="sticky top-[65px] z-30 border-b border-border/60 bg-background/80 py-4 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = cat === category;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={onlyAlmost}
                  onChange={(e) => setOnlyAlmost(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-card accent-[oklch(0.62_0.22_277)]"
                />
                Casi completas
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-5">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
                No hay campañas con esos filtros todavía.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => (
                  <CampaignCard key={c.id} c={c} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
