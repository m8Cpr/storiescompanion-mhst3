import type { Resource } from "i18next";

import { common as en } from "./locales/en/common";
import { monster as enMonster } from "./locales/en/monster";
import { common as it } from "./locales/it/common";

export type Language = "en" | "it";

export interface Resources extends Resource {
  en: {
    common: typeof en;
    monster: typeof enMonster;
  };
  it: {
    common: typeof it;
    monster: typeof enMonster;
  };
}
