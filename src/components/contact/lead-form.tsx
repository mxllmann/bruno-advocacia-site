"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type LeadFormProps = {
  variant?: "full" | "compact";
  className?: string;
};

export function LeadForm({ variant = "full", className }: LeadFormProps) {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const lines = [
      "Olá, gostaria de um atendimento com a Ramos & Pereira Advocacia.",
      name && `Nome: ${name}`,
      phone && `Telefone: ${phone}`,
      email && `E-mail: ${email}`,
      message && `Mensagem: ${message}`,
    ].filter(Boolean);

    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSending(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-4", className)}
    >
      <div className={cn(variant === "full" && "grid gap-4 sm:grid-cols-2")}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
            Nome
          </label>
          <Input id="name" name="name" placeholder="Seu nome" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
            Telefone / WhatsApp
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(48) 90000-0000"
            required
          />
        </div>
      </div>

      {variant === "full" && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
            E-mail
          </label>
          <Input id="email" name="email" type="email" placeholder="voce@email.com" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
          Como podemos ajudar?
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Descreva brevemente o seu caso."
          className={variant === "compact" ? "min-h-24" : undefined}
          required
        />
      </div>

      <Button type="submit" size="lg" disabled={sending} className="mt-1 w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {sending ? "Abrindo WhatsApp…" : "Enviar mensagem"}
      </Button>

      <p className="text-xs text-muted-foreground/80">
        Ao enviar, você será direcionado ao nosso WhatsApp com a mensagem já
        preenchida.
      </p>
    </form>
  );
}
