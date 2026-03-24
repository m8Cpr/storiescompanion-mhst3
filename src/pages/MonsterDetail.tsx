import { CombatData } from "@/components/monster-details/combat-data/CombatData";
import IncompleteData from "@/components/monster-details/IncompleteData";
import { MonsterHeader } from "@/components/monster-details/MonsterHeader";
import { MonstieInfo } from "@/components/monster-details/monstie-info/MonstieInfo";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import { useMonsterStore } from "@/stores/monsterStore";
import { cn } from "@/utils/lib";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const { COMMON } = TRANSLATION_KEYS;

export default function MonsterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const getBySlug = useMonsterStore((s) => s.getBySlug);
  const { t } = useTranslation(["common", "monster"]);

  const monster = slug ? getBySlug(slug) : undefined;

  if (!monster) return <NotFound />;

  return (
    <>
      <section className="flex flex-col gap-2 lg:gap-4">
        <Link
          to="/"
          className={cn(
            "inline-flex items-center gap-2",
            "text-muted-foreground hover:text-foreground",
            "transition-colors"
          )}
        >
          <ArrowLeft className="size-4" />
          {t(COMMON.BACK_TO_HOME)}
        </Link>

        {/* TODO - dynamic display */}
        <IncompleteData />
      </section>

      <MonsterHeader monster={monster} />

      <CombatData combatData={monster.combatData} />

      {/* TODO - Boss monster patterns - needs better scraping*/}

      {monster.monstie && (
        <MonstieInfo
          monstie={monster.monstie}
          ridingActions={monster.ridingActions}
          habitatDetails={monster.habitatDetails}
          howToGet={monster.howToGet}
        />
      )}
    </>
  );
}
