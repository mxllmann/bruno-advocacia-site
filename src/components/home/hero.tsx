"use client";

import { motion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Ambient background — cheap radial gradients (no expensive blur) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 50% -5%, rgba(194,168,120,0.12), transparent 60%), radial-gradient(120% 80% at 50% 0%, transparent 45%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:px-12"
      >
        <AnimatedHeading
          as="h1"
          text="Defesa jurídica com excelência e atendimento verdadeiramente próximo."
          highlight="excelência"
          underline
          className="max-w-4xl font-serif text-4xl leading-[1.12] text-foreground sm:text-6xl lg:text-[4.25rem]"
        />

        <motion.p
          variants={item}
          className="max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {site.description}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href="#contato">Fale com um advogado</a>
          </Button>
          <InteractiveHoverButton href={whatsappUrl()} type="whatsapp">
            Chamar no WhatsApp
          </InteractiveHoverButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
