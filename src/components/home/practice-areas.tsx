import {
  Scale,
  Plane,
  ShoppingBag,
  Banknote,
  ShieldCheck,
  Landmark,
  Receipt,
  HeartHandshake,
  Briefcase,
  Building2,
  HardHat,
  Gavel,
  type LucideIcon,
} from "lucide-react";
import { practiceAreas } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<string, LucideIcon> = {
  scale: Scale,
  plane: Plane,
  "shopping-bag": ShoppingBag,
  banknote: Banknote,
  "shield-check": ShieldCheck,
  landmark: Landmark,
  receipt: Receipt,
  "heart-handshake": HeartHandshake,
  briefcase: Briefcase,
  "building-2": Building2,
  "hard-hat": HardHat,
  gavel: Gavel,
};

export function PracticeAreas() {
  return (
    <section id="areas" className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          title="Soluções jurídicas para cada demanda"
          highlight="cada demanda"
          description="Atuação judicial e extrajudicial perante qualquer Tribunal ou Comarca do país, com atendimento personalizado, agilidade e ética."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {practiceAreas.map((area, i) => {
            const Icon = icons[area.icon] ?? Scale;
            return (
              <Reveal key={area.title} index={i % 4}>
                <article
                  title={area.description}
                  className="group flex h-full items-center gap-3.5 rounded-xl border border-border bg-surface/40 p-4 transition-colors duration-300 hover:border-gold/40 hover:bg-surface-2/60"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/20 bg-gold/[0.06] text-gold transition-colors duration-300 group-hover:border-gold/45">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-serif text-[0.95rem] leading-snug text-foreground/90">
                    {area.title}
                  </h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
