import { Mail, Phone } from "lucide-react";
import { team } from "@/lib/site";
import { MagicCard } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

function initials(name: string) {
  const clean = name.replace(/^(Dr\.|Dra\.)\s*/i, "");
  const parts = clean.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function Team() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-5xl gold-hairline" />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          title="Advogados dedicados ao seu caso"
          highlight="dedicados"
          description="Profissionais experientes, unidos pelo compromisso com a ética e com o melhor resultado para o cliente."
        />

        <div id="equipe" className="h-0 scroll-mt-8 sm:scroll-mt-12" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={`${member.name}-${i}`} index={i % 3}>
              <MagicCard
                className="h-full rounded-3xl"
                gradientSize={260}
                gradientOpacity={0}
              >
                <article className="flex h-full flex-col overflow-hidden rounded-[inherit] bg-surface/50">
                  {/* Placeholder portrait */}
                  <div className="relative flex h-60 items-center justify-center overflow-hidden bg-linear-to-br from-surface-2/85 to-background/70">
                    <div className="pointer-events-none absolute inset-0 opacity-45 [background:radial-gradient(circle_at_50%_28%,rgba(200,162,75,0.18),transparent_62%)]" />
                    <span className="grid h-24 w-24 place-items-center rounded-full border border-gold/30 bg-gold/10 font-serif text-3xl text-gold">
                      {initials(member.name)}
                    </span>
                    <span className="eyebrow absolute bottom-3 right-3 rounded-full border border-gold/25 bg-background/70 px-3 py-1 text-[0.6rem] font-medium text-gold backdrop-blur-sm">
                      {member.oab}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div>
                      <h3 className="font-serif text-xl text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gold">{member.role}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {member.bio}
                    </p>
                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-[border-color,color] duration-200 ease-out group-hover:border-gold/40 group-hover:text-gold">
                        <Mail className="h-4 w-4" />
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-[border-color,color] duration-200 ease-out group-hover:border-gold/40 group-hover:text-gold">
                        <Phone className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </MagicCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground/70">
          * Conteúdo ilustrativo — substituiremos por nomes, fotos e bios reais
          da equipe.
        </p>
      </div>
    </section>
  );
}
