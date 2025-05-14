export interface CharacterSpecialization {
  _links: Links
  character: Character
  specialization_groups: SpecializationGroup[]
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface Character {
  key: Key
  name: string
  id: number
  realm: Realm
}

export interface Key {
  href: string
}

export interface Realm {
  key: Key2
  name: string
  id: number
  slug: string
}

export interface Key2 {
  href: string
}

export interface SpecializationGroup {
  is_active: boolean
  specializations: Specialization[]
  glyphs: Glyph[]
}

export interface Specialization {
  talents: Talent[]
  specialization_name: string
  spent_points: number
}

export interface Talent {
  talent: Talent2
  spell_tooltip: SpellTooltip
  talent_rank: number
}

export interface Talent2 {
  id: number
}

export interface SpellTooltip {
  spell: Spell
  description: string
  cast_time: string
  power_cost?: string
  range?: string
  cooldown?: string
}

export interface Spell {
  name: string
  id: number
}

export interface Glyph {
  name: string
  id: number
}
