import { useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

import MonsterCard from "@/components/MonsterCard";
import SearchBar from "@/components/SearchBar";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { useFilteredMonsters } from "@/hooks/useFilteredMonsters";
import { useHomeSearchObserver } from "@/hooks/useHomeSearchObserver";
import { cn } from "@/utils/lib";

export default function Home() {
  const { t } = useTranslation("common");
  const monsterList = useFilteredMonsters();
  const searchFormRef = useRef<HTMLFormElement>(null);
  useHomeSearchObserver(searchFormRef);

  return (
    <>
      <section className="flex flex-col text-center gap-2">
        <h1>{t(TRANSLATION_KEYS.COMMON.HOME)}</h1>
        <p>
          <Trans
            i18nKey={TRANSLATION_KEYS.COMMON.HOME_DESCRIPTION}
            components={{ br: <br /> }}
          />
        </p>
      </section>

      <section>
        <form
          ref={searchFormRef}
          onSubmit={(e) => e.preventDefault()}
          className="block max-w-xl relative mx-auto"
        >
          <SearchBar />
        </form>
      </section>

      <section
        className={cn(
          monsterList.isEmpty()
            ? "text-center"
            : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {monsterList.map((monster) => (
          <MonsterCard key={monster.id} monster={monster} />
        ))}
        {monsterList.isEmpty() && (
          <p>{t(TRANSLATION_KEYS.COMMON.NO_RESULTS)}</p>
        )}
      </section>
    </>
  );
}
