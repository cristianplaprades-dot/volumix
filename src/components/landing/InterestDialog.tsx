import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, Info } from "lucide-react";

const STORAGE_KEY = "volumix:interes";

const schema = z.object({
  name: z.string().trim().max(80, "El nombre debe tener menos de 80 caracteres").optional(),
  email: z
    .string()
    .trim()
    .min(1, "Introduce tu email")
    .email("Introduce un email válido")
    .max(255, "El email debe tener menos de 255 caracteres"),
  interest: z.string().trim().min(1, "Indica la campaña de interés").max(120),
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Debes aceptar la política de privacidad" }),
});

type InterestCtx = { open: (interest?: string) => void };
const Ctx = createContext<InterestCtx>({ open: () => {} });

export function useInterest() {
  return useContext(Ctx);
}

export function InterestProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [interest, setInterest] = useState("Volumix (general)");

  const open = useCallback((value?: string) => {
    if (value?.toLowerCase().includes('unitree')) { window.location.assign('/validacion/unitree-go2-pro'); return; }
    setInterest(value ?? "Volumix (general)");
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <InterestDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        interest={interest}
        setInterest={setInterest}
      />
    </Ctx.Provider>
  );
}

function InterestDialog({
  open,
  onOpenChange,
  interest,
  setInterest,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  interest: string;
  setInterest: (v: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function reset() {
    setName("");
    setEmail("");
    setConsent(false);
    setErrors({});
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse({
      name: name.trim() || undefined,
      email,
      interest,
      consent,
    });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: unknown[] = raw ? JSON.parse(raw) : [];
      list.push({ ...result.data, savedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* almacenamiento no disponible */
    }
    setSaved(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar interés</DialogTitle>
          <DialogDescription>
            Volumix está en fase de validación. Este formulario no envía nada a ningún servidor:
            guarda tu interés únicamente en este dispositivo.
          </DialogDescription>
        </DialogHeader>

        {saved ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-foreground">
                Interés guardado en este dispositivo (modo demo). No se ha enviado ningún dato a un
                servidor ni recibirás correos todavía.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Field label="Nombre (opcional)" htmlFor="int-name" error={errors["name"]}>
              <input
                id="int-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                autoComplete="name"
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </Field>

            <Field label="Email" htmlFor="int-email" error={errors["email"]}>
              <input
                id="int-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                autoComplete="email"
                required
                aria-invalid={Boolean(errors["email"])}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </Field>

            <Field label="Campaña de interés" htmlFor="int-interest" error={errors["interest"]}>
              <input
                id="int-interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                maxLength={120}
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
              />
            </Field>

            <div>
              <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border bg-card accent-[oklch(0.62_0.22_277)]"
                />
                <span>
                  He leído y acepto el borrador de política de privacidad de este prototipo.
                </span>
              </label>
              {errors["consent"] && (
                <p className="mt-1 text-xs text-destructive">{errors["consent"]}</p>
              )}
            </div>

            <p className="flex items-start gap-2 rounded-xl border border-border bg-card/60 p-3 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Los datos se guardan en el almacenamiento local de tu navegador y puedes borrarlos
              limpiando los datos del sitio.
            </p>

            <button
              type="submit"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Guardar mi interés
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

