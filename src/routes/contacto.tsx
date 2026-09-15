import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useInterest } from "@/components/landing/InterestDialog";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Volumix (prototipo en validación)" },
      {
        name: "description",
        content:
          "Volumix es un prototipo en fase de validación. Deja tu interés y te tendremos en cuenta cuando el proyecto avance.",
      },
      { property: "og:title", content: "Contacto — Volumix" },
      {
        property: "og:description",
        content: "Proyecto en validación: registra tu interés en Volumix.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const { open } = useInterest();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Contacto</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Hablemos de Volumix</h1>
        <p className="mt-4 text-muted-foreground">
          Volumix es actualmente un prototipo en fase de validación: no hay servicio operativo, ni
          pagos, ni pedidos. Estamos comprobando si la idea de compra colectiva para equipos
          técnicos de gama alta interesa lo suficiente como para construirla.
        </p>
        <p className="mt-4 text-muted-foreground">
          Todavía no publicamos un canal de contacto directo. Si quieres seguir el proyecto, deja tu
          interés con el formulario: en esta versión se guarda únicamente en tu navegador (modo
          demo) y no se envía a ningún servidor.
        </p>
        <button
          type="button"
          onClick={() => open("Contacto general")}
          className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
        >
          Registrar mi interés <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Pendiente antes de publicar</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Titular del proyecto y datos identificativos.</li>
            <li>Canal de contacto verificado (correo del proyecto o formulario con backend).</li>
            <li>Textos legales revisados por un profesional.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

