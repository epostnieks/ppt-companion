import { COUNTRIES } from "../../../src/pstBreakerData";
import CountryWrapper from "./country-wrapper";

export function generateStaticParams() {
  if (!COUNTRIES || !Array.isArray(COUNTRIES)) return [];
  return COUNTRIES.filter(c => c && c.code).map(c => ({ code: c.code.toLowerCase() }));
}

export function generateMetadata({ params }) {
  const code = params?.code;
  if (!code) return { title: "Country" };

  const country = COUNTRIES.find(c => c.code.toLowerCase() === code);
  if (!country) return { title: "Country" };

  const sectorCount = country.sectors?.length || 0;

  return {
    title: `${country.name} \u2014 Reform Pathfinder | System Asset Pricing Model Program`,
    description: `Reform pathways for ${country.name} across ${sectorCount} sectors. ${(country.summary || "").slice(0, 200)}`,
  };
}

export default function Page({ params }) {
  return <CountryWrapper code={params?.code || ""} />;
}
