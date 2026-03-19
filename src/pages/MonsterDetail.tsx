import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { TRANSLATION_KEYS } from "@/i18n/keys";
import NotFound from "@/pages/NotFound";
import { useMonsterStore } from "@/stores/monsterStore";

export default function MonsterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const getBySlug = useMonsterStore((s) => s.getBySlug);
  const { t } = useTranslation("common");

  const monster = slug ? getBySlug(slug) : undefined;

  if (!monster) return <NotFound />;

  return (
    <>
      <h1>{monster.name}</h1>

      <section>
        <p>{t(TRANSLATION_KEYS.MONSTER.DETAIL)}</p>
      </section>
    </>
  );
}
