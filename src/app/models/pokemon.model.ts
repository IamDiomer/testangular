export interface Pokemon {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
  forms: Array<{ name: string; url: string }>;
  game_indices: Array<{ game_index: number; version: { name: string; url: string } }>;
  held_items: Array<{
    item: { name: string; url: string };
    version_details: Array<{ rarity: number; version: { name: string; url: string } }>;
  }>;
  location_area_encounters: string;
  moves: Array<{ move: { name: string; url: string } }>;
  species: { name: string; url: string };
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    front_female?: string | null;
    back_female?: string | null;
    front_shiny_female?: string | null;
    back_shiny_female?: string | null;
    other?: {
      'official-artwork'?: { front_default: string | null; front_shiny: string | null };
      home?: { front_default: string | null; front_shiny: string | null };
      dream_world?: { front_default: string | null; front_female?: string | null };
      showdown?: {
        front_default: string | null;
        back_default: string | null;
        front_shiny: string | null;
        back_shiny: string | null;
      };
    };
  };
  stats: Array<{ base_stat: number; effort: number; stat: { name: string; url: string } }>;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
}
