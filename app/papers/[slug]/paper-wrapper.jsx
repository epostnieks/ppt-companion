"use client";
import dynamic from "next/dynamic";

const PaperPage = dynamic(() => import("./paper-client"), { ssr: false });

export default function PaperWrapper({ slug }) {
  return <PaperPage slug={slug} />;
}
