import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, Wrench, Zap } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — AutoPerformance Hub" },
      { name: "description", content: "Especialistas em óleos lubrificantes de alta performance e produtos automotivos. Tecnologia, qualidade e confiança." },
      { property: "og:title", content: "Sobre — AutoPerformance Hub" },
      { property: "og:description", content: "Conheça nossa missão e os valores por trás da AutoPerformance Hub." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Quem somos</div>
        <h1 className="font-display text-4xl md:text-5xl mb-6">A força por trás de cada motor</h1>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A <strong className="text-foreground">AutoPerformance Hub</strong> é uma loja especializada na venda
            de óleos lubrificantes de alta performance para carros, motos e caminhões. Trabalhamos com uma
            linha completa que atende desde veículos leves até as aplicações mais exigentes do transporte e da indústria.
          </p>
          <p>
            Além dos lubrificantes, oferecemos aditivos automotivos, fluidos para radiador e produtos para
            sistemas de arrefecimento — tudo o que o seu motor precisa para entregar máxima proteção,
            desempenho e durabilidade.
          </p>
          <p>
            Nosso compromisso é entregar produtos de <strong className="text-foreground">qualidade comprovada</strong>,
            com tecnologia avançada, excelente custo-benefício e atendimento técnico para quem exige o melhor cuidado com seu motor.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-16">
        {[
          { icon: Zap, t: "Performance", d: "Linhas sintéticas e semissintéticas" },
          { icon: ShieldCheck, t: "Proteção", d: "Reduz desgaste e atrito" },
          { icon: Award, t: "Certificação", d: "Normas API, ACEA, JASO" },
          { icon: Wrench, t: "Suporte", d: "Equipe técnica especializada" },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="p-6 rounded-lg bg-card border border-border/60">
            <Icon className="w-8 h-8 text-accent mb-3" strokeWidth={1.8} />
            <h3 className="font-display text-base uppercase tracking-wide mb-1">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
