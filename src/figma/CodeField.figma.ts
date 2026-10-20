// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=68-20624
// source=src/components/VerificationCode.tsx
// component=CodeField
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const state = instance.getEnum('state', { default: 'default', hover: 'hover', focus: 'focus', filled: 'filled', error: 'error', success: 'success', disabled: 'disabled' })
const digit = text(instance.findText('Text'))

export default {
  example: figma.code`<CodeField${state === 'error' || state === 'success' ? ` state="${state}"` : ''}${digit ? ` defaultValue="${digit}"` : ''}${state === 'disabled' ? ' disabled' : ''} aria-label="Digit" />`,
  imports: ['import { CodeField } from "./components"'],
  id: 'code-field',
  metadata: { nestable: true },
}
