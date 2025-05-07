import {GuildMember} from './guild-member.interface';

export interface GuildResponse {
  _links: Links
  guild: Guild
  members: GuildMember[]
}

export interface Links {
  self: Self
}

export interface Self {
  href: string
}

export interface Guild {
  key: Key
  name: string
  id: number
  realm: Realm
  faction: Faction
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

export interface Faction {
  type: string
  name: string
}
