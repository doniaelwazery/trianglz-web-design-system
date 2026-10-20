// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=222-2317
// source=src/components/Icon.tsx
// component=Icon
import figma from 'figma'

export default {
  example: figma.code`<Icon name="arrow-up" />`,
  imports: ['import { Icon } from "./components"'],
  id: 'icon-arrow-up',
  // the name lets parent templates (e.g. Button) pass it to their own icon prop
  metadata: { nestable: true, props: { name: 'arrow-up' } },
}
