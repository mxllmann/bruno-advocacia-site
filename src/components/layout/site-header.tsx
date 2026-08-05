"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { cn } from "@/lib/utils";
import { navItems, whatsappUrl } from "@/lib/site";
import { spring } from "@/lib/motion";
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
        // Translucent chrome: content scrolls underneath a real material layer.
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        scrolled ? "glass-strong" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="#top"
          aria-label="Ramos & Pereira Advocacia — início"
          className="transition-transform duration-200 ease-out active:scale-[0.97]"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-foreground/75 transition-colors duration-300 hover:text-gold after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.23,1,0.32,1)] hover:after:scale-x-100"
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
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 text-gold transition-[transform,background-color] duration-200 ease-out hover:bg-gold/10 active:scale-[0.94] lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Scroll-edge effect — a soft fade where content meets floating chrome,
          instead of a hard 1px divider (Apple §12). */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-full h-px gold-hairline transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              className="fixed right-0 top-0 z-50 flex h-full w-[82vw] max-w-[340px] flex-col gap-8 border-l border-gold/15 glass-strong px-6 py-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              // Drawer spring — Apple: damping 0.8, response 0.3 (a little momentum).
              transition={spring.snappy}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  aria-label="Fechar menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-[transform,background-color] duration-200 ease-out hover:bg-gold/10 active:scale-[0.94]"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-col divide-y divide-border/60">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="py-4 text-lg font-medium text-foreground/85 transition-colors hover:text-gold"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...spring.default, delay: 0.08 + i * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <Button asChild variant="whatsapp" size="lg" className="mt-auto">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <WhatsApp className="text-[20px]!" />
                  Falar no WhatsApp
                </a>
              </Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
