import { Trans, useTranslation } from "react-i18next";

import MonsterCard from "@/components/MonsterCard";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { useMonsterStore } from "@/stores/monsterStore";

export default function Home() {
  const { t } = useTranslation("common");
  const monsterList = useMonsterStore((s) => s.monsterList);

  return (
    <>
      <span className="flex flex-col text-center gap-2">
        <h1>{t(TRANSLATION_KEYS.COMMON.HOME)}</h1>
        <p>
          <Trans
            i18nKey={TRANSLATION_KEYS.COMMON.HOME_DESCRIPTION}
            components={{ br: <br /> }}
          />
        </p>
      </span>

      <section>
        <p className="text-center">Search bar</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {monsterList.map((monster) => (
          <MonsterCard key={monster.id} monster={monster} />
        ))}
      </section>
    </>
  );
}
