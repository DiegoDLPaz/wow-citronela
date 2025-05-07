export interface CharacterSummary {
  achievement_points: number;
  achievements: {
    href: string;
  };
  active_spec: {
    id: number;
    key: {
      href: string;
    };
  };
  appearance: {
    href: string;
  };
  average_item_level: number;
  character_class: {
    id: number;
    key: {
      href: string;
    };
    name: string | null; // May be null, depending on the API data
  };
  equipment: {
    href: string;
  };
  equipped_item_level: number;
  experience: number;
  faction: {
    name: string | null; // May be null, depending on the API data
    type: 'HORDE' | 'ALLIANCE'; // Example values, adjust if necessary
  };
  gender: {
    name: string | null; // May be null, depending on the API data
    type: 'MALE' | 'FEMALE'; // Example values, adjust if necessary
  };
  id: number;
  last_login_timestamp: number; // Timestamp in milliseconds
  level: number;
  media: {
    href: string;
  };
  name: string;
  pvp_summary: {
    href: string;
  };
  race: {
    id: number;
    key: {
      href: string;
    };
    name: string | null; // May be null, depending on the API data
  };
  realm: {
    id: number;
    key: {
      href: string;
    };
    name: string | null; // May be null, depending on the API data
    slug: string;
  };
  specializations: {
    href: string;
  };
  statistics: {
    href: string;
  };
  titles: {
    href: string;
  };
  _links: Record<string, any>; // Links related to the character's profile
}
