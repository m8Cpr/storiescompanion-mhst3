import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { HabitatDetail } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

interface HabitatLocationItemProps {
  habitat: HabitatDetail;
}

function HabitatLocationItem({ habitat }: HabitatLocationItemProps) {
  return (
    <li
      className={cn(
        "flex items-start gap-3",
        "p-4 rounded-lg bg-muted/50 border border-border"
      )}
    >
      <MapPin aria-hidden className="size-5 text-primary mt-0.5 shrink-0" />
      <div>
        <p className="font-semibold text-foreground">{habitat.area}</p>
        <p className="text-sm text-muted-foreground">{habitat.region}</p>
      </div>
    </li>
  );
}

interface MonstieAcquisitionProps {
  habitatDetails?: HabitatDetail[];
  howToGet?: string;
}

export function MonstieAcquisition({
  habitatDetails,
  howToGet,
}: MonstieAcquisitionProps) {
  const { t } = useTranslation("monster");

  if (!habitatDetails?.length && !howToGet) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-6">
      {!!habitatDetails?.length && (
        <div className="md:col-span-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t(MONSTER.DETAIL_LABEL.SPECIFIC_LOCATIONS)}
          </h3>

          <ul className="space-y-3">
            {habitatDetails.map((hab, index) => (
              <HabitatLocationItem key={index} habitat={hab} />
            ))}
          </ul>
        </div>
      )}

      {howToGet && (
        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t(MONSTER.DETAIL_LABEL.HOW_TO_GET)}
          </h3>

          <p className="text-sm text-foreground/80 leading-relaxed">
            {howToGet}
          </p>
        </div>
      )}
    </section>
  );
}
