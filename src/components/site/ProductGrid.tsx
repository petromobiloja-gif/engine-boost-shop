import { useEffect, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";

interface Props {
  query?: string;
  limit?: number;
  emptyMessage?: string;
}

export function ProductGrid({ query, limit = 24, emptyMessage }: Props) {
  const [products, setProducts] = useState<ShopifyProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setProducts(null); setError(null);
    fetchProducts(limit, query)
      .then((p) => { if (active) setProducts(p); })
      .catch((e) => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [query, limit]);

  if (error) return <div className="py-16 text-center text-destructive">Erro ao carregar: {error}</div>;
  if (products === null) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="py-24 text-center border border-dashed border-border rounded-lg bg-surface/30">
        <PackageOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-display text-xl uppercase mb-2">Nenhum produto encontrado</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {emptyMessage ?? "Em breve novos produtos. Adicione um produto pelo chat para começar."}
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
    </div>
  );
}
