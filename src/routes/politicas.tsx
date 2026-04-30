import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politicas")({
  head: () => ({
    meta: [
      { title: "Políticas — PetroMobi" },
      { name: "description", content: "Políticas de troca, devolução e privacidade da PetroMobi." },
      { property: "og:title", content: "Políticas — PetroMobi" },
      { property: "og:description", content: "Trocas, devoluções e privacidade." },
    ],
  }),
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <section className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2">Transparência</div>
      <h1 className="font-display text-4xl md:text-5xl mb-10">Políticas da Loja</h1>

      <div className="space-y-12">
        <div>
          <h2 className="font-display text-2xl mb-3 text-gradient-fire">Trocas e Devoluções</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>De acordo com o Código de Defesa do Consumidor, você tem até <strong className="text-foreground">7 dias corridos</strong> após o recebimento para solicitar a devolução do produto, sem necessidade de justificativa.</p>
            <p>Para que a devolução seja aceita, o produto deve estar lacrado, em sua embalagem original e sem sinais de uso.</p>
            <p>Em casos de defeito de fabricação, o prazo é de até 90 dias, conforme garantia legal.</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-3 text-gradient-fire">Entregas e Frete</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Realizamos entregas em todo o território nacional. O cálculo do frete e o prazo são exibidos no checkout, com base no CEP de destino.</p>
            <p>O processamento dos pedidos ocorre em até 2 dias úteis após a confirmação do pagamento.</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-3 text-gradient-fire">Pagamentos</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Aceitamos Pix, cartões de crédito (Visa, Mastercard, Elo, American Express) e boleto bancário, processados de forma segura via Shopify.</p>
            <p>Nenhum dado de cartão é armazenado em nossos servidores.</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-3 text-gradient-fire">Privacidade</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Seus dados pessoais são utilizados exclusivamente para processar pedidos, comunicar atualizações e melhorar sua experiência. Não compartilhamos suas informações com terceiros para fins de marketing.</p>
            <p>Em conformidade com a LGPD, você pode solicitar a exclusão dos seus dados a qualquer momento via canal de contato.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
