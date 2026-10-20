// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=209-206
// source=src/components/Textarea.tsx
// component=Textarea
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const state = instance.getEnum('state', { default: 'default', filled: 'filled', hover: 'hover', focus: 'focus', disabled: 'disabled', error: 'error' })
const optional = instance.getBoolean('optional')
const showHint = instance.getBoolean('hint')
const label = text(instance.findText('Label'))
const hint = text(instance.findText('Hint'))
const placeholder = text(instance.findText('Enter description'))
const error = text(instance.findText('Error message'))

export default {
  example: figma.code`<Textarea label="${label}"${optional ? ' optional' : ''}${showHint ? ` hint="${hint}"` : ''}${placeholder ? ` placeholder="${placeholder}"` : ''}${state === 'disabled' ? ' disabled' : ''}${state === 'error' ? ` errorMessage="${error}"` : ''} />`,
  imports: ['import { Textarea } from "./components"'],
  id: 'textarea',
  metadata: { nestable: true },
}
