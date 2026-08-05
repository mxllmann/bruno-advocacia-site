"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { cn } from "@/lib/utils";
import { navItems, whatsappUrl } from "@/lib/site";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-gold/15 bg-background shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="#top" aria-label="Ramos & Pereira Advocacia — início">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-gold after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <InteractiveHoverButton
            href={whatsappUrl()}
            type="whatsapp"
            className="hidden sm:inline-flex"
          >
            Chamar no WhatsApp
          </InteractiveHoverButton>

          <button
            type="button"
            aria-label="Abrir menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-[82vw] max-w-[340px] transform border-l border-gold/15 bg-surface transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col gap-8 px-6 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              aria-label="Fechar menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col divide-y divide-border/70">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-4 text-lg font-medium text-foreground/85 transition-colors hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="whatsapp" size="lg" className="mt-auto">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <WhatsApp className="text-[20px]!" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </aside>
    </header>
  );
}
