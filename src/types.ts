export type ProjectId = 'service' | 'store' | 'events' | 'restaurant' | 'estate'

export type ProjectMeta = {
  id: ProjectId
  index: string
  eyebrow: string
  name: string
  note: string
  image: string
  color: string
  foreground: string
}
