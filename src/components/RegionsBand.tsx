import { siteConfig } from "@/lib/site";

const regions = [
  "Sudeste",
  "Sul",
  "Nordeste",
  "Centro-Oeste",
  "Norte",
];

export default function RegionsBand() {
  return (
    <section className="regions-band">
      <div className="container regions-inner">
        <div className="regions-copy">
          <span>ONDE ATENDEMOS</span>
          <strong>Operação remota, em todo o Brasil.</strong>
          <p>
            A equipe é baseada em {siteConfig.city} — {siteConfig.region}, mas o
            atendimento não tem fronteira geográfica.
          </p>
        </div>
        <div className="regions-tags">
          {regions.map((region) => (
            <span key={region}>{region}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
