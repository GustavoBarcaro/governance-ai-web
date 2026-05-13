import { create } from "zustand";
import type { Lang } from "./translations";

const STORAGE_KEY = "governance-lang";

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") return stored;
  } catch {
    // ignore
  }
  return "en";
}

type LangState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useLangStore = create<LangState>((set) => ({
  lang: readStoredLang(),
  setLang: (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
    set({ lang });
  },
}));
