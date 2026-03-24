import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import type { Resources } from "./resources";

import { common as enCommon } from "./locales/en/common";
import { monster as enMonster } from "./locales/en/monster";
import { common as itCommon } from "./locales/it/common";
import { monster as itMonster } from "./locales/it/monster";

const resources: Resources = {
  en: {
    common: enCommon,
    monster: enMonster,
  },
  it: {
    common: itCommon,
    monster: itMonster,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    supportedLngs: ["en", "it"],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
