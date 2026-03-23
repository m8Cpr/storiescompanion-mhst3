import Badge from "@/components/Badge";
import { BossBadge } from "@/components/monster-details/BossBadge";
import { TRANSLATION_KEYS } from "@/i18n/keys";
import type { Monster } from "@/schemas/monster";
import { cn } from "@/utils/lib";
import { ELEMENT_COLORS, ELEMENT_ICONS } from "@/utils/records";
import { MapPin, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

const { MONSTER } = TRANSLATION_KEYS;

interface MonsterHeaderProps {
  monster: Monster;
}

export function MonsterHeader({ monster }: MonsterHeaderProps) {
  const { t } = useTranslation("common");
  const ElementIcon = ELEMENT_ICONS[monster.element];

  return (
    <section
      className={cn(
        "flex flex-col gap-6",
        "border border-border rounded-xl bg-card shadow-sm",
        "p-6 md:p-8"
      )}
    >
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {/* Left side */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold sm:text-4xl text-left">
              {monster.name}
            </h1>

            <span
              className="flex text-yellow-500"
              role="img"
              aria-label={`${monster.rarity} stars`}
            >
              {Array.from({ length: monster.rarity }).map((_, i) => (
                <span key={i} aria-hidden="true">
                  ★
                </span>
              ))}
            </span>
          </div>

          <p className="text-muted-foreground">
            {t(MONSTER.EGG_GROUP[monster.eggGroup])}
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 max-lg:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <ElementIcon
              className={cn("size-6", ELEMENT_COLORS[monster.element])}
            />

            <dl className="space-y-1">
              <dt className="text-sm text-muted-foreground">
                {t(MONSTER.DETAIL_LABEL.ELEMENT)}
              </dt>
              <dd className="text-xl font-bold">
                {t(MONSTER.ELEMENT[monster.element])}
              </dd>
            </dl>
          </div>

          {monster.boss && monster.boss.length > 0 && (
            <ul
              className={cn(
                "grid gap-2",
                monster.boss.length > 1
                  ? "grid-cols-1 md:grid-cols-[auto_1fr]"
                  : "grid-cols-1"
              )}
            >
              {monster.boss.map((cat) => (
                <BossBadge key={cat} category={cat} />
              ))}
            </ul>
          )}
        </div>
      </header>

      <p className="max-w-4xl leading-relaxed text-foreground/90">
        {monster.description}
      </p>

      <ul className="flex flex-wrap gap-3 text-xs">
        {monster.habitats.map((habitat) => (
          <Badge list key={habitat}>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {t(MONSTER.HABITAT[habitat])}
            </span>
          </Badge>
        ))}

        <Badge list>
          <span className="flex items-center gap-1.5">
            <Tag className="size-3.5" />
            {t(MONSTER.EGG_GROUP[monster.eggGroup])}
          </span>
        </Badge>

        {monster.trait && (
          <Badge list>
            <span className="flex items-center gap-1.5">
              <Tag className="size-3.5" />
              {t(MONSTER.TRAIT[monster.trait])}
            </span>
          </Badge>
        )}
      </ul>
    </section>
  );
}
