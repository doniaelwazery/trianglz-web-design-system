// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=103-859
// source=src/components/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const variant = instance.getEnum('variant', { filled: 'filled', pill: 'pill', outline: 'outline', link: 'link' })
const size = instance.getEnum('size', { xl: 'xl', lg: 'lg', base: 'base', sm: 'sm', xs: 'xs' })
const iconPosition = instance.getEnum('iconPosition', { none: 'none', left: 'left', right: 'right', only: 'only' })
const color = instance.getEnum('color', { primary: 'primary', danger: 'danger', success: 'success', warning: 'warning', info: 'info' })
// hover and focus come from the browser in code; only disabled is a prop
const disabled = instance.getEnum('state', { default: false, hover: false, focus: false, disabled: true })
const label = text(instance.findText('Text'))
// the nested icon's own template reports its name
const icon = instance.findConnectedInstances(() => true)[0]
const iconName = icon ? icon.executeTemplate().metadata?.props?.name : undefined

export default {
  example: figma.code`<Button variant="${variant}" size="${size}"${iconPosition !== 'none' ? ` iconPosition="${iconPosition}"` : ''}${iconName ? ` icon="${iconName}"` : ''}${color !== 'primary' ? ` color="${color}"` : ''}${disabled ? ' disabled' : ''}>${label}</Button>`,
  imports: ['import { Button } from "./components"'],
  id: 'button',
  metadata: { nestable: true },
}
