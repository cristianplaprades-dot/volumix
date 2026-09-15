import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos de uso (borrador) — Volumix" },
      {
        name: "description",
        content:
          "Borrador de términos de uso del prototipo Volumix: sin contratación, sin pagos y con contenido de demostración.",
      },
      { property: "og:title", content: "Términos de uso (borrador) — Volumix" },
      {
        property: "og:description",
        content: "Condiciones provisionales de un prototipo en validación.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terminos,
});

function Terminos() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Borrador</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Términos de uso</h1>
        <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
          Texto provisional de un prototipo en validación. No constituye un contrato ni una oferta
          comercial.
        </p>

        <Section title="1. Naturaleza del sitio">
          Volumix es una demostración de producto. No existe plataforma operativa, ni intermediación
          de compra, ni relación con los fabricantes o marcas mencionadas.
        </Section>
        <Section title="2. Contenido de demostración">
          Productos, imágenes, precios, número de participantes, plazos y cuentas atrás son ejemplos
          ilustrativos generados para la demo. No reflejan disponibilidad, condiciones ni precios
          reales, y pueden cambiar o desaparecer sin aviso.
        </Section>
        <Section title="3. Sin contratación ni pagos">
          Ningún botón del sitio permite reservar, contratar, suscribirse o pagar. No se procesan
          cobros, señales, reembolsos ni pedidos.
        </Section>
        <Section title="4. Registro de interés">
          El formulario de interés almacena la información exclusivamente en tu navegador. No genera
          derechos, lista de espera vinculante ni compromiso alguno por ninguna de las partes.
        </Section>
        <Section title="5. Marcas de terceros">
          Los nombres de fabricantes y productos pertenecen a sus titulares y se usan únicamente con
          fines descriptivos dentro de una demostración.
        </Section>
        <Section title="Pendiente antes de publicar">
          Titularidad del proyecto y datos fiscales, ley aplicable y jurisdicción, condiciones de
          contratación reales, política de cancelación y reembolso, y revisión legal profesional.
        </Section>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </section>
  );
}

