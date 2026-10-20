// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=80-28810
// source=src/components/UploadField.tsx
// component=UploadField
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const state = instance.getEnum('state', { default: 'default', disabled: 'disabled', hover: 'hover', filled: 'filled', error: 'error' })
const showLabel = instance.getBoolean('label')
const labelText = instance.getString('labelText')
const hintText = instance.getString('hintText')
const optional = instance.getBoolean('optional')
const fileName = text(instance.findText('Text', { path: ['Text Input'] }))
const error = text(instance.findText('This is a hint text.', { path: ['Frame 3465928'] }))

export default {
  example: figma.code`<UploadField${showLabel ? ` label="${labelText}"` : ''}${optional ? ' optional' : ''} hint="${hintText}"${state === 'disabled' ? ' disabled' : ''}${state === 'filled' ? ` fileName="${fileName}"` : ''}${state === 'error' ? ` errorMessage="${error}"` : ''} />`,
  imports: ['import { UploadField } from "./components"'],
  id: 'upload-field',
  metadata: { nestable: true },
}
