- Never hardcode colors, spacing, radius, or font sizes; use the design tokens
  (Tailwind theme utilities like text-primary, bg-btn-primary, gap-4, rounded-lg; no arbitrary values)
- Reuse existing components before creating new ones
- Follow DESIGN.md for all UI work
- UI components live in src/components (prop names match Figma); `npm run dev` shows them all
- After changing Figma variables, update tokens/tokens.json and run `npm run tokens:build`
