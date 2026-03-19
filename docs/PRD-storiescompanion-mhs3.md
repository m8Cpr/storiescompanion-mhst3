# PRD — StoriesCompanion MHS3

## 1. Overview

### Vision

StoriesCompanion MHS3 is a local-first companion app for Monster Hunter Stories 3 players. It serves as a living encyclopedia focused on combat mechanics — Head to Head (H2H) attack patterns and monster weaknesses — empowering players to make informed decisions during battle.

### Problem

Current companion tools (e.g., Monster Buddy for MHS2) are outdated, limited to previous game entries, poorly optimized, and missing key features of a "live encyclopedia." MHS3 data for habitat, genes, and other details is not yet available, so the app must allow user-contributed entries.

### Target Audience

All MHS3 players — casual, completionist, and competitive alike.

### Competitor Reference

- **Monster Buddy (MHS2)**: Limited to MHS2 data, missing live encyclopedia features, poorly optimized.

---

## 2. Tech Stack

| Layer            | Technology                                                          |
| ---------------- | ------------------------------------------------------------------- |
| Framework        | React 19 + TypeScript 5.9 (strict mode)                             |
| Build            | Vite 8                                                              |
| Styling          | Tailwind CSS (light/dark mode)                                      |
| State Management | Zustand (shared state), React hooks (local state)                   |
| Forms            | React Hook Form (controlled mode — Controller/useController)        |
| Routing          | React Router v6 _(V1)_                                              |
| i18n             | react-i18next + i18next + i18next-browser-languagedetector (EN, IT) |
| Data Fetching    | TanStack Query _(V2, with backend)_                                 |
| Persistence      | localStorage (MVP/V1), external DB via Raspberry Pi backend _(V2)_  |
| Linting          | ESLint flat config (see section 8), Prettier                        |
| Testing          | None for now                                                        |

---

## 3. Data Model

The MHS3 monster schema evolves from the MHS2 schema used in `monsterbuddy-mhst2`. All existing keys are preserved; new fields are added.

### Monster Schema

```typescript
interface Monster {
  /** Sequential number in the encyclopedia */
  no: number;
  /** Monster name */
  name: string;
  /** Monster genus / species category (e.g., "Bird Wyvern", "Herbivore") */
  genus: string;
  /** Monster habitat — adapted to MHS3 game world */
  habitat: string;
  /** Locations where the monster can be found */
  locations: MonsterLocation[];
  /** Monster rarity */
  rarity: number;
  /** Egg group identifier */
  eggGroup: string;
  /** Monster's own element */
  element: MonsterElement;
  /** Combat data — weaknesses and attack patterns */
  monster: MonsterCombatData;
  /** Whether this monster is hatchable */
  hatchable?: boolean;
  /** Monstie data (when hatchable) */
  monstie?: MonstieData;
}

interface MonsterLocation {
  type: string;
  main: string;
  sub?: string;
}

interface MonsterCombatData {
  /** Map of state name to attack type */
  attackPatterns: Record<string, AttackType>;
  /** Map of part name to array of weapon weaknesses */
  parts: Record<string, WeaponType[]>;
  /** Elemental weakness map — scale: -2 (very weak) to +2 (very resistant) */
  elementalWeakness: Record<Element, number>;
  /** Status weakness map — scale: -3 (immune) to +2, where -3 = immune */
  statusWeakness: Record<StatusEffect, number>;
}

interface MonstieData {
  attackType: AttackType;
  growth: string;
  ridingActions: string[];
  kinshipSkill: string;
  eggColors: string[];
  retreat: string;
  stats: MonstieStats;
}

interface MonstieStats {
  base: {
    maxHp: number;
    speed: number;
    recovery: number;
    critRate: number;
  };
  attack: Record<Element | "none", number>;
  defense: Record<Element | "none", number>;
}
```

### Enums

```typescript
type AttackType = "power" | "speed" | "technical";

type WeaponType = "slash" | "blunt" | "pierce";

type Element = "fire" | "water" | "ice" | "thunder" | "dragon";

/** "non-elemental" can also be referred to as "normal" */
type MonsterElement = Element | "non-elemental";

type StatusEffect = "poison" | "paralysis" | "sleep" | "blast";
```

### Attack Pattern States

Each monster has at least one state (`DEFAULT` = base form). Additional states can be added up to a maximum of **7 total**. States use a label system:

| Label   | Behavior                                           |
| ------- | -------------------------------------------------- |
| Base    | Required. Always present. Defines the monster type |
| Enraged | Preset label for the enraged state                 |
| Custom  | User enters a custom name via text input popup     |

A monster **cannot be in multiple states simultaneously** and **cannot break its schema** — it will only ever use the attack type assigned to its current state.

### Head to Head (H2H) Mechanic

Rock-paper-scissors combat system:

- **Speed** (blue) beats **Power** (red)
- **Power** (red) beats **Technical** (green)
- **Technical** (green) beats **Speed** (blue)

A monster's **type** is determined by its base stance attack type.

### Weakness Scales

| Category    | Scale          | Notes                                                             |
| ----------- | -------------- | ----------------------------------------------------------------- |
| Elemental   | -2 to +2       | -2 = very weak, 0 = neutral, +2 = very resistant                  |
| Status      | -3 to +2       | -3 = immune                                                       |
| Part/Weapon | toggle (array) | A part can be weak to none, some, or all of: slash, blunt, pierce |

---

## 4. Data Persistence

### Bundled Data

- Default monster data ships with the app at `public/data/monsters.json`
- Format: single JSON file, array of `Monster` objects
- Schema matches the MHS2 structure with MHS3 extensions

### User Data (localStorage)

- User-added/modified monsters are stored separately in localStorage
- On load, the user data layer is **merged on top of** the default data
- Users can **reset to default** to clear their customizations

### Export/Import (V1)

- Encode the user data as a **base64-encoded JSON string** (`btoa(JSON.stringify(data))`)
- Export: display the string in a textarea for the user to copy
- Import: paste the string into a textarea, decode and merge into localStorage
- Reference implementation: [Egg Inc. Epic Research Calculator](https://github.com/SticklyMan/egginc-epic-research-calc)

---

## 5. Scope & Roadmap

### MVP

| Feature                  | Details                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Monster List             | All monsters displayed A → Z, scrollable                                                                                                                                              |
| Search                   | Text search bar filtering by monster name                                                                                                                                             |
| Filters                  | Filter by monster type (Power/Speed/Technical) and egg group                                                                                                                          |
| H2H Quick Lookup         | Preview button on each monster card opens a modal showing name + attack patterns per state                                                                                            |
| Add Monster              | Form to add a new monster with required fields: name, base attack pattern. Optional: additional states (select: base/enraged/custom), part weaknesses, elemental/status weakness maps |
| localStorage Persistence | User-added monsters saved to localStorage, merged on default data                                                                                                                     |
| Reset to Default         | Clear user customizations and revert to bundled data                                                                                                                                  |
| Light/Dark Mode          | Tailwind-based theme toggle                                                                                                                                                           |
| i18n                     | English and Italian, auto-detected from browser (fallback: English), user-selectable toggle                                                                                           |
| Images                   | Attack type icons, element/status icons, weapon type icons. All other content is textual                                                                                              |

### V1

| Feature             | Details                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Monster Detail Page | Full page with: name (title), egg group (subtitle), sections for weaknesses, attack patterns, and other details     |
| Routing             | React Router v6 — clicking a monster card navigates to its detail page. Preview button has priority over navigation |
| Edit Monster        | Edit existing monster entries                                                                                       |
| Export/Import       | Base64-encoded JSON string, textarea-based, cross-device portability                                                |

### V2

| Feature         | Details                                                             |
| --------------- | ------------------------------------------------------------------- |
| Local Backend   | Hosted on Raspberry Pi (existing PiHole device), local network only |
| Health Check    | Periodic health-check from the SPA to verify backend connectivity   |
| External DB     | Monster data stored in external database                            |
| Data Validation | Input validation for monster form fields                            |

---

## 6. UX & Design

### Design Direction

- **Aesthetic**: Minimal, modern, yet wild — like an explorer's journal
- **Theme**: Light and dark mode via Tailwind CSS
- **Typography & Layout**: Clean, readable, functional

### MVP Navigation

- Single view: monster list with search bar and filters at the top
- Each monster renders as a card in the list
- Preview button on each card opens the H2H quick-lookup modal

### V1 Navigation

- Monster list as home page
- Clicking a card navigates to the monster's detail page
- Preview button on the card has **priority over navigation** (clicking the preview button opens the modal, not the detail page)

### Monster Detail Page (V1)

- **Title**: Monster name
- **Subtitle**: Egg group
- **Sections**: Attack patterns, part weaknesses, elemental weaknesses, status weaknesses, other details

### Images (MVP)

Only icons for:

- Attack types (Power, Speed, Technical)
- Elements (Fire, Water, Ice, Thunder, Dragon, Non-elemental)
- Status effects (Poison, Paralysis, Sleep, Blast)
- Weapon types (Slash, Blunt, Pierce)

Everything else is text-based.

---

## 7. Monster Form (Add/Edit)

### Required Fields

- **Name**: Text input
- **Base attack pattern**: Select (Power / Speed / Technical)

### Optional Fields

- **Additional states**: Up to 6 more (7 total cap). Each state has:
  - Label select: Base (disabled, always first) / Enraged / Custom
  - If Custom: text input popup for the state name
  - Attack type select: Power / Speed / Technical
- **Parts**: User adds a part (text input for name), then toggles weaknesses (slash / blunt / pierce)
- **Elemental weaknesses**: For each of the 5 elements, a value from -2 to +2
- **Status weaknesses**: For each of the 4 status effects, a value from -3 to +2
- **Element**: Monster's own element (select)
- **Egg group**: Text/select input
- **Other fields**: genus, habitat, locations, rarity, hatchable, monstie data — as per schema

### Form Library

React Hook Form in **controlled mode** using `Controller` and `useController`, matching the pattern established in the webapp project.

---

## 8. Linting & Formatting

### ESLint (flat config)

Matching the webapp (`C:\dev\webapp\eslint.config.js`):

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-import` (ordering with groups + newlines, no duplicates)
- `eslint-plugin-unused-imports`
- `eslint-plugin-react-hooks` (rules-of-hooks: error, exhaustive-deps: warn)
- `eslint-plugin-react-refresh` (only-export-components: warn)
- `eslint-config-prettier`
- `@typescript-eslint/switch-exhaustiveness-check`: error
- `@typescript-eslint/no-unused-vars`: off (handled by unused-imports plugin)

### Prettier

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "quoteProps": "consistent"
}
```

---

## 9. Internationalization (i18n)

| Setting         | Value                                                      |
| --------------- | ---------------------------------------------------------- |
| Library         | react-i18next + i18next + i18next-browser-languagedetector |
| Supported langs | English (`en`), Italian (`it`)                             |
| Detection       | Auto-detect from browser locale                            |
| Fallback        | English (if detected language is neither EN nor IT)        |
| User control    | Language toggle in the UI                                  |

---

## 10. Constraints & Assumptions

- **No server** in MVP and V1 — fully local-first
- **Maximum 7 states** per monster (base + 6 additional)
- **No test suite** for now (deprecated per CLAUDE.md)
- **No component library** — custom components, potentially standalone shadcn/ui components later
- **No spoilers** — monster count and specific game data should not be inferred or disclosed
- **Data schema extends MHS2** — same keys preserved, new fields added
