"use client";
import dynamic from "next/dynamic";

const CountryPage = dynamic(() => import("./country-client"), { ssr: false });

export default function CountryWrapper({ code }) {
  return <CountryPage code={code} />;
}
