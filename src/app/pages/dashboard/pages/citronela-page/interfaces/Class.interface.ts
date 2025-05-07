export interface PlayableClass {
  _links: Links
  id: number
  name: string
  gender_name: GenderName
  power_type: PowerType
  media: Media
  pvp_talent_slots: PvpTalentSlots
  playable_races: PlayableRace[]
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface GenderName {
  male: string
  female: string
}

export interface PowerType {
  key: Key
  name: string
  id: number
}

export interface Key {
  href: string
}

export interface Media {
  key: Key2
  id: number
}

export interface Key2 {
  href: string
}

export interface PvpTalentSlots {
  href: string
}

export interface PlayableRace {
  key: Key3
  name: string
  id: number
}

export interface Key3 {
  href: string
}
