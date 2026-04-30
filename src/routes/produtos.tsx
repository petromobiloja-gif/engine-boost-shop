import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ProductGrid } from "@/components/site/ProductGrid";
import { CATEGORY_LABELS, CATEGORY_QUERIES } from "@/components/site/CategoryGrid";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  categoria: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/produtos")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Produtos — PetroMobi" },
      { name: "description", content: "Catálogo completo de óleos lubrificantes, aditivos e produtos de arrefecimento. Filtre por categoria de veículo." },
      { property: "og:title", content: "Catálogo de Produtos — PetroMobi" },
      { property: "og:description", content: "Lubrificantes e produtos automotivos para todos os tipos de motores." },
    ],
  }),
  component: ProductsPage,
});

const FILTERS = [
  { id: undefined, label: "Todos" },
  { id: "carros", label: "Carros" },
  { id: "motos", label: "Motos" },
  { id: "caminhoes", label: "Caminhões" },
  { id: "aditivos", label: "Aditivos" },
  { id: "arrefecimento", label: "Arrefecimento" },
] as const;

function ProductsPage() {
  const { categoria, q } = Route.useSearch();
  const queryParts = [
    categoria ? CATEGORY_QUERIES[categoria] : undefined,
    q ? `title:*${q}*` : undefined,
  ].filter(Boolean);
  const fullQuery = queryParts.length ? queryParts.join(" AND ") : undefined;
  const title = categoria ? CATEGORY_LABELS[categoria] : "Catálogo Completo";

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Loja</div>
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Lubrificantes, aditivos e produtos para arrefecimento. Pagamento seguro via Shopify com Pix, cartão ou boleto.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border/60">
        {FILTERS.map((f) => {
          const active = (categoria ?? undefined) === f.id;
          return (
            <Link key={f.label} to="/produtos" search={f.id ? { categoria: f.id } : {}}>
              <Button
                variant={active ? "default" : "outline"}
                size="sm"
                className={active ? "bg-primary text-primary-foreground" : "border-border/60 bg-surface/50"}
              >
                {f.label}
              </Button>
            </Link>
          );
        })}
      </div>

      <ProductGrid query={fullQuery} limit={48} />
    </section>
  );
}
