import Image from "next/image";

const integrations = [
  { name: "WhatsApp Business", file: "whatsapp.svg" },
  { name: "Meta", file: "meta.svg" },
  { name: "Google Analytics", file: "google-analytics.svg" },
  { name: "Cloudflare", file: "cloudflare.svg" },
];

export default function IntegrationsBand() {
  return (
    <div className="integrations-band">
      <div className="container integrations-inner">
        <span>Conectado com as ferramentas que sua empresa já usa</span>
        <div className="integrations-logos">
          {integrations.map((item) => (
            <span key={item.name} className="integrations-logo" title={item.name}>
              <Image src={`/logos/${item.file}`} alt={item.name} width={22} height={22} />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
