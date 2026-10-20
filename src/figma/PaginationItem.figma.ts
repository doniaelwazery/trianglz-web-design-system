// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=245-24
// source=src/components/Navigation.tsx
// component=PaginationItem
import figma, { type TextHandle } from 'figma'
const instance = figma.selectedInstance
const texts = (opts?: { traverseInstances?: boolean }) =>
  instance.findLayers(n => n.type === 'TEXT', opts).filter((n): n is TextHandle => n.type === 'TEXT').map(n => n.textContent)

const variant = instance.getEnum('variant', { number: 'number', ellipsis: 'ellipsis', prev: 'prev', next: 'next' })
const state = instance.getEnum('state', { default: 'default', hover: 'hover', active: 'active', disabled: 'disabled' })
const [label = ''] = texts()

export default {
  example: figma.code`<PaginationItem variant="${variant}"${state === 'active' ? ' state="active"' : ''}${state === 'disabled' ? ' disabled' : ''}${variant === 'number' ? `>${label}</PaginationItem>` : ' />'}`,
  imports: ['import { PaginationItem } from "./components"'],
  id: 'pagination-item',
  metadata: { nestable: true },
}
