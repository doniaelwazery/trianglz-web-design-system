// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=80-28684
// source=src/components/SelectionControls.tsx
// component=Toggle
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const checked = instance.getEnum('checked', { true: true, false: false })
const disabled = instance.getEnum('state', { default: false, disabled: true })
const showLabel = instance.getBoolean('label')
const label = text(instance.findText('Text'))

export default {
  example: figma.code`<Toggle${showLabel ? ` label="${label}"` : ''}${checked ? ' defaultChecked' : ''}${disabled ? ' disabled' : ''} />`,
  imports: ['import { Toggle } from "./components"'],
  id: 'toggle',
  metadata: { nestable: true },
}
