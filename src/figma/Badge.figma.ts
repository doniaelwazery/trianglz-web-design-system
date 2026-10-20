// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=77-27864
// source=src/components/Feedback.tsx
// component=Badge
import figma, { type TextHandle } from 'figma'
const instance = figma.selectedInstance
const texts = (opts?: { traverseInstances?: boolean }) =>
  instance.findLayers(n => n.type === 'TEXT', opts).filter((n): n is TextHandle => n.type === 'TEXT').map(n => n.textContent)

const variant = instance.getEnum('variant', { info: 'info', warning: 'warning', danger: 'danger', success: 'success' })
const [label = ''] = texts()

export default {
  example: figma.code`<Badge variant="${variant}">${label}</Badge>`,
  imports: ['import { Badge } from "./components"'],
  id: 'badge',
  metadata: { nestable: true },
}
