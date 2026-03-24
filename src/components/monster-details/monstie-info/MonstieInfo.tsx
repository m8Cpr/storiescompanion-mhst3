import { DetailArticle } from "@/components/monster-details/DetailArticle";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import type {
  HabitatDetail,
  MonstieData,
  RidingAction,
} from "@/schemas/monster";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MonstieAcquisition } from "./MonstieAcquisition";
import { MonstieBaseStats } from "./MonstieBaseStats";
import { MonstieKeyInfo } from "./MonstieKeyInfo";
import { MonstieRidingActions } from "./MonstieRidingActions";

const { MONSTER } = TRANSLATION_KEYS;

interface MonstieInfoProps {
  monstie: MonstieData;
  ridingActions?: RidingAction[];
  habitatDetails?: HabitatDetail[];
  howToGet?: string;
}

export function MonstieInfo({
  monstie,
  ridingActions,
  habitatDetails,
  howToGet,
}: MonstieInfoProps) {
  const { t } = useTranslation("monster");

  return (
    <DetailArticle
      icon={Heart}
      title={t(MONSTER.DETAIL_LABEL.MONSTIE_DATA)}
      variant="section"
    >
      <MonstieKeyInfo
        attackType={monstie.attackType}
        growth={monstie.growth}
        kinshipSkill={monstie.kinshipSkill}
      />

      {!!ridingActions?.length && (
        <MonstieRidingActions actions={ridingActions} />
      )}

      <MonstieBaseStats stats={monstie.stats} />

      <MonstieAcquisition habitatDetails={habitatDetails} howToGet={howToGet} />
    </DetailArticle>
  );
}
