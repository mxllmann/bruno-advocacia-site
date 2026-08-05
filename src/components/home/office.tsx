import { officePillars } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedHeading } from "@/components/ui/animated-heading";

export function Office() {
  return (
    <section id="escritorio" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl gold-hairline" />
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
        {/* Left — intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <AnimatedHeading
            as="h2"
            text="Um escritório construído sobre confiança e resultado"
            highlight="confiança e resultado"
            className="font-serif text-[2.25rem] leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]"
          />
          <Reveal index={2}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Da primeira conversa à decisão final, conduzimos cada caso com
              compromisso pessoal, técnica apurada e transparência total com quem
              nos confia seus interesses.
            </p>
          </Reveal>
        </div>

        {/* Right — pillars */}
        <div className="flex flex-col">
          {officePillars.map((pillar, i) => (
            <Reveal key={pillar.title} index={i % 3}>
              <article className="group flex gap-6 border-b border-border/60 py-7 first:pt-0 last:border-b-0">
                <span className="font-serif text-lg text-gold/60 transition-colors group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-xl text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
