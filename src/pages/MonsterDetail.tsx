import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { TRANSLATION_KEYS } from "@/i18n/keys";

export default function MonsterDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("common");

  return (
    <h1>
      {t(TRANSLATION_KEYS.MONSTER.DETAIL)} - {id}
    </h1>
  );
}
