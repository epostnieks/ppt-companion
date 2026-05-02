import { CHAPTERS } from "../../../src/curriculumData";
import ChapterWrapper from "./chapter-wrapper";

export function generateStaticParams() {
  return CHAPTERS.map(ch => ({ slug: ch.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ch = CHAPTERS.find(c => c.slug === slug);
  if (!ch) return { title: "Chapter Not Found" };

  return {
    title: `Chapter ${ch.id}: ${ch.title} — Private Pareto Theorem Curriculum | System Asset Pricing Model Program`,
    description: `Chapter ${ch.id} of the Private Pareto Theorem curriculum. ${ch.title}. Estimated reading time: ${ch.time}.`,
    openGraph: {
      title: `Ch. ${ch.id}: ${ch.title}`,
      description: `Part of the expanded Private Pareto Theorem curriculum. ${ch.time} reading time.`,
      type: "article",
      siteName: "Private Pareto Theorem — System Asset Pricing Model Program",
    },
    alternates: {
      canonical: `https://ppt-companion.vercel.app/curriculum/${slug}/`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ChapterWrapper slug={slug} />;
}
