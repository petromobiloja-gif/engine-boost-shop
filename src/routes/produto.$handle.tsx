import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchProductByHandle, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingCart, ChevronLeft, Shield, Truck, CreditCard } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$handle")({
  loader: async ({ params }) => {
    const product = await fetchProductByHandle(params.handle);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product?.node;
    if (!p) return { meta: [{ title: "Produto" }] };
    const img = p.images.edges[0]?.node?.url;
    return {
      meta: [
        { title: `${p.title} — AutoPerformance Hub` },
        { name: "description", content: (p.description ?? "").slice(0, 160) },
        { property: "og:title", content: p.title },
        { property: "og:description", content: (p.description ?? "").slice(0, 160) },
        ...(img ? [
          { property: "og:image", content: img },
          { name: "twitter:image", content: img },
        ] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-3xl uppercase mb-2">Produto não encontrado</h1>
      <Link to="/produtos" className="text-primary hover:underline">Ver catálogo</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-2xl uppercase mb-2">Erro ao carregar produto</h1>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const [variantId, setVariantId] = useState(p.variants.edges[0]?.node.id);
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = p.variants.edges.find((v) => v.node.id === variantId)?.node ?? p.variants.edges[0]?.node;

  useEffect(() => setImgIdx(0), [p.id]);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho", { description: p.title, position: "top-center" });
  };

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <Link to="/produtos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="w-4 h-4" /> Voltar ao catálogo
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square rounded-lg overflow-hidden bg-surface border border-border/60">
            {p.images.edges[imgIdx]?.node ? (
              <img src={p.images.edges[imgIdx].node.url} alt={p.images.edges[imgIdx].node.altText ?? p.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sem imagem</div>
            )}
          </div>
          {p.images.edges.length > 1 && (
            <div className="grid grid-cols-5 gap-2 mt-3">
              {p.images.edges.map((img, i) => (
                <button
                  key={img.node.url}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-square rounded-md overflow-hidden border ${i === imgIdx ? "border-primary" : "border-border/60"}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {p.vendor && <div className="text-xs uppercase tracking-[0.3em] text-accent mb-2">{p.vendor}</div>}
          <h1 className="font-display text-3xl md:text-4xl mb-3">{p.title}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gradient-fire">
              {variant && formatPrice(variant.price.amount, variant.price.currencyCode)}
            </span>
            {variant && !variant.availableForSale && <Badge variant="destructive">Indisponível</Badge>}
          </div>

          {p.description && (
            <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">{p.description}</p>
          )}

          {p.options.length > 0 && p.options[0].name !== "Title" && (
            <div className="space-y-4 mb-6">
              {p.options.map((opt) => (
                <div key={opt.name}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{opt.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val) => {
                      const matching = p.variants.edges.find((v) =>
                        v.node.selectedOptions.some((o) => o.name === opt.name && o.value === val),
                      )?.node;
                      const selected = variant?.selectedOptions.some((o) => o.name === opt.name && o.value === val);
                      return (
                        <button
                          key={val}
                          onClick={() => matching && setVariantId(matching.id)}
                          className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                            selected ? "border-primary bg-primary/10 text-primary" : "border-border/60 bg-surface/50 hover:border-primary/40"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant?.availableForSale}
            size="lg"
            className="w-full bg-gradient-fire text-primary-foreground hover:opacity-90 border-0 uppercase tracking-wider gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho</>}
          </Button>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: Shield, t: "Compra segura" },
              { icon: Truck, t: "Frete no checkout" },
              { icon: CreditCard, t: "Pix, cartão, boleto" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="p-3 rounded-md bg-surface border border-border/60">
                <Icon className="w-4 h-4 text-accent mx-auto mb-1" />
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t}</div>
              </div>
            ))}
          </div>

          {p.tags && p.tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border/60">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Especificações / Tags</div>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Badge key={t} variant="outline" className="border-border/60 text-xs">{t}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
