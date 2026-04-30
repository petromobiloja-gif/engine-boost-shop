import { Link } from "@tanstack/react-router";
import { Gauge, Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { CartDrawer } from "./CartDrawer";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/produtos", label: "Produtos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20os%20produtos.";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-background/80 border-b border-border/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-md bg-gradient-fire flex items-center justify-center shadow-glow">
            <Gauge className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg uppercase tracking-wider">Auto<span className="text-primary">Performance</span></div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-1">Hub</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-4 py-2 text-sm uppercase tracking-wider font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-4 py-2 text-sm uppercase tracking-wider font-medium text-foreground border-b-2 border-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="hidden sm:inline-flex">
            <Button variant="outline" size="sm" className="border-border/60 bg-surface/50 gap-2">
              <MessageCircle className="w-4 h-4 text-accent" /> WhatsApp
            </Button>
          </a>
          <CartDrawer />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-border/60 bg-surface/50">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card w-72">
              <SheetHeader><SheetTitle className="font-display">Menu</SheetTitle></SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} className="px-4 py-3 rounded-md hover:bg-surface uppercase tracking-wider text-sm">
                    {n.label}
                  </Link>
                ))}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="px-4 py-3 rounded-md hover:bg-surface uppercase tracking-wider text-sm flex items-center gap-2 text-accent">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
