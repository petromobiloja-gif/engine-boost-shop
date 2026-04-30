import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho", { description: product.node.title, position: "top-center" });
  };

  return (
    <Link
      to="/produto/$handle"
      params={{ handle: product.node.handle }}
      className="group flex flex-col rounded-lg overflow-hidden bg-card border border-border/60 hover:border-primary/60 transition-all hover:shadow-card hover:-translate-y-1"
    >
      <div className="aspect-square bg-surface relative overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? product.node.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem imagem</div>
        )}
        {product.node.productType && (
          <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur text-foreground border-border/60 uppercase text-[10px] tracking-wider">
            {product.node.productType}
          </Badge>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        {product.node.vendor && (
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.node.vendor}</div>
        )}
        <h3 className="font-display text-base uppercase tracking-wide leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {product.node.title}
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">A partir de</div>
            <div className="text-xl font-bold text-gradient-fire">{formatPrice(price.amount, price.currencyCode)}</div>
          </div>
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={isLoading || !variant?.availableForSale}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </Link>
  );
}
