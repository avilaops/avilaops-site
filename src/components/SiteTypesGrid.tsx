import { Building2, Rocket, ShoppingCart, Code2, LayoutDashboard, Users, type LucideIcon } from "lucide-react";

const types: { icon: LucideIcon; title: string; description: string; price: string }[] = [
  {
    icon: Building2,
    title: "Site institucional",
    description: "Múltiplas páginas e blog integrado, para autoridade e presença completa.",
    price: "A partir de R$ 2.490,00",
  },
  {
    icon: Rocket,
    title: "Landing page",
    description: "Página de vendas de alta conversão, focada em uma oferta única.",
    price: "A partir de R$ 1.500,00",
  },
  {
    icon: ShoppingCart,
    title: "Loja virtual / e-commerce",
    description: "Catálogo de produtos, meios de pagamento e operação de vendas online.",
    price: "Sob orçamento",
  },
  {
    icon: Code2,
    title: "Software sob medida",
    description: "Ferramentas internas, ERP, integrações e APIs desenhadas para o seu processo.",
    price: "Sob orçamento",
  },
  {
    icon: LayoutDashboard,
    title: "Portais e áreas privadas",
    description: "Espaços de acesso restrito para clientes, parceiros ou equipe.",
    price: "Sob orçamento",
  },
  {
    icon: Users,
    title: "Portal do cliente",
    description: "Como o cliente.avilaops.com: um espaço próprio para acompanhar escopo, arquivos e pagamentos.",
    price: "Sob orçamento",
  },
];

export default function SiteTypesGrid() {
  return (
    <section className="site-types-section">
      <div className="container">
        <div className="section-heading site-types-heading">
          <span className="section-index">05 / O que construímos</span>
          <h2>Tipos de site e sistema que desenvolvemos.</h2>
        </div>

        <div className="site-types-grid">
          {types.map((item) => (
            <article className="site-types-card" key={item.title}>
              <span className="site-types-icon">
                <item.icon size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <span className="site-types-price">{item.price}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
