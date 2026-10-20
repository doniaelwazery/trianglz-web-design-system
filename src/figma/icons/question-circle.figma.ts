// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=221-2187
// source=src/components/Icon.tsx
// component=Icon
import figma from 'figma'

export default {
  example: figma.code`<Icon name="question-circle" />`,
  imports: ['import { Icon } from "./components"'],
  id: 'icon-question-circle',
  // the name lets parent templates (e.g. Button) pass it to their own icon prop
  metadata: { nestable: true, props: { name: 'question-circle' } },
}
