import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { site, whatsappUrl } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-svh items-center overflow-hidden bg-background px-5 pt-32 pb-24 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/background.png')] bg-cover bg-[position:70%_center] opacity-45 sm:bg-right"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,9,8,0.94)_0%,rgba(10,9,8,0.82)_48%,rgba(10,9,8,0.42)_100%),linear-gradient(180deg,rgba(10,9,8,0.36)_0%,rgba(10,9,8,0.82)_100%)]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="eyebrow text-xs font-semibold text-gold">Erro 404</p>
          <h1 className="display text-[2.8rem] text-foreground sm:text-6xl lg:text-[4.5rem]">
            Esta página não foi encontrada.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            O endereço acessado pode ter mudado ou não existe mais. Você pode
            retornar à página inicial ou falar diretamente com {site.shortName}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="/">Voltar ao início</Link>
          </Button>
          <InteractiveHoverButton href={whatsappUrl()} type="whatsapp">
            Falar no WhatsApp
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}
