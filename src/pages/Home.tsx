import { useTranslation } from "react-i18next";

import { TRANSLATION_KEYS } from "@/i18n/keys";

export default function Home() {
  const { t } = useTranslation("common");

  return <h1>{t(TRANSLATION_KEYS.COMMON.HOME)}</h1>;
}