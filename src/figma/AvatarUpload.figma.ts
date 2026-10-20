// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=75-26917
// source=src/components/Avatar.tsx
// component=AvatarUpload
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('state', { default: 'default', filled: 'filled', error: 'error' })

export default {
  example: figma.code`<AvatarUpload${state === 'filled' ? ' src={photoUrl}' : ''}${state === 'error' ? ' error' : ''} />`,
  imports: ['import { AvatarUpload } from "./components"'],
  id: 'avatar-upload',
  metadata: { nestable: true },
}
