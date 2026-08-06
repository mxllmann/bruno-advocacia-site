import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { LeadForm } from "./lead-form";
import { LocationMap } from "./location-map";

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
  const mapQuery = encodeURIComponent(site.address.mapsQuery);
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section className="relative py-24 sm:py-32">
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
                className="display w-full text-[2.35rem] text-foreground sm:text-[3.25rem] md:text-6xl"
              />
              <Reveal index={2}>
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  Será um prazer atendê-lo. Conte o seu caso e retornaremos o mais
                  breve possível.
                </p>
              </Reveal>
            </div>

            <div id="contato" className="h-0 scroll-mt-24 sm:scroll-mt-28" />

            <Reveal index={2}>
              <LeadForm variant="full" />
            </Reveal>
          </div>

          {/* Right — map + compact info */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <LocationMap src={mapSrc} directionsHref={directionsHref} />
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
