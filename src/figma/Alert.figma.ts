// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=77-27906
// source=src/components/Feedback.tsx
// component=Alert
import figma, { type TextHandle } from 'figma'
const instance = figma.selectedInstance
const texts = (opts?: { traverseInstances?: boolean }) =>
  instance.findLayers(n => n.type === 'TEXT', opts).filter((n): n is TextHandle => n.type === 'TEXT').map(n => n.textContent)

const variant = instance.getEnum('variant', { info: 'info', warning: 'warning', danger: 'danger', success: 'success' })
const [title = '', message = ''] = texts()

export default {
  example: figma.code`<Alert variant="${variant}" title="${title}" onClose={() => {}}>${message}</Alert>`,
  imports: ['import { Alert } from "./components"'],
  id: 'alert',
  metadata: { nestable: true },
}
