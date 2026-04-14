import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ══════════════════════════════════════════════════════════════
// i18n Configuration — 22 Languages
// Vercel-deployed, client-side language detection
// ══════════════════════════════════════════════════════════════

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import zh from "./locales/zh.json";
import zhTW from "./locales/zh-TW.json";
import ar from "./locales/ar.json";
import hi from "./locales/hi.json";
import pt from "./locales/pt.json";
import ru from "./locales/ru.json";
import ja from "./locales/ja.json";
import de from "./locales/de.json";
import ko from "./locales/ko.json";
import it from "./locales/it.json";
import tr from "./locales/tr.json";
import nl from "./locales/nl.json";
import pl from "./locales/pl.json";
import th from "./locales/th.json";
import vi from "./locales/vi.json";
import id from "./locales/id.json";
import ms from "./locales/ms.json";
import bn from "./locales/bn.json";
import sw from "./locales/sw.json";

export const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "it", name: "Italian", native: "Italiano" },
  { code: "nl", name: "Dutch", native: "Nederlands" },
  { code: "pl", name: "Polish", native: "Polski" },
  { code: "tr", name: "Turkish", native: "Türkçe" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "zh", name: "Chinese (Simplified)", native: "简体中文" },
  { code: "zh-TW", name: "Chinese (Traditional)", native: "繁體中文" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "ko", name: "Korean", native: "한국어" },
  { code: "th", name: "Thai", native: "ไทย" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu" },
  { code: "sw", name: "Swahili", native: "Kiswahili" },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      pt: { translation: pt },
      it: { translation: it },
      nl: { translation: nl },
      pl: { translation: pl },
      tr: { translation: tr },
      ru: { translation: ru },
      ar: { translation: ar },
      hi: { translation: hi },
      bn: { translation: bn },
      zh: { translation: zh },
      "zh-TW": { translation: zhTW },
      ja: { translation: ja },
      ko: { translation: ko },
      th: { translation: th },
      vi: { translation: vi },
      id: { translation: id },
      ms: { translation: ms },
      sw: { translation: sw },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lang",
      lookupLocalStorage: "sapm-language",
      caches: ["localStorage"],
    },
  });

export default i18n;
