// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=75-27016
// source=src/components/NumericField.tsx
// component=NumericField
import figma from 'figma'

// Figma state (disabled|focus) is the minus button at its minimum, which code derives from value and min.
// Figma has no label; give the field a real accessible name where it's used.

export default {
  example: figma.code`<NumericField label="Quantity" min={0} />`,
  imports: ['import { NumericField } from "./components"'],
  id: 'numeric-field',
  metadata: { nestable: true },
}
