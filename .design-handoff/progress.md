# Design System Handoff — Trianglz Web Design System (Copy)

- **Figma file:** https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy- (fileKey `J5nMmdVjcukSUhQXq0Oce7`)
- **Platform:** Web
- **Framework:** Tailwind CSS v4 (`@theme` in CSS)
- **File:** duplicate (safe to edit)
- **Codebase:** this repo (https://github.com/doniaelwazery/trianglz-web-design-system): tokens + React/Tailwind components
- **Steps chosen:** all 6
- **Started:** 2026-10-20

## Inventory (2026-10-20)

- 20 pages; component pages: Buttons & links, Input Fields, Selection Controls, Avatars & upload image, Tooltips, Banners & Badges, Popups, Paganation & Tabs, Icons (39 standalone), Favicon (none)
- Variables: Primitives 86 (1 mode), Semantic 69 (Light/Dark), Typography 32 (Desktop/iPad/Mobile), Radius 9, Spacing 24 (Desktop/iPad/Mobile). All 220 have WEB code syntax, none on ALL_SCOPES
- 40 text styles (all variable-bound), 11 effect styles (Tailwind shadow scale), 0 paint styles
- Duplicate-named component sets: Toggle, Checkbox, RadioButton, User Avatar, upload image, Tooltip, Alerts, badges (2 each)

## Known constraints
- Figma plan allows editing only 1 mode per collection: Dark/iPad/Mobile values can't be changed by script
- Kept as-is by designer choice (2026-10-19): button text contrast, variable order, border/info, btn/secondary/light, Dark values for primary/warning light

## Steps
| # | Step | Status |
|---|------|--------|
| 1 | Tokens machine-readable | done 2026-10-20 |
| 2 | Components code-shaped | done 2026-10-20 |
| 3 | Export tokens | done 2026-10-20 |
| 4 | Code Connect | templates done 2026-10-20; publishing blocked by plan |
| 5 | DESIGN.md | done 2026-10-20 (4 confirm items open) |
| 6 | Test + sync | done 2026-10-20 (Logo swap pending Upload Field publish) |

## Step 1 — Tokens (done 2026-10-20)

Updated WEB code syntax on 120 variables (Figma names unchanged, so bindings are unaffected):
- font-size → `--text-*`, line-height → `--leading-*`, letter-spacing → `--tracking-*`, space → `--spacing-*`, font-family/base → `--font-sans`
- Semantic colors use per-utility prefixes (decision: Option A): text → `--text-color-*`, bg → `--background-color-*`, border → `--border-color-*`
- Button tokens: `--background-color-btn-{type}[-hover|-active|-light]`, `--text-color-btn-{type}`, `--border-color-btn-{type}`
- Unchanged: primitives `--color-*`, `--font-weight-*`, `--radius-*`

| | Before | After |
|---|---|---|
| Variables with WEB code syntax | 220/220 | 220/220 |
| Code names Tailwind v4 turns into classes | 169/220 | 220/220 |
| Doubled class names (bg-bg-*) | 69 | 0 |
| Inconsistent names | 0 | 0 |
| On ALL_SCOPES | 0 | 0 |
| Duplicate code names | 0 | 0 |

Notes for Step 3:
- Font weights are style names in Figma → 300/400/500/600/700 in code
- radius/sm = 2px (Tailwind default 4px); file values override defaults
- Verify with a real build that `--text-color-*`, `--background-color-*`, `--border-color-*` generate `text-*`, `bg-*`, `border-*` classes
- Typography and Spacing have Desktop/iPad/Mobile modes → media-query overrides

Open designer item: `btn/neutral` has no bg/border/light; assumed to be a ghost button

## Step 2 — Components (audit done 2026-10-20; limit hit once, reset same day)

Read-only audit not run: Figma MCP returned "You've reached the Figma MCP tool call limit on the Starter plan".
Resume: run `component-audit.js` (set `page` first) once per component page, in parallel:
74:24537 Buttons & links · 52:2 Input Fields · 80:28169 Selection Controls · 75:26159 Avatars & upload image ·
67:17376 Tooltips · 75:27110 Banners & Badges · 77:27961 Popups · 237:2315 Paganation & Tabs · 74:24541 Icons (39 standalone)

### Audit results (read-only, 2026-10-20)
| Component (set id) | Issues |
|---|---|
| Toggle ×2 (80:28684, 80:28715) | duplicate set; `Property 1`; values mix two ideas (`enabled - dimmed`); unbound radius 8, gap 4 |
| Checkbox ×2 (80:28688, 80:28734) | duplicate; `Property 1`; mixed case (`Checked` / `disabled (selected)`) |
| RadioButton ×2 (80:28711, 80:28758) | duplicate; `Property 1`; placeholder value `Status4` |
| Alerts ×2 (77:27906, 77:27907) | duplicate; `Property 1` has only `Default` for 4 variants (variant names collide) |
| badges ×2 (77:27864, 77:27872) | duplicate; `Property 1`; `Success` vs lowercase |
| User Avatar ×2 (75:26830, 75:26834) | duplicate; typo `Meduim`; `Large` and `large` both exist; 4 frames w/o auto layout |
| upload image ×2 (75:26917, 75:26944) | duplicate; `Property 1`; 2 frames w/o auto layout |
| Tooltip ×2 (75:26731, 75:26735) | duplicate; unbound radius 8, gap 12 |
| Verification code input field (69:20901) | `Property 1`; unbound radius 60, gap 77; 1 frame w/o AL |
| code field (68:20624) / numeric field (75:27016) | `Property 1`; `focused` vs `focus`; unbound radius/gap |
| Upload Field (80:28810) | `Property 1`; 23 hardcoded colors |
| Search (80:30243) | `Property 1`; 4 frames w/o AL |
| Confirmation Popups (222:3717) | `Property 1`; 4 hardcoded colors |
| Catalyst / Textarea (209:206) | leftover "Catalyst /" prefix; `Invalid` vs `error`; `filled` lowercase |
| Button (103:859, 320 variants) | `Type` → variant; Title-case values; 240 hardcoded colors (all #1c274c, icon strokes); no description |
| Input / Text, URL, Card number | good props + descriptions; 54 hardcoded colors each |
| Pagination / Item, Tabs / Item (Underline, Pill) | clean; Tabs could merge into one set with style=underline/pill (designer decision) |
| Icons (39 standalone) | no descriptions; 70 hardcoded colors; mixed naming (`Close Icon`/`close`/`cancel`, trailing spaces, `Linear / …` paths) |

Descriptions: 3 / 28 sets. Broken sets: 0.

### Decisions (2026-10-20)
- Vocabulary approved: props `variant`, `size`, `state`, `iconPosition`, `checked`; lowercase values; state = default/hover/focus/active/disabled/filled/error/success; checked = false/true/indeterminate; size = xs/sm/base/lg/xl; booleans like Input (`label`, `hint`, `optional`, `helpIcon`, `errorMessage`); text props `labelText`, `hintText`
- "dimmed" = disabled
- Approvals grouped per component family (Starter plan call limit)
- 8 duplicate sets were exact stacked copies with 0 instances → moved to new **Archive** page (2022:2)

### Group 1 — Selection controls (done)
- Toggle 80:28684, Checkbox 80:28688, RadioButton 80:28711: `Property 1` → `checked` + `state`; `Show text` → `label`; `Text` → `labelText`; descriptions added. RadioButton `Status4` = checked + disabled
- Bound: 5 radius, 13 gap. Not bound: 14 pill/circle radii (16777200, or 20 on a 20px circle) → proposed radius/full in group 2
- Screenshot after: no visual change

### Group 2 — Feedback (done)
- Alerts → **Alert** (77:27906): `variant` = info/warning/danger/success (from titles; "Error" → danger)
- badges → **Badge** (77:27864), Confirmation Popups → **Confirmation Popup** (222:3717): `variant`, lowercase values
- Tooltip (75:26731): `arrow`, `size` = sm/lg
- Descriptions added to all 4. Bound: 12 radius, 14 pill → radius/full (incl. selection controls), 24 gap
- Screenshots after: no visual change
- **Open designer decision:** 12 gaps of 10px (Tooltip "div", Popup "icons") have no token (scale 8 → 12): change to 8/12 or add space/2.5
- Popup's 4 hardcoded colors from the audit not found on re-check → recheck in final pass

### Group 3 — Inputs (done)
- Renamed: Catalyst / Textarea → **Textarea**, code field → **Code Field**, Verification code input field → **Verification Code Input**, numeric field → **Numeric Field**; Upload Field, Search kept
- All use `state`; active → focus, Uploaded → filled, dimmed → disabled, Invalid → error, empty → default
- Booleans: label, hint, optional, helpIcon, errorMessage, successMessage; text: labelText, hintText
- Descriptions added (6). Bound: 26 radius, 12 gap, 1 color. Screenshots after: no visual change
- Left as artwork (not tokens): Mastercard/payment logo colors, #dadada logo placeholders, #292d32 drawn upload icon, #f2f4f7 border in Upload Field
- To fix by hand (no auto layout): Search magnifier 80:30180, 80:30236, 80:30193, 80:30218; Verification check 68:20550
- **Open designer decision:** gaps 6px (18) and 10px (58 incl. group 2) have no token → propose space/1.5 and space/2.5 (Tailwind's own 1.5 / 2.5)

### Group 4 — Button, Avatar, Pagination, Tabs (done)
- Button 103:859: Type → `variant` (filled/outline/pill/link), Icon → `iconPosition`, State → `state`, values lowercase
- User Avatar → **Avatar** (75:26830): `variant` = icon/photo/text, `size` = xs/sm/base/lg (fixed "Meduim", Large/large)
- upload image → **Avatar Upload** (75:26917): `state` = default/filled/error
- Pagination / Item 245:24: `variant` = number/ellipsis/prev/next, `state` lowercase
- Tabs merged → **Tabs / Item** (245:54): `variant` = underline/pill (pill variants moved from 245:63, IDs kept; empty set removed)
- Descriptions added. To fix by hand: Avatar text variants and Avatar Icon (75:26906, 75:26929) have no auto layout

### Group 5 — Icons (done)
- 25 renamed to kebab-case (chevron-left/right, eye/eye-closed, close (X) vs close-circle, arrow-down-left…, phone, bell, mail, export, *-circle); descriptions on all 39
- 70 hardcoded #1c274c layers bound; screenshot: no visual change
- To fix by hand: `export` icon (221:2155) sits loose in the Icons frame, not in a section

### New tokens (decision 2026-10-20)
- `space/1_5` = 6 and `space/2_5` = 10 (Figma names can't contain "."), WEB `calc(var(--spacing) * 1.5 / 2.5)` → `gap-1.5`, `gap-2.5`; all 3 modes set
- `color/icon/default` aliases the same primitives as border/inverse (Light + Dark), WEB `var(--text-color-icon-default)`; icons rebound from border/inverse (109 paints)
- 35 gaps of 6/10px bound

### Step 2 final check (21 sets + 39 icons)
| | Before | After |
|---|---|---|
| Generic props (`Property 1`, `Type`, `Show …`) | 17 sets | 0 |
| Placeholder / mixed-case variant values | many (Status4, Meduim, Default…) | 0 |
| Sets with descriptions | 3 / 28 | 21 / 21 (+39 icons) |
| Duplicate sets | 8 | 0 (in Archive) |
| Unbound radius / gap in sets | ~200 | 0 |
| Hardcoded colors | ~700 | only logo artwork in Input/Upload fields (intentional) |

## Step 5 — Rulebook (done 2026-10-20)
- Wrote `DESIGN.md` (principles, token classes, web rules, layout, 16 components + icons, accessibility, top 10) and `CLAUDE.md` (3 hard rules) at the project root
- Principles chosen: Clarity over decoration · One primary action per view · Consistent states everywhere · Accessible by default
- Open `<!-- confirm -->` items: file paths (Step 3), dark-mode selector, iPad/Mobile breakpoints, layout grid specs, Button `color` prop, 24px target + rem output, button text contrast

## Step 3 — Token export (done 2026-10-20)
- Decisions: dark mode `[data-theme="dark"]`; Mobile < 768px, iPad 768–1279px, Desktop ≥ 1280px; Tailwind's default palette removed (`--color-*: initial`)
- `tokens/tokens.json` (223 variables, DTCG, aliases + all modes in `$extensions.com.figma.modes`, Figma code syntax kept per token) and `tokens/effects.json` (11 shadows)
- `npm run tokens:build` → Style Dictionary 5.7 (`build/tokens.mjs`) writes `src/styles/theme.css`; `build/verify.mjs` compiles a test page with Tailwind 4.3.3 and checks every token
- Output: sizes in rem (16px base), letter spacing in px, weights 300–700, `--text-*--line-height` paired to `--leading-*`, `--breakpoint-ipad` / `--breakpoint-desktop` added
- Verified: 235/235 Figma code syntax names exist in theme.css and generate the right Tailwind class (incl. `text-primary`, `bg-btn-primary`, `border-default`, `gap-2.5`, `hover:bg-btn-primary-hover`); Dark/iPad/Mobile blocks present; a deliberately wrong name is caught
- Not exported: the 40 Figma text styles (they're combinations of these tokens); could become `@utility` classes later
- Steps 4 and 6 still need UI components in code

## Components in code (2026-10-20)
- React 19 + TypeScript + Vite 8 + Tailwind 4.3; `src/components` (16 Figma components + Pagination/Tabs bars + Icon), gallery at `npm run dev`
- Specs read from Figma (default variant + per-variant diffs) in 3 calls; 45 SVG icons exported (38 Icons page + 7 drawn inside components). `export` icon has no visible layers → not exported
- Prop names follow Figma (variant, size, iconPosition, state, checked, label/labelText, hint, optional, errorMessage…); `state` prop only forces visuals for docs
- Measured vs Figma: Button all sizes and icon positions, Input/Search/Upload fields, Code Field, Numeric Field, Toggle, Checkbox, Avatars, Badges, Popup 443×276, Pagination, Tabs match within 1–2px (text rendering)
- Known differences / designer items:
  - Alert is 56px tall vs 60 in Figma (Figma text styles use 22px line height; tokens give 20)
  - Popup frame, avatar circles and some paddings are bound to variables that no longer exist in the file (shown as `$undefined`/`$?`) → used bg-primary, border-default, rounded-lg/full, p-10
  - Warning/success titles and icons use `btn/*/bg` fill tokens as text color (no text token exists)
  - Dark mode: `btn/primary/text` is gray-900, so filled warning/danger buttons get dark text on red/yellow (low contrast)
  - Fixed component sizes aren't tokens in Figma (spacing tokens shrink on mobile) → components use rem sizes; consider size tokens
  - Button `color` prop added in code (Popup needs warning/danger buttons); Figma Button has no color variant
  - Code Connect (Step 4) needs a Figma Organization/Enterprise plan; this file is on Starter

## Design decisions (2026-10-20, after components)
1. **Button color variant: yes.** Figma Button (103:859) got `color` = primary/danger/success/warning/info on `filled` (320 new variants → 640 total; existing = color=primary). Icons in colored variants follow the label token. Popup warning/danger buttons switched from fill overrides to the new variants.
2. **Size tokens: no.** Components keep fixed rem sizes (documented in DESIGN.md).
3. **Dark contrast fix: yes.** New tokens `color/btn/{danger,success,warning,info}/label` (danger white/white 4.83, success gray-900 6.10, warning gray-900 9.36, info white/gray-900 5.17/5.46). Used by Figma Button + code Button. tokens.json now 227 variables; token check 239/239.

## Step 6 — Test screen (in progress, 2026-10-20)
Screen: "add New Project" — https://www.figma.com/design/G8OLBUp6OrEyrMBkqNUwQL/Testing---Design-System-Handoff?node-id=2-570 (original frame edited in place, at the designer's request)
- Swapped to Trianglz DS: Title + Timeline → Input / Text (help icon hidden), Description → Textarea, Cancel/Save → Button outline/filled sm, "Back to Projects" → Button link xs + chevron-left, header avatar → Avatar photo sm (photo kept)
- Waiting: Logo picker → Upload Field (Upload Field still UNPUBLISHED in the library)
- Kept from ensido (no Trianglz equivalent): Page Title container, Header (hamburger, notification bell + dot, profile dropdown chevron), Sidebar (nav items, sub-tab, "New" tag, organization card, nav icons)
- Design system gaps found:
  - Input / Text has no `helpIcon` boolean (Textarea/Upload Field have one)
  - Input / Text icon slot is a fixed chevron, not swappable (needed for the Timeline calendar icon / date input)
  - Missing: chevron-down icon, notification bell with dot, image/logo uploader with preview, page header, top bar, sidebar navigation item, "New" tag
- Code build: `src/screens/add-project/` (`npm run dev` → http://localhost:5173/#add-project). Page content uses only Trianglz components + tokens (0 arbitrary values); ensido chrome isolated in AppShell.tsx with its Figma assets
- Measured vs Figma: card 24/16/8, fields 68 tall, title 36 lh, back link 136×32, Save 59×36 match; Cancel +5px, Description −2px
- Fixed during test: xs Button icons 12px (Figma), `white` → `base-white` (Tailwind palette removed; added to DESIGN.md)
- Open: Logo still ensido in Figma (Upload Field not in library); Page Title color is ensido #171717; xs text style has 0.2px tracking with no token

## Sync routine (approved 2026-10-20)
Saved in DESIGN.md section 8: variable change → code syntax + tokens.json + `npm run tokens:build` + PR; component change → React component (same props) + gallery + DESIGN.md + publish library + PR; rule change → DESIGN.md PR reviewed by designer; release → tokens:build, tsc, build pass + gallery check in Light/Dark.

## Step 4 — Code Connect (2026-10-20)
- 59 parserless templates in `src/figma/` (21 components + 38 icons), type-checked with `@figma/code-connect` 2.0.2; config in `figma.config.json` (label React)
- Mapping: Figma variant/boolean/text props → React props with the same names; state=disabled → `disabled`, hover/focus omitted (browser); Button reads its nested icon's name from the icon template's metadata; text layers → labels/children
- Code change: Avatar got an `initials` prop (Figma shows initials as text)
- Test publish of Button + icon: refused by Figma — "Code connections can only be made in libraries that are in Organization or Enterprise plans" (plans: Starter ×2, Pro guest)
- To publish after upgrading: move the library to an Organization/Enterprise team, then `npx figma connect publish --token=<personal access token>` (or ask Claude to publish via the Figma MCP)
- Not mapped (no code prop): helpIcon booleans (code needs help text), NumericField state, Search/Code Field hover/focus/filled visuals
