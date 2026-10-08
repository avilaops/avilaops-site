import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { scriptInicial } from "@/lib/tema-noturno";
import { absoluteUrl, logoImageSchema, ogImages, siteConfig } from "@/lib/site";

// O next/font baixa a Inter no build e a serve do próprio domínio: nenhum
// pedido a terceiro em runtime, e a CSP continua com `font-src 'self'`.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const logoUrl = absoluteUrl(siteConfig.logoPath);
const publicPhone = siteConfig.phoneDisplay;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: siteConfig.name,
  alternateName: siteConfig.alternateName,
  url: siteConfig.siteUrl,
  logo: logoUrl,
  image: logoUrl,
  email: siteConfig.email,
  telephone: publicPhone,
  sameAs: [siteConfig.instagramUrl, siteConfig.tiktokUrl, siteConfig.linkedinUrl],
  knowsAbout: [
    "criação de site profissional",
    "presença digital para pequenas empresas",
    "automação de WhatsApp",
    "WhatsApp Business API",
    "Instagram para empresas",
    "Meta Ads",
    "CRM para pequenas empresas",
    "automação comercial",
    "software sob medida",
    "pagamentos digitais",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": absoluteUrl("/#localbusiness"),
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  url: siteConfig.siteUrl,
  logo: logoUrl,
  image: logoUrl,
  email: siteConfig.email,
  telephone: publicPhone,
  areaServed: [
    {
      "@type": "Country",
      name: "Brasil",
    },
    {
      "@type": "City",
      name: siteConfig.city,
    },
  ],
  sameAs: [siteConfig.instagramUrl, siteConfig.tiktokUrl, siteConfig.linkedinUrl],
  priceRange: "$$",
  parentOrganization: {
    "@id": absoluteUrl("/#organization"),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: siteConfig.siteUrl,
  name: siteConfig.name,
  publisher: {
    "@id": absoluteUrl("/#organization"),
  },
  inLanguage: siteConfig.language,
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": absoluteUrl("/#service"),
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  image: logoUrl,
  telephone: publicPhone,
  email: siteConfig.email,
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  serviceType: [
    "Presença digital para pequenas empresas",
    "Automação de WhatsApp",
    "Instagram e Meta Ads",
    "CRM e automação comercial",
    "Criação de site profissional",
    "Software sob medida",
  ],
  provider: {
    "@id": absoluteUrl("/#organization"),
  },
};

export const metadata: Metadata = {
  title: "Avila Ops | tecnologia que se adapta ao seu negócio",
  description: siteConfig.description,
  keywords: [
    "automatizar WhatsApp",
    "automação WhatsApp Business",
    "chatbot WhatsApp",
    "WhatsApp Business API",
    "automação Instagram",
    "gestão de Instagram para empresas",
    "Meta Ads para empresas",
    "tráfego pago Meta",
    "pixel da Meta",
    "funil de vendas WhatsApp",
    "operação digital",
    "automação empresarial",
    "automação comercial",
    "automação para pequenas empresas",
    "site profissional",
    "criação de site profissional",
    "presença digital para pequenas empresas",
    "e-mail profissional",
    "software sob medida",
    "sistema para pequenas empresas",
    "Avila Ops",
  ],
  authors: [{ name: siteConfig.legalName }],
  metadataBase: new URL(siteConfig.siteUrl),
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: "Avila Ops | tecnologia que se adapta ao seu negócio",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Avila Ops | tecnologia que se adapta ao seu negócio",
    description: siteConfig.description,
    images: [siteConfig.ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Container GTM do avilaops.com (TagFlow). Ele já publica a configuração do
 * GA4 G-T7DZ51MVZK — por isso `NEXT_PUBLIC_GA_MEASUREMENT_ID` fica vazio, para
 * não contar cada pageview duas vezes.
 *
 * O ID vem embutido como padrão porque o valor morava só no `.env.production`
 * do workspace que continha o site. O site já mudou de pasta uma vez e agora
 * mudou de repositório; das duas vezes o Next passou a procurar um `.env` que
 * não existia e o build sairia sem medição, sem reclamar de nada. O ID é
 * público (vai no HTML de qualquer jeito), então embutir aqui custa nada e a
 * variável de ambiente continua sobrepondo.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-MTG7CHVV";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        {/*
          Modo noturno da casa: das 18h às 6h a interface fica escura, no
          relógio de quem está olhando. Roda antes do CSS para a página não
          pintar clara e escurecer em seguida.
        */}
        <script dangerouslySetInnerHTML={{ __html: scriptInicial() }} />
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <script
          id="avila-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          id="avila-website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          id="avila-logo-image-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(logoImageSchema()),
          }}
        />
        <script
          id="avila-local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          id="avila-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Avila Ops" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
