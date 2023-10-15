import type { Store } from '../../../store';
import type { PokemonResult } from './PokemonResult';
import type { Pokemon } from './Pokemon';

export type PokemonsStoreState = {
    pokemons: PokemonResult[];
    details: Record<string, Pokemon>;
};

export type PokemonsStore = Store<PokemonsStoreState>;
