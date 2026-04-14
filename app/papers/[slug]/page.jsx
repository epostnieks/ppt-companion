import { buildPaperList } from "../../../src/paperData";
import PaperWrapper from "./paper-wrapper";

export function generateStaticParams() {
  const papers = buildPaperList();
  return papers.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const papers = buildPaperList();
  const paper = papers.find(p => p.slug === slug);
  if (!paper) return { title: "Paper Not Found" };

  const betaStr = paper.beta ? ` | \u03B2W=${paper.beta.toFixed(2)}` : "";
  const typeStr = paper.theoremType ? ` | ${paper.theoremType} Theorem` : "";

  return {
    title: `${paper.name} — System Asset Pricing Model Working Paper${betaStr}`,
    description: paper.summary?.slice(0, 300) || `Working paper on ${paper.name} from the Structural Analysis of Profit Motive (System Asset Pricing Model) program by Erik Postnieks.`,
    openGraph: {
      title: `${paper.name}${betaStr}`,
      description: paper.summary?.slice(0, 200),
      type: "article",
      siteName: "Private Pareto Theorem — System Asset Pricing Model Program",
    },
    twitter: {
      card: "summary",
      title: `${paper.name}${typeStr}`,
      description: paper.summary?.slice(0, 200),
    },
    alternates: {
      canonical: `https://ppt-companion.vercel.app/papers/${slug}/`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <PaperWrapper slug={slug} />;
}
