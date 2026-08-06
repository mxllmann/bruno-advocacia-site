import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { site, navItems } from "@/lib/site";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-gold/15 bg-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1.2fr] lg:px-12">
        <div className="flex flex-col gap-5">
          <Image
            src="/logo/logo.png"
            alt="Ramos & Pereira Advocacia"
            width={1899}
            height={893}
            className="h-auto w-52"
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Navegação
          </span>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contato
          </span>
          <p className="flex items-start gap-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              {site.address.line1}
              <br />
              {site.address.line2} — {site.address.zip}
            </span>
          </p>
          <a
            href={site.phoneHref}
            className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4 shrink-0 text-gold" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <Mail className="h-4 w-4 shrink-0 text-gold" />
            {site.email}
          </a>
          <p className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-gold" />
            {site.hours.days}, {site.hours.time}
          </p>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8 lg:px-12">
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Desenvolvido por Arthur Mallmann</span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/mxllmann"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Arthur Mallmann"
                className="transition-colors hover:text-gold"
              >
                <GitHub fontSize="small" />
              </a>
              <a
                href="https://www.linkedin.com/in/arthurmallmann/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Arthur Mallmann"
                className="transition-colors hover:text-gold"
              >
                <LinkedIn fontSize="small" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
