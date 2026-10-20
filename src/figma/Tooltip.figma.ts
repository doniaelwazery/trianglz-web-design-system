// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=75-26731
// source=src/components/Feedback.tsx
// component=Tooltip
import figma, { type TextHandle } from 'figma'
const instance = figma.selectedInstance
const texts = (opts?: { traverseInstances?: boolean }) =>
  instance.findLayers(n => n.type === 'TEXT', opts).filter((n): n is TextHandle => n.type === 'TEXT').map(n => n.textContent)

const arrow = instance.getEnum('arrow', { down: 'down', left: 'left', right: 'right', up: 'up' })
const size = instance.getEnum('size', { sm: 'sm', lg: 'lg' })
const [content = ''] = texts()

export default {
  example: figma.code`<Tooltip arrow="${arrow}" size="${size}" content="${content}" />`,
  imports: ['import { Tooltip } from "./components"'],
  id: 'tooltip',
  metadata: { nestable: true },
}
