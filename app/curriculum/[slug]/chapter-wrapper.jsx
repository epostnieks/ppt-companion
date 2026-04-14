"use client";
import dynamic from "next/dynamic";

const ChapterPage = dynamic(() => import("./chapter-client"), { ssr: false });

export default function ChapterWrapper({ slug }) {
  return <ChapterPage slug={slug} />;
}
