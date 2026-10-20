// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=73-23641
// source=src/components/Input.tsx
// component=Input
import figma, { type TextHandle } from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const state = instance.getEnum('state', { default: 'default', disabled: 'disabled', hover: 'hover', focus: 'focus', filled: 'filled', error: 'error' })
const optional = instance.getBoolean('optional')
const showHint = instance.getBoolean('hint')
const showError = instance.getBoolean('errorMessage')
const showIcon = instance.getBoolean('icon')
const showPrefix = instance.getBoolean('prefix')
const paymentIcon = instance.getBoolean('paymentIcon')
const label = text(instance.findText('Label'))
const hint = text(instance.findText('This is a hint text.'))
const error = text(instance.findText('Error text'))
// "Text" layers: the prefix (when shown) comes first, the value/placeholder last
const fieldTexts = instance.findLayers(n => n.type === 'TEXT' && n.name === 'Text').filter((n): n is TextHandle => n.type === 'TEXT')
const prefix = showPrefix && fieldTexts.length > 1 ? fieldTexts[0].textContent : ''
const placeholder = fieldTexts.length ? fieldTexts[fieldTexts.length - 1].textContent : ''

export default {
  example: figma.code`<Input label="${label}"${optional ? ' optional' : ''}${showHint && state !== 'error' ? ` hint="${hint}"` : ''}${prefix ? ` prefix="${prefix}"` : ''}${paymentIcon ? ' paymentIcon' : ''} placeholder="${placeholder}"${showIcon ? ' icon="chevron-down"' : ''}${state === 'disabled' ? ' disabled' : ''}${state === 'error' && showError ? ` errorMessage="${error}"` : ''} />`,
  imports: ['import { Input } from "./components"'],
  id: 'input-card-number',
  metadata: { nestable: true },
}
