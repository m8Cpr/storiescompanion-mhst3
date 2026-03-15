import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { TRANSLATION_KEYS } from "@/i18n/keys";

export default function NotFound() {
  const { t } = useTranslation("common");

  return (
    <>
      <h1>{t(TRANSLATION_KEYS.COMMON.NOT_FOUND)}</h1>
      <Link className="block w-fit mx-auto" to="/">{t(TRANSLATION_KEYS.COMMON.BACK_TO_HOME)}</Link>
    </>
  );
}
