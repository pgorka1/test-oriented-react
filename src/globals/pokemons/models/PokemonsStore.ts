import type { PokemonResult } from './Pokemon';
import type { Store } from '../store';

export type PokemonsStoreState = {
    pokemons: PokemonResult[];
};

export type PokemonsStore = Store<PokemonsStoreState>;
