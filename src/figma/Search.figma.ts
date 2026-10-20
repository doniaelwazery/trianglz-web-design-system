// url=https://www.figma.com/design/J5nMmdVjcukSUhQXq0Oce7/Trianglz---Web-Design-System--Copy-?node-id=80-30243
// source=src/components/Search.tsx
// component=Search
import figma from 'figma'
const instance = figma.selectedInstance
const text = (h: ReturnType<typeof instance.findText>) => (h.type === 'TEXT' ? h.textContent : '')

const showLabel = instance.getBoolean('label')
const labelText = instance.getString('labelText')
const placeholder = text(instance.findText('Search by...'))

export default {
  example: figma.code`<Search${showLabel ? ` label="${labelText}"` : ''}${placeholder ? ` placeholder="${placeholder}"` : ''} />`,
  imports: ['import { Search } from "./components"'],
  id: 'search',
  metadata: { nestable: true },
}
