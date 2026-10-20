// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=80-28711
// source=src/components/SelectionControls.tsx
// component=RadioButton
import figma from 'figma'
const instance = figma.selectedInstance

const checked = instance.getEnum('checked', { false: false, true: true })
const disabled = instance.getEnum('state', { default: false, disabled: true })
const labelText = instance.getString('labelText')

export default {
  example: figma.code`<RadioButton name="options" labelText="${labelText}"${checked ? ' defaultChecked' : ''}${disabled ? ' disabled' : ''} />`,
  imports: ['import { RadioButton } from "./components"'],
  id: 'radio-button',
  metadata: { nestable: true },
}
