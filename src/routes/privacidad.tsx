import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad (borrador) — Volumix" },
      {
        name: "description",
        content:
          "Borrador de política de privacidad del prototipo Volumix: qué datos se guardan, dónde y qué falta por definir antes de publicar.",
      },
      { property: "og:title", content: "Política de privacidad (borrador) — Volumix" },
      {
        property: "og:description",
        content: "Documento provisional del prototipo Volumix, sin validez legal definitiva.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Borrador</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Política de privacidad
        </h1>
        <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-foreground">
          Documento provisional para un prototipo en validación. No sustituye a una política de
          privacidad revisada por un profesional y no debe considerarse definitivo.
        </p>

        <Section title="1. Qué datos tratamos">
          En la campaña piloto se guardan en Supabase el nombre, email, país, código postal, unidades, rango de precio, consentimiento y preferencias de aviso. También se registra la fuente de tráfico y los enlaces de invitación para medir la demanda. Los formularios de demostración de las otras campañas guardan datos únicamente en este navegador.
        </Section>
        <Section title="2. Finalidad">
          Medir la demanda de la campaña y, si lo solicitas, avisarte cuando exista un precio negociado. No se realiza ninguna compra ni se procesa ningún pago.
        </Section>
        <Section title="3. Conservación y borrado">
          Los registros de la campaña piloto permanecen en la base de datos. Borrar los datos del navegador no elimina esos registros. Antes de publicar se debe definir el plazo de conservación y el contacto para solicitar su eliminación.
        </Section>
        <Section title="4. Cesiones y terceros">
          La campaña utiliza Supabase como proveedor de almacenamiento. Las imágenes externas pueden registrar peticiones. Los botones de compartir solo abren el servicio elegido cuando los pulsas.
        </Section>
        <Section title="5. Derechos">
          Antes de la apertura pública se debe identificar al responsable y proporcionar un contacto para gestionar las solicitudes sobre los datos de la campaña.
        </Section>
        <Section title="Pendiente antes de publicar">
          Identificación del responsable del tratamiento, base jurídica, encargados de tratamiento,
          política de cookies, plazos de conservación reales y canal para ejercer derechos.
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

