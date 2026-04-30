import { Link } from "@tanstack/react-router";
import { Gauge, Shield, Truck, CreditCard, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-border/60">
          {[
            { icon: Shield, t: "Compra Segura", s: "Loja verificada Shopify" },
            { icon: Truck, t: "Entrega Nacional", s: "Frete calculado no checkout" },
            { icon: CreditCard, t: "Pix, Cartão, Boleto", s: "Pagamento via Shopify" },
            { icon: MessageCircle, t: "Atendimento", s: "Suporte técnico WhatsApp" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-surface border border-border/60 flex items-center justify-center text-accent">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-wider">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-md bg-gradient-fire flex items-center justify-center">
                <Gauge className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div className="font-display text-lg uppercase tracking-wider">Petro<span className="text-primary">Mobi</span></div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Lubrificantes de alta performance, aditivos e produtos para arrefecimento.
              Tecnologia avançada para máxima proteção do seu motor.
            </p>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-3">Loja</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/produtos" search={{ categoria: "carros" }} className="hover:text-primary">Óleos para carros</Link></li>
              <li><Link to="/produtos" search={{ categoria: "motos" }} className="hover:text-primary">Óleos para motos</Link></li>
              <li><Link to="/produtos" search={{ categoria: "caminhoes" }} className="hover:text-primary">Óleos para caminhões</Link></li>
              <li><Link to="/produtos" search={{ categoria: "aditivos" }} className="hover:text-primary">Aditivos</Link></li>
              <li><Link to="/produtos" search={{ categoria: "arrefecimento" }} className="hover:text-primary">Arrefecimento</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-3">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre" className="hover:text-primary">Sobre nós</Link></li>
              <li><Link to="/contato" className="hover:text-primary">Contato</Link></li>
              <li><Link to="/politicas" className="hover:text-primary">Políticas</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} PetroMobi. Todos os direitos reservados.</div>
          <div className="uppercase tracking-wider">Powered by Shopify</div>
        </div>
      </div>
    </footer>
  );
}
