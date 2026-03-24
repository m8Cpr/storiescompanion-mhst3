import { TRANSLATION_KEYS } from "@/i18n/keys";

const { COMMON, FILTER } = TRANSLATION_KEYS;

export const common = {
  // COMMON
  [COMMON.APP_TITLE]: "StoriesCompanion",
  [COMMON.APP_SUBTITLE]: "Monster Hunter Stories 3",
  [COMMON.HOME]: "Monsterpedia",
  [COMMON.HOME_DESCRIPTION]:
    "Browse monsters, monsties, habitats, and combat data for MH Stories 3: Twisted Reflection.",
  [COMMON.SPOILER_WARNING]:
    "<strong>Spoiler warning</strong><br/>you'll find names, locations, and combat data here. If you'd rather discover things yourself, proceed at your own pace.",
  [COMMON.DISCLAIMER]:
    "StoriesCompanion is a fan-made companion app and it is not affiliated with or endorsed by Capcom. All trademarks are the property of their respective owners.",
  [COMMON.NO_RESULTS]: "No monsters found matching your criteria.",
  [COMMON.SEARCH_PLACEHOLDER]: "Search monsters by name...",
  [COMMON.DATA_DISCLAIMER_TITLE]: "Incomplete Data",
  [COMMON.DATA_DISCLAIMER]:
    "Some attack patterns or monster data may be missing or inaccurate as research is still ongoing.",
  [COMMON.NOT_FOUND]: "Page not found",
  [COMMON.BACK_TO_HOME]: "Back to home",
  [COMMON.APP_FOOTER]:
    " StoriesCompanion MHS3 — A local-first encyclopedia for monster hunters",
  // FILTER
  [FILTER.TITLE]: "Filter Monsters",
  [FILTER.DESCRIPTION]:
    "Refine your search by habitat, element, attack type, and more.",
  [FILTER.HABITAT]: "Habitat",
  [FILTER.EGG_GROUP]: "Egg Group",
  [FILTER.ATTACK_TYPE]: "Attack Type",
  [FILTER.ELEMENT]: "Element",
  [FILTER.HIDE_CATEGORIES]: "Hide Categories",
  [FILTER.HIDE_CATEGORY.story]: "Story Boss",
  [FILTER.HIDE_CATEGORY.invasive]: "Invasive",
  [FILTER.HIDE_CATEGORY.feral]: "Feral",
  [FILTER.HIDE_CATEGORY.elderDragon]: "Elder Dragon",
  [FILTER.HIDE_CATEGORY.endangered]: "Endangered",
  [FILTER.SELECTED_COUNT + "_one"]: "{{count}} selected",
  [FILTER.SELECTED_COUNT + "_other"]: "{{count}} selected",
  [FILTER.CLEAR_ALL]: "Clear All",
  [FILTER.ALL_PLACEHOLDER]: "All",
};
