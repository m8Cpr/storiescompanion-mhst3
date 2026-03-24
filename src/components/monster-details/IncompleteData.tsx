import { TRANSLATION_KEYS } from "@/i18n/keys";
import { cn } from "@/utils/lib";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";

const { COMMON } = TRANSLATION_KEYS;

export default function IncompleteData() {
  const { t } = useTranslation();

  return (
    <aside
      role="note"
      className={cn(
        "flex items-center gap-3",
        "rounded-xl border border-yellow-500/20 p-4",
        "text-yellow-600 dark:text-yellow-500 bg-yellow-500/10"
      )}
    >
      <Info aria-hidden className="size-5 shrink-0 mt-0.5" />
      <span className="text-sm flex flex-col gap-1">
        <p className="font-semibold">{t(COMMON.DATA_DISCLAIMER_TITLE)}</p>
        <p>{t(COMMON.DATA_DISCLAIMER)}</p>
      </span>
    </aside>
  );
}
