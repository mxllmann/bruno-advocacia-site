"use client";

import { motion, type Variants } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";
import { spring } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: spring.default },
};

const underline: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { type: "spring", bounce: 0, duration: 0.8, delay: 0.9 },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-svh items-start overflow-hidden bg-background pt-28 pb-[46svh] sm:items-center sm:pt-32 sm:pb-24"
    >
      {/* Hero artwork keeps its intentionally dark left half for copy contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[48svh] w-full bg-cover bg-[position:68%_center] bg-no-repeat sm:inset-0 sm:h-auto sm:w-auto sm:bg-contain sm:bg-right"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[calc(48svh-10rem)] -z-10 h-40 bg-linear-to-b from-background via-background/85 to-transparent sm:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,9,8,0.94)_0%,rgba(10,9,8,0.78)_48%,rgba(10,9,8,0.20)_72%,rgba(10,9,8,0.68)_100%)] sm:bg-[linear-gradient(90deg,rgba(10,9,8,0.72)_0%,rgba(10,9,8,0.46)_42%,rgba(10,9,8,0.14)_72%),linear-gradient(180deg,rgba(10,9,8,0.30)_0%,rgba(10,9,8,0)_42%,rgba(10,9,8,0.62)_100%)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:px-12"
      >
        <motion.span
          variants={item}
          className="eyebrow text-[0.7rem] font-semibold text-gold/90"
        >
          Advocacia em Florianópolis · {site.oab}
        </motion.span>

        <motion.h1
          variants={item}
          className="display max-w-4xl text-[2.6rem] text-foreground sm:text-6xl lg:text-[4.25rem]"
        >
          Defesa jurídica com{" "}
          <span className="relative inline-block text-gold">
            excelência
            <motion.span
              aria-hidden
              variants={underline}
              className="absolute -bottom-1 left-0 h-[0.08em] w-full origin-left rounded-full bg-linear-to-r from-gold-deep via-gold to-gold-bright"
            />
          </span>{" "}
          e atendimento verdadeiramente próximo.
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          {site.description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
        >
          <Button asChild size="lg">
            <a href="#contato">Fale com um advogado</a>
          </Button>
          <InteractiveHoverButton href={whatsappUrl()} type="whatsapp">
            Chamar no WhatsApp
          </InteractiveHoverButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#areas"
        aria-label="Rolar para as áreas de atuação"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/60 transition-colors hover:text-gold md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="eyebrow text-[0.6rem] font-medium">Explore</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-current"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
