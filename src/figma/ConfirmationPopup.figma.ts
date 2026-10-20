// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=222-3717
// source=src/components/Feedback.tsx
// component=ConfirmationPopup
import figma, { type TextHandle } from 'figma'
const instance = figma.selectedInstance
const texts = (opts?: { traverseInstances?: boolean }) =>
  instance.findLayers(n => n.type === 'TEXT', opts).filter((n): n is TextHandle => n.type === 'TEXT').map(n => n.textContent)

const variant = instance.getEnum('variant', { success: 'success', info: 'info', warning: 'warning', danger: 'danger' })
// title, message, then the two nested Buttons (cancel, confirm)
const [title = '', message = '', cancel = '', confirm = ''] = texts({ traverseInstances: true })

export default {
  example: figma.code`<ConfirmationPopup variant="${variant}" title="${title}" cancelLabel="${cancel}" confirmLabel="${confirm}" onClose={() => {}}>${message}</ConfirmationPopup>`,
  imports: ['import { ConfirmationPopup } from "./components"'],
  id: 'confirmation-popup',
  metadata: { nestable: true },
}
