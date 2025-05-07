export interface WowUserProfile {
  _links: {
    self: { href: string };
    user: { href: string };
    profile: { href: string };
  };
  id: number;
  wow_accounts: WowAccount[];
}

export interface WowAccount {
  id: number;
  characters: WowCharacter[];
}

export interface WowCharacter {
  character: { href: string };
  protected_character: { href: string };
  name: string;
  id: number;
  realm: {
    key: { href: string };
    name: string | null;
    id: number;
    slug: string;
  };
  playable_class: {
    key: { href: string };
    name: string | null;
    id: number;
  };
  playable_race: {
    key: { href: string };
    name: string | null;
    id: number;
  };
  gender: {
    type: 'MALE' | 'FEMALE';
    name: string | null;
  };
  faction: {
    type: 'HORDE' | 'ALLIANCE';
    name: string | null;
  };
  level: number;
}
