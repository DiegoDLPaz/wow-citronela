export interface GuildMember {
  character: Character
  rank: number
}

export interface Character {
  key: Key
  name: string
  id: number
  realm: Realm
  level: number
  playable_class: PlayableClass
  playable_race: PlayableRace
}

export interface Key {
  href: string
}

export interface Realm {
  key: Key2
  id: number
  slug: string
}

export interface Key2 {
  href: string
}

export interface PlayableClass {
  key: Key3
  id: number
}

export interface Key3 {
  href: string
}

export interface PlayableRace {
  key: Key4
  id: number
}

export interface Key4 {
  href: string
}
