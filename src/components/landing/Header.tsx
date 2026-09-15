import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { DemoBanner } from "./DemoBanner";
import { useInterest } from "./InterestDialog";

export function Header() {
  const [open, setOpen] = useState(false);
  const { open: openInterest } = useInterest();
  const close = () => setOpen(false);

  return (
    <div className="sticky top-0 z-50">
      <DemoBanner />
      <header className="border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2" onClick={close}>
            <span
              className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              V
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Volumix</span>
          </Link>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-7 text-sm text-muted-foreground md:flex"
          >
            <Link to="/" hash="how" className="transition-colors hover:text-foreground">
              Cómo funciona
            </Link>
            <Link
              to="/campaigns"
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Campañas
            </Link>
            <Link to="/" hash="premium" className="transition-colors hover:text-foreground">
              Premium
            </Link>
            <Link to="/" hash="faq" className="transition-colors hover:text-foreground">
              FAQ
            </Link>
            <Link
              to="/contacto"
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openInterest("Volumix (general)")}
              className="hidden items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
              style={{ background: "var(--gradient-primary)" }}
            >
              Me interesa <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 text-foreground md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="menu-movil"
            aria-label="Navegación móvil"
            className="border-t border-border/60 bg-background/95 px-5 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <Link to="/" hash="how" onClick={close} className="block rounded-lg px-3 py-2.5 hover:bg-secondary">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link to="/campaigns" onClick={close} className="block rounded-lg px-3 py-2.5 hover:bg-secondary">
                  Campañas
                </Link>
              </li>
              <li>
                <Link to="/" hash="premium" onClick={close} className="block rounded-lg px-3 py-2.5 hover:bg-secondary">
                  Premium
                </Link>
              </li>
              <li>
                <Link to="/" hash="faq" onClick={close} className="block rounded-lg px-3 py-2.5 hover:bg-secondary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contacto" onClick={close} className="block rounded-lg px-3 py-2.5 hover:bg-secondary">
                  Contacto
                </Link>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    close();
                    openInterest("Volumix (general)");
                  }}
                  className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Me interesa
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}

