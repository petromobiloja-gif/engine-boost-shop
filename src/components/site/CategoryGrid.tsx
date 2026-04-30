import { Link } from "@tanstack/react-router";
import { Car, Bike, Truck, FlaskConical, Snowflake } from "lucide-react";

const CATEGORIES = [
  { id: "carros", name: "Óleos para Carros", icon: Car, desc: "Sintéticos, semissintéticos e minerais para veículos leves" },
  { id: "motos", name: "Óleos para Motos", icon: Bike, desc: "Linha completa para motores 2T e 4T" },
  { id: "caminhoes", name: "Óleos para Caminhões", icon: Truck, desc: "Alta performance para transporte pesado" },
  { id: "aditivos", name: "Aditivos", icon: FlaskConical, desc: "Aditivos automotivos para máxima proteção" },
  { id: "arrefecimento", name: "Arrefecimento", icon: Snowflake, desc: "Fluidos para radiador e sistemas de arrefecimento" },
] as const;

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {CATEGORIES.map(({ id, name, icon: Icon, desc }) => (
        <Link
          key={id}
          to="/produtos"
          search={{ categoria: id }}
          className="group relative overflow-hidden rounded-lg p-6 bg-card border border-border/60 hover:border-primary/60 transition-all hover:-translate-y-1 hover:shadow-card"
        >
          <div className="absolute inset-0 bg-gradient-fire opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative">
            <div className="w-12 h-12 rounded-md bg-surface border border-border/60 flex items-center justify-center mb-4 text-accent group-hover:text-primary transition-colors">
              <Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="font-display uppercase tracking-wide text-sm mb-1 group-hover:text-primary transition-colors">{name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export const CATEGORY_QUERIES: Record<string, string> = {
  carros: "tag:carro OR tag:carros OR product_type:Carro OR product_type:Carros",
  motos: "tag:moto OR tag:motos OR product_type:Moto OR product_type:Motos",
  caminhoes: "tag:caminhao OR tag:caminhoes OR tag:caminhão OR product_type:Caminhão OR product_type:Caminhao",
  aditivos: "tag:aditivo OR tag:aditivos OR product_type:Aditivo OR product_type:Aditivos",
  arrefecimento: "tag:arrefecimento OR tag:radiador OR product_type:Arrefecimento OR product_type:Radiador",
};

export const CATEGORY_LABELS: Record<string, string> = {
  carros: "Óleos para Carros",
  motos: "Óleos para Motos",
  caminhoes: "Óleos para Caminhões",
  aditivos: "Aditivos",
  arrefecimento: "Arrefecimento",
};
