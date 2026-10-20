// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=80-28688
// source=src/components/SelectionControls.tsx
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

const checked = instance.getEnum('checked', { false: 'false', true: 'true', indeterminate: 'indeterminate' })
const disabled = instance.getEnum('state', { default: false, disabled: true })
const showLabel = instance.getBoolean('label')
const labelText = instance.getString('labelText')

export default {
  example: figma.code`<Checkbox${showLabel ? ` labelText="${labelText}"` : ''}${checked === 'true' ? ' defaultChecked' : checked === 'indeterminate' ? ' defaultChecked="indeterminate"' : ''}${disabled ? ' disabled' : ''} />`,
  imports: ['import { Checkbox } from "./components"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
