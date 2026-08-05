import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { LeadForm } from "./lead-form";

const info = [
  {
    icon: MapPin,
    text: `${site.address.line1}, ${site.address.line2} — ${site.address.zip}`,
  },
  { icon: Phone, text: site.phone, href: site.phoneHref },
  { icon: Mail, text: site.email, href: `mailto:${site.email}` },
  { icon: Clock, text: `${site.hours.days}, ${site.hours.time}` },
];

export function ContactSection() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address.mapsQuery,
  )}&output=embed`;

  return (
    <section id="contato" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl gold-hairline" />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — form */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <AnimatedHeading
                as="h2"
                text="Entre em contato conosco"
                highlight="contato"
                className="font-serif text-[2.25rem] leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]"
              />
              <Reveal index={2}>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  Será um prazer atendê-lo. Conte o seu caso e retornaremos o mais
                  breve possível.
                </p>
              </Reveal>
            </div>

            <Reveal index={2}>
              <LeadForm variant="full" />
            </Reveal>
          </div>

          {/* Right — map + compact info */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Localização — Ramos & Pereira Advocacia"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full sm:h-80"
                  style={{
                    border: 0,
                    filter:
                      "invert(0.92) hue-rotate(180deg) saturate(0.65) brightness(0.95) contrast(0.9)",
                  }}
                  allowFullScreen
                />
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/10" />
              </div>
            </Reveal>

            <Reveal index={1}>
              <ul className="flex flex-col divide-y divide-border/60 rounded-2xl border border-border bg-surface/50">
                {info.map(({ icon: Icon, text, href }) => {
                  const inner = (
                    <div className="flex items-center gap-4 px-5 py-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-gold/20 bg-gold/[0.06] text-gold">
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <span className="text-sm leading-snug text-muted-foreground">
                        {text}
                      </span>
                    </div>
                  );
                  return (
                    <li key={text}>
                      {href ? (
                        <a href={href} className="block transition-colors hover:bg-surface-2/50">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
