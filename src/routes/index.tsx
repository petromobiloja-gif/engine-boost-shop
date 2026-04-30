import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-engine.jpg";
import { Button } from "@/components/ui/button";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { ProductGrid } from "@/components/site/ProductGrid";
import { ArrowRight, Award, Gauge, ShieldCheck, Wrench } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetroMobi — Óleos lubrificantes de alta performance" },
      { name: "description", content: "Lubrificantes, aditivos e produtos de arrefecimento para carros, motos e caminhões. Tecnologia avançada para máxima proteção do motor." },
      { property: "og:title", content: "PetroMobi" },
      { property: "og:description", content: "Lubrificantes de alta performance para o seu motor." },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Motor de alta performance recebendo óleo lubrificante premium" width={1920} height={1080} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-grid opacity-30" />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.2em] text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Tecnologia & Performance
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] mb-6">
              Máxima <span className="text-gradient-fire">Proteção</span><br />
              para o seu <span className="text-primary">Motor</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">
              Óleos lubrificantes de alta performance, aditivos e produtos de arrefecimento.
              Qualidade comprovada para carros, motos e caminhões.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/produtos">
                <Button size="lg" className="bg-gradient-fire text-primary-foreground hover:opacity-90 border-0 uppercase tracking-wider gap-2">
                  Ver Produtos <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/sobre">
                <Button size="lg" variant="outline" className="border-border bg-surface/50 backdrop-blur uppercase tracking-wider">
                  Sobre Nós
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl">
              {[
                { v: "100%", l: "Qualidade certificada" },
                { v: "+50", l: "Marcas parceiras" },
                { v: "24h", l: "Atendimento" },
                { v: "BR", l: "Entrega nacional" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary/60 pl-3">
                  <div className="font-display text-2xl text-foreground">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-2">Destaques</div>
            <h2 className="font-display text-3xl md:text-4xl">Produtos em Destaque</h2>
          </div>
          <Link to="/produtos" className="text-sm text-muted-foreground hover:text-primary uppercase tracking-wider items-center gap-1 hidden sm:inline-flex">
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid limit={8} />
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Categorias</div>
            <h2 className="font-display text-3xl md:text-4xl">Linha Completa</h2>
          </div>
          <Link to="/produtos" className="text-sm text-muted-foreground hover:text-primary uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
            Ver tudo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-fire p-8 md:p-14 text-center">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl text-primary-foreground mb-3">Atendimento técnico especializado</h2>
            <p className="text-primary-foreground/90 max-w-xl mx-auto mb-6">
              Não sabe qual produto é o ideal para o seu veículo? Fale com nossa equipe pelo WhatsApp.
            </p>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 uppercase tracking-wider">
                Falar com especialista
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: Gauge, t: "Alta Performance", d: "Tecnologia para motores que exigem o máximo" },
            { icon: ShieldCheck, t: "Proteção Total", d: "Reduz desgaste e prolonga vida útil" },
            { icon: Award, t: "Qualidade Comprovada", d: "Atende normas API, ACEA e fabricantes" },
            { icon: Wrench, t: "Suporte Técnico", d: "Orientação para a aplicação correta" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="p-6 rounded-lg bg-card border border-border/60 hover:border-primary/40 transition-colors">
              <Icon className="w-8 h-8 text-accent mb-3" strokeWidth={1.8} />
              <h3 className="font-display text-base uppercase tracking-wide mb-1">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
