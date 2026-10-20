// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=69-20901
// source=src/components/VerificationCode.tsx
// component=VerificationCodeInput
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const state = instance.getEnum('state', { default: 'default', filled: 'filled', disabled: 'disabled', success: 'success', error: 'error' })
const showLabel = instance.getBoolean('label')
const showHint = instance.getBoolean('hint')
const showSuccess = instance.getBoolean('successMessage')
const showError = instance.getBoolean('errorMessage')
const label = text(instance.findText('Label'))
// hint and the success/error line share a layer name; only one is visible per state
const message = text(instance.findText('This is a hint text.'))

export default {
  example: figma.code`<VerificationCodeInput${showLabel ? ` label="${label}"` : ''}${state === 'success' && showSuccess ? ` successMessage="${message}"` : ''}${state === 'error' && showError ? ` errorMessage="${message}"` : ''}${showHint && state !== 'success' && state !== 'error' ? ` hint="${message}"` : ''}${state === 'disabled' ? ' disabled' : ''} />`,
  imports: ['import { VerificationCodeInput } from "./components"'],
  id: 'verification-code-input',
  metadata: { nestable: true },
}
