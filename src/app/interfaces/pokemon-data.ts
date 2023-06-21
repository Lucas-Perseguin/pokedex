export interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  moves: { move: { name: string } }[];
  abilities: { ability: { name: string } }[];
  id: number;
}
