import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — PetroMobi" },
      { name: "description", content: "Fale com nossa equipe técnica. WhatsApp, e-mail e telefone para suporte e orientação sobre produtos automotivos." },
      { property: "og:title", content: "Contato — PetroMobi" },
      { property: "og:description", content: "Suporte técnico especializado para o seu motor." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Fale Conosco</div>
      <h1 className="font-display text-4xl md:text-5xl mb-3">Atendimento técnico</h1>
      <p className="text-muted-foreground max-w-2xl mb-10">
        Tem dúvidas sobre qual produto é ideal para seu veículo? Nossa equipe está pronta para ajudar.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" className="group p-6 rounded-lg bg-card border border-border/60 hover:border-accent/60 transition-all hover:-translate-y-1">
          <MessageCircle className="w-8 h-8 text-accent mb-3" />
          <h3 className="font-display uppercase tracking-wide mb-1">WhatsApp</h3>
          <p className="text-sm text-muted-foreground">Resposta rápida durante horário comercial</p>
          <div className="mt-3 text-foreground font-mono">+55 (11) 99999-9999</div>
        </a>
        <a href="mailto:contato@petromobi.com.br" className="group p-6 rounded-lg bg-card border border-border/60 hover:border-primary/60 transition-all hover:-translate-y-1">
          <Mail className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-display uppercase tracking-wide mb-1">E-mail</h3>
          <p className="text-sm text-muted-foreground">Para orçamentos e parcerias</p>
          <div className="mt-3 text-foreground font-mono break-all">contato@petromobi.com.br</div>
        </a>
        <div className="p-6 rounded-lg bg-card border border-border/60">
          <Phone className="w-8 h-8 text-accent mb-3" />
          <h3 className="font-display uppercase tracking-wide mb-1">Telefone</h3>
          <p className="text-sm text-muted-foreground">Seg a Sex, 8h às 18h</p>
          <div className="mt-3 text-foreground font-mono">+55 (11) 4000-0000</div>
        </div>
        <div className="p-6 rounded-lg bg-card border border-border/60">
          <MapPin className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-display uppercase tracking-wide mb-1">Endereço</h3>
          <p className="text-sm text-muted-foreground">Centro de distribuição</p>
          <div className="mt-3 text-foreground">São Paulo — SP, Brasil</div>
        </div>
      </div>
    </section>
  );
}
