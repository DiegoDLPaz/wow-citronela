export interface PlayableRace {
  _links: Links
  id: number
  name: any
  gender_name: GenderName
  faction: Faction
  is_selectable: boolean
  is_allied_race: boolean
  playable_classes: PlayableClass[]
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface GenderName {
  male: any
  female: any
}

export interface Faction {
  type: string
  name: any
}

export interface PlayableClass {
  key: Key
  name: any
  id: number
}

export interface Key {
  href: string
}
