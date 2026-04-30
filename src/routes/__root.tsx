import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-display text-7xl text-gradient-fire mb-2">404</div>
        <h2 className="font-display text-2xl uppercase mb-2">Página não encontrada</h2>
        <p className="text-sm text-muted-foreground mb-6">A página que você procura não existe ou foi movida.</p>
        <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AutoPerformance Hub — Óleos lubrificantes e produtos automotivos" },
      { name: "description", content: "Loja especializada em óleos lubrificantes de alta performance, aditivos e produtos para arrefecimento. Carros, motos e caminhões. Compra segura via Shopify." },
      { name: "theme-color", content: "#1a0f0c" },
      { property: "og:title", content: "AutoPerformance Hub — Óleos lubrificantes e produtos automotivos" },
      { property: "og:description", content: "Loja especializada em óleos lubrificantes de alta performance, aditivos e produtos para arrefecimento. Carros, motos e caminhões. Compra segura via Shopify." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AutoPerformance Hub — Óleos lubrificantes e produtos automotivos" },
      { name: "twitter:description", content: "Loja especializada em óleos lubrificantes de alta performance, aditivos e produtos para arrefecimento. Carros, motos e caminhões. Compra segura via Shopify." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/40298253-f8c6-40fa-a16d-1eb79477fb9c/id-preview-887df7d5--3754a619-8be3-4a5b-a611-beaed6608777.lovable.app-1777557373376.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/40298253-f8c6-40fa-a16d-1eb79477fb9c/id-preview-887df7d5--3754a619-8be3-4a5b-a611-beaed6608777.lovable.app-1777557373376.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useCartSync();
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-center" />
    </>
  );
}
