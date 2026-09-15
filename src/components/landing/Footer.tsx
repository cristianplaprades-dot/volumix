import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <div className="flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-md text-xs font-bold text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              V
            </span>
            <span className="font-display font-semibold text-foreground">Volumix</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <p className="text-xs">Prototipo en validación. Contenido de demostración.</p>
        </div>
        <nav aria-label="Enlaces legales" className="flex flex-wrap justify-center gap-6">
          <Link to="/campaigns" className="hover:text-foreground">
            Campañas
          </Link>
          <Link to="/contacto" className="hover:text-foreground">
            Contacto
          </Link>
          <Link to="/privacidad" className="hover:text-foreground">
            Privacidad
          </Link>
          <Link to="/terminos" className="hover:text-foreground">
            Términos
          </Link>
        </nav>
      </div>
    </footer>
  );
}

