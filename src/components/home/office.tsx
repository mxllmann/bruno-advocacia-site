import { officePillars } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedList } from "@/components/ui/animated-list";

export function Office() {
  const pillarItems = officePillars.map((pillar, i) => (
    <article
      key={pillar.title}
      className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-5 border-b border-border/70 py-8 first:pt-8 last:border-b-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-7 sm:py-10"
    >
      <span className="pt-1 font-serif text-base tabular-nums text-gold/60 transition-colors duration-300 group-hover:text-gold sm:text-lg">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">
          {pillar.title}
        </h3>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
          {pillar.text}
        </p>
      </div>
    </article>
  ));

  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-6xl gold-hairline" />
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-24 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <AnimatedHeading
            as="h2"
            text="Um escritório construído sobre confiança e resultado"
            highlight="confiança e resultado"
            className="display w-full text-[2.35rem] text-foreground sm:text-[3.25rem] md:text-5xl"
          />
          <Reveal index={2}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              Da primeira conversa à decisão final, conduzimos cada caso com
              compromisso pessoal, técnica apurada e transparência total com quem
              nos confia seus interesses.
            </p>
          </Reveal>
          <div id="escritorio" className="h-0 scroll-mt-40 sm:scroll-mt-44" />
        </div>

        <AnimatedList items={pillarItems} className="border-t border-border/70" />
      </div>
    </section>
  );
}
