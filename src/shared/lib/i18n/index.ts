export { useLangStore } from "./store";
export type { Lang, Translations } from "./translations";

import { useLangStore } from "./store";
import { translations } from "./translations";

export function useT() {
  const lang = useLangStore((state) => state.lang);
  return translations[lang];
}

export function useLang() {
  return useLangStore((state) => state.lang);
}

export const localeMap: Record<string, string> = {
  en: "en-US",
  pt: "pt-BR",
};
