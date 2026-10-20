# DESIGN.md — Trianglz Web Design System

Rules for building Trianglz web UI. Values live in the tokens, not here.
Source of truth: Figma "Trianglz - Web Design System" (fileKey `J5nMmdVjcukSUhQXq0Oce7`).
Platform: Web · Tailwind CSS v4.

## 1. Principles

1. **Clarity over decoration.** Light surfaces, thin borders, one blue accent. Color carries meaning (status, primary action), never decoration.
2. **One primary action per view.** A single `filled` button leads; everything else is `outline` or `link`.
3. **Consistent states everywhere.** Every interactive component supports `default`, `hover`, `focus`, `disabled`, plus `error` wherever people can enter data.
4. **Accessible by default.** Visible focus, sufficient contrast, readable body text, comfortable click targets.

## 2. Tokens

- Tokens come from Figma variables. In code they live in `tokens/tokens.json` (+ `tokens/effects.json` for shadows) and the generated Tailwind theme `src/styles/theme.css`. Regenerate with `npm run tokens:build`; never edit `theme.css` by hand.
- Never copy raw values (hex, px) into components. Use the Tailwind class the token creates.
- Components use **semantic** tokens only. Primitives (`--color-blue-500`, `--color-gray-700`…) exist for the theme file, not for components.
- Light and Dark are modes of the same tokens: the class names never change per theme.

### Class names developers type

| Need | Classes |
|---|---|
| Text color | `text-primary` `text-secondary` `text-muted` `text-disabled` `text-inverse` `text-placeholder` `text-link` `hover:text-link-hover` |
| Status text | `text-error` `text-warning` `text-success` `text-info` |
| Icon color | `text-icon-default` (icons use `currentColor`) |
| Background | `bg-primary` `bg-secondary` `bg-muted` `bg-subtle` `bg-inverse` `bg-overlay` |
| Status background | `bg-error` `bg-warning` `bg-success` `bg-info` |
| Border | `border-default` `border-muted` `border-strong` `border-emphasis` `border-inverse` |
| State borders | `border-focus` `border-error` `border-success` `border-warning` |
| Buttons (per type: primary, secondary, info, danger, success, warning) | `bg-btn-{type}` `hover:bg-btn-{type}-hover` `active:bg-btn-{type}-active` `text-btn-{type}` `border-btn-{type}` `bg-btn-{type}-light` |
| Neutral (ghost) button | `text-btn-neutral` `hover:bg-btn-neutral-hover` `active:bg-btn-neutral-active` |
| Font | `font-sans` (Poppins) · `font-light` `font-regular` `font-medium` `font-semibold` `font-bold` (300–700) |
| Font size + line height | `text-xs … text-6xl` with matching `leading-xs … leading-6xl` |
| Letter spacing | `tracking-tighter` `tracking-tight` `tracking-normal` `tracking-wide` `tracking-wider` `tracking-widest` |
| Spacing (4px steps) | `p-*` `m-*` `gap-*` with `0 1 1.5 2 2.5 3 … 64` |
| Radius | `rounded-none` `rounded-sm` (2px) `rounded-base` (4px) `rounded-md` `rounded-lg` `rounded-xl` `rounded-2xl` `rounded-3xl` `rounded-full` |
| Shadow | `shadow-2xs` `shadow-xs` `shadow-sm` `shadow-md` `shadow-lg` `shadow-xl` `shadow-2xl` `inset-shadow-2xs` `inset-shadow-xs` `inset-shadow-sm` |

Note: `rounded-sm` is **2px** here (Tailwind's default is 4px). Use `rounded-base` for 4px.

## 3. Platform rules (Web / Tailwind v4)

- Use theme utilities only. **No arbitrary values**: no `bg-[#2563eb]`, `p-[13px]`, `text-[15px]`, `rounded-[10px]`.
- If a value you need has no token, stop and ask the designer. Don't approximate with an arbitrary value.
- Pair font size with its line height: `text-sm leading-sm`, `text-base leading-base`.
- Use state variants for interaction: `hover:`, `focus-visible:`, `active:`, `disabled:`. Don't fake states with JS-toggled classes.
- Dark mode: set `data-theme="dark"` on `<html>`; never write per-component dark overrides or use Tailwind's `dark:` variant for token colors.
- Icons: use `<Icon name="…" />` from `src/components` (24px by default, colored with `text-*`).
- Token colors on properties without their own namespace (outline, ring, inset-ring, fill, stroke) use the variable shorthand: `outline-(--border-color-focus)`, `inset-ring-(--border-color-default)`. That is a token, not an arbitrary value.
- Figma inside strokes become `inset-ring` (the element keeps its size); outside strokes become `outline`.
- Spacing keys that are tokens (`0 1 2 … 64`) shrink on iPad and Mobile; use them for padding, margins and gaps. Fixed component dimensions (control, avatar and icon sizes) have no Figma token: inside `src/components` they use rem values such as `size-[1.25rem]`. App code uses the components instead of repeating those sizes.

## 4. Layout & spacing

- Spacing follows a 4px scale (`1` = 4px). Half steps `1.5` (6px) and `2.5` (10px) exist for tight component internals; don't use them for page layout.
- Spacing and type tokens have **Desktop / iPad / Mobile** values: the same class gets smaller on small screens. Don't add your own responsive overrides for spacing or font size. Mobile is below 768px, iPad 768–1279px, Desktop from 1280px (`ipad:` and `desktop:` variants exist for layout changes).
- Use the layout grid from the Figma "Layout Grid" page for page columns and gutters. <!-- confirm: columns, gutter, max width -->
- Use flex/grid with `gap-*` between siblings rather than margins on children.

## 5. Components

Reuse these before building anything new. They live in `src/components` (`import { Button, Input } from './components'`), and `npm run dev` opens a gallery of every variant and state. Prop names match Figma; a `state` prop forces a visual state for docs and review only, and product code leaves it unset.

### Button
- **Use for** actions. **Props:** `variant` filled | outline | pill | link · `size` xs | sm | base | lg | xl · `iconPosition` none | left | right | only · `state` default | hover | focus | disabled.
- **Do:** one `filled` button per view for the main action.
- **Don't:** use a button to navigate between pages; use a link.
- Icon-only buttons (`iconPosition=only`) need an `aria-label`.
- `color` prop: primary | info | success | warning | danger, for `filled` and `pill`. Added in code because Confirmation Popup needs warning and danger buttons; the Figma Button shows primary only. <!-- confirm: add a color variant to the Figma Button? -->

### Input / Text, Input / URL, Input / Card number
- **Use for** single-line data entry. **Props:** `state` default | hover | focus | filled | disabled | error · `optional`, `hint`, `errorMessage`, `icon`, `paymentIcon`, `prefix` (booleans).
- **Do:** always show a visible label; show `errorMessage` text with the error state.
- **Don't:** use placeholder text as the label.

### Textarea
- **Use for** multi-line text (comments, descriptions). **Props:** `state` default | hover | focus | disabled | error | filled · `optional`, `helpIcon`, `hint`.
- **Don't:** use for single-line values; use Input / Text.

### Search
- **Use to** filter or find content. **Props:** `state` default | hover | focus | filled · `label`, `labelText`, `hintText`, `optional`, `helpIcon`.
- **Don't:** use for data entry.

### Upload Field
- **Use to** attach a file. **Props:** `state` default | hover | filled | disabled | error · `label`, `labelText`, `hintText`, `optional`, `helpIcon`.
- **Do:** state accepted formats and max size in the hint.
- **Don't:** use for profile pictures; use Avatar Upload.

### Verification Code Input, Code Field, Numeric Field
- **Verification Code Input** enters a one-time code. **Props:** `state` default | filled | disabled | success | error · `label`, `hint`, `successMessage`, `errorMessage`.
- **Code Field** is one digit inside it. Don't use it on its own.
- **Numeric Field** is a stepper for a small number. **Props:** `state` focus | disabled.

### Checkbox, RadioButton, Toggle
- **Props:** `checked` (Checkbox: false | true | indeterminate; others: false | true) · `state` default | disabled · `label` / `labelText`.
- **Checkbox** for one or more options or a single opt-in. **RadioButton** for exactly one of 2–5 options. **Toggle** for an instant on/off setting.
- **Don't:** use Toggle when a Save button confirms the change; use Checkbox.
- The whole row (control + label) is clickable.

### Alert
- **Use for** page- or section-level messages. **Props:** `variant` info | warning | danger | success.
- **Don't:** use for short status labels; use Badge.

### Badge
- **Use for** short status labels. **Props:** `variant` info | warning | danger | success.
- **Don't:** put explanations in a badge; use Alert.

### Confirmation Popup
- **Use to** confirm an important or destructive action. **Props:** `variant` success | info | warning | danger.
- **Do:** use `danger` for destructive actions; name the action on the button ("Delete file", not "OK").
- **Don't:** use for passive information.

### Tooltip
- **Use for** a short hint on hover or focus. **Props:** `arrow` up | down | left | right · `size` sm | lg.
- **Don't:** put essential information or actions in a tooltip; it must also open on keyboard focus.

### Avatar, Avatar Upload
- **Avatar** represents a person. **Props:** `variant` photo | text | icon · `size` xs | sm | base | lg. Fall back photo → initials → icon.
- **Avatar Upload** adds or changes a profile picture. **Props:** `state` default | filled | error.

### Pagination / Item, Tabs / Item
- **Pagination / Item:** `variant` number | ellipsis | prev | next · `state` default | hover | active | disabled. `active` is the current page (`aria-current="page"`).
- **Tabs / Item:** `variant` underline (page-level) | pill (compact filters) · `state` default | hover | active | disabled. Don't use tabs to navigate to another page.

### Icons
- 39 icons, 24px, kebab-case names (`chevron-left`, `close`, `close-circle`, `arrow-up-right`…). Color with `text-*`; default `text-icon-default`.

## 6. Accessibility

- Text contrast meets WCAG 2.2 AA (4.5:1 body, 3:1 large text and UI parts). Pair text and background tokens as the Figma components do. <!-- confirm: contrast of info/danger/success button text was reviewed and kept as is -->.
- Every interactive element shows a visible focus state (`focus-visible:` with `border-focus` or a ring). Never remove outlines without a replacement.
- Click targets are at least 24×24px (WCAG 2.2 AA); icon-only buttons use `size` sm or larger. <!-- confirm -->
- Forms: real `<label>` for every field; errors are announced (`aria-describedby` on the field pointing at the message).
- Respect user font scaling: font sizes, line heights, spacing and radius are output in `rem` (16px base).
- Don't rely on color alone: status components pair color with an icon and text.

## 7. Do / Don't (top 10)

1. Don't hardcode colors, spacing, radius or font sizes. Use token classes.
2. Don't use arbitrary Tailwind values (`[#…]`, `[13px]`).
3. Don't use primitives (`bg-blue-500`) in components. Use semantic tokens.
4. Do reuse existing components before creating new ones.
5. Don't put more than one `filled` button in a view.
6. Do implement all states the Figma component has (default, hover, focus, disabled, error).
7. Don't use placeholder text as a label.
8. Don't use `error` and `danger` interchangeably: `danger` is a component variant, `error` is a state and its tokens.
9. Don't write per-component dark-mode styles; the theme switches tokens.
10. Don't add responsive font-size or spacing overrides; the tokens already change per breakpoint.
