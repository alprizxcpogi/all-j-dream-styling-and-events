import { BRAND, BUSINESS, SITE_URL } from "@/lib/constants";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WeddingPlanner",
    name: BRAND.full,
    description:
      "Boutique wedding styling and event coordination studio crafting refined, emotionally resonant celebrations.",
    url: SITE_URL,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address,
    },
    sameAs: [BUSINESS.instagramUrl, BUSINESS.facebookUrl, BUSINESS.pinterestUrl],
    priceRange: "$$$",
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
