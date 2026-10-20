// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=75-26830
// source=src/components/Avatar.tsx
// component=Avatar
import figma, { type TextHandle } from 'figma'
const instance = figma.selectedInstance
const texts = (opts?: { traverseInstances?: boolean }) =>
  instance.findLayers(n => n.type === 'TEXT', opts).filter((n): n is TextHandle => n.type === 'TEXT').map(n => n.textContent)

const variant = instance.getEnum('variant', { text: 'text', icon: 'icon', photo: 'photo' })
const size = instance.getEnum('size', { lg: 'lg', base: 'base', sm: 'sm', xs: 'xs' })
const [initials = ''] = texts()

export default {
  example: figma.code`<Avatar variant="${variant}" size="${size}"${variant === 'text' ? ` initials="${initials}"` : ''}${variant === 'photo' ? ' src={photoUrl}' : ''} />`,
  imports: ['import { Avatar } from "./components"'],
  id: 'avatar',
  metadata: { nestable: true },
}
