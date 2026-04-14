import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "./pstBreakerData";

// Dynamic import map — replaces Vite's import.meta.glob
const pstModules = {
  ar: () => import("./locales/pst/ar.json"),
  bn: () => import("./locales/pst/bn.json"),
  de: () => import("./locales/pst/de.json"),
  es: () => import("./locales/pst/es.json"),
  fr: () => import("./locales/pst/fr.json"),
  hi: () => import("./locales/pst/hi.json"),
  id: () => import("./locales/pst/id.json"),
  it: () => import("./locales/pst/it.json"),
  ja: () => import("./locales/pst/ja.json"),
  ko: () => import("./locales/pst/ko.json"),
  ms: () => import("./locales/pst/ms.json"),
  nl: () => import("./locales/pst/nl.json"),
  pl: () => import("./locales/pst/pl.json"),
  pt: () => import("./locales/pst/pt.json"),
  ru: () => import("./locales/pst/ru.json"),
  sw: () => import("./locales/pst/sw.json"),
  th: () => import("./locales/pst/th.json"),
  tr: () => import("./locales/pst/tr.json"),
  vi: () => import("./locales/pst/vi.json"),
  zh: () => import("./locales/pst/zh.json"),
  "zh-TW": () => import("./locales/pst/zh-TW.json"),
};

const cache = {};

// Translate country name using browser Intl API
function getLocalCountryName(code, lang) {
  try {
    const dn = new Intl.DisplayNames([lang], { type: "region" });
    return dn.of(code) || null;
  } catch {
    return null;
  }
}

/**
 * Hook: returns COUNTRIES array with text fields translated to the active language.
 * Falls back to English for any missing translation.
 * Translations loaded lazily per language.
 */
export function usePSTData() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [translations, setTranslations] = useState(cache[lang] || null);

  useEffect(() => {
    if (lang === "en") {
      setTranslations(null);
      return;
    }
    if (cache[lang]) {
      setTranslations(cache[lang]);
      return;
    }
    const loader = pstModules[lang];
    if (loader) {
      loader()
        .then((mod) => {
          cache[lang] = mod.default;
          setTranslations(mod.default);
        })
        .catch(() => {});
    }
  }, [lang]);

  return useMemo(() => {
    if (lang === "en" || !translations) return COUNTRIES;

    const regionMap = translations._r || {};

    return COUNTRIES.map((country) => {
      const ct = translations[country.code];
      const localName = getLocalCountryName(country.code, lang);

      return {
        ...country,
        name: localName || country.name,
        region: regionMap[country.region] || country.region,
        summary: ct?.s || country.summary,
        sectors: country.sectors.map((sector, si) => {
          const st = ct?.sectors?.[si];
          if (!st) return sector;
          return {
            ...sector,
            whyBreakable: st.w || sector.whyBreakable,
            breakPaths: st.bp || sector.breakPaths,
            actors: sector.actors.map((actor, ai) => ({
              ...actor,
              actions: st.a?.[ai] || actor.actions,
              infra: st.i?.[ai] || actor.infra,
            })),
          };
        }),
      };
    });
  }, [lang, translations]);
}
