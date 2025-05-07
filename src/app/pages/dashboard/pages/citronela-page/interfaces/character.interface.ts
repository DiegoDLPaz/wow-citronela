export interface Character {
  _links: Links
  id: number
  name: string
  gender: Gender
  faction: Faction
  race: Race
  character_class: CharacterClass
  active_spec: ActiveSpec
  realm: Realm
  guild: Guild
  level: number
  experience: number
  achievement_points: number
  achievements: Achievements
  titles: Titles
  pvp_summary: PvpSummary
  media: Media
  hunter_pets: HunterPets
  last_login_timestamp: number
  average_item_level: number
  equipped_item_level: number
  specializations: Specializations
  statistics: Statistics
  equipment: Equipment
  appearance: Appearance
  active_title: ActiveTitle
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface Gender {
  type: string
  name: string
}

export interface Faction {
  type: string
  name: string
}

export interface Race {
  key: Key
  name: string
  id: number
}

export interface Key {
  href: string
}

export interface CharacterClass {
  key: Key2
  name: string
  id: number
}

export interface Key2 {
  href: string
}

export interface ActiveSpec {
  key: Key3
  id: number
}

export interface Key3 {
  href: string
}

export interface Realm {
  key: Key4
  name: string
  id: number
  slug: string
}

export interface Key4 {
  href: string
}

export interface Guild {
  key: Key5
  name: string
  id: number
  realm: Realm2
  faction: Faction2
}

export interface Key5 {
  href: string
}

export interface Realm2 {
  key: Key6
  name: string
  id: number
  slug: string
}

export interface Key6 {
  href: string
}

export interface Faction2 {
  type: string
  name: string
}

export interface Achievements {
  href: string
}

export interface Titles {
  href: string
}

export interface PvpSummary {
  href: string
}

export interface Media {
  href: string
}

export interface HunterPets {
  href: string
}

export interface Specializations {
  href: string
}

export interface Statistics {
  href: string
}

export interface Equipment {
  href: string
}

export interface Appearance {
  href: string
}

export interface ActiveTitle {
  name: string
}

export interface CharacterMedia{
  assets: Asset[]
}

export interface Asset{
  key:string
  value:string
}
