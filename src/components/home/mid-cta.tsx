import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { LeadForm } from "@/components/contact/lead-form";

const perks = [
  "Análise inicial do seu caso",
  "Atendimento personalizado e sigiloso",
  "Resposta ágil, sem juridiquês",
];

export function MidCta() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-gold/25 bg-linear-to-br from-surface-2 to-surface p-8 sm:p-12">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gold-deep/10 blur-[100px]" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="flex flex-col gap-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Fale conosco agora
                </span>
                <AnimatedHeading
                  as="h2"
                  text="Precisa de orientação jurídica? Estamos prontos."
                  highlight="Estamos prontos."
                  className="font-serif text-3xl leading-tight text-foreground sm:text-4xl"
                />
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  Conte o seu caso em poucas linhas. Retornamos com a melhor
                  estratégia para o seu problema.
                </p>
                <ul className="flex flex-col gap-3">
                  {perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur-sm sm:p-8">
                <LeadForm variant="compact" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
