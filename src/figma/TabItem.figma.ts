// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=245-54
// source=src/components/Navigation.tsx
// component=TabItem
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const variant = instance.getEnum('variant', { underline: 'underline', pill: 'pill' })
const state = instance.getEnum('state', { default: 'default', hover: 'hover', active: 'active', disabled: 'disabled' })
const label = text(instance.findText('Tab label'))

export default {
  example: figma.code`<TabItem variant="${variant}"${state === 'active' ? ' state="active"' : ''}${state === 'disabled' ? ' disabled' : ''}>${label}</TabItem>`,
  imports: ['import { TabItem } from "./components"'],
  id: 'tab-item',
  metadata: { nestable: true },
}
